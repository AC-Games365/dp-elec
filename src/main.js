import './style.css'

document.addEventListener('DOMContentLoaded', () => {
  // Année dans le footer
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // --- Gestion du bandeau Cookies & Google Analytics ---
  const GTM_ID = 'GTM-PLQ3672C'; // ID Google Tag Manager fourni par le client

  const loadGTM = () => {
    if (window.dataLayer && window.dataLayer.find(e => e.event === 'gtm.js')) return;

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });

    const f = document.getElementsByTagName('script')[0];
    const j = document.createElement('script');
    j.async = true;
    j.src = 'https://www.googletagmanager.com/gtm.js?id=' + GTM_ID;
    f.parentNode.insertBefore(j, f);
  };

  const initCookieConsent = () => {
    const CONSENT_KEY = 'dp_elec_cookie_consent';
    const currentConsent = localStorage.getItem(CONSENT_KEY);

    if (currentConsent === 'accepted') {
      loadGTM();
      return;
    }

    if (currentConsent) {
      return;
    }

    const cookieBanner = document.createElement('div');
    cookieBanner.className = 'fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-2xl p-4 md:p-6 z-50 transform transition-transform duration-500 translate-y-full';
    cookieBanner.innerHTML = `
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div class="text-slate-600 text-sm md:text-base flex-1">
          <p class="font-bold text-slate-900 mb-1">🍪 Gestion des cookies</p>
          <p>
            Nous utilisons des cookies pour assurer le bon fonctionnement du site (sécurité via reCAPTCHA) et pour analyser notre audience via Google Analytics.
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

    setTimeout(() => {
      cookieBanner.classList.remove('translate-y-full');
    }, 1000);

    const acceptBtn = cookieBanner.querySelector('#cookie-accept');
    const declineBtn = cookieBanner.querySelector('#cookie-decline');

    const closeBanner = (accepted) => {
      cookieBanner.classList.add('translate-y-full');
      localStorage.setItem(CONSENT_KEY, accepted ? 'accepted' : 'declined');
      if (accepted) {
        loadGTM();
      }
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
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.remove('opacity-0', 'invisible');
        scrollToTopBtn.classList.add('opacity-100', 'visible');
      } else {
        scrollToTopBtn.classList.add('opacity-0', 'invisible');
        scrollToTopBtn.classList.remove('opacity-100', 'visible');
      }
    });

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
    // FIX: null guards — ces IDs peuvent ne pas exister dans le HTML
    if (closePopupBtn) closePopupBtn.addEventListener('click', closePopup);
    if (closePopupBtn2) closePopupBtn2.addEventListener('click', closePopup);

    popupBornes.addEventListener('click', (e) => {
      if (e.target === popupBornes) {
        closePopup();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !popupBornes.classList.contains('hidden')) {
        closePopup();
      }
    });
  }

  // --- Gestion de la popup Batteries ---
  const cardBatterie = document.getElementById('card-batterie');
  const popupBatterie = document.getElementById('popup-batterie');
  const closePopupBatterieBtn = document.getElementById('close-popup-batterie');
  const closePopupBatterieBtn2 = document.getElementById('close-popup-btn-batterie');
  const popupContentBatterie = document.getElementById('popup-content-batterie');

  if (cardBatterie && popupBatterie) {
    const openPopupBatterie = () => {
      popupBatterie.classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
      setTimeout(() => {
        popupBatterie.classList.remove('opacity-0');
        popupContentBatterie.classList.remove('scale-95');
      }, 10);
    };

    const closePopupBatterie = () => {
      popupBatterie.classList.add('opacity-0');
      popupContentBatterie.classList.add('scale-95');
      setTimeout(() => {
        popupBatterie.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
      }, 300);
    };

    cardBatterie.addEventListener('click', openPopupBatterie);
    // FIX: null guards — ces IDs peuvent ne pas exister dans le HTML
    if (closePopupBatterieBtn) closePopupBatterieBtn.addEventListener('click', closePopupBatterie);
    if (closePopupBatterieBtn2) closePopupBatterieBtn2.addEventListener('click', closePopupBatterie);

    popupBatterie.addEventListener('click', (e) => {
      if (e.target === popupBatterie) {
        closePopupBatterie();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !popupBatterie.classList.contains('hidden')) {
        closePopupBatterie();
      }
    });

    // --- Logique du Slider de Batteries ---
    let currentSlide = 1;
    const slide1 = document.getElementById('battery-slide-1');
    const slide2 = document.getElementById('battery-slide-2');
    const dot1 = document.getElementById('battery-dot-1');
    const dot2 = document.getElementById('battery-dot-2');
    const prevBtn = document.getElementById('prev-battery');
    const nextBtn = document.getElementById('next-battery');

    const updateSlider = (index) => {
      currentSlide = index;
      if (currentSlide === 1) {
        slide1.className = 'absolute inset-0 transition-all duration-700 ease-in-out opacity-100 transform translate-x-0';
        slide2.className = 'absolute inset-0 transition-all duration-700 ease-in-out opacity-0 transform translate-x-full';
        dot1.className = 'w-12 h-2 rounded-full bg-azure-600 transition-all duration-300 shadow-md shadow-azure-600/20';
        dot2.className = 'w-12 h-2 rounded-full bg-slate-200 transition-all duration-300 hover:bg-slate-300';
      } else {
        slide1.className = 'absolute inset-0 transition-all duration-700 ease-in-out opacity-0 transform -translate-x-full';
        slide2.className = 'absolute inset-0 transition-all duration-700 ease-in-out opacity-100 transform translate-x-0';
        dot1.className = 'w-12 h-2 rounded-full bg-slate-200 transition-all duration-300 hover:bg-slate-300';
        dot2.className = 'w-12 h-2 rounded-full bg-azure-600 transition-all duration-300 shadow-md shadow-azure-600/20';
      }
    };

    if (nextBtn) nextBtn.addEventListener('click', () => updateSlider(currentSlide === 1 ? 2 : 1));
    if (prevBtn) prevBtn.addEventListener('click', () => updateSlider(currentSlide === 1 ? 2 : 1));
    if (dot1) dot1.addEventListener('click', () => updateSlider(1));
    if (dot2) dot2.addEventListener('click', () => updateSlider(2));
  }

  // Gestion du formulaire de contact
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const recaptchaResponse = document.querySelector('.g-recaptcha iframe');
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
        formStatus.classList.remove('hidden', 'bg-green-50', 'text-green-700');
        formStatus.classList.add('bg-red-50', 'text-red-700', 'border', 'border-red-200');
        formStatus.innerHTML = `
          <p class="font-bold">Une erreur est survenue.</p>
          <p class="text-sm mt-1">Veuillez réessayer ou nous contacter directement par téléphone.</p>
        `;
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
        formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }
});