// Google API Key: AIzaSyBF0bNL-oJQEXMn-G_LFzMelEFdzIxHP_c

<template>
    <div>
        <h2>Range: 3 miles radius</h2>
      <div ref="map" style="height: 600px; width: 600px"></div>
    </div>
  </template>
  
  <script>
  import { Loader } from '@googlemaps/js-api-loader';
  
  export default {
    name: 'MapComponent',
    mounted() {
      const loader = new Loader({
        apiKey: 'AIzaSyBF0bNL-oJQEXMn-G_LFzMelEFdzIxHP_c',
        version: 'weekly'
      });
  
      loader.load().then(() => {
        const map = new google.maps.Map(this.$refs.map, {
          center: { lat: 32.708222, lng: -97.361691 },
          zoom: 12.7,
          styles: [{
            "featureType": "all",
            "elementType": "geometry.fill",
            "stylers": [
              { "visibility": "off" }
            ]
          }]
        });
  
        const circle = new google.maps.Circle({
          strokeColor: '#4d1979',
          strokeOpacity: 1,
          strokeWeight: 2,
          fillColor: 'transparent',
          fillOpacity: 0,
          map: map,
          center: { lat: 32.708222, lng: -97.361691 },
          radius: 4828.03 // 3 miles in meters
        });
  
        const overlay = new google.maps.OverlayView();
        overlay.onAdd = function() {};
        overlay.onRemove = function() {};
        overlay.draw = function() {
          const projection = this.getProjection();
          const center = projection.fromLatLngToDivPixel(circle.getCenter());
          const radius = circle.getRadius();
  
          const div = document.createElement('div');
          div.style.width = 2 * radius + 'px';
          div.style.height = 2 * radius + 'px';
          div.style.borderRadius = '50%';
          div.style.opacity = '0';
          div.style.position = 'absolute';
          div.style.border = '5px solid #4d1979';
          div.style.left = center.x - radius + 'px';
          div.style.top = center.y - radius + 'px';
          this.getPanes().overlayLayer.appendChild(div);
        };
        overlay.setMap(map);
  
        google.maps.event.addListener(circle, 'radius_changed', () => {
          overlay.draw();
        });
  
        google.maps.event.addListener(circle, 'center_changed', () => {
          overlay.draw();
        });
  
        google.maps.event.addListener(circle, 'map_changed', () => {
          overlay.setMap(circle.getMap());
        });
      });
    }
  }
  </script>
  