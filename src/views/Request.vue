<template>
  <div>
    <router-view :key="currentStage" :form-data="formData" @form-data="storeFormData" :request-ID="requestID" @requestID="storeRequestID"></router-view>
  </div>
</template>

<script>
import RequestDetails from '@/components-in-request/RequestDetails.vue'
import PolicyAgreement from '@/components-in-request/PolicyAgreement.vue'
import ReviewAndSubmit from '@/components-in-request/ReviewAndSubmit.vue'
import Finish from '@/components-in-request/Finish.vue'

export default {
  components: {
      RequestDetails,
      PolicyAgreement,
      ReviewAndSubmit,
      Finish
  },
  data() {
    return {
      formData: {
        reqFirstName: '',
        reqLastName: '',
        reqPhoneNumber: '',
        reqEmail: '',
        appearanceType: 'TCU',
        title: '',
        orgName: '',
        address: '',
        mileage: '',
        eventDate: '',
        startTime: '',
        endTime: '',
        status: 'PENDING',
        desc: '',
        onCampus: '',
        instructions: '',
        expenses: '',
        outsideOrg: '',
      },
      requestID: null,
    }
  },
  methods: {
    storeFormData(formData) {
      this.formData = formData;
    },
    storeRequestID(requestID) {
      this.requestID = requestID;
    }
  }
}
</script>

<style>
.progress-bar {
  border: 1px solid #ccc;
  background-color: #4d1979;
  height: 20px;
  margin: 20px 0;
  position: relative;
}

.progress-bar-fill {
  background-color: white;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  transition: width 0.5s;
}

.progress-bar-fill.green {
  background-color: green;
}

.stage-names {
  display: flex;
  justify-content: space-between;
}

.stage-names div {
  width: 25%;
  text-align: center;
  cursor: pointer;
}

.stage-names div.active {
  font-weight: bold;
}

.button-row {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.stage-content {
  margin-top: 20px;
}
</style>
