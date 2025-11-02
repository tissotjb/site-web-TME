// assets/js/transition.js

document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll("a")

    links.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault(); // Empèche la navigation immédiate
            const href = this.href; // URL du lien cliqué

            //Ajoute la classe fade-out
            document.body.classList.add("fade-out");

            //Attend la fin de l'animation (500ms ici)
            setTimeout(() => {
                window.location.href = href ; // Redirection
            }, 500);
        });
    });

    // Animation d'entrée pour les pages
    document.body.classList.remove("fade-out");
});