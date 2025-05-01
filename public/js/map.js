let map;

function initMap() {
    // Create the map centered on a default location
    map = new google.maps.Map(document.getElementById('map'), {
        center: coordinates, // Default to Sydney, Australia
        zoom: 13
    });
     // Add a marker at the center
     const marker = new google.maps.Marker({
        position: coordinates, // Latitude and Longitude
        map: map,            // Reference to the map object
        title: "Default Marker", // Tooltip when hovering over the marker
      });

    // const input = document.getElementById('pac-input');

    // // Create the autocomplete object and bind it to the input field
    // autocomplete = new google.maps.places.Autocomplete(input);
    // autocomplete.bindTo('bounds', map);

    // // Set up the event listener for when the user selects a place
    // autocomplete.addListener('place_changed', () => {
    //     const place = autocomplete.getPlace();
    //     if (!place.geometry) {
    //         console.log("No details available for the input: '" + place.name + "'");
    //         return;
    //     }

    //     if (place.geometry.viewport) {
    //         map.fitBounds(place.geometry.viewport);
    //     } else {
    //         map.setCenter(place.geometry.location);
    //         map.setZoom(17); // Zoom to 17 if the place has no viewport
    //     }

    //     // Place a marker on the selected location
    //     new google.maps.Marker({
    //         position: place.geometry.location,
    //         map: map
    //     });
    // });
}