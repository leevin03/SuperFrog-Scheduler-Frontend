<!-- AIzaSyBs-7sheiPvy3j8RW4xihtxOIUUnsmB_Ec -->


<template>
  <div class="form-container">
    <form ref="form" @submit.prevent="submitForm">
      <div class="form-group-header">Personal Contact Information</div>
      <div class="form-group-row">
        <div class="form-group-column">
          <div class="form-group">
            <label for="reqFirstName">*Contact First Name</label>
            <input type="text" id="reqFirstName" v-model="form.reqFirstName" required>
          </div>
          <div class="form-group">
            <label for="reqLastName">*Contact Last Name</label>
            <input type="text" id="reqLastName" v-model="form.reqLastName" required>
          </div>
        </div>
        <div class="form-group-column">
          <div class="form-group">
            <label for="reqPhoneNumber">*Phone Number</label>
            <input type="tel" id="reqPhoneNumber" v-model="form.reqPhoneNumber" required>
          </div>
          <div class="form-group">
            <label for="reqEmail">*Email</label>
            <input type="email" id="reqEmail" v-model="form.reqEmail" required>
          </div>
        </div>
      </div>
      
      <div class="form-group-header">Event Information</div>
      <div class="form-group">
        <div class="form-group-column">
          <div class="form-group-row">
            <label for="eventDate">*Event Date</label>
            <input type="date" id="eventDate" v-model="form.eventDate" required>
          </div>
          <div class="form-group-row">
            <label for="appearanceType">*Event Type</label>
            <select id="appearanceType" v-model="form.appearanceType" required>
              <option value="TCU">TCU</option>
              <option value="NONPROFIT">Public School/Non-Profit</option>
              <option value="PRIVATE">Private/Residential</option>
            </select>
          </div>
        </div>
        <!-- <div class="form-group-column">
          <div class="form-group-row">
            <label for="startTime">*Start Time</label>
            <input type="time" id="startTime" v-model="form.startTime" required step="1800" min="09:00" max="21:00">
          </div>
          <div class="form-group-row">
            <label for="endTime">*End Time</label>
            <input type="time" id="endTime" v-model="form.endTime" required step="1800" min="09:00" max="21:00">
          </div>
        </div> -->
        <div class="form-group-column">
          <div class="form-group-row">
            <label for="startTime">*Start Time</label>
            <select id="startTime" v-model="form.startTime" required>
              <option v-for="option in timeOptions" :value="option.value">{{ option.display }}</option>
            </select>
          </div>
          <div class="form-group-row">
            <label for="endTime">*End Time</label>
            <select id="endTime" v-model="form.endTime" required>
              <option v-for="option in timeOptions" :value="option.value">{{ option.display }}</option>
            </select>
          </div>
        </div>
      </div>

      <div class="form-group-column">
          <div class="form-group-row">
            <label for="title">*Event Title</label>
            <input type="text" id="title" v-model="form.title" required>
          </div>
          <div class="form-group-row">
            <label for="orgName">Name of Organization</label>
            <input type="text" id="orgName" v-model="form.orgName">
        </div>
      </div>

      <div class="form-group">
        <label for="address">*Address of Appearance</label>
        <input type="text" id="address" v-model="form.address" required>
        <span style="text-align: left; font-size: 0.85rem" >
          Appearances are only available within the DFW area. 
          If more than 2 miles from TCU, a $0.75 per mile transportation fee will be added in the total.
        </span> 
        <button @click.prevent="validateLocation" class="validate-location-button">Validate Location</button>
      </div>
      
      <div class="form-group">
      <div class="form-group-column">
        <div class="form-group-row">
          <label for="desc">*Event Description</label>
          <textarea id="desc" v-model="form.desc" required class="description-field"></textarea>
        </div>
        <div class="form-group-row">
          <label for="instructions">Special Instructions</label>
          <textarea id="instructions" v-model="form.instructions" class="description-field" 
            placeholder="(Parking, gate code, location for spirit members to change/ keep belongings)"></textarea>
        </div>
      </div>
    </div>

    <div class="form-group">
      <div class="form-group-column">
        <div class="form-group-row">
          <label for="outsideOrg">Outside Organization</label>
          <textarea  id="outsideOrg" v-model="form.outsideOrg" class="description-field" 
            placeholder="List any other outside organizations involved in sponsoring the event"></textarea>
        </div>
        <div class="form-group-row">
          <label for="expenses">Extra Information</label>
          <textarea id="expenses" v-model="form.expenses" class="description-field" 
            placeholder="Describe any expenses or benefits to the spirit team members"></textarea>
        </div>
      </div>
    </div>  
    </form>

    <div class="progress-bar-and-button">
      <div class="progress-bar">
        <div
          class="progress-bar-fill"
          :style="{ width: progressBarWidth, backgroundColor: currentStage === stages.length - 1 ? 'green' : 'white' }"
        ></div>
      </div>

      <div class="stage-names">
        <div v-for="(stage, index) in stages" :key="index" :class="{ active: index === currentStage }">
          {{ stage }}
        </div>
      </div>

      <div class="button-row">
        <button type="reset" @click="clearInput">Reset</button>
        <button type="button" @click="nextStage" :disabled="isContinueDisabled">Continue</button>
      </div>
  </div>

  </div>
