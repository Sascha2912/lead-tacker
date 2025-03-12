'use strict';

// === DOM-Elemente abrufen
const btnSaveInput = document.getElementById("btn-save-input");
const btnSaveTab = document.getElementById("btn-save-tab");
const btnDeleteAll = document.getElementById("btn-delete-all-leads");
const inputElement = document.getElementById("input-element");
const leadListElement = document.getElementById("lead-list-element");

// === Variablen deklarieren ===
let savedLeads = [];

// === Funktionen implementieren ===

/**
 * Rendert alle gespeicherten Leads als Listenelemente in der UL.
 * @param {Array} leads - Array der gespeicherten URLs.
 */
const renderLeads = (leads) => {
   if (!Array.isArray(leads) ) {
    console.log("Der Parameter leadArray muss ein Array sein.");
    return;
   };

   let listItems = "";

    leads.forEach(lead => {
        // Erstellen eines Listeneintrags mit Link
        listItems += `
            <li>
                <a href='${lead}' target='_blank'>
                    ${lead}
                </a>
            </li>
        `
    }); 

    leadListElement.innerHTML = listItems; 
};

/**
 * Behandelt das Speichern der URL aus dem Eingabefeld.
 * Fügt die URL dem Arrayhinzu, speichert es in localStorage und rendert die Liste.
 */
const inputSaved = () => {
    // Eingabewert trimmen, um Leerzeichen zu entfernen
    let url = inputElement.value.trim();

    // Überprüft, ob die URL mit "https://" beginnt
    if(!url.startsWith("https://") ) {
        url = "https://" + url;
    }

    // URL zum Array hinzufügen
    savedLeads.push(url);

    // Eingabefeld zurücksetzen
    inputElement.value = "";

    // Array in localStorage speichern
    localStorage.setItem("myLeads", JSON.stringify(savedLeads));
    renderLeads(savedLeads);
};

/**
 * Behandelt das Speichern des aktuellen Tabs.
 * Nutzt die chrome.tabs APT, um die URL des aktiven Tabs zu erhalten.
 */
const tabSaved = () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        // URL des aktiven Tabs hinzufügen
        savedLeads.push(tabs[0].url);

        // Array im localStorage speichern und neu rendern
        localStorage.setItem("myLeads", JSON.stringify(savedLeads));
        renderLeads(savedLeads);
    });
};

/**
 * Behandelt das Löschen aller gespeicherten Leads.
 * Löscht den localStorage und leert das Array.
 */
const allLeadsDeleted = () => {
    // Leert den localStorage
    localStorage.clear();

    // Setzt das Array auf ein leeres Array und rendert es
    savedLeads = [];
    renderLeads(savedLeads);
};

// === Logik beim Laden der Seite ===
// Versuchen, gespeicherte Leads aus dem loalStorage zu laden
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
if (leadsFromLocalStorage) {

// Speichert und rendert die URLs aus dem localStorage
savedLeads = leadsFromLocalStorage;
renderLeads(savedLeads);
};

// === Event-Bindings ===
// Zum Speichern der Eingabe
btnSaveInput.addEventListener('click', inputSaved);

// Zum Speichern des aktuellen Tabs
btnSaveTab.addEventListener('click', tabSaved);

// Zum Löschen aller Leads
btnDeleteAll.addEventListener('dblclick', allLeadsDeleted);