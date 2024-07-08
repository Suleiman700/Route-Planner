<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="apple-touch-icon" sizes="76x76" href="../../assets/img/apple-icon.png">
    <link rel="icon" type="image/png" href="../../assets/img/favicon.png">
    <title>
        Argon Dashboard 2 by Creative Tim
    </title>
    <!--     Fonts and icons     -->
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet"/>
    <!-- Nucleo Icons -->
    <link href="../../assets/css/nucleo-icons.css" rel="stylesheet"/>
    <link href="../../assets/css/nucleo-svg.css" rel="stylesheet"/>
    <!-- Font Awesome Icons -->
    <script src="https://kit.fontawesome.com/42d5adcbca.js" crossorigin="anonymous"></script>
    <link href="../../assets/css/nucleo-svg.css" rel="stylesheet"/>
    <!-- CSS Files -->
    <link id="pagestyle" href="../../assets/css/argon-dashboard.css?v=2.0.4" rel="stylesheet"/>

    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
    <link rel="stylesheet" href="https://unpkg.com/leaflet-routing-machine@3.2.12/dist/leaflet-routing-machine.css" />
    <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
    <script src="https://unpkg.com/leaflet-routing-machine@3.2.12/dist/leaflet-routing-machine.js"></script>

<!--    -->
<!--    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin=""/>-->
<!--    &lt;!&ndash; Make sure you put this AFTER Leaflet's CSS &ndash;&gt;-->
<!--    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>-->
</head>

<body class="g-sidenav-show   bg-gray-100">
<div class="min-height-300 bg-primary position-absolute w-100"></div>
<main class="main-content position-relative border-radius-lg ">
    <div class="container-fluid py-4" id="main">
        <div class="row">
            <div class="col-12">
                <div class="card mb-4">
<!--                    <div class="card-header pb-0">-->
<!--                        <h6>Projects table</h6>-->
<!--                    </div>-->
                    <div class="card-body p-4">
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="row">
                                    <div class="col-12 col-md-1">
                                        <label for="location-search" class="col-form-label">Search</label>
                                    </div>
                                    <div class="col-12 col-md-4 mb-2">
                                        <input type="text" id="location-search" class="form-control" placeholder="Search for location..." aria-describedby="passwordHelpInline" onfocus="focused(this)" onfocusout="defocused(this)">
                                    </div>
                                    <div class="col-12 col-md-1">
                                        <button type="submit" class="btn btn-primary" id="search-map-location">Submit</button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-12">
                                <div id="map"></div>
                                <style>
                                    #map { height: 500px; }
                                </style>
                            </div>
                            <div class="col-sm-12 mt-3 text-center">
                                <button class="btn btn-primary text-white" id="button-delete-markers" disabled>Delete Markers</button>
                                <button class="btn btn-primary text-white" id="button-calculate-route" disabled>Calculate Route</button>
                                <button class="btn btn-primary text-white" id="button-delete-route" disabled>Delete Route</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12">
                <div class="card mb-4">
                    <div class="card-header pb-0">
                        <h6>Map Markers</h6>
                    </div>
                    <div class="card-body p-4">
                        <div class="row">
                            <ul class="list-group overflow-auto p-2" id="markers-list">
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>
<!--   Core JS Files   -->
<script src="../../assets/js/core/popper.min.js"></script>
<script src="../../assets/js/core/bootstrap.min.js"></script>
<script src="../../assets/js/plugins/perfect-scrollbar.min.js"></script>
<script src="../../assets/js/plugins/smooth-scrollbar.min.js"></script>
<script>
    var win = navigator.platform.indexOf('Win') > -1;
    if (win && document.querySelector('#sidenav-scrollbar')) {
        var options = {
            damping: '0.5'
        }
        Scrollbar.init(document.querySelector('#sidenav-scrollbar'), options);
    }
</script>
<!-- Github buttons -->
<script async defer src="https://buttons.github.io/buttons.js"></script>
<!-- Control Center for Soft Dashboard: parallax effects, scripts for the example pages etc -->
<!--<script src="../../assets/js/argon-dashboard.min.js?v=2.0.4"></script>-->

<script src="../../src/Libs/sweetalert/sweetalert_11.12.1.js"></script>
<script src="./js/init.js" type="module"></script>

</body>

</html>