<template>
  <div>
    <router-view :form-data="formData" @requestData="requestData" :request-ID="requestID" @requestID="storeRequestID"></router-view>
  </div>
</template>

<script>
import EnterRequestID from '@/components-in-modify/EnterRequestID.vue'
import EditRequest from '@/components-in-modify/EditRequest.vue'

export default {
  components: {
    EnterRequestID,
    EditRequest,
  },
  data() {
    return {
      formData: null,
      requestID: null,
    }
  },
  methods: {
    requestData(requestData) {
      this.formData = requestData;
    },
    storeRequestID(requestID) {
      this.requestID = requestID;
    }
  }
}
</script>

<style>

</style>
