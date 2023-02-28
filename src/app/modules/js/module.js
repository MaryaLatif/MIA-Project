console.log(window);

const body = document.querySelector("body");
body.style.width = window.innerWidth + "px";
body.style.height = window.innerHeight + "px";
const navbarModule = document.querySelector(".navbar-module");
let tab = document.getElementById("tab");
let cours = document.getElementById("cours");
let tp = document.getElementById("tp");
let td = document.getElementById("td");

const baseUrl = 'http://localhost:80/api/exempleWs';
fetch(`${baseUrl}`) //récup les modules dès que la page est ouverte pour les afficher dans la navbar
    .then((res) => {
        if (res.ok) {
            return res.json();
        }
    })
    .then((data) => {
        for (let i = 0; i < data.length; i++) { //boucle pour afficher les modules
            let module = document.createElement("li");
            module.style.width = navbarModule.offsetWidth + "px";
            module.style.height = (navbarModule.offsetHeight / 10) + "px";
            module.textContent = "🧑🏻‍💻 " + data[i];
            module.className = "list-module";
            module.setAttribute('id', i + 1);

            module.addEventListener("click", () => { //évenement quand on clique sur un module (ses cours/td/tp)
                fetch(`${baseUrl}/module/${i + 1}`)
                    .then((res) => {
                        if (res.ok) {
                            return res.json();
                        }
                    })
                    .then((data) => { //afficher info responsable module
                        document.getElementById("nom-prof").textContent = data[0];
                        document.getElementById("email-prof").textContent = data[1];
                    })

                getElementsTab(`${baseUrl}/cours/${i + 1}`); //récuperer les cours lors du clique sur le module
                cours.addEventListener("click", () => { //récup les cours quand on clique sur "Cours"
                    getElementsTab(`${baseUrl}/cours/${i + 1}`);
                })

                td.addEventListener("click", () => { // récup les td quand on clique sur "Travaux dirigés"
                    console.log(i + 1); //demander pk les i appelé avant s'affiche`
                    getElementsTab(`${baseUrl}/td/${i + 1}`);
                })

                tp.addEventListener("click", () => { //récup les tp quand on clique sur "Travaux pratique"
                    getElementsTab(`${baseUrl}/tp/${i + 1}`)
                })

            })

            navbarModule.appendChild(module);
        }
    })

fetch(`${baseUrl}/user`)
    .then((res) => {
        if (res.ok) return res.json();
    })
    .then((data) => {

    })
