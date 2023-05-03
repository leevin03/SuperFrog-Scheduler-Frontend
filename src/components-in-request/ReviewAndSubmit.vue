<template>
  <div>

    <div class="table-container">
      <h2>Personal Contact Information</h2>
      <div>
        <table class="form-data-table">
          <tr>
            <td>Name</td>
            <td>{{ this.formData.reqFirstName + " " + this.formData.reqLastName}}</td>
          </tr>
          <tr>
            <td>Phone Number</td>
            <td>{{ this.formData.reqPhoneNumber}}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{{ this.formData.reqEmail}}</td>
        </tr>
        </table>
      </div>
    </div>
    
    <div class="table-container">
      <h2>Event Date, Time, and Location</h2>
      <div>
        <table class="form-data-table">
          <tr>
            <td>Date</td>
            <td>{{ this.formData.eventDate}}</td>
          </tr>
          <tr>
            <td>Start Time</td>
            <td>{{ this.formData.startTime}}</td>
          </tr>
          <tr>
            <td>End Time</td>
            <td>{{ this.formData.endTime}}</td>
          </tr>
          <tr>
            <td>Location</td>
            <td>{{ this.formData.address}}</td>
          </tr>
        </table>
      </div>
    </div>

    <div class="table-container">
      <h2>Event Details</h2>
      <div>
        <table class="form-data-table">
          <tr>
            <td>Event Name</td>
            <td>{{ this.formData.title}}</td>
          </tr>
          <tr>
            <td>Event Type</td>
            <td>{{ this.formData.appearanceType}}</td>
          </tr>
          <tr>
            <td>Event Description</td>
            <td>{{ this.formData.desc}}</td>
          </tr>
          <tr>
            <td>Organization</td>
            <td>{{ this.formData.orgName}}</td>
          </tr>
          <tr>
            <td>Outside Organizations</td>
            <td>{{ this.formData.outsideOrg}}</td>
          </tr>
          <tr>
            <td>Special Instruction</td>
            <td>{{ this.formData.instructions}}</td>
          </tr>
          <tr>
            <td>Expenses or benefits <br> to the spirit team members</td>
            <td>{{ this.formData.expenses}}</td>
          </tr>
        </table>
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
        <div v-for="(stage, index) in stages" :key="index" :class="{ active: index === currentStage }">
          {{ stage }}
        </div>
      </div>

      <div class="button-row">
        <button type="button" @click="previousStage">Back</button>
        <button type="button" @click="submitRequest" class="submit-button">Submit Request</button>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import 'sweetalert2/dist/sweetalert2.min.css';
  import Swal from 'sweetalert2/dist/sweetalert2.js';

  export default {
    name: 'ReviewAndSubmit',
    props: {
      formData: {
        type: Object,
        required: true,
      },
    },
    computed: {
      progressBarWidth() {
        const length =
          (0.5 / this.stages.length) * 100 +
          (this.currentStage / this.stages.length) * 100;
        if (this.currentStage == this.stages.length - 1) return '100%';
        return `${length}%`;
      },
    },
    data() {
      return {
        currentStage: 2,
        stages: ['Request Details', 'Policy Agreement', 'Review & Submit', 'Finish'],
      };
    },
    methods: {
      previousStage() {
        this.currentStage--;
        this.$router.push('/request/' + this.stages[this.currentStage].replace(/ /g, '').replace(/&/g, 'And'));
      },
      // submitRequest() {
      //   const app = document.getElementById('app');
      //   app.classList.add('blur');
      //   // Show the processing message
      //   Swal.fire({
      //     title: 'Processing request...',
      //     allowOutsideClick: false,
      //     allowEscapeKey: false,
      //     showConfirmButton: false,
      //   });

      //   // Make the API request
      //   axios
      //     .post('http://localhost:8080/api/v1/appearances', this.formData)
      //     .then(response => {
      //       console.log(response);
      //       // Close the popup
      //       Swal.close();

      //       // Emit the requestID event
      //       this.$emit('requestID', response.data.data.requestId);

      //       // Remove the blur
      //       app.classList.remove('blur');

      //       // Navigate to the next stage
      //       this.currentStage++;
      //       this.$router.push('/request/' + this.stages[this.currentStage].replace(/ /g, '').replace(/&/g, 'And'));
      //     })
      //     .catch(error => {
      //       console.log(error);
      //       // Close the popup
      //       Swal.close();
      //     });
      // },

      submitRequest() {
        const app = document.getElementById('app');
        app.classList.add('blur');
        // Show the processing message
        Swal.fire({
            title: 'Processing',
            html: 'Please wait while your request is being processed.',
            allowOutsideClick: false,
            showConfirmButton: false,
            allowEscapeKey: false,
            willOpen: () => {
                Swal.showLoading();
            }
        });

        // Make the API request
        axios
          .post('http://localhost:8080/api/v1/appearances', this.formData)
          .then(response => {
            console.log(response);
            // Close the popup
            Swal.close();

            // Emit the requestID event
            this.$emit('requestID', response.data.data.requestId);

            // Remove the blur
            app.classList.remove('blur');

            Swal.fire({
                icon: 'success',
                title: 'Success!',
                showConfirmButton: false,
                allowOutsideClick: false,
                showConfirmButton: false,
                allowEscapeKey: false,
                timer: 1500
            });

            // Navigate to the next stage
            setTimeout(() => {
              this.currentStage++;
              this.$router.push('/request/' + this.stages[this.currentStage].replace(/ /g, '').replace(/&/g, 'And'));
            }, 1500);
          })
          .catch(error => {
            console.log(error);
            // Close the popup
            Swal.close();

            // Display error message to user
            Swal.fire({
              title: 'Error!',
              text: 'Our server is experiencing some issues, please try again later.',
              icon: 'error',
              confirmButtonText: 'Ok'
            });
          });
      },

    },
    mounted() {
      const app = document.getElementById('app');
      if (window.CSS && CSS.supports('backdrop-filter', 'blur(10px)')) {
        app.classList.remove('no-backdrop-filter');
      }
    },
  };
