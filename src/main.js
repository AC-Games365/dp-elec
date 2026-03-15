import './style.css'

document.addEventListener('DOMContentLoaded', () => {
  // Année dans le footer
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Gestion du formulaire de contact
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Désactiver le bouton pendant l'envoi
      const originalBtnText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Envoi en cours...
      `;

      try {
        const formData = new FormData(contactForm);
        
        const response = await fetch("https://formsubmit.co/ajax/delobepierre@gmail.com", {
          method: "POST",
          body: formData
        });

        const result = await response.json();

        if (result.success === "true" || response.ok) {
          // Succès
          contactForm.reset();
          formStatus.classList.remove('hidden', 'bg-red-50', 'text-red-700');
          formStatus.classList.add('bg-green-50', 'text-green-700', 'border', 'border-green-200');
          formStatus.innerHTML = `
            <p class="font-bold">Message envoyé avec succès !</p>
            <p class="text-sm mt-1">Merci de nous avoir contactés. Nous vous répondrons dans les plus brefs délais.</p>
          `;
        } else {
          throw new Error("Erreur lors de l'envoi");
        }
      } catch (error) {
        // Erreur
        formStatus.classList.remove('hidden', 'bg-green-50', 'text-green-700');
        formStatus.classList.add('bg-red-50', 'text-red-700', 'border', 'border-red-200');
        formStatus.innerHTML = `
          <p class="font-bold">Une erreur est survenue.</p>
          <p class="text-sm mt-1">Veuillez réessayer ou nous contacter directement par téléphone.</p>
        `;
      } finally {
        // Réactiver le bouton
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
        
        // Faire défiler vers le message
        formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }
});
