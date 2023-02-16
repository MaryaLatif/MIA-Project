console.log(window);

const body = document.querySelector("body");
body.style.width = window.innerWidth + "px";
body.style.height = window.innerHeight + "px";
const navbarModule = document.querySelector(".navbar-module");

for (let i = 0; i < 25; i++) {
    let module = document.createElement("li");
    module.style.width = navbarModule.offsetWidth + "px";
    module.style.height = (navbarModule.offsetHeight/10) + "px";
    module.textContent = "🧑🏻‍💻 Initiation au développement";
    module.className = "list-module";
    navbarModule.appendChild(module);
}