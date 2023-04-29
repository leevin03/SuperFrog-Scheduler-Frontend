<template>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Texas Christian University On Campus</th>
            <th>Public Schools or Non-Profit</th>
            <th>Private or Residential</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>SuperFrog</td>
            <td class="price-td">$100</td>
            <td class="price-td">$100</td>
            <td class="price-td">$175</td>
          </tr>
          <tr>
            <td>Small Group of 2-3 Spirit Squad Members</td>
            <td class="price-td">$100</td>
            <td class="price-td">$100</td>
            <td class="price-td">$175</td>
          </tr>
          <tr>
            <td>Large Group of 4-6 Spirit Squad Members</td>
            <td class="price-td">$150</td>
            <td class="price-td">$150</td>
            <td class="price-td">$200</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    name: "PriceTable",
  };
  </script>
  
  <style>
  table {
    border-collapse: collapse;
    width: 100%;
    margin: 20px 0;
  }
  
  th {
    text-align: center;
    font-weight: bold;
    background-color: #4d1979;
    /* color: #fff; */
    padding: 10px;
  }
  
  th:first-child {
    text-align: left;
  }
  
  td {
    text-align: center;
    padding: 10px;
  }
  
  tr:nth-child(even) {
    background-color: #4d1979;
  }
  
  .price-td {
    background-color: #9c739c;
    color: #fff;
  }
  
  .price-td + .price-td {
    background-color: #9c739c;
  }
  
  .price-td + .price-td + .price-td {
    background-color: #9c739c;
  }
  
  .table-container {
    border-radius: 7px;
    overflow: hidden;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.7);
  }
  </style>
  
