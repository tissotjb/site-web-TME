// assets/js/cookies.js

document.addEventListener("DOMContentLoaded", () => {
    const banner = document.getElementById("cookie-banner");
    const acceptBtn = document.getElementById("acceptCookies");
    const rejectBtn = document.getElementById("rejectCookies");

    // Vérifie si le choix est déjà enregistré
    const consent = localStorage.getItem("cookieConsent");

    if (!consent) {
        banner.classList.remove("hidden");
    } else if (banner) {
        banner.classList.add("hidden");
    }

    // Si l'utilisateur accepte
    if (acceptBtn) {
        acceptBtn.addEventListener("click", () => {
            localStorage.setItem("cookieConsent", "accepted");
            banner.classList.add("hidden");
            enableCookies();
        });
    }

    // Si l'utilisateur refuse
    if (rejectBtn) {
        rejectBtn.addEventListener("click", () => {
            localStorage.setItem("cookieConsent", "rejected");
            banner.classList.add("hidden");
        });
    }
});

// Exemple de fonction d'activation des cookies
function enableCookies() {
    // ici, on peux charger le script Google Analytics
}