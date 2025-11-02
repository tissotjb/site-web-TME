// /assets/js/includes.js

//Fonction pour charger un fragment HTML (header, footer, etc.)
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-include]").forEach(el => {
        const file = el.getAttribute("data-include");
        fetch(file)
            .then(res => res.text())
            .then(data => {
                el.innerHTML = data;
                
                // ===== CODE MENU BURGER =====
                const burger = el.querySelector("#burger");
                const navLinks = el.querySelector("#nav-links");

                if (burger && navLinks) {
                    burger.addEventListener("click", () => {
                        navLinks.classList.toggle("show");
                        burger.classList.toogle("active");
                    });
                }

                // ===== HEADER SCROLL
                const header = document.querySelector('header');
                if (header) {
                    window.addEventListener("scroll", () => {
                        if (window.scrollY > 50) {
                            header.classList.add("scrolled");
                        } else {
                            header.classList.remove("scrolled");
                        }
                    });
                }
            })
            .catch(err => console.error("Erreur chargement :", file, err));
    })
})

// Script pour menu Burger

document.addEventListener('DOMContentLoaded', () => {
  const burger = document.getElementById('burger');
  const navLinks = document.getElementById('nav-links');

  burger.addEventListener('click', () => {
    navLinks.classList.toggle('show');
    burger.classList.toggle('active');
  });
});

//Fonction pour charger le loader commun à toutes les pages
async function includeLoader() {
    const response = await fetch("./partials/loader.html");
    const html = await response.text();
    document.body.insertAdjacentHTML("afterbegin", html);
}
includeLoader();

//Fonction pour masquer le loader
function hideLoader() {
    const loader = document.getElementById("loader");
    const logo = document.querySelector(".loader-logo");

    // Appliquer le zoom-out avant de masquer
    if (logo) {
        logo.style.animation = "logoZoomOut 0.8s ease forwards";
    }

    if(loader && !loader.classList.contains("hidden")) {
        loader.classList.add("hidden");
    }
}

// Dès que le DOM est prêt (HTML chargé)
document.addEventListener("DOMContentLoaded", () => {
    // Masquer le loader après un petit délai pour fluidité
    setTimeout(hideLoader, 1500);
})

//Sécurité : si certaines ressources traînent trop
// on masque le loader au bout de 3 secondes
setTimeout(hideLoader, 3000);

// Fonction pour charger la bannière des cookies
async function includeCookieBanner() {
    const response = await fetch("./partials/cookies-banner.html");
    const html = await response.text();
    document.body.insertAdjacentHTML("beforeend", html);
}
includeCookieBanner()

// Barre de progression de lecture
window.addEventListener("scroll", () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;
    const progressBar = document.getElementById("scroll-progress");

    if (progressBar) {
        progressBar.style.height = scrollPercent + "%";
    }
});