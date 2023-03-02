
var i = 0
var max = 4
var page = 1; //variable qui indique sur la combien ième de page on est sur le tableau


function getElementsTab(url) { //fonction pour récupérer les Cours/Td/Tp
    fetch(url)
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
        })
        .then((data) => {
            i = 0;
            max = 4;

            var totalPage = Math.ceil(data.length / 4); //arrondi le resultat au seuil supperieur
            document.getElementById("nb-elmt").textContent = "Total : " + data.length; //affiche le nombre total de cours/td/tp

            afficherElementsTab(data); // afficher les premier cours de la liste
            document.getElementById("nb-page").textContent = page + " / " + Math.ceil(data.length / 4); //afficher sur la combien ième de page on se site dans le tableau

            function onclickSuivant() { //gestionnaire d'événement pour le clique sur le bouton suivant
                if (i < data.length) { // si il rèste des cours pas affiché on lit les prochains cours jusqu'au 4ème à partir du dernier affiché
                    max += 4;
                    page += 1;
                    afficherElementsTab(data)
                    document.getElementById("nb-page").textContent = page + " / " + Math.ceil(data.length / 4); //maj du numéro de page sur le tableau
                }
            }
            function onclickPrecedent() { //gestionnaire d'événement pour le clique sur le bouton précédent
                if (i > 4) {
                    max = i - 1;
                    i -= 5
                    page -= 1;
                    afficherElementsTab(data)
                    document.getElementById("nb-page").textContent = page + " / " + Math.ceil(data.length / 4);
                }
            }

            document.getElementById("suivant").addEventListener('click', onclickSuivant);
            document.getElementById("precedent").addEventListener('click', onclickPrecedent);


            removeClickListeners = () => {
                document.getElementById("suivant").removeEventListener('click', onclickSuivant);
                document.getElementById("precedent").removeEventListener('click', onclickPrecedent);
            }
            cours.addEventListener("click", removeClickListeners);
            td.addEventListener("click", removeClickListeners);
            tp.addEventListener("click", removeClickListeners);

        });

}


function afficherElementsTab(tab) { // fonction pour afficher que 4 cours/td/tp
    if (tabContent.firstChild) tabContent.removeChild(tabContent.lastChild); //on supprime le contenu du tab si y'avait déja des cours ex: si je clique sur tp puis sur cours faut supp les éléments tp
    let coursesList = document.createElement("ul");
    tabContent.appendChild(coursesList);

    while ((i < max) && (i < tab.length)) {
        let course = document.createElement("li");
        let name = document.createElement("div");
        let semester = document.createElement("div");
        let dateAdd = document.createElement("div");
        let download = document.createElement("div");

        name.className = "courses";
        semester.className = "courses";
        dateAdd.className = "courses";
        download.className = "courses";
        course.className = "list-courses";

        name.textContent = tab[i].name;
        semester.textContent = tab[i].semester;
        dateAdd.textContent = tab[i].dateAdd;
        if (tab[i].download) download.textContent = "Cliquer pour télécharger";
        else download.textContent = "Téléchargement impossible";

        //ajout des éléments crées dans le parent (le li qui contient le nom, semestre date ...)
        course.append(name, semester, dateAdd, download);
        //ajout du li dans le ul qui contient tt les cours/td/tp du module pour les afficher
        coursesList.appendChild(course);

        i++;
    }

}




function addTabEventListeners(id) {
    coursListner = () => { //récup les cours quand on clique sur "Cours"
        getElementsTab(`${baseUrl}/${id}/cours`);
    }
    cours.addEventListener("click", coursListner);

    tdListner = () => { // récup les td quand on clique sur "Travaux dirigés"
        getElementsTab(`${baseUrl}/${id}/td`);
    }
    td.addEventListener("click", tdListner);

    tpListner = () => { //récup les tp quand on clique sur "Travaux pratique"
        getElementsTab(`${baseUrl}/${id}/tp`)
    }
    tp.addEventListener("click", tpListner);
}

function updateModuleTeacher(id) {
    fetch(`${baseUrl}/${id}/prof`)
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
        })
        .then((data) => { //afficher info responsable module
            document.getElementById("nom-prof").textContent = data[0];
            document.getElementById("email-prof").textContent = data[1];
        })
}



