'use strict';

// === DOM-Elemente abrufen
const btnSaveInput = document.getElementById("btn-save-input");
const inputElement = document.getElementById("input-element");
const leadListElement = document.getElementById("lead-list-element");

// === Variablen deklarieren ===
let myLeads = [];
/**
 * Methode zum Rendern aller Elemente im myLead Array als <li> in der unorderd list
 */
const renderLeads = () => {
   
    let listItems = "";

    myLeads.forEach(lead => {
        listItems += `<li>${lead}</li>`;
    }); 

    leadListElement.innerHTML = listItems; 
};

// === Funktionen implementieren ===
const saveLead = () => {
    myLeads.push(inputElement.value);

    renderLeads();
};

// === Event-Bindings ===
btnSaveInput.addEventListener('click', saveLead);