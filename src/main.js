import { createApp } from 'vue'
import '@/style.css'
import App from '@/App.vue'
import router from '@/router';
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueSweetalert2 from 'vue-sweetalert2'
// import { Loader } from '@googlemaps/js-api-loader';


// window.googleMapsLoaded = false;

// // load the Google Maps API
// if (!window.googleMapsLoaded) {
//   const loader = new Loader({
//     apiKey: 'AIzaSyBs-7sheiPvy3j8RW4xihtxOIUUnsmB_Ec',
//     version: 'weekly',
//     libraries: ['places'],
//   });

//   loader.load().then(() => {
//     window.googleMapsLoaded = true;
//     new Vue({
//       // your Vue app instance code here
//     }).$mount('#app');
//   });
// } else {
//   new Vue({
//     // your Vue app instance code here
//   }).$mount('#app');
// }


createApp(App).use(router).use(VueAxios, axios).use(VueSweetalert2).mount('#app');