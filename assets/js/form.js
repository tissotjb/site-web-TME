// assets/js/form.js

// src="https://cdn.emailjs.com/dist/email.min.js"

// Service ID : service_v1z5l1l
// Template ID : template_k9iitxe
// User ID / Public Key : zlXXGS5vnWbEDj07X

// initialisation EmailJS
// emailjs.init("zlXXGS5vnWbEDj07X");  // User ID / Public Key

// const form = document.getElementById("contactForm");

// form.addEventListener("submit", function(event) {
//     event.preventDefault(); // Empêche le rechargement de la page

    // Envoi via EmailJS
//     emailjs.sendForm("service_v1z5l1l", "template_k9iitxe", this) //Service ID / Template ID
//       .then(() => {
//         alert("Message envoyé avec succès !");
//         form.reset(); // Vide le formulaire
//       }, (error) => {
//         console.error("Erreur:", error);
//         alert("Erreur lors de l'envoi, veuillez réessayer.");
//       });
// });

// Script pour envoi du formulaire sans rechargement de la page

const form = document.getElementById("contactForm");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const formData = new FormData(form);

  fetch("../../forms/sendmail.php", {
    method:"POST",
    body: formData
  })
  .then(response => response.text())
  .then(data => {
    alert("Message envoyé avec succès");
    form.reset();
  })
  .catch(error => {
    console.error(error);
    alert("Erreur lors de l'envoi, veuillez réessayer.");
  });
});