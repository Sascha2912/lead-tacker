'use strict';

// === DOM-Elemente abrufen
const btnSaveInput = document.getElementById("btn-save-input");
const inputElement = document.getElementById("input-element");
const leadListElement = document.getElementById("lead-list-element");

// === Variablen deklarieren ===
let myLeads = ["www.awesomelead.com", "www.epiclead.com", "www.greatlead.com"];


// === Funktionen implementieren ===
const saveLead = () => {
    // myLeads.push(inputElement.value);

    myLeads.forEach(item => {
        leadListElement.innerHTML += `<li>${item}</li>`;
    });

    
};

// === Event-Bindings ===
btnSaveInput.addEventListener('click', saveLead);