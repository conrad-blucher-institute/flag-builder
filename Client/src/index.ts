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

import { DSPEC } from "./DSPEC"

const cardTemplates = [
  `<div class="cards">
    <div class="Card">
      <h1>Model Metadata</h1>
      <div class="MetaForm" id="MetaForm">
        <form>
          <label>Model Name:</label><br>
            <input type="text" id="mName" name="mName" title="Name of the model itself (e.g. Test AI)" required>
            <small id="helperText">Name of the model itself (e.g. Test AI)</small><br>

          <label>Model Version:</label><br>
            <input type="text" id="mVersion" name="mVersion" title="Version of the model (e.g. 1.0.0)" required>
            <small id="helperText">Version of the model (e.g. 1.0.0)</small><br>

          <label>Author:</label><br>
            <input type="text" id="mAuthor" name="mAuthor" title="Name of the model creator (e.g. John Doe)" required>
            <small id="helperText">Name of the model creator (e.g. John Doe)</small><br>

          <label>Model File Name:</label><br>
            <input type="text" id="mFileName" name="mFileName" title="Name of the DSPEC file to be downloaded (e.g. Test_AI)" required>
            <small id="helperText">Name of the DSPEC file to be downloaded (e.g. Test_AI)</small><br>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>`,
    `<div class="Card" >
          <h1>Model time Specification</h1>
          <div class="TimingInfo" id="TimingInfo">
            <form>
              <label>Offset:</label><br>
                <input type="text" pattern="^([1-7]?[0-9]|168):[0-5][0-9]:[0-5][0-9]$" placeholder="00:00:00" id="tOffset" name="tOffset" title="Time after the hour that the model should wait to run.HH:MM:SS (e.g. 0:10:00 (10min))" required>
                <small id="helperText">Time after the hour that the model should wait to run. HH:MM:SS (e.g. 00:10:00 (10min))</small><br>

              <label>Time Interval:</label><br>
                <input type="text" pattern="^([1-7]?[0-9]|168):[0-5][0-9]:[0-5][0-9]$" placeholder="00:00:00" id="tInterval" name="tInterval" title="Time between each model prediction. HH:MM:SS (e.g. 01:00:00 (1hr))" required>
                <small id="helperText">Time between each model prediction. HH:MM:SS (e.g. 01:00:00 (1hr))</small><br>

              <button type="submit">Submit</button>
            </form>
          </div>
        </div>`,
    `<div class="Card">
    <h1>Output Specification</h1>
    <div class="OutputInfo" id="OutputInfo">
      <form>
        <label>Output Method:</label><br>
          <input type="text" id="oOutputMethod" name="oOutputMethod" title="Method for unpacking the model predictions (e.g. one_packed_float)" required>
          <small id="helperText">Method for unpacking the model predictions (e.g. one_packed_float)</small><br>

        <label>Lead Time:</label><br>
          <input type="time" id="oLeadTime" name="oLeadTime" title="Span of time between model runtime and time the prediction is computed for (e.g. 12:00 (12hr))" required>
          <small id="helperText">Span of time between model runtime and time the prediction is computed for (e.g. 12:00 (12hr))</small><br>

        <label for="series">Series:</label><br>
          <input type="series" id="oSeries" name="oSeries" title="Name of the output data series produced by the model (e.g. Air Temperature)" required>
          <small id="helperText">Name of the output data series produced by the model (e.g. Air Temperature)</small><br>

        <label for="location">Location:</label><br>
          <select name="oSelectLocation" class="location" title="Name of the location that the model is making predictions for (e.g. South Bird Island)" required>
            <!-- Options will be dynamically added here using TypeScript -->
          </select>
          <small id="helperText">Name of the location that the model is making predictions for (e.g. South Bird Island)</small><br>

        <label>Interval:</label><br>
          <input type="time" id="oInterval" name="oInterval" title="Time between each model prediction (e.g. 0:06 (6min), 1:00 (1hr), 3:00 (3hr))" required>
          <small id="helperText">Time between each model prediction (e.g. 0:06 (6min), 1:00 (1hr), 3:00 (3hr))</small><br>

        <label for="units">Unit:</label><br>
          <select name="oSelectUnits" class="units" title="Units of measurement for the output data (e.g. meter)" required>
            <!-- Options will be dynamically added here using TypeScript -->
          </select>
          <small id="helperText">Units of measurement for the output data (e.g. meter)</small><br>

        <label for="datum">Datum (optional):</label><br>
          <select name="oSelectDatum" class="datum" title="Vertical datum of the data (e.g. Mean Sea Level (MSL))">
            <!-- Options will be dynamically added here using TypeScript -->
          </select>
          <small id="helperText">Vertical datum of the data (e.g. Mean Sea Level (MSL))</small><br>
          
        <button type="submit">Submit</button>
      </form>
    </div>
  </div>`,
  `<div class="Card">
  <h1>Input Specification</h1>
  <div class="InputInfo" id="InputInfo">
    <form>
      <label>Display Name:</label><br>
        <input type="text" id="iName" name="iName" title="Display name of data variable (e.g. x_wind)" required>
        <small id="helperText">Display name of data variable (e.g. x_wind)</small><br>

      <label>Location:</label><br>
        <select name="iSelectLocation" class="location" title="Name of the location that the input data is for (e.g. South Bird Island)" required>
          <!-- Options will be dynamically added here using TypeScript -->
        </select>
        <small id="helperText">Name of the location that the input data is for (e.g. South Bird Island)</small><br>

      <label>Source:</label><br>
        <select name="iSelectSource" class="source" title="Source of input data (e.g. National Digital Forecast Database (NDFD))" required>
          <!-- Options will be dynamically added here using TypeScript -->
        </select>
        <small id="helperText">Source of input data (e.g. National Digital Forecast Database (NDFD))</small><br>

      <label>Series:</label><br>
        <select name="iSelectSeries" class="series" title="Code name of the input data series (e.g. pAirTemp)" required>
          <!-- Options will be dynamically added here using TypeScript -->
        </select>
        <small id="helperText">Code name of the input data series (e.g. pAirTemp)</small><br>

      <label>Unit:</label><br>
        <select name="iSelectUnits" class="units" title="Units of measurement for the input data (e.g. celsius)" required>
        <!-- Options will be dynamically added here using TypeScript -->
        </select>
        <small id="helperText">Units of measurement for the input data (e.g. celsius)</small><br>

      <label>Data Type:</label><br>
        <input type="text" id="iType" name="iType" title="Data type of input data (e.g. float)" required>
        <small id="helperText">Data type of input data (e.g. float)</small><br>

      <label>Interval:</label><br>
        <input type="text" id="iInterval" name="iInterval" title="Time between each model prediction (e.g. 0:06 (6min), 1:00 (1hr), 3:00 (3hr))" required>
        <small id="helperText">Time between each model prediction (e.g. 0:06 (6min), 1:00 (1hr), 3:00 (3hr))</small><br>

      <button type="submit" id="btnFinish">Finish & Download</button>
      <button type="submit" id="btnAdd">Add Specification</button>
    </form>
  </div>
</div>`
]

import { ServerComms } from './ServerComms';

let sc = new ServerComms('http://localhost:8000');

const DSPECHANDLER = new DSPEC();

/**
 * Populates web form with variables from the DB
 */
async function populateForm(){
  const variables: string[] = ['source', 'series', 'location', 'units', 'datum'] // Better way to do this?

  for (const variable of variables) {
    const formElements = document.getElementsByClassName(variable) as HTMLSelectElement;

    let data: { displayName: string }[] = await sc.requestVariable(variable);

    
    for(let i = 0; i < formElements.length; i++){ // Prevents duplicates

      if(formElements[i].children.length <= 0) {
        const plzSelectOp = document.createElement('option');
        plzSelectOp.defaultSelected = true;
        plzSelectOp.disabled = true;
        plzSelectOp.text = '---Please Select---';
        plzSelectOp.value =''; // Prevents this auto passing the required filter.
        formElements[i].appendChild(plzSelectOp);
  
        data.forEach((item: { displayName: string }) => {
          const option = document.createElement('option');
          option.value = item.displayName;
          option.text = item.displayName;
          formElements[i].appendChild(option);
        });
      }
    }
  }
}


document.addEventListener('DOMContentLoaded', init);


function init(){
  populateForm();
  appendNextCard(''); // Appends the first card
}


function formListener(this: HTMLElement, e: SubmitEvent) {
  e.preventDefault();

  const form = e.target! as HTMLFormElement;
  const formId = form.parentElement!.id;
  const formData = new FormData(form);
  const submitBtnID = e.submitter!.id;
  switch(formId) {
    case 'MetaForm':
      DSPECHANDLER.updateMeta(formData);
      appendNextCard(formId);
      break;
    case 'TimingInfo':
      DSPECHANDLER.updateTime(formData);
      appendNextCard(formId);
      break;
    case 'OutputInfo':
      DSPECHANDLER.updateOutput(formData);
      appendNextCard(formId);
      break;
    case 'InputInfo':

      DSPECHANDLER.appendInputSpecification(formData);

      // If add btn, then submit data and add new form
      // If finish btn then submit data and download
      if(submitBtnID === 'btnAdd') {
        appendNextCard(formId);
      } else if(submitBtnID === 'btnFinish') {
        DSPECHANDLER.saveDspec();
      }
      break;
    default:
      console.error('fromListener could not map form submission to handler method.');

  }
}


let state = 0; // State prevents incorrect cards from being appended if a form is resubmitted
const cards = document.getElementById('cards') as HTMLElement;
function appendNextCard(formId: string){
  if(formId === '' && state === 0) {
    cards.insertAdjacentHTML('beforeend', cardTemplates[0]);
    const metaForm = document.getElementById("MetaForm")!;
    metaForm.addEventListener('submit', formListener);
    state++;
  }
  else if(formId === 'MetaForm' && state === 1) {
    cards.insertAdjacentHTML('beforeend', cardTemplates[1]);
    const TimingInfo = document.getElementById("TimingInfo")!;
    TimingInfo.addEventListener('submit', formListener);
    state++;
  }
  else if(formId === 'TimingInfo' && state === 2) {
    cards.insertAdjacentHTML('beforeend', cardTemplates[2]);
    const OutputInfo = document.getElementById("OutputInfo")!;
    OutputInfo.addEventListener('submit', formListener);
    populateForm();
    state++;
  }
  else if(formId === 'OutputInfo' || formId === 'InputInfo') {
    cards.insertAdjacentHTML('beforeend', cardTemplates[3]);
    const InputInfo = document.getElementById("InputInfo")!;
    InputInfo.addEventListener('submit', formListener);
    populateForm();
  }
}


