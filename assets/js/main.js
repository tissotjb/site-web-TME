/* ===== main.js ===== */


// Redirection JS vers la page 404 UNIQUEMENT EN FONCTIONNEMENT LOCAL
// window.addEventListener("DOMContentLoaded", () => {
//    const path = window.location.pathname;
//    const existingPages = ["./conditions-vente.html", "./index.html", "./404.html", "./about.html", "./confidentialite.html", "./contact.html", "./mentions-legales.html", "./plan-du-site.html", "./portfolio.html", "./presentation.html", "./services.html"]
//
//    if (!existingPages.includes(path)) {
//        window.location.href = "404.html";
//    }
//});


// === Injection du bouton "Retour en haut"
fetch("./partials/scrollTop.html")
  .then(response => response.text())
  .then(html => {
    document.body.insertAdjacentHTML("beforeend", html);

    const scrollTopBtn = document.getElementById("scrollTopBtn");

    // CSS déjà inclus via le fichier global

    // Apparition / disparition du bouton selon le scroll
    window.addEventListener("scroll", () => {
        if (window.scrollY > 400) {
            scrollTopBtn.classList.add("show");
        } else {
            scrollTopBtn.classList.remove("show");
        }
    });

    // Remonte la page en douceur
    scrollTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top:0,
            behavior: "smooth"
        });
    });
})
.catch(err => console.error("Erreur lors du chargement du bouton de retour en haut de page"))


// Animation fluide au scroll
document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll(".scroll-reveal, .scroll-left, .scroll-right")

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target); // Stoppe l'observation une fois visible
            }
        });
    }, { threshold: 0.2}); // déclenchement à 20% de visibilité

    elements.forEach(el => observer.observe(el));
});

// Apparition du body douce
window.addEventListener("load", () => {
    document.body.classList.add("loaded");
})