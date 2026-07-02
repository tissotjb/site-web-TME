document.addEventListener("DOMContentLoaded", () => {
  fetch("data/portfolio.json")
    .then(response => {
      if (!response.ok) throw new Error("Erreur de chargement du JSON");
      return response.json();
    })
    .then(data => {
      data.forEach(projet => {
        const container = document.getElementById(projet.categorie);
        const card = document.createElement("article");
        card.classList.add("portfolio-card");

        card.innerHTML = `
          <div class="card-image">
            <img src="${projet.image}" alt="${projet.titre}" loading="lazy">
          </div>
          <div class="card-content">
            <h3>${projet.titre}</h3>
            <p>${projet.description}</p>
          </div>
        `;

        card.addEventListener("click", () => openModal(projet))

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
      document.querySelectorAll(".portfolio-grid").forEach(grid => {
        grid.innerHTML = `<p class="error">Impossible de charger les projets 😕</p>`;
      });
      console.error(error);
    });
  
  const modal = document.getElementById("portfolio-modal");
  const modalBody = modal.querySelector(".modal-body");
  const closeBtn = modal.querySelector(".modal-close");
  const overlay = modal.querySelector(".modal-overlay");

  function openModal(projet) {
    modalBody.innerHTML = `
    <h2>${projet.titre}</h2>
    <img src="${projet.image}" alt="${projet.titre}" style="width:100%; margin-bottom:1rem;">
    <p><strong>Description :</strong> ${projet.description}</p>
    <p><strong>Adresse :</strong> ${projet.adresse}</p>
    <p><strong>Surface :</strong> ${projet.surface}</p>
    `;

    modal.classList.add("show");
  }

  // Fermeture
  function closeModal() {
    modal.classList.remove("show");
  }

  closeBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click", closeModal);

  // ESC clavier
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
});

