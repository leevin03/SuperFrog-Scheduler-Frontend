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
      
      <div class="button-row">
        <button type="button" @click="cancelRequest">Cancel Request</button>
        <button type="submit" @click="submitForm">Modify Request</button>
      </div>
  
    </div>
  </template>

<script>
    import axios from 'axios';
    import 'sweetalert2/dist/sweetalert2.min.css';
    import swal from 'sweetalert2/dist/sweetalert2.js';
    import Swal from 'sweetalert2/dist/sweetalert2.js';

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
                message: {
                    message: 'Canceled by customer.',
                },
            };
        },
        methods: {
          cancelRequest() {
            Swal.fire({
                title: 'Processing',
                html: 'Please wait while your cancellation is being processed.',
                allowOutsideClick: false,
                showConfirmButton: false,
                allowEscapeKey: false,
                willOpen: () => {
                    Swal.showLoading();
                }
            });
            axios.post(`http://localhost:8080/api/v1/appearances/cancel/${this.requestID}`, this.message)
                .then(response => {
                    // Handle the response if necessary
                    // Close the SweetAlert popup
                        Swal.close();

                        // Display a Sweet Alert to the user to confirm the submission
                        Swal.fire({
                            icon: 'success',
                            title: 'Success!',
                            text: 'Your cancellation has been processed. You are being directed to the home page...',
                            showConfirmButton: false,
                            allowOutsideClick: false,
                            showConfirmButton: false,
                            allowEscapeKey: false,
                            timer: 5000
                        });

                        // Wait for 5 seconds before navigating to the home page
                        setTimeout(() => {
                            this.$router.push('/');
                        }, 5000);
                })
                .catch(error => {
                  Swal.close();
                  // Display an error message to the user using Sweet Alert
                  Swal.fire({
                      icon: 'error',
                      title: 'Oops...',
                      text: 'Something went wrong. Please try again later.',
                      showConfirmButton: true
                  });
                    console.error(error);
            });
          },

            async submitForm() {
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

                console.log(this.requestID);

                // Display a Sweet Alert to the user to indicate that the request is being processed
                Swal.fire({
                    title: 'Processing',
                    html: 'Please wait while your modification is being processed...',
                    allowOutsideClick: false,
                    showConfirmButton: false,
                    allowEscapeKey: false,
                    allowOutsideClick: false,
                    showConfirmButton: false,
                    allowEscapeKey: false,
                    willOpen: () => {
                        Swal.showLoading();
                    }
                });

                // Make the axios PUT request
                axios.put(`http://localhost:8080/api/v1/appearances/${this.requestID}`, this.form)
                    .then(response => {
                        // Close the SweetAlert popup
                        Swal.close();

                        // Display a Sweet Alert to the user to confirm the submission
                        Swal.fire({
                            icon: 'success',
                            title: 'Success!',
                            text: 'Your modification has been submitted. You are being directed to the home page.',
                            showConfirmButton: false,
                            timer: 5000
                        });

                        // Wait for 5 seconds before navigating to the home page
                        setTimeout(() => {
                            this.$router.push('/');
                        }, 5000);
                    })
                    .catch(error => {
                        console.error(error);
                        
                        // Close the SweetAlert popup
                        Swal.close();

                        if (error.response.status == 400){
                          Swal.fire({
                            icon: 'warning',
                            title: 'Missing fields',
                            text: 'Please make sure you have filled out all required fields.',
                            showConfirmButton: true
                          });
                        } else {
                          Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Server error. Please try again later.',
                            showConfirmButton: true
                          });
                        }
                    });

                // const response =  fetch(`http://localhost:8080/api/v1/appearances/${this.requestID}`, {
                // method: "PUT",
                // headers: {
                //     "Content-Type": "application/json"
                // },
                // body: JSON.stringify(this.form)
                // });
                // this.$router.push("/");
                // const data =  await response.json();
                // console.log(data);
                

                
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


