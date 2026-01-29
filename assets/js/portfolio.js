document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("portfolio-container");

  fetch("data/portfolio.json")
    .then(response => {
      if (!response.ok) throw new Error("Erreur de chargement du JSON");
      return response.json();
    })
    .then(data => {
      data.forEach(projet => {
        const card = document.createElement("article");
        card.classList.add("portfolio-card");

        card.innerHTML = `
          <div class="card-image">
            <img src="${projet.image}" alt="${projet.titre}">
          </div>
          <div class="card-content">
            <h3>${projet.titre}</h3>
            <p>${projet.description}</p>
            <p>${projet.adresse}</p>
            <div class="card-meta">
              <span>${projet.surface}</span>
            </div>
          </div>
        `;

        container.appendChild(card);
      });

      // 🎯 Apparition fluide avec Intersection Observer
      const observer = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              observer.unobserve(entry.target); // Pour éviter de le rejouer à chaque scroll
            }
          });
        },
        { threshold: 0.2 }
      );

      document.querySelectorAll(".portfolio-card").forEach(card => {
        observer.observe(card);
      });
    })
    .catch(error => {
      container.innerHTML = `<p class="error">Impossible de charger les projets 😕</p>`;
      console.error(error);
    });
});