</template>

<script>
  import axios from 'axios';
  import 'sweetalert2/dist/sweetalert2.min.css';
  import swal from 'sweetalert2/dist/sweetalert2.js';


export default {
  name: "RequestDetails",
  props: {
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
    },
    // isContinueDisabled() { // new computed property
    //   return !this.locationValidated;
    // },
    // isContinueDisabled() {
    //   return new Date(`1970-01-01T${this.form.endTime}`) <= new Date(`1970-01-01T${this.form.startTime}`);
    // },
  },
  data() {
    return {
      currentStage: 0,
      stages: ["Request Details", "Policy Agreement", "Review & Submit", "Finish"],
      form: Object.assign({}, this.formData),
      timeOptions: [],
      locationValidated: false,
      timeValidated: false,
      previousStartTime: '',
      previousEndTime: '',
    }
  },
  mounted() {
    this.populateTimeOptions();
  },
  updated() {
    if (this.form.startTime !== this.previousStartTime || this.form.endTime !== this.previousEndTime) {
      this.populateTimeOptions();
      this.previousStartTime = this.form.startTime;
      this.previousEndTime = this.form.endTime;
    }
  },
  watch: {
    form: {
      handler(newValue) {
        this.previousStartTime = newValue.startTime;
        this.previousEndTime = newValue.endTime;
      },
      immediate: true,
      deep: true
    }
  },
  created() {
    this.previousStartTime = this.form.startTime;
    this.previousEndTime = this.form.endTime;
  },
  
  methods: {
    populateTimeOptions() {
      this.timeOptions = [];
      let start = new Date('1970-01-01T09:00:00');
      let end = new Date('1970-01-01T21:00:00');
      let current = new Date(start);

      while (current < end) {
        let time = current.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        let value = current.toISOString().substr(11, 8);
        this.timeOptions.push({ display: time, value: value });
        current.setMinutes(current.getMinutes() + 30);
      }
    },
    nextStage() {
      if (!this.locationValidated) {
        new swal({
          title: "Location not validated",
          text: "Please validate your location before continuing.",
          icon: "warning",
          button: "OK",
        });
        return;
      }

      if (new Date(`1970-01-01T${this.form.endTime}`) <= new Date(`1970-01-01T${this.form.startTime}`)) {
        new swal({
          title: "Invalid time",
          text: "End time must be after start time.",
          icon: "warning",
          button: "OK",
        });
        return;
      }

      // Check for valid phone number
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(this.form.reqPhoneNumber)) {
        new swal({
          title: "Invalid phone number",
          text: "Please enter a valid phone number.",
          icon: "warning",
          button: "OK",
        });
        return;
      }

      // Check for valid email address
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.form.reqEmail)) {
        new swal({
          title: "Invalid email address",
          text: "Please enter a valid email address.",
          icon: "warning",
          button: "OK",
        });
        return;
      }


      //calculate mileage from input address
      this.distanceCalculator();

      //fill in empty fill to conform with backend API
      if (this.form.mileage <= 2.0) {
        this.form.onCampus = true;
      } else {
        this.form.onCampus = false;
      }
      if (this.form.instructions === '') {
        this.form.instructions = 'none';
      }
      if (this.form.expenses === '') {
        this.form.expenses = 'none';
      }
      if (this.form.outsideOrg === '') {
        this.form.outsideOrg = 'none';
      }
      if (this.form.orgName === '') {
        this.form.orgName = 'none';
      }

      // Continue to next stage
      if (this.$refs.form.checkValidity()) {
        this.$emit('form-data', this.form);
        this.currentStage++;
        this.$router.push( "/request/" + this.stages[this.currentStage].replace(/ /g,'').replace(/&/g, 'And') );
      } else {
        this.$refs.form.reportValidity();
      }
    },

    distanceCalculator() {
      const address = this.form.address;
      const destination = '2850 Stadium Drive, Fort Worth, Texas 76129';
      const apiKey = 'AIzaSyBs-7sheiPvy3j8RW4xihtxOIUUnsmB_Ec'; // Replace with your own API key

      // Get the latitude and longitude of the input address
      axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`)
        .then(response => {
          const originLat = response.data.results[0].geometry.location.lat;
          const originLng = response.data.results[0].geometry.location.lng;

          // Get the latitude and longitude of the destination address
          axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${destination}&key=${apiKey}`)
            .then(response => {
              const destLat = response.data.results[0].geometry.location.lat;
              const destLng = response.data.results[0].geometry.location.lng;

              // Calculate the distance using the Haversine formula
              const R = 6371; // Earth's radius in km
              const dLat = (destLat - originLat) * Math.PI / 180;
              const dLon = (destLng - originLng) * Math.PI / 180;
              const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                        Math.cos(originLat * Math.PI / 180) * Math.cos(destLat * Math.PI / 180) *
                        Math.sin(dLon/2) * Math.sin(dLon/2);
              const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
              let distance = R * c;

              // Bind the distance value to "mileage" in the data json
              distance = distance * 0.621371;

              this.form.mileage = distance;
              // console.log(this.form.mileage);
              // console.log(this.form);
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log(error);
        });
    },

    validateLocation() {
      const address = this.form.address;
      const destination = '2850 Stadium Drive, Fort Worth, Texas 76129';
      const apiKey = 'AIzaSyBs-7sheiPvy3j8RW4xihtxOIUUnsmB_Ec'; // Replace with your own API key

      // Get the latitude and longitude of the input address
      axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`)
        .then(response => {
          const originLat = response.data.results[0].geometry.location.lat;
          const originLng = response.data.results[0].geometry.location.lng;

          // Get the latitude and longitude of the destination address
          axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${destination}&key=${apiKey}`)
            .then(response => {
              const destLat = response.data.results[0].geometry.location.lat;
              const destLng = response.data.results[0].geometry.location.lng;

              // Calculate the distance using the Haversine formula
              const R = 6371; // Earth's radius in km
              const dLat = (destLat - originLat) * Math.PI / 180;
              const dLon = (destLng - originLng) * Math.PI / 180;
              const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                        Math.cos(originLat * Math.PI / 180) * Math.cos(destLat * Math.PI / 180) *
                        Math.sin(dLon/2) * Math.sin(dLon/2);
              const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
              let distance = R * c;

              // Bind the distance value to "mileage" in the data json
              distance = distance * 0.621371;

              if (distance > 100) {
                swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Unfortunately, TCU only does events within 100 miles of campus.',
                });
                this.form.address = '';
                return;
              } else {
                swal.fire('Congrats!', 'Your address passed validation.', 'success');
                this.locationValidated = true;
                this.form.mileage = distance;
              }
              // this.form.mileage = distance;
              // console.log(this.form.mileage);
              // console.log(this.form);
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          swal.fire({
            icon: 'warning',
            title: 'Failed to validate location.',
            text: "Please make sure you have entered a valid existing address.",
          });
          console.log(error);
        });
    },
 


    submitForm() {
      // do nothing here
    },
    clearInput(){
      this.form = {
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
      }
    },
  }
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

