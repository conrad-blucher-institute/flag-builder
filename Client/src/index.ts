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
import { ServerComms } from './ServerComms';

let sc = new ServerComms('http://localhost:8000');

/**
 * Populates web form with variables from the DB
 */
async function populateForm(){
  const variables: string[] = ['source', 'series', 'location', 'units', 'datum']
  for (const variable of variables) {
    const dataSelect = document.getElementById(variable) as HTMLSelectElement;

    let data: { displayName: string }[] = await sc.requestVariable(variable);

    data.forEach((item: { displayName: string }) => {
        const option = document.createElement('option');
        option.value = item.displayName;
        option.text = item.displayName;
        dataSelect.appendChild(option);
    });
  }
}


document.addEventListener('DOMContentLoaded', populateForm);