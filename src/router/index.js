import { createRouter, createWebHistory } from "vue-router";
import Pricing from "@/views/Pricing.vue";
import MapComponent from "@/views/Range.vue";
import Main from "@/views/Main.vue";

import Request from "@/views/Request.vue";
import RequestDetails from '@/components-in-request/RequestDetails.vue';
import PolicyAgreement from '@/components-in-request/PolicyAgreement.vue';
import ReviewAndSubmit from '@/components-in-request/ReviewAndSubmit.vue';
import Finish from '@/components-in-request/Finish.vue';

import ModifyRequest from "@/views/ModifyRequest.vue";
import EnterRequestID from '@/components-in-modify/EnterRequestID.vue';
import EditRequest from '@/components-in-modify/EditRequest.vue';

const routes = [
    {
        path:"/",
        component: Main,
    },
    {
        path: "/request",
        component: Request,
        children: [
            { path: '', redirect: '/request/RequestDetails' },
            { path: 'RequestDetails', name: 'RequestDetails', component: RequestDetails },
            { path: 'PolicyAgreement', name: 'PolicyAgreement', component: PolicyAgreement },
            { path: 'ReviewAndSubmit', name: 'ReviewAndSubmit', component: ReviewAndSubmit },
            { path: 'Finish', name: 'Finish', component: Finish }
        ],
    },
  {
    path: "/range",
    component: MapComponent,
  },
  {
    path: "/pricing",
    component: Pricing,
  },
  {
    path: "/modify-request",
    component: ModifyRequest,
    children: [
      { path: '', redirect: '/modify-request/EnterRequestID' },
      { path: 'EnterRequestID', name: 'EnterRequestID', component: EnterRequestID },
      { path: 'EditRequest', name: 'EditRequest', component: EditRequest },
    ]
  },


//   {
//     path: "/request",
//     component: Request,
//   },
//   {
//     path: "/modify-request",
//     component: ModifyRequest,
//   },

    // //FOR REQUEST PART
    // { path: '/request', redirect: '/SelectDateAndTime' },
    
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;