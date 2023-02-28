function getElementsTab(url) { //fonction pour récupérer les Cours/Td/Tp
    fetch(url)
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
        })
        .then((data) => {
            tab.removeChild(tab.lastChild); //on supprime le contenu du tab si y'avait déja des cours ex: si je clique sur tp puis sur cours faut supp les éléments tp
            let coursesList = document.createElement("ul");
            tab.appendChild(coursesList);

            data.map((courses) => {
                //création des éléments d'une ligne du tableau
                let course = document.createElement("li"); 
                let name = document.createElement("div");
                let semester = document.createElement("div");
                let dateAdd = document.createElement("div");
                let download = document.createElement("div");
                //ajout des classes pour le css
                name.className = "courses";
                semester.className = "courses";
                dateAdd.className = "courses";
                download.className = "courses";
                course.className = "list-courses";
                //ajout du contenu des blocs 
                name.textContent = courses.name;
                semester.textContent = courses.semester;
                dateAdd.textContent = courses.dateAdd;
                console.log(course.dateAdd)
                //condition pour afficher si on peut télécharger ou nn
                if (courses.download) download.textContent = "Cliquer pour télécharger";
                else download.textContent = "Téléchargement impossible";

                //ajout des éléments crées dans le parent (le li qui contient le nom, semestre date ...)
                course.append(name, semester, dateAdd, download);
                //ajout du li dans le ul qui contient tt les cours/td/tp du module pour les afficher
                coursesList.appendChild(course);
            })
        })
}

