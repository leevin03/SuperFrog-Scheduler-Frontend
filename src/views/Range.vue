// Google API Key: 
// AIzaSyBF0bNL-oJQEXMn-G_LFzMelEFdzIxHP_c
// Working: AIzaSyBs-7sheiPvy3j8RW4xihtxOIUUnsmB_Ec

<template>
  <div>
    <h3> 1. Regular Days: 100 miles radius </h3>
    <h3> 2. Day before game day: 10 miles radius</h3>
    <div ref="map" style="height: 500px; width: 700px"></div>
  </div>
</template>

<script>
import { Loader } from '@googlemaps/js-api-loader';

export default {
  name: 'MapComponent',
  mounted() {
    const loader = new Loader({
      apiKey: 'AIzaSyBs-7sheiPvy3j8RW4xihtxOIUUnsmB_Ec',
      version: 'weekly'
    });

    loader.load().then(() => {
      const map = new google.maps.Map(this.$refs.map, {
        center: { lat: 32.709240, lng: -97.369330 },
        zoom: 8
      });

      const circle10Mile = new google.maps.Circle({
        strokeColor: '#FFFFFF',
        strokeOpacity: 0,
        strokeWeight: 0,
        fillColor: '#4d1979',
        fillOpacity: 0.2,
        map: map,
        center: { lat: 32.709240, lng: -97.369330 },
        radius: 16093.44 // 10 miles in meters
      });

      const circle100Mile = new google.maps.Circle({
        strokeColor: '#FFFFFF',
        strokeOpacity: 0,
        strokeWeight: 0,
        fillColor: '#4d1979',
        fillOpacity: 0.1,
        map: map,
        center: { lat: 32.709240, lng: -97.369330 },
        radius: 160934.4 // 100 miles in meters
      });
    });
  }
}
</script>

