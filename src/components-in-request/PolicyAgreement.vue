<template>
  <div class="policy-container">
    <h2>TCU Spirit Team Terms and Conditions</h2>
    <!-- create and unordered list -->
    <ul>
      <li>Submission of a request does not guarantee the event will be accepted.</li>
      <li>TCU Atheletics takes priority over all other appearances.</li>
      <li>TCU Spirit has until 5 days prior the date of the event to accept or decline a request.</li>
      <li>
        Once approved via email, payment must be submitted a minimum of 24 hours prior to the
        event or it will be canceled.
      </li>
      <li>
        Even after an event is confirmed, it is still subjected to immediate cancellation due to a
        TCU Athletic Department function, weather, or an emergency. Immediate notice will be given
        in the event of a cancellation.
      </li>
      <li>The SuperFrog suit is NOT rented out to a third party.</li>
    </ul>

    <div class="checkbox-container">
      <label class="checkbox-label">
        <input type="checkbox" v-model="agreedToTerms" />
        <span class="checkbox-text">I agree to the terms & conditions of a TCU Spirit Appearance.</span>
      </label>
    </div>

    <div class="progress-bar-and-button">
      <div class="progress-bar">
        <div class="progress-bar-fill"
             :style="{ width: progressBarWidth, backgroundColor: currentStage === stages.length - 1 ? 'green' : 'white' }"></div>
      </div>

      <div class="stage-names">
        <div v-for="(stage, index) in stages" :key="index" :class="{ active: index === currentStage }">
          {{ stage }}
        </div>
      </div>

      <div class="button-row">
        <button type="button" @click="previousStage">Back</button>
        <button type="button" @click="nextStage" :disabled="!agreedToTerms">Continue</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "PolicyAgreement",
    computed: {
      progressBarWidth() {
        const length = (0.5 / (this.stages.length)) * 100 + (((this.currentStage / (this.stages.length))) * 100);
        if (this.currentStage == this.stages.length - 1)
          return '100%';
        return `${length}%`;
      }
    },
    data() {
      return {
        currentStage: 1,
        stages: ["Request Details", "Policy Agreement", "Review & Submit", "Finish"],
        agreedToTerms: false
      }
    },
    methods: {
      nextStage() {
          this.currentStage++;
          this.$router.push("/request/" + this.stages[this.currentStage].replace(/ /g, '').replace(/&/g, 'And'));
      },
      previousStage() {
        this.currentStage--;
        this.$router.push("/request/" + this.stages[this.currentStage].replace(/ /g, '').replace(/&/g, 'And'));
      }
    }
  }
</script>


<style scoped>
.progress-bar-and-button{
  margin-top: 75px;
}

.progress-bar {
  border: 1px solid #ccc;
  background-color: #4d1979;
  height: 20px;
  margin-top: 100px;
  position: relative;
}

.progress-bar-fill {
  width: 12.5%;
  background-color: white;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  transition: width 0.5s;
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

.policy-container {
  max-width: 700px;
  margin: 0 auto;
}

h2 {
  font-size: 2rem;
  font-weight: 400;
  /* text-align: center; */
}

ul {
  list-style-position: inside;
  margin-left: 0;
  padding-left: 0;
}

li {
  font-size: 1.2rem;
  text-align: left;
}


.checkbox-container label {
  font-size: 1.2rem;
  margin-left: 10px;
}

input[type="checkbox"] {
  height: 1.5em;
  width: 1.5em;
}

</style>
