<template>
    <div class="form-container">
      <form ref="form" @submit.prevent>
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
          <div class="form-group-column">
            <div class="form-group-row">
              <label for="startTime">*Start Time</label>
              <input type="time" id="startTime" v-model="form.startTime" required>
            </div>
            <div class="form-group-row">
              <label for="endTime">*End Time</label>
              <input type="time" id="endTime" v-model="form.endTime" required>
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
              Apperances are only available within the DFW area. 
              If more than 2 miles from TCU, a $0.75 per mile transportation fee will be added in the total.
            </span> 
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
      
      <div class="button-row">
        <button type="button" @click="cancelRequest">Cancel Request</button>
        <button type="submit" @click="submitForm">Modify Request</button>
      </div>
  
    </div>
  </template>

<script>
    import axios from 'axios';
    export default {
        name: "EnterRequestID",
        props: {
            formData: {
                type: Object,
                required: true,
            },
            requestID: {
                type: Number,
                required: true,
            },
        },
        data() {
            return {
                form: Object.assign({}, this.formData),
                requestID: this.requestID,
            };
        },
        methods: {
          cancelRequest() {
            axios.post(`localhost:8080/api/v1/appearances/cancel/${this.requestID}`)
                .then(response => {
                    // Handle the response if necessary
                })
                .catch(error => {
                    console.error(error);
            });
          },

            async submitForm() {
                // Check for valid phone number
                const phoneRegex = /^[0-9]{10}$/;
                if (!phoneRegex.test(this.form.reqPhoneNumber)) {
                    alert('Please enter a valid phone number.');
                    return;
                }
                
                // Check for valid email address
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(this.form.reqEmail)) {
                    alert('Please enter a valid email address.');
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

                console.log(this.requestID);
                this.$router.push("/");
                const response = await fetch(`http://localhost:8080/api/v1/appearances/${this.requestID}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(this.form)
                });
                const data = await response.json();
                console.log(data);

                
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
                        const distance = R * c;

                        // Bind the distance value to "mileage" in the data json
                        this.form.mileage = distance * 0.621371;
                        console.log(this.form.mileage);
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
        },
    }
</script>

<style scoped>
.button-row button[type="button"] {
  background-color: red; /* red */
  font-weight: 650;
  color: #fff; /* white text */
}

.button-row button[type="submit"] {
  background-color: rgb(67, 217, 67); /* green */
  font-weight: 650;
  color: #fff; /* white text */
}
</style>


