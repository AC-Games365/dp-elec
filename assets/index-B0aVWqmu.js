(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})(),document.addEventListener(`DOMContentLoaded`,()=>{let e=document.getElementById(`year`);e&&(e.textContent=new Date().getFullYear()),(()=>{let e=`dp_elec_cookie_consent`;if(localStorage.getItem(e))return;let t=document.createElement(`div`);t.className=`fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-2xl p-4 md:p-6 z-50 transform transition-transform duration-500 translate-y-full`,t.innerHTML=`
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
    `,document.body.appendChild(t),setTimeout(()=>{t.classList.remove(`translate-y-full`)},1e3);let n=t.querySelector(`#cookie-accept`),r=t.querySelector(`#cookie-decline`),i=n=>{t.classList.add(`translate-y-full`),localStorage.setItem(e,n?`accepted`:`declined`),setTimeout(()=>{t.remove()},500)};n.addEventListener(`click`,()=>i(!0)),r.addEventListener(`click`,()=>i(!1))})();let t=document.getElementById(`scroll-to-top`);t&&(window.addEventListener(`scroll`,()=>{window.pageYOffset>300?(t.classList.remove(`opacity-0`,`invisible`),t.classList.add(`opacity-100`,`visible`)):(t.classList.add(`opacity-0`,`invisible`),t.classList.remove(`opacity-100`,`visible`))}),t.addEventListener(`click`,()=>{window.scrollTo({top:0,behavior:`smooth`})}));let n=document.getElementById(`contact-form`),r=document.getElementById(`submit-btn`),i=document.getElementById(`form-status`);n&&n.addEventListener(`submit`,async e=>{if(e.preventDefault(),!document.querySelector(`.g-recaptcha iframe`)||typeof grecaptcha<`u`&&!grecaptcha.getResponse()){i.classList.remove(`hidden`,`bg-green-50`,`text-green-700`),i.classList.add(`bg-red-50`,`text-red-700`,`border`,`border-red-200`),i.innerHTML=`
          <p class="font-bold">Veuillez cocher "Je ne suis pas un robot"</p>
        `,i.scrollIntoView({behavior:`smooth`,block:`nearest`});return}let t=r.textContent;r.disabled=!0,r.innerHTML=`
        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Envoi en cours...
      `;try{let e=new FormData(n),t=await fetch(`https://formsubmit.co/ajax/delobepierre@gmail.com`,{method:`POST`,body:e});if((await t.json()).success===`true`||t.ok)n.reset(),typeof grecaptcha<`u`&&grecaptcha.reset(),i.classList.remove(`hidden`,`bg-red-50`,`text-red-700`),i.classList.add(`bg-green-50`,`text-green-700`,`border`,`border-green-200`),i.innerHTML=`
            <p class="font-bold">Message envoyé avec succès !</p>
            <p class="text-sm mt-1">Merci de nous avoir contactés. Nous vous répondrons dans les plus brefs délais.</p>
          `;else throw Error(`Erreur lors de l'envoi`)}catch{i.classList.remove(`hidden`,`bg-green-50`,`text-green-700`),i.classList.add(`bg-red-50`,`text-red-700`,`border`,`border-red-200`),i.innerHTML=`
          <p class="font-bold">Une erreur est survenue.</p>
          <p class="text-sm mt-1">Veuillez réessayer ou nous contacter directement par téléphone.</p>
        `}finally{r.disabled=!1,r.textContent=t,i.scrollIntoView({behavior:`smooth`,block:`nearest`})}})});