import './style.css'

document.addEventListener('DOMContentLoaded', () => {
  // Année dans le footer
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // --- Gestion du bandeau Cookies ---
  const initCookieConsent = () => {
    const CONSENT_KEY = 'dp_elec_cookie_consent';
    
    // Vérifier si l'utilisateur a déjà répondu
    if (localStorage.getItem(CONSENT_KEY)) {
      return;
    }

    // Créer le bandeau
    const cookieBanner = document.createElement('div');
    cookieBanner.className = 'fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-2xl p-4 md:p-6 z-50 transform transition-transform duration-500 translate-y-full';
    cookieBanner.innerHTML = `
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div class="text-slate-600 text-sm md:text-base flex-1">
          <p class="font-bold text-slate-900 mb-1">🍪 Gestion des cookies</p>
          <p>
            Nous utilisons des cookies pour assurer le bon fonctionnement du site (notamment pour la sécurité via reCAPTCHA).
            En continuant votre navigation, vous acceptez l'utilisation de ces cookies.
          </p>
        </div>
        <div class="flex gap-3 whitespace-nowrap">
          <button id="cookie-accept" class="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-lg font-bold transition shadow-lg shadow-slate-900/20 text-sm">
            Accepter
          </button>
          <button id="cookie-decline" class="bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 px-6 py-3 rounded-lg font-bold transition text-sm">
            Refuser
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(cookieBanner);

    // Animation d'entrée
    setTimeout(() => {
      cookieBanner.classList.remove('translate-y-full');
    }, 1000);

    // Gestion des clics
    const acceptBtn = cookieBanner.querySelector('#cookie-accept');
    const declineBtn = cookieBanner.querySelector('#cookie-decline');

    const closeBanner = (accepted) => {
      cookieBanner.classList.add('translate-y-full');
      localStorage.setItem(CONSENT_KEY, accepted ? 'accepted' : 'declined');
      setTimeout(() => {
        cookieBanner.remove();
      }, 500);
    };

    acceptBtn.addEventListener('click', () => closeBanner(true));
    declineBtn.addEventListener('click', () => closeBanner(false));
  };

  initCookieConsent();


  // Gestion du bouton "Scroll to Top"
  const scrollToTopBtn = document.getElementById('scroll-to-top');
  
  if (scrollToTopBtn) {
    // Afficher/masquer le bouton selon le scroll
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.remove('opacity-0', 'invisible');
        scrollToTopBtn.classList.add('opacity-100', 'visible');
      } else {
        scrollToTopBtn.classList.add('opacity-0', 'invisible');
        scrollToTopBtn.classList.remove('opacity-100', 'visible');
      }
    });

    // Scroll vers le haut au clic
    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --- Gestion de la popup Bornes de Recharge ---
  const cardBornes = document.getElementById('card-bornes-recharge');
  const popupBornes = document.getElementById('popup-bornes');
  const closePopupBtn = document.getElementById('close-popup');
  const closePopupBtn2 = document.getElementById('close-popup-btn');
  const popupContent = document.getElementById('popup-content');

  if (cardBornes && popupBornes) {
    const openPopup = () => {
      popupBornes.classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
      setTimeout(() => {
        popupBornes.classList.remove('opacity-0');
        popupContent.classList.remove('scale-95');
      }, 10);
    };

    const closePopup = () => {
      popupBornes.classList.add('opacity-0');
      popupContent.classList.add('scale-95');
      setTimeout(() => {
        popupBornes.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
      }, 300);
    };

    cardBornes.addEventListener('click', openPopup);
    closePopupBtn.addEventListener('click', closePopup);
    closePopupBtn2.addEventListener('click', closePopup);

    // Fermer en cliquant en dehors
    popupBornes.addEventListener('click', (e) => {
      if (e.target === popupBornes) {
        closePopup();
      }
    });

    // Fermer avec la touche Echap
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !popupBornes.classList.contains('hidden')) {
        closePopup();
      }
    });
  }

  // Gestion du formulaire de contact
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Vérifier que le reCAPTCHA a été coché
      const recaptchaResponse = document.querySelector('.g-recaptcha iframe');
      // Note: grecaptcha est injecté globalement par le script Google
      // eslint-disable-next-line no-undef
      if (!recaptchaResponse || (typeof grecaptcha !== 'undefined' && !grecaptcha.getResponse())) {
        formStatus.classList.remove('hidden', 'bg-green-50', 'text-green-700');
        formStatus.classList.add('bg-red-50', 'text-red-700', 'border', 'border-red-200');
        formStatus.innerHTML = `
          <p class="font-bold">Veuillez cocher "Je ne suis pas un robot"</p>
        `;
        formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        return;
      }
      
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
          if (typeof grecaptcha !== 'undefined') grecaptcha.reset();
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
