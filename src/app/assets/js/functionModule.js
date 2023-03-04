var i = 0
var max = 4
var page = 1; //variable qui indique sur la combien ième de page on est sur le tableau
let inputSearch = document.getElementById("search");

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
            var tab = data; //on met data dans une variable pour pouvoir modifier le tableau dans les fonctions d'affichages car le tableau renvoyé par la recherche est différent de data de getElementTab
            page = 1;
            var totalPage = Math.ceil(tab.length / 4); //arrondi le resultat au seuil supperieur
            if (tab.length == 0) totalPage = 1;
            document.getElementById("nb-elmt").textContent = "Total : " + tab.length; //affiche le nombre total de cours/td/tp

            function sendResearch(event) { //fonction qui vérifie la recherche entrée dans la barre de rechercher et affiche la réponse
                event.preventDefault();
                cours.addEventListener("click", removeClickListeners);
                td.addEventListener("click", removeClickListeners);
                tp.addEventListener("click", removeClickListeners);
                page = 1;

                if (!/^\s*$/.test(inputSearch.value)) {
                    document.getElementById("nom-tab").textContent = "Résultat";
                    fetch(`${baseUrl}/${id}/research`, {
                        method: "POST",
                        headers: {
                            'Accept': 'application/json',
                            'Content-type': 'application/json'
                        },
                        body: JSON.stringify({ research: inputSearch.value })
                    })
                        .then((res) => {
                            if (res.ok) return res.json();
                        })
                        .then((data) => {
                            tab = data;
                            totalPage = Math.ceil(tab.length / 4);
                            if (tab.length == 0) totalPage = 1;
                            document.getElementById("nb-elmt").textContent = "Total : " + tab.length; //affiche le nombre total d'élément correspondant à la recherche

                            if (tabContent.firstChild) tabContent.removeChild(tabContent.lastChild); //on supprime le contenu du tab si y'avait déja des cours ex: si je clique sur tp puis sur cours faut supp les éléments tp
                            let coursesList = document.createElement("ul");
                            tabContent.appendChild(coursesList);
                            if (data[0].error) {
                                let error = document.createElement("li");
                                error.className = "error-search";
                                error.textContent = data[0].error;
                                coursesList.appendChild(error);

                            }
                            else {
                                i = 0;
                                max = 4;
                                afficherElementsTab(data);
                                document.getElementById("nb-page").textContent = page + " / " + totalPage;
                            }
                        })
                }
                else inputSearch.value = "";
            }

            afficherElementsTab(tab); // afficher les premier cours de la liste
            document.getElementById("nb-page").textContent = page + " / " + totalPage; //afficher sur la combien ième de page on se site dans le tableau

            function onclickSuivant() { //gestionnaire d'événement pour le clique sur le bouton suivant
                if (i < tab.length) { // si il rèste des cours pas affiché on lit les prochains cours jusqu'au 4ème à partir du dernier affiché
                    max += 4;
                    page += 1;
                    afficherElementsTab(tab)
                    document.getElementById("nb-page").textContent = page + " / " + totalPage; //maj du numéro de page sur le tableau
                }
            }
            function onclickPrecedent() { //gestionnaire d'événement pour le clique sur le bouton précédent
                if (i > 4) {
                    console.log("i avant cliquer precedent : " + i);
                    max = i - 4;
                    i -= 8;
                    page -= 1;
                    afficherElementsTab(tab)
                    document.getElementById("nb-page").textContent = page + " / " + totalPage;
                }
                console.log("i apres clické prec : " + i);
            }


            document.getElementById("suivant").addEventListener('click', onclickSuivant);
            document.getElementById("precedent").addEventListener('click', onclickPrecedent);


            removeClickListeners = () => { //fonction qui retire les événements des click suivant précédent
                document.getElementById("suivant").removeEventListener('click', onclickSuivant);
                document.getElementById("precedent").removeEventListener('click', onclickPrecedent);
            }


            cours.addEventListener("click", removeClickListeners); //apl la fonction qui retire les événements pour chacun des éléments (cours, td, tp)
            td.addEventListener("click", removeClickListeners);
            tp.addEventListener("click", removeClickListeners);


            document.getElementById("loupe").addEventListener("click", sendResearch); //addEventListener pour la barre de recherche (quand on clique sur la loupe)
        });

}


function afficherElementsTab(tab) { // fonction pour afficher que 4 cours/td/tp
    if (tabContent.firstChild) tabContent.removeChild(tabContent.lastChild); //on supprime le contenu du tab si y'avait déja des cours ex: si je clique sur tp puis sur cours faut supp les éléments tp
    let coursesList = document.createElement("ul");
    tabContent.appendChild(coursesList);
    console.log("i avant boucle : " + i);
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
    while (i < max) i++;

}




function addTabEventListeners(id) {
    coursListner = () => { //récup les cours quand on clique sur "Cours"
        getElementsTab(`${baseUrl}/${id}/cours`);
        document.getElementById("nom-tab").textContent = "Cours";
    }
    cours.addEventListener("click", coursListner);

    tdListner = () => { // récup les td quand on clique sur "Travaux dirigés"
        document.getElementById("nom-tab").textContent = "Travaux dirigés";
        if (window.innerWidth <= 700) document.getElementById("nom-tab").textContent = "TD";
        getElementsTab(`${baseUrl}/${id}/td`);
    }
    td.addEventListener("click", tdListner);

    tpListner = () => { //récup les tp quand on clique sur "Travaux pratique"
        document.getElementById("nom-tab").textContent = "Travaux pratiques";
        if (window.innerWidth <= 700) document.getElementById("nom-tab").textContent = "TP";
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