</script>


<style scoped>

  .table-container{
    margin-bottom: 30px;
    /* max-width: 900px; */
  }

  .form-data-table {
    background-color: white;
    color: black;
  }

  .form-data-table {
    border-collapse: collapse;
    width: 100%;
    margin: auto;
  }

  .form-data-table th,
  .form-data-table td {
    padding: 10px;
    text-align: left;
    border: 1px solid #ddd;
  }

  .form-data-table td:first-child {
    white-space: nowrap;
    width: 1%;
    justify-content: center;
    text-align: center;
  }

  .form-data-table th {
    background-color: #4d1979;
    color: white;
  }

  .form-data-table tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  .form-data-table tr:hover {
    background-color: #ddd;
  }


  .swal2-container {
    font-family: Arial, sans-serif;
    font-size: 14px;
  }

  .swal2-title {
    color: #333;
    font-size: 18px;
    font-weight: bold;
  }

  .swal2-loading {
    border-color: #007bff;
  }

  .swal2-icon {
    font-size: 40px;
  }

  .swal2-icon.swal2-warning {
    color: #ffc107;
  }

  .swal2-icon.swal2-error {
    color: #dc3545;
  }

  .blur {
    filter: blur(8px) brightness(0.75);
    pointer-events: none;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 999;
  }

  .progress-bar-and-button {
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

  .button-row {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
  }

  .button-row button {
    padding: 10px;
    border: none;
    border-radius: 4px;
    font-weight: bold;
    cursor: pointer;
  }

  /* .button-row button[type='reset'] {
    background-color: #f44336;
    color: white;
  } */

  .submit-button {
    background-color: #4caf50;
    color: white;
  }
</style>

