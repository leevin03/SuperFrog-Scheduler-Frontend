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
      
      <div class="form-group">
        <button type="submit" class="submit-button" style="background-color: red;" @click="submitForm">
            Submit Modification
            <br>
            And Return to Home Page
        </button>
     </div>

  
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
            async submitForm() {
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
            
        },

    }
</script>

