
import ButtonManager from '../../../src/plugins/ButtonManager/ButtonManager.js';
import Leaflet from '../../../src/Classes/Leaflet/Leaflet.js';

// ================================== [ Prepare Map ] ==================================
const LeafletIns = new Leaflet('map');
LeafletIns.buildMap();

// ================================== [ Prepare Buttons ] ==================================
// Delete markers button
const deleteMarkersBtn = new ButtonManager('main', 'button-delete-markers', () => {
    // Check if there are any markers on map
    if (!LeafletIns._storage.markers.length) {
        Swal.fire({
            icon: 'warning',
            html: 'Map does not have any markers!',
        })
        return;
    }

    // Delete markers from map
    LeafletIns._storage.markers.forEach(marker => {
        LeafletIns.deleteMarker(marker);
    })

    // Delete marker from list
    document.querySelector('#markers-list').innerHTML = '';

    // Disable buttons
    deleteMarkersBtn.enabled(false);
    calculateRouteBtn.enabled(false);
    deleteRouteBtn.enabled(false);

    // Delete route
    LeafletIns.deleteRoute();
})
deleteMarkersBtn.onClick();

// Calculate route button
const calculateRouteBtn = new ButtonManager('main', 'button-calculate-route', () => {
    // Check number on markers
    const markersCount = LeafletIns._storage.markers.length;

    if (markersCount < 2) {
        Swal.fire({
            icon: 'warning',
            html: 'Please place two or more markers!',
        })
    }
    else {
        LeafletIns.calculateRoute();
    }
})
calculateRouteBtn.onClick();

// Delete route button
const deleteRouteBtn = new ButtonManager('main', 'button-delete-route', () => {
    // Check if there is a route
    if (!LeafletIns._storage.routeControl) {
        Swal.fire({
            icon: 'warning',
            html: 'There is no route to delete!'
        })
    }
    else {
        LeafletIns.deleteRoute();
    }
})
deleteRouteBtn.onClick();

// Search location button
const searchLocationBtn = new ButtonManager('main', 'search-map-location', () => {
    const string = document.querySelector('#location-search')?.value;
    LeafletIns.search(string);
})
searchLocationBtn.onClick();



// On marker add
LeafletIns._storage.EventBus.on(LeafletIns._config.events.MARKER_ADD, (_marker) => {
    const markersList = document.getElementById('markers-list');

    // Remove all highlighted items
    const listItems = markersList.querySelectorAll(`li`)
    listItems.forEach(listItem => listItem.classList.remove('active'))

    const markerName = _marker.data.name;

    // Count markers in list
    const countMarkersInList = markersList.querySelectorAll('li')
    const markerNumber = countMarkersInList.length + 1;

    // Add new marker to list
    const listItem = document.createElement('li');
    listItem.dataset._leaflet_id = _marker._leaflet_id;
    listItem.classList.add('list-group-item', 'active');
    listItem.innerHTML = `
           <div class="row">
               <div class="col-10">
                    Marker ${markerNumber} ${markerName? ' - ' + markerName:''}
               </div>
               <div class="col-2">
                    <i class="fa fa-eye" data-identifier="focus-on-marker" style="cursor: pointer;"></i>
               </div>
           </div>
        `;

    listItem.querySelector('[data-identifier="focus-on-marker"]').addEventListener('click', () => {
        LeafletIns._storage.map.setView(_marker.getLatLng());
        _marker.openPopup();

        // Emit event
        LeafletIns._storage.EventBus.emit(LeafletIns._config.events.MARKER.FOCUS, _marker);
    });

    markersList.appendChild(listItem);

    // Enable calculate route button if added more than one marker
    if (LeafletIns._storage.markers.length > 1) {
        calculateRouteBtn.enabled(true);
    }

    // Enable delete markers button
    deleteMarkersBtn.enabled(true);
})

// On marker delete
LeafletIns._storage.EventBus.on(LeafletIns._config.events.MARKER_DELETE, (_marker) => {
    // Remove marker from list
    const markersList = document.getElementById('markers-list');
    const listItem = markersList.querySelector(`li[data-_leaflet_id="${_marker._leaflet_id}"]`)
    listItem.remove();
})

// On marker click
LeafletIns._storage.EventBus.on(LeafletIns._config.events.MARKER_CLICK, (_marker) => {
    const markersList = document.getElementById('markers-list');

    // Remove all highlighted items
    const listItems = markersList.querySelectorAll(`li`)
    listItems.forEach(listItem => listItem.classList.remove('active'))

    // Highlight marker item in list
    const listItem = markersList.querySelector(`li[data-_leaflet_id="${_marker._leaflet_id}"]`)
    listItem.classList.add('active')
})

// On marker focus
LeafletIns._storage.EventBus.on(LeafletIns._config.events.MARKER.FOCUS, (_marker) => {
    const markersList = document.getElementById('markers-list');

    // Remove all highlighted items
    const listItems = markersList.querySelectorAll(`li`)
    listItems.forEach(listItem => listItem.classList.remove('active'))

    // Highlight marker item in list
    const listItem = markersList.querySelector(`li[data-_leaflet_id="${_marker._leaflet_id}"]`)
    listItem.classList.add('active')
})

// On route generating
LeafletIns._storage.EventBus.on(LeafletIns._config.events.ROUTE.GENERATE, (_waypoint) => {
    // Enable buttons
    calculateRouteBtn.enabled(true);
    deleteRouteBtn.enabled(true);
})

// On route delete
LeafletIns._storage.EventBus.on(LeafletIns._config.events.ROUTE.DELETE, (_waypoint) => {
    deleteRouteBtn.enabled(false);
})


// document.querySelector('[data-identifier=calculate-route]').addEventListener('click', () => {
//     LeafletIns.calculateRoute();
// })
// document.querySelector('[data-identifier=delete-route]').addEventListener('click', () => {
//     LeafletIns.deleteRoute();
// })
