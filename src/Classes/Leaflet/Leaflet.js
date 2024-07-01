import EventBus from '../EventBus/EventBus.js';

class Leaflet {
    _config = {
        parentId: null,
        events: {
            MAP: {
                CLICK: `${this.constructor.name}_MARKER_ADD`,
            },
            MARKER: {
                FOCUS: `${this.constructor.name}_MARKER_FOCUS`,
            },
            MARKER_ADD: `${this.constructor.name}_MARKER_ADD`,
            MARKER_DELETE: `${this.constructor.name}_MARKER_DELETE`,
            MARKER_CLICK: `${this.constructor.name}_MARKER_CLICK`,
        },
        map: {
            center: [51, 0.9],
            zoom: 13,
            marker: {
                isDraggable: true,
                onDrag: {
                    panMapToNewMarkerPos: true,
                },
                onClick: {
                    isDeletable: true,
                },
                defaultData: {
                    type: 'normal', // Marker type: start|normal|end
                    name: 'Test',
                },
            },
        },
    };

    _storage = {
        EventBus: new EventBus(),
        map: null,
        markers: [],
    };

    constructor(_parentId) {
        this._config.parentId = _parentId;
    }

    buildMap() {
        this._storage.map = L.map(this._config.parentId).setView(this._config.map.center, this._config.map.zoom);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 20,
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
        }).addTo(this._storage.map);

        const onMapClick = (e) => {
            const marker = new L.marker(e.latlng, { draggable: 'true' });

            // Add default marker data
            marker.data = this._config.map.marker.defaultData;

            marker.on('dragend', (event) => {
                const marker = event.target;
                const position = marker.getLatLng();
                marker.setLatLng(new L.LatLng(position.lat, position.lng), { draggable: 'true' });

                if (this._config.map.marker.onDrag.panMapToNewMarkerPos) {
                    this._storage.map.panTo(new L.LatLng(position.lat, position.lng));

                    this.calculateRoute();
                }
            });

            // Prepare marker popup
            const popupDiv = document.createElement('div');
            const nameLbl = document.createElement('p');
            nameLbl.textContent = 'Marker Name';
            const deleteBtn = document.createElement('button');
            deleteBtn.classList.add('btn', 'btn-danger', 'btn-xs');
            deleteBtn.innerHTML = '<i class="fa fa-trash"></i> Delete';
            deleteBtn.addEventListener('click', () => {
                this._storage.map.removeLayer(marker);
                this._storage.markers = this._storage.markers.filter(m => m !== marker);

                // Emit event
                this._storage.EventBus.emit(this._config.events.MARKER_DELETE, marker)

                this.calculateRoute();
            })
            popupDiv.appendChild(nameLbl);
            popupDiv.appendChild(deleteBtn);
            marker.bindPopup(popupDiv)

            marker.on('click', () => {
                marker.openPopup();

                // Emit event
                this._storage.EventBus.emit(this._config.events.MARKER_CLICK, marker);
            });

            // Add marker to map
            this._storage.map.addLayer(marker);

            // Store marker in storage
            this._storage.markers.push(marker);

            // Emit event
            this._storage.EventBus.emit(this._config.events.MARKER_ADD, marker)
        };

        this._storage.map.on('click', onMapClick);

        // Emit event
        this._storage.EventBus.emit(this._config.events.MAP.CLICK, this._storage.map);
    }

    search(location) {
        console.log(this._config.map.marker);

        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    const { lat, lon } = data[0];
                    this._storage.map.setView([lat, lon], this._config.map.zoom);
                } else {
                    alert('Location not found');
                }
            })
            .catch(error => {
                console.error('Error fetching location data:', error);
                alert('An error occurred while searching for the location');
            });
    }

    /**
     * Delete marker
     * @param _marker {object}
     * @return {void}
     */
    deleteMarker(_marker) {
        // Remove marker from map
        this._storage.map.removeLayer(_marker);

        // Remove marker from storage
        this._storage.markers = this._storage.markers.filter(marker => marker !== _marker);

        // Update route
        this.calculateRoute();
    }

    /**
     * Calculate route
     * @return {void}
     */
    calculateRoute() {
        if (this._storage.routeControl) {
            this._storage.map.removeControl(this._storage.routeControl);
        }

        const waypoints = this._storage.markers.map(marker => L.latLng(marker.getLatLng()));

        this._storage.routeControl = L.Routing.control({
            waypoints: waypoints,
            createMarker: () => null, // Do not create additional markers
            router: L.Routing.osrmv1({
                serviceUrl: 'https://router.project-osrm.org/route/v1'
            })
        }).addTo(this._storage.map);
    }

    /**
     * Delete calculated route
     * @return {void}
     */
    deleteRoute() {
        if (this._storage.routeControl) {
            this._storage.map.removeControl(this._storage.routeControl);
            this._storage.routeControl = null; // Clear the route control reference
        }
    }
}

export default Leaflet;
