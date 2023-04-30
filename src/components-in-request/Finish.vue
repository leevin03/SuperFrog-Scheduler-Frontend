<template>
  <div> 
      <h2 style="font-size: 2.5rem;">Thank you!</h2>
      <span style="font-size: 1.2rem;">
        Your request has been submitted. 
        <br>
        An confirmation email has been sent to
        <br>
         {{ this.formData.reqEmail }}.
        <br>
        <h3>Please note this request ID for future reference or modification:</h3>
        <br>
      </span>
      <div class="circle">
        <h2 style="font-size: 3rem; margin: 0;">{{ requestID }}</h2>
      </div>
  </div> 


  <div class="progress-bar-and-button">
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
        {{ stage }}
      </div>
    </div>

    <button style="margin-top: 20px;" type="button" @click="returnToMainPage">Return to main page</button>

</div>


</template>

<script>
  export default {
    name: "Finish",
    props: {
      requestID: {
        type: Number,
        required: true
      },
      formData: {
        type: Object,
        required: true,
      },
    },
    computed: {
      progressBarWidth() {
        const length = (0.5 / (this.stages.length)) * 100 + (((this.currentStage / (this.stages.length))) * 100);
        if (this.currentStage ==  this.stages.length - 1) 
          return '100%';
        return `${length}%`;
      }
    },
    data() {
      return {
        currentStage: 3,
        stages: ["Request Details", "Policy Agreement", "Review & Submit", "Finish"],
      }
    },
    methods:{
      returnToMainPage() {
        this.$router.push("/")
      },
      created(){
        console.log(this.requestID)
      }
    },
  }
</script>


<style>
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

/* make the element inside the button-row class appear in the center */
.button-row {
display: flex;
justify-content: center;
}

.stage-content {
margin-top: 20px;
}

.circle {
        display: inline-block;
        border-radius: 100%;
        background-color: #2f0958;
        box-shadow: 0px 0px 10px 5px #2f0958;
        padding: 4px;
    }



</style>