.button-row {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.stage-content {
  margin-top: 20px;
}

.form-container {
  max-width: 500px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  font-size: 1.1rem;
  display: block;
  margin-bottom: 0.5rem;
}

input[type="text"],
input[type="email"],
input[type="tel"],
input[type="number"],
select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  line-height: 1.5;
}

button[type="submit"] {
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
}

button[type="submit"]:hover {
  background-color: #0069d9;
}

.form-group-column {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.form-group-row {
  display: flex;
  flex-direction: column;
  margin-right: 1rem;
}

.form-group-row label {
  margin-bottom: 0.5rem;
}

.form-group-row input,
.form-group-row select {
  margin-bottom: 1rem;
}

input[type="date"],
input[type="time"],
select {
  width: calc(50% - rem);
  padding: 0.4rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  line-height: 1.2;
}

.form-group-header {
  font-size: 1.8rem;
  font-weight: bold;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
}




.form-group-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.description-field {
  height: 6rem; 
  border-radius: 5px;
  padding: 0.4rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  line-height: 1.2;
  resize: none;
}




@media (max-width: 768px) {
  .form-group-column {
  display: flex;
  flex-direction: column;
  flex-basis: 45%;
}

.form-group {
  flex-basis: 100%;
  margin-bottom: 1rem;
}

.form-group-header {
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
}

  .form-group-row {
    flex-direction: column;
  }
  
  .form-group-column {
    flex-basis: 100%;
  }
  
  .form-group-header {
    margin-top: 2rem;
  }

  
}


</style>