// -*- coding: utf-8 -*-
//index.ts
//----------------------------------
// Created By: Beto Estrada
// Created Date: 11/12/2023
// version 1.0
//----------------------------------
// """This file handles client operations
//  """ 
//----------------------------------
const cardTemplates = [
    `<div class="cards">
    <div class="Card">
      <h1>Model Metadata</h1>
      <div class="MetaForm" id="MetaForm">
        <form>
          <label>Model Name:</label><br>
            <input type="text" id="mName" name="mName" title="Name of the model itself (e.g. Test AI)" required>
            <small id="helperText" class="form-text text-muted">Enter model name</small><br>
          <label>Version:</label><br>
            <input type="text" id="mVersion" name="mVersion" title="Version of the model (e.g. 1.0.0)" required><br><br>
          <label>Author:</label><br>
            <input type="text" id="mAuthor" name="mAuthor" title="Name of the model creator (e.g. John Doe)" required><br><br>
          <label>Model File Name:</label><br>
            <input type="text" id="mFileName" name="mFileName" title="Name of the DSPEC file to be downloaded (e.g. Test_AI)" required><br><br>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>`,
    `<div class="Card" >
          <h1>Model time Specification</h1>
          <div class="TimingInfo" id="TimingInfo">
            <form>
              <label>Offset:</label><br>
                <input type="time" id="tOffset" name="tOffset" title="The offset  (e.g. Test_AI)" required><br><br>
              <label>Time Interval:</label><br>
                <input type="time" id="tInterval" name="tInterval" required><br><br>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>`,
    `<div class="Card">
    <h1>Output Specification</h1>
    <div class="OutputInfo" id="OutputInfo">
      <form>
        <label>Output Method:</label><br>
          <input type="text" id="oOutputMethod" name="oOutputMethod" required><br><br>
        <label>Lead Time:</label><br>
          <input type="time" id="oLeadTime" name="oLeadTime" required><br><br>
        <label for="series">Series:</label><br>
          <input type="series" id="oSeries" name="oSeries" title="Name of the output data series produced by the model (e.g. Air Temperature)" required><br><br>
        <label for="location">Location:</label><br>
          <select name="oSelectLocation" class="location">
            <!-- Options will be dynamically added here using TypeScript -->
          </select><br><br>
        <label>Interval:</label><br>
          <input type="time" id="oInterval" name="oInterval" required><br><br>
        <label for="datum">Datum:</label><br>
          <select name="oSelectDatum" class="datum">
            <!-- Options will be dynamically added here using TypeScript -->
          </select><br><br>
        <label for="units">Unit:</label><br>
          <select name="oSelectUnits" class="units">
            <!-- Options will be dynamically added here using TypeScript -->
          </select><br><br>
        <button type="submit">Submit</button>
      </form>
    </div>
  </div>`,
  `<div class="Card">
  <h1>Input Specification</h1>
  <div class="InputInfo" id="InputInfo">
    <form>
      <label>Display Name:</label><br>
        <input type="text" id="iName" name="iName" required><br><br>
      <label>Location:</label><br>
        <select name="iSelectLocation" class="location">
          <!-- Options will be dynamically added here using TypeScript -->
        </select><br><br>
      <label>Source:</label><br>
        <select name="iSelectSource" class="source">
          <!-- Options will be dynamically added here using TypeScript -->
        </select><br><br>
      <label>Series:</label><br>
        <select name="iSelectSeries" class="series">
          <!-- Options will be dynamically added here using TypeScript -->
        </select><br><br>
      <label>Unit:</label><br>
        <select name="iSelectUnits" class="units">
        <!-- Options will be dynamically added here using TypeScript -->
        </select><br><br>
      <label>Data Type:</label><br>
        <input type="text" id="iType" name="iType" required><br><br>
      <label>Interval:</label><br>
        <input type="text" id="iInterval" name="iInterval" required><br><br>
      <button type="submit">Submit</button>
    </form>
  </div>
</div>`
]
// //Onload function
// //  Pull backend data
// //  generate any more html elements
// //  start the page  

import { ServerComms } from './ServerComms';

let sc = new ServerComms('http://localhost:8000');

/**
 * Populates web form with variables from the DB
 */
async function populateForm(){
    const variables: string[] = ['source', 'series', 'location', 'units', 'datum'] // Better way to do this?

    for (const variable of variables) {
      const formElements = document.getElementsByClassName(variable) as HTMLSelectElement;
  
      let data: { displayName: string }[] = await sc.requestVariable(variable);
  
      for(let i = 0; i < formElements.length; i++){
        data.forEach((item: { displayName: string }) => {
          const option = document.createElement('option');
          option.value = item.displayName;
          option.text = item.displayName;
          formElements[i].appendChild(option);
        });
      }
    }
  }

document.addEventListener('DOMContentLoaded', init);


function init(){
  populateForm();

  appendNextCard(); // Appends the first card
}

function metaFormListener(this: HTMLElement, e: Event) {
  e.preventDefault();
  const data = new FormData(e.target as HTMLFormElement);
  console.log(data);
  appendNextCard();
}

function outputFormListener(this: HTMLElement, e: Event) {
  e.preventDefault();
  const data = new FormData(e.target as HTMLFormElement);
  console.log(data);
  appendNextCard();
}

const cards = document.getElementById('cards') as HTMLElement;
let STATE: string = 'INIT';
function appendNextCard(){
  if(STATE === 'INIT') {
    cards.insertAdjacentHTML('beforeend', cardTemplates[0]);
    const metaForm = document.getElementById("MetaForm")!;
    metaForm.addEventListener('submit', metaFormListener);
    STATE = 'META';
  }
  else if(STATE === 'META') {
    cards.insertAdjacentHTML('beforeend', cardTemplates[1]);
    STATE = 'TIME';
  }
  else if(STATE === 'TIME') {
    cards.insertAdjacentHTML('beforeend', cardTemplates[2]);
    const metaForm = document.getElementById("OutputInfo")!;
    metaForm.addEventListener('submit', outputFormListener);
    populateForm();
    STATE = 'OUTPUT';
  }
  else if(STATE === 'OUTPUT') {
    cards.insertAdjacentHTML('beforeend', cardTemplates[3]);
    populateForm();
  }
}