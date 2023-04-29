<!-- AIzaSyBs-7sheiPvy3j8RW4xihtxOIUUnsmB_Ec -->


<template>
  <div class="form-container">
    <form @submit.prevent="submitForm">
      <div class="form-group-header">Personal Information</div>
      <div class="form-group-row">
        <div class="form-group-column">
          <div class="form-group">
            <label for="reqFirstName">First Name*</label>
            <input type="text" id="reqFirstName" v-model="form.reqFirstName" required>
          </div>
          <div class="form-group">
            <label for="reqLastName">Last Name*</label>
            <input type="text" id="reqLastName" v-model="form.reqLastName" required>
          </div>
        </div>
        <div class="form-group-column">
          <div class="form-group">
            <label for="reqPhoneNumber">Phone Number*</label>
            <input type="tel" id="reqPhoneNumber" v-model="form.reqPhoneNumber" required>
          </div>
          <div class="form-group">
            <label for="reqEmail">Email*</label>
            <input type="email" id="reqEmail" v-model="form.reqEmail" required>
          </div>
        </div>
      </div>
      
      <div class="form-group-header">Event Information</div>
      <div class="form-group">
        <div class="form-group-column">
          <div class="form-group-row">
            <label for="eventDate">Event Date*</label>
            <input type="date" id="eventDate" v-model="form.eventDate" required>
          </div>
          <div class="form-group-row">
            <label for="appearanceType">Appearance Type*</label>
            <select id="appearanceType" v-model="form.appearanceType" required>
              <option value="PRIVATE">PRIVATE</option>
              <option value="TCU">TCU</option>
              <option value="NONPROFIT">NONPROFIT</option>
            </select>
          </div>
        </div>
        <div class="form-group-column">
          <div class="form-group-row">
            <label for="startTime">Start Time*</label>
            <input type="time" id="startTime" v-model="form.startTime" required>
          </div>
          <div class="form-group-row">
            <label for="endTime">End Time*</label>
            <input type="time" id="endTime" v-model="form.endTime" required>
          </div>
        </div>
      </div>

      <div class="form-group-column">
          <div class="form-group-row">
            <label for="title">Title*</label>
            <input type="text" id="title" v-model="form.title" required>
          </div>
          <div class="form-group-row">
            <label for="orgName">Organization Name</label>
            <input type="text" id="orgName" v-model="form.orgName">
        </div>
      </div>
      <div class="form-group">
          <label for="address">Address*</label>
          <input type="text" id="address" v-model="form.address" required>
          <span style="text-align: left">Apperances are only available within the DFW area. If more than 2 miles from TCU, a $0.75 per 
          mile transportation fee will be added in the total.</span> 
      </div>
      
      <div class="form-group">
      <div class="form-group-column">
        <div class="form-group-row">
          <label for="desc">Description*</label>
          <textarea id="desc" v-model="form.desc" required class="description-field"></textarea>
        </div>
        <div class="form-group-row">
          <label for="instructions">Instructions</label>
          <textarea id="instructions" v-model="form.instructions" class="description-field"></textarea>
        </div>
      </div>
    </div>

    <div class="form-group">
      <div class="form-group-column">
        <div class="form-group-row">
          <label for="expenses">Expenses</label>
          <textarea id="expenses" v-model="form.expenses" class="description-field"></textarea>
        </div>
        <div class="form-group-row">
          <label for="outsideOrg">Outside Organization</label>
          <textarea  id="outsideOrg" v-model="form.outsideOrg" class="description-field"> </textarea>
        </div>
      </div>
    </div>
        
      
      
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default { 
  name: "RequestDetails",
  data() {
    return {
      form: {
        reqFirstName: '',
        reqLastName: '',
        reqPhoneNumber: '',
        reqEmail: '',
        appearanceType: 'PRIVATE',
        title: '',
        orgName: 'none',
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
        outsideOrg: ''
      }
    }
  },
  methods: {
    submitForm() {
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
      if (this.form.mileage === '') {
        this.distanceCalculator();
      }
      axios.post('http://localhost:8080/api/v1/appearances', this.form)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    },
    submitForm() {
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
    },


    distanceCalculator() {
      const address = this.form.address;
      const destination = '2850 Stadium Drive; Fort Worth, Texas 76129';
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
    }
  }
}
</script>

<style>
.form-container {
  max-width: 500px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 1rem;
}

label {
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
  font-size: 1.2rem;
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
  height: 6rem; /* or any other desired height */
  border-radius: 5px;
  padding: 0.4rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  line-height: 1.2;
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