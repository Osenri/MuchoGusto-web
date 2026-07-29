// ===== Mobile nav toggle =====
const navToggleBtn = document.querySelector('.nav-toggle-btn');
const navLinks = document.querySelector('.nav-links');
if(navToggleBtn){
  navToggleBtn.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

// ===== Language toggle (EN / ES) =====
// State lives in memory for this page view; defaults to Spanish.
function setLang(lang){
  document.documentElement.setAttribute('lang', lang);
  document.querySelectorAll('.lang-toggle button').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
}
document.querySelectorAll('.lang-toggle button').forEach(btn => {
  btn.addEventListener('click', () => setLang(btn.dataset.lang));
});
// initialize default
setLang(document.documentElement.getAttribute('lang') || 'es');

// ===== Story reel: mouse-drag scroll for desktop =====
document.querySelectorAll('.reel').forEach(reel => {
  let isDown = false;
  let startX, scrollLeft;
  reel.addEventListener('mousedown', (e) => {
    isDown = true;
    reel.style.cursor = 'grabbing';
    startX = e.pageX - reel.offsetLeft;
    scrollLeft = reel.scrollLeft;
  });
  ['mouseleave','mouseup'].forEach(evt => reel.addEventListener(evt, () => {
    isDown = false;
    reel.style.cursor = 'grab';
  }));
  reel.addEventListener('mousemove', (e) => {
    if(!isDown) return;
    e.preventDefault();
    const x = e.pageX - reel.offsetLeft;
    const walk = (x - startX) * 1.2;
    reel.scrollLeft = scrollLeft - walk;
  });
});

// ===== Active nav link highlight =====
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  const href = a.getAttribute('href');
  if(href === currentPage) a.classList.add('active');
});

// ===== Contact form (front-end only demo) =====
const contactForm = document.querySelector('#contact-form');
if(contactForm){
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const original = btn.innerHTML;
    btn.innerHTML = document.documentElement.getAttribute('lang') === 'en' ? 'Sent' : 'Enviado';
    btn.disabled = true;
    setTimeout(() => {
      btn.innerHTML = original;
      btn.disabled = false;
      contactForm.reset();
    }, 2500);
  });
}
