import { createRouter, createWebHistory } from "vue-router";
// import Pricing from "@/Pricing.vue";
// import Range from "@/Range.vue";
import Request from "@/views/Request.vue";
// import ModifyRequest from "@/ModifyRequest.vue";
import Main from "@/views/Main.vue";
import SelectDateAndTime from '@/components-in-request/SelectDateAndTime.vue';
import CompleteForm from '@/components-in-request/CompleteForm.vue';
import PolicyAgreement from '@/components-in-request/PolicyAgreement.vue';
import ReviewAndSubmit from '@/components-in-request/ReviewAndSubmit.vue';
import Finish from '@/components-in-request/Finish.vue';

const routes = [
    {
        path:"/",
        component: Main,
    },
    {
        path: "/request",
        component: Request,
        children: [
            { path: '', redirect: '/request/SelectDateAndTime' },
            { path: 'SelectDateAndTime', name: 'SelectDateAndTime', component: SelectDateAndTime },
            { path: 'CompleteForm', name: 'CompleteForm', component: CompleteForm },
            { path: 'PolicyAgreement', name: 'PolicyAgreement', component: PolicyAgreement },
            { path: 'ReviewAndSubmit', name: 'ReviewAndSubmit', component: ReviewAndSubmit },
            { path: 'Finish', name: 'Finish', component: Finish }
        ],
    },
//   {
//     path: "/range",
//     component: Range,
//   },
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