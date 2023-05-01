<template>
  <div>
    <p><b>Please enter the ID of the request you would like to modify or cancel:</b></p>
    <input type="text" v-model="requestID" @keyup.enter="submitRequestID" />
    <p v-if="error" style="color: red;">{{ error }}</p>
    <button style="background-color: white; color: black; font-weight: bold; padding: 10px; margin-top: 20px;"
            :class="{ disabled: !requestID }"
            :style="{ opacity: requestID ? 1 : 0.5 }"
            @click="submitRequestID">Continue</button>
  </div>
</template>

<style>
.disabled {
  cursor: not-allowed;
}
</style>

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
        this.error = "No request found with that ID. Please make sure you entered the right ID.";
      }
    },
    async submitRequestID() {
      if (!this.requestID) {
        return;
      }
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
