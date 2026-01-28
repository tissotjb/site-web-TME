function parallaxPortfolio() {
    const cards = document.querySelectorAll(".portfolio-card");

    cards.forEach(card => {
        const img = card.querySelector("img");
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.top + rect.height / 2;
        const screenCenter = window.innerHeight / 2;

        // Distance relative au centre de l'écran
        const offset = (screenCenter - cardCenter) / 5; // Ajuster pour l'effet

        img.style.transform = "translateY(${offset}px)";
    });
}

// Listener optimisé
let ticking = false;
window.addEventListener("scroll", () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            parallaxPortfolio();
            ticking = false;
        });
        ticking = true;
    }
});

// Appel initial
parallaxPortfolio();