const currentUrl = window.location.href;
const id = currentUrl.substring(currentUrl.lastIndexOf("/") + 1);

const nip = 12200955; //contiendra la valeur du nip récup après s'être co
const baseUrl = 'http://localhost:80/api/module';

const body = document.querySelector("body");
body.style.width = window.innerWidth + "px";
body.style.height = window.innerHeight + "px";
const navbarModule = document.querySelector(".navbar-module");
let tab = document.getElementById("tab");
let tabContent = document.getElementById("tab-content");
let cours = document.getElementById("cours");
let coursListner;
let tp = document.getElementById("tp");
let tpListner;
let td = document.getElementById("td");
let tdListner;

/**
 * Permet d'ajouter les on click listners sur les onglet cours / td / tp
 * pour le module actuel
 * @param id 
 */


fetch(`${baseUrl}`) //récup les modules dès que la page est ouverte pour les afficher dans la navbar
    .then((res) => {
        if (res.ok) {
            return res.json();
        }
    })
    .then((data) => {
        for (let i = 0; i < data.length; i++) { //boucle pour afficher les modules
            let linkModule = document.createElement("a");
            let module = document.createElement("li");

            linkModule.href = `http://localhost:80/module/${i + 1}`
            module.style.width = navbarModule.offsetWidth + "px";
            module.style.height = (navbarModule.offsetHeight / 10) + "px";
            module.textContent = "🧑🏻‍💻 " + data[i];
            module.className = "list-module";
            module.setAttribute('id', i + 1);


            linkModule.appendChild(module);
            navbarModule.appendChild(linkModule);
        }
    })

updateModuleTeacher(id);
getElementsTab(`${baseUrl}/${id}/cours`);
addTabEventListeners(id);


fetch(`${baseUrl}/user/${nip}`)
    .then((res) => {
        if (res.ok) return res.json();
    })
    .then((data) => {
        document.getElementById("first-name").textContent = data[0];
        document.getElementById("last-name").textContent = data[1];
    })
