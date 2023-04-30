<template>
    <div>
      <p>
        ***Note that this page is for modification only. You must contact the SuperFrog Scheduler team to cancel your request.***
      </p>
      <p>Please enter the ID of the request you would like to modify and hit enter to continue:</p>
      <input type="text" v-model="requestID" @keyup.enter="submitRequestID" />
      <p v-if="error" style="color: red;">{{ error }}</p>
    </div>
  </template>


<script>
export default {
  name: "EnterRequestID",
  props: {
    formData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      requestID: null,
      error: null,
    };
  },
  methods: {
    async getRequestData(id) {
      try {
        const response = await fetch(`http://localhost:8080/api/v1/appearances/${id}`);
        if (!response.ok) {
          throw new Error("Unable to retrieve request data");
        }
        const responseData = await response.json();
        return responseData.data;
      } catch (error) {
        console.error(error);
        this.error = "Error retrieving request data";
      }
    },
    async submitRequestID() {
      const requestData = await this.getRequestData(this.requestID);
      if (requestData) {
        this.$emit("requestData", requestData);
        this.$emit("requestID", this.requestID);
        this.$router.push("/modify-request/EditRequest");
      }
    },
  },
};
</script>
