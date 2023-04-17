<template>
    <div class="container">
      <div class="intro paragraph">
        Add TCU Spirit to your Event!
        <br>
        Request SuperFrog, TCU Cheerleaders, and Showgirls to your wedding, grad party, and more!
      </div>
      <div class="button-row">
        <router-link class="button" to="/pricing">Pricing</router-link>
        <router-link class="button" to="/range">Range</router-link>
        <router-link class="button" to="/request">Request</router-link>
        <router-link class="button" to="/modify-request">Modify a Request</router-link>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "MainView",
  };
  </script>
  
  <style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  
  .title {
    margin-top: 50px;
    font-size: 48px;
  }
  
  .button-row {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 50px;
  }
  
  .button {
    margin: 10px;
    padding: 10px 20px;
    border: none;
    background-color: white;
    color: black;
    font-size: 16px;
    cursor: pointer;
  }
  </style>