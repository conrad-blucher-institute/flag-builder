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
import { ServerComms } from './ServerComms';

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
                <input type="text" pattern="^(0?[0-9]?[0-9]|1[0-6][0-8]):[0-5][0-9]:[0-5][0-9]$" placeholder="00:00:00" id="tOffset" name="tOffset" title="Time after the hour that the model should wait to run.HH:MM:SS (e.g. 0:10:00 (10min))" required>
                <small id="helperText">Time after the hour that the model should wait to run. HH:MM:SS (e.g. 00:10:00 (10min))</small><br>

              <label>Time Interval:</label><br>
                <input type="text" pattern="^(0?[0-9]?[0-9]|1[0-6][0-8]):[0-5][0-9]:[0-5][0-9]$" placeholder="00:00:00" id="tInterval" name="tInterval" title="Time between each model prediction. HH:MM:SS (e.g. 01:00:00 (1hr))" required>
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
          <input type="text" pattern="^(0?[0-9]?[0-9]|1[0-6][0-8]):[0-5][0-9]:[0-5][0-9]$" placeholder="00:00:00" id="oLeadTime" name="oLeadTime" title="Span of time between model runtime and time the prediction is computed for. HH:MM:SS (e.g. 12:00:00 (12hr))" required>
          <small id="helperText">Span of time between model runtime and time the prediction is computed for HH:MM:SS (e.g. 12:00:00 (12hr))</small><br>

        <label for="series">Series:</label><br>
          <input type="series" id="oSeries" name="oSeries" title="Name of the output data series produced by the model (e.g. Air Temperature)" required>
          <small id="helperText">Name of the output data series produced by the model (e.g. Air Temperature)</small><br>

        <label for="location">Location:</label><br>
          <select name="oSelectLocation" class="location" title="Name of the location that the model is making predictions for (e.g. South Bird Island)" required>
            <!-- Options will be dynamically added here using TypeScript -->
          </select>
          <small id="helperText">Name of the location that the model is making predictions for (e.g. South Bird Island)</small><br>

        <label>Interval:</label><br>
          <input type="text" pattern="^(0?[0-9]?[0-9]|1[0-6][0-8]):[0-5][0-9]:[0-5][0-9]$" placeholder="00:00:00" id="oInterval" name="oInterval" title="Time between each model prediction. HH:MM:SS (e.g. 01:00:00 (1hr)" required>
          <small id="helperText">Time between each model prediction. HH:MM:SS (e.g. 01:00:00 (1hr))</small><br>

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
    <form id="0">
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
        <input type="text" pattern="^(0?[0-9]?[0-9]|1[0-6][0-8]):[0-5][0-9]:[0-5][0-9]$" placeholder="00:00:00" id="iInterval" name="iInterval" title="Time between each model prediction. HH:MM:SS (e.g. 01:00:00 (1hr))" required>
        <small id="helperText">Time between each model prediction. HH:MM:SS (e.g. 01:00:00 (1hr))</small><br>

      <button type="submit" name="btnFinish" id="btnFinish">Finish & Download</button>
      <button type="submit" name="btnAdd" id="btnAdd">Add Specification</button>
      <button type="click" name="btnDelete" id="btnDelete" style="display: none;">Delete</button>
    </form>
  </div>
</div>`
]


let sc = new ServerComms('http://localhost:8000');

const DSPECHANDLER = new DSPEC();

/**
 * Populates web form with variables from the DB
 */
async function populateForm(){
  const variables: string[] = ['source', 'series', 'location', 'units', 'datum'] // Better way to do this?

  // Loop through the drop down types
  for (const variable of variables) {
    // Get dropdowns that match the type
    const formElements = document.getElementsByClassName(variable) as HTMLSelectElement;

    let data: { displayName: string }[] = await sc.requestVariable(variable);
    
    // Add the options if the drop down doesn't already have them
    for(let i = 0; i < formElements.length; i++){ // Prevents duplicates

      // Add listener to handler no option
      formElements[i].addEventListener('change', SelectOnChangeListener);

      if(formElements[i].children.length <= 0) {

        // Select one
        const plzSelectOp = document.createElement('option');
        plzSelectOp.defaultSelected = true;
        plzSelectOp.disabled = true;
        plzSelectOp.text = '---Please Select---';
        plzSelectOp.value =''; // Prevents this auto passing the required filter.
        formElements[i].appendChild(plzSelectOp);
        
        // DB option
        data.forEach((item: { displayName: string }) => {
          const option = document.createElement('option');
          option.value = item.displayName;
          option.text = item.displayName;
          formElements[i].appendChild(option);
        });

        // Not found option
        const NotFoundOp = document.createElement('option');
        NotFoundOp.text = '---Option Not Found---';
        NotFoundOp.value ='NOTFOUND'; 
        formElements[i].appendChild(NotFoundOp);
      }
    }
  }
}


document.addEventListener('DOMContentLoaded', initNewDSPECForm);


function initNewDSPECForm(){
  populateForm();
  appendNextCard(''); // Appends the first card
  initNewOrUpload() // Let them choose to fil out the form or upload a file to check
}

let inputIndex = 0;
const outputMarkers: object[] = [];
const inputMarkers: object[] = [];
function submitFormListener(this: HTMLElement, e: SubmitEvent) {
  e.preventDefault();

  const form = e.target! as HTMLFormElement;
  const cardId = form.parentElement!.id;
  const formData = new FormData(form);
  const submitBtnID = e.submitter!.id;
  switch(cardId) {
    case 'MetaForm':
      DSPECHANDLER.updateMeta(formData);
      appendNextCard(cardId);
      break;
    case 'TimingInfo':
      DSPECHANDLER.updateTime(formData);
      appendNextCard(cardId);
      break;
    case 'OutputInfo':
      DSPECHANDLER.updateOutput(formData, outputMarkers);
      appendNextCard(cardId);
      break;
    case 'InputInfo':
      const formID = parseInt(form.id);
      if(submitBtnID === 'btnAdd') { // If add btn, then add new form
        if(inputIndex < DSPECHANDLER.getInputSpecificationLength()){
          DSPECHANDLER.updateInputSpecification(inputIndex, formData, inputMarkers);
        }
        else{
          DSPECHANDLER.appendInputSpecification(formData, inputMarkers);
        }

        showUpdateButton(form);
        hideAddButton(form);
        hideDeleteButton(form);
        appendNextCard(cardId);
      } 
      else if(submitBtnID === 'btnFinish') { // If finish btn then submit data and download
        if(inputIndex < DSPECHANDLER.getInputSpecificationLength()){
          DSPECHANDLER.updateInputSpecification(inputIndex, formData, inputMarkers);
        }
        else{
          DSPECHANDLER.appendInputSpecification(formData, inputMarkers);
        }
        DSPECHANDLER.saveDspec();
      }
      else if(submitBtnID === 'btnUpdate') { // If update btn then update current form data
        DSPECHANDLER.updateInputSpecification(formID, formData, inputMarkers);
      }
      break;
    default:
      console.error('fromListener could not map form submission to handler method.');

  }
}


function showUpdateButton(form: HTMLFormElement){
  const submitButton = form.btnFinish as HTMLButtonElement
  submitButton.textContent = 'Update';
  submitButton.id = 'btnUpdate';
  submitButton.name = "btnUpdate"
}


function showFinishButton(form: HTMLFormElement){
  const submitButton = form.btnUpdate as HTMLButtonElement
  submitButton.textContent = 'Finish & Download';
  submitButton.id = 'btnFinish';
  submitButton.name = "btnFinish"
}


function hideAddButton(form: HTMLFormElement){
  const submitButton = form.btnAdd as HTMLButtonElement
  submitButton.style.display = 'none';
}


function showAddButton(form: HTMLFormElement){
  const submitButton = form.btnAdd as HTMLButtonElement
  submitButton.style.display = '';
}


function addDeleteButton(form: HTMLFormElement, card: HTMLElement, cards: HTMLElement){
  const deleteButton = form.btnDelete as HTMLButtonElement
  deleteButton.style.display = '';
  deleteButton.addEventListener('click', () => {
    if(parseInt(form.id) < DSPECHANDLER.getInputSpecificationLength()){
      DSPECHANDLER.removeInputSpecification(parseInt(form.id));
    }
    
    card.remove();

    inputIndex--;

    const previousCard = cards.lastChild as HTMLElement;
    const previousForm = previousCard.children[1].firstElementChild as HTMLFormElement;

    showAddButton(previousForm);
    showFinishButton(previousForm);
    if(inputIndex != 0){
      showDeleteButton(previousForm);
    }
  });

  form.appendChild(deleteButton);
}


function addCloseButtonListener(form: HTMLFormElement){
  const closeButton = form.btnClose;

  closeButton.addEventListener('click', () => { 
    document.getElementById('markerPopup')?.remove();

    // Unblur everything
    const body = document.getElementById('body')
    body?.classList.remove('blurAll');
  });
}


function showDeleteButton(form: HTMLFormElement){
  const deleteButton = form.btnDelete as HTMLButtonElement
  deleteButton.style.display = '';
}


function hideDeleteButton(form: HTMLFormElement){
  const deleteButton = form.btnDelete as HTMLButtonElement
  deleteButton.style.display = 'none';
}


let state = 0; // State prevents incorrect cards from being appended if a form is resubmitted
const cards = document.getElementById('cards') as HTMLElement;
function appendNextCard(cardId: string){
  if(cardId === '' && state === 0) {
    cards.insertAdjacentHTML('beforeend', cardTemplates[0]);
    const formDiv = document.getElementById("MetaForm")!;
    const parentDiv = formDiv.parentNode as HTMLElement;
    parentDiv.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
    formDiv.addEventListener('submit', submitFormListener);
    state++;
  }
  else if(cardId === 'MetaForm' && state === 1) {
    cards.insertAdjacentHTML('beforeend', cardTemplates[1]);
    const formDiv = document.getElementById("TimingInfo")!;
    const parentDiv = formDiv.parentNode as HTMLElement;
    parentDiv.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
    formDiv.addEventListener('submit', submitFormListener);
    state++;
  }
  else if(cardId === 'TimingInfo' && state === 2) {
    cards.insertAdjacentHTML('beforeend', cardTemplates[2]);
    const formDiv = document.getElementById("OutputInfo")!;
    const parentDiv = formDiv.parentNode as HTMLElement;
    parentDiv.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
    formDiv.addEventListener('submit', submitFormListener);
    populateForm();
    state++;
  }
  else if(cardId === 'OutputInfo') {
    cards.insertAdjacentHTML('beforeend', cardTemplates[3]);
    const formDiv = document.getElementById("InputInfo")!;
    const parentDiv = formDiv.parentNode as HTMLElement;
    parentDiv.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
    formDiv.addEventListener('submit', submitFormListener);
    populateForm();
  }
  else if(cardId === 'InputInfo') {
    cards.insertAdjacentHTML('beforeend', cardTemplates[3]);
    const Cards = document.getElementById("cards")!;

    const formDiv = Cards.lastChild as HTMLElement;
    const parentDiv = formDiv.parentNode as HTMLElement;
    parentDiv.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
    const childNode = formDiv.children[1].firstElementChild as HTMLFormElement;

    inputIndex++;
    childNode.id = `${inputIndex}`
    addDeleteButton(childNode, formDiv, cards)

    formDiv.addEventListener('submit', submitFormListener);

    populateForm();
  }
}

//#region First choice pop up
const newOrCHeckPopUp = `<div class="newOrCHeckPopUp" id="newOrCHeckPopUp">
<h1>Flag Builder</h1>
<div>
  <div class="uploadButtonCenterHor">
    <button type="button" id="btnCreateNew" class="btnCreateNew">Create New</button><br>
  </div>
  <h2>OR</h2>
  <input type="file" id='fUpload' accept="text/json" name="files[]" size=1></input>
</div>
</div>`

function initNewOrUpload() {
  // Blur everything
  const body = document.getElementById('body')
  body?.classList.toggle('blurAll');

  // Add the pop up
  body?.insertAdjacentHTML('beforeend', newOrCHeckPopUp);

  // Add the listener to the pop up
  const btnCreateNew = document.getElementById("btnCreateNew")!;
  btnCreateNew.addEventListener('click', () => {

    // Unblur everything
    const body = document.getElementById('body')
    body?.classList.remove('blurAll');

    // Remove the pop up
    document.getElementById('newOrCHeckPopUp')?.remove();
  });

  const fUpload = document.getElementById("fUpload")!;
  fUpload.addEventListener('change', (event: Event) => {
    const fInput = event.target! as HTMLInputElement;
    const file = fInput.files![0];
    
    // Read the file and once the file is loaded and read, move to report popup
    const reader = new FileReader();
    reader.addEventListener("loadend", () => {    
      // Remove the pop up
      document.getElementById('newOrCHeckPopUp')?.remove();

      // Move to next popup
      initReportPopUp(reader.result as string)
    }); 
    reader.readAsText(file);
  });
}

//#endregion


//#region Marker Pop up
let markerObjectTracker: any | null  = null;
function SelectOnChangeListener(this: HTMLSelectElement, e: Event) {
  if(this.selectedOptions[0].value === 'NOTFOUND') {
    markerObjectTracker = {
      field: this.name, // The name of the field
      parentFormID: this.parentElement?.parentElement?.id // Gets the id of the card
    }
    getMarker();
  }
}


const markerPopUp = `
<div class="markerPopup"  id="markerPopup">
<h1>Marker</h1>
<div>
  <form id="markerPopupForm">
    <label>ID:</label><br>
      <input type="text" id="markerID" name="markerID" required>
      <small id="helperText">A ID (less than 10 characters long) to identify this attribute by.</small><br>

    <label>Name:</label><br>
      <input type="text" id="markerName" name="markerName" required>
      <small id="helperText">A longer display name of this attribute.</small><br>
      
    <label for="markerDesc">Description:</label><br>
      <textarea id="markerDesc" name="markerDesc" rows="12" cols="75"></textarea>
      <small id="helperText">A long description of the attribute, what it is, and how to get it.</small><br>

    <button type="submit">Submit</button>
    <button type="click" name="btnClose">Close</button>
  </form>
</div>
</div>`


function getMarker() {
  // Blur everything
  const body = document.getElementById('body')
  body?.classList.toggle('blurAll');

  // Add the pop up
  body?.insertAdjacentHTML('beforeend', markerPopUp);

  // Add the listener to the pop up
  const markerPopup = document.getElementById("markerPopup")!;
  markerPopup.addEventListener('submit', markerPopUpListener);

  const markerPopupForm = document.getElementById("markerPopupForm") as HTMLFormElement;
  // Add a hide button
  addCloseButtonListener(markerPopupForm)
}


function markerPopUpListener(this: HTMLElement, e: Event) {
  e.preventDefault();

  // This should never be called with the even listener for the creation of the pop up, not filling the tracker object
  if(!markerObjectTracker) {
    console.error("The marker Pop up Submit with no object it the marker object tracker!");
    return;
  }

  // Create a marker object
  const marker = {
    field: markerObjectTracker.field,
    data: new FormData(e.target as HTMLFormElement) // The data from the marker entry
  }

  // Append the marker to the right array
  switch(markerObjectTracker.parentFormID) {
    case 'InputInfo':
      inputMarkers.push(marker);
      break;
    case 'OutputInfo':
      outputMarkers.push(marker);
      break;
    default:  
      console.error("The marker pop up submission is reporting a form thats not input or output!");
  }
  markerObjectTracker = null; // Reset the tracker

  // Unblur everything
  const body = document.getElementById('body')
  body?.classList.remove('blurAll');

  // Remove the pop up
  document.getElementById('markerPopup')?.remove();
}

//#endregion



//#region DPSEC REPORT POP UP
const reportPopUp = `<div class="reportPopUp" id="reportPopUp">
<h1>REPORT</h1>
  <div>
    <textarea readonly id="reportPopUpTextArea" name="reportPopUpTextArea" rows="12" cols="75"></textarea>
  </div>
  <div style="display: flex; justify-content: space-around;">
    <div>
      <label for="markersLeft">Markers Left:</label><br>
      <textarea readonly id="markerNumberLeft" name="markerNumberLeft" rows="1" cols="1" style="font-size: 50px; width: 100px; height: 50px; text-align: center;"></textarea>
    </div>
    <div>
      <label for="markersFound">Markers Found:</label><br>
      <textarea readonly id="markerNumberFound" name="markerNumberFound" rows="1" cols="1" style="font-size: 50px; width: 100px; height: 50px; text-align: center;"></textarea>
    </div>
  </div>
  <button type="button" id="btnReportOkay" class="">OK</button><br>
</div>`

async function initReportPopUp(jsonString: string) {

  // Add the pop up
  const body = document.getElementById('body');
  body?.insertAdjacentHTML('beforeend', reportPopUp);

  const dspec = new DSPEC();
  const parseReport = dspec.parseDspecString(jsonString) 


  const reportTextAreaElement = document.getElementById('reportPopUpTextArea') as HTMLTextAreaElement;
  parseReport.forEach((str: string) => {reportTextAreaElement.append(str + '\n')});

  const markerFoundtxtb = document.getElementById('markerNumberFound') as HTMLTextAreaElement;
  markerFoundtxtb.append(dspec.getMarkersLength().toString());

  await dspec.tryResolveMarkers();

  const markerLefttxtb = document.getElementById('markerNumberLeft') as HTMLTextAreaElement;
  markerLefttxtb.append(dspec.getMarkersLength().toString());

  dspec.saveDspec();

  // Add listener to ok button that restarts the form when pressed
  const btnCreateNew = document.getElementById("btnReportOkay")!;
  btnCreateNew.addEventListener('click', () => {
    location.reload(); // refreash the page
  });
}

//#endregion