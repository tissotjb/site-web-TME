/* ===== main.js ===== */


// Redirection JS vers la page 404 UNIQUEMENT EN FONCTIONNEMENT LOCAL
window.addEventListener("DOMContentLoaded", () => {
    const path = window.location.pathname.split("/").pop() || "index.html"; // récupère le nom du fichier
    const existingPages = [
        "conditions-vente.html",
        "index.html",
        "404.html",
        "about.html",
        "confidentialite.html",
        "contact.html",
        "mentions-legales.html",
        "plan-du-site.html",
        "portfolio.html",
        "presentation.html",
        "./services.html"]

    // Détection du mode GitHub Pages (hebergement en ligne)
    const isGitHubPages = window.location.hostname.includes("github.io");

    // Si la page n'existe pas
    const pageNotFound = !existingPages.includes(path)

    // ---- Cas 1 : en local ----
    // On redirige vers la page 404.html
    if (!isGitHubPages && pageNotFound && path!== "404.html") {
        window.location.href = "404.html";
        return;
    }

    // ---- Cas 2 : sur GitHub Pages ----
    // GitHub Pages sert déjà le 404.html si il existe à la racine
    // On vérifie que le document est bien le 404.html
    if (isGitHubPages && document.title === "") {
        // On insère dynamiquement le contenu de 404.html
        fetch("404.html")
            .then(response => response.text())
            .then(html => {
                document.open();
                document.write(html);
                document.close();
            })
            .catch(err => {
                console.error("Erreur de chargement de la page 404:", err);
            });
    }
});




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