<template>
    <div>
      <router-view :key="currentStage"></router-view>
      <div class="progress-bar">
        <div
          class="progress-bar-fill"
          :style="{ width: progressBarWidth, backgroundColor: currentStage === stages.length - 1 ? 'green' : 'white' }"
        ></div>
      </div>
      <div class="stage-names">
        <div
          v-for="(stage, index) in stages"
          :key="index"
          :class="{ active: index === currentStage }"
        >
          <!-- @click="goToStage(index)" -->
          {{ stage }}
        </div>
      </div>
      <div class="button-row">
        <button v-if="currentStage > 0 && currentStage < stages.length - 1" @click="previousStage">Back</button>
        <!-- <router-link class="button" to="/">Return to main page</router-link> -->
        <button v-if="currentStage < stages.length - 1"  @click="nextStage">{{ currentStage === stages.length - 2 ? 'Submit' : 'Continue' }}</button>
      </div>
    </div>
  </template>
  
  <script>
  import SelectDateAndTime from '@/components-in-request/SelectDateAndTime.vue'
  import CompleteForm from '@/components-in-request/CompleteForm.vue'
  import PolicyAgreement from '@/components-in-request/PolicyAgreement.vue'
  import ReviewAndSubmit from '@/components-in-request/ReviewAndSubmit.vue'
  import Finish from '@/components-in-request/Finish.vue'
    
  export default {
    components: {
        SelectDateAndTime,
        CompleteForm,
        PolicyAgreement,
        ReviewAndSubmit,
        Finish
    },
    data() {
      return {
        currentStage: 0,
        stages: ["Select Date & Time", "Complete Form", "Policy Agreement", "Review & Submit", "Finish"]
      }
    },
    computed: {
      progressBarWidth() {
        return `${(this.currentStage / (this.stages.length - 1)) * 100}%`
      }
    },
    methods: {
      nextStage() {
        if (this.currentStage < this.stages.length - 1) {
            this.currentStage++
            this.$router.push( "/request/" + this.stages[this.currentStage].replace(/ /g,'').replace(/&/g, 'And') )
        }
      },
      previousStage() {
        if (this.currentStage > 0) {
            this.currentStage--
            this.$router.push("/request/" + this.stages[this.currentStage].replace(/ /g,'').replace(/&/g, 'And') )
        }
      },
      // goToStage(index) {
      //   this.currentStage = index
      // }
    }
  }
  </script>
  
  <style>
  .progress-bar {
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
    width: 20%;
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
  