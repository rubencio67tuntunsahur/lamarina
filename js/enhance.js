// ══════════════════════════════════════════════
// MEJORAS VISUALES DEL REDISEÑO
// (no toca la lógica de app.js: solo añade efectos de interfaz)
// ══════════════════════════════════════════════
(function () {
  const nav = document.getElementById('navbar');

  // Navbar transparente sobre el hero y "cristal" al hacer scroll
  function actualizarNav() {
    nav.classList.toggle('nav-scrolled', window.scrollY > 40);
  }
  actualizarNav();
  window.addEventListener('scroll', actualizarNav, { passive: true });

  // El menú móvil necesita la barra opaca mientras está abierto
  const _toggleMenu = window.toggleMenu;
  const _cerrarMenu = window.cerrarMenu;
  window.toggleMenu = function () {
    _toggleMenu();
    document.body.classList.toggle('menu-abierto', document.getElementById('navLinks').classList.contains('abierto'));
  };
  window.cerrarMenu = function () {
    _cerrarMenu();
    document.body.classList.remove('menu-abierto');
  };

  // Animación de aparición al entrar en pantalla
  const elementos = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entradas) => {
      entradas.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('en-vista');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    // Pequeño escalonado entre tarjetas hermanas
    elementos.forEach(el => {
      const hermanos = [...el.parentElement.children].filter(h => h.classList.contains('reveal'));
      const i = hermanos.indexOf(el);
      if (hermanos.length > 2) el.style.transitionDelay = (Math.min(i, 8) * 70) + 'ms';
      obs.observe(el);
    });
  } else {
    elementos.forEach(el => el.classList.add('en-vista'));
  }

  // Fondo del hero: una de las fotos destacadas de la galería
  const heroFoto = document.getElementById('heroFoto');
  function ponerFotoHero() {
    if (!heroFoto || heroFoto.dataset.puesta || typeof galeria === 'undefined') return;
    const destacadas = galeria.filter(g => g.destacada && g.url);
    if (!destacadas.length) return;
    const foto = destacadas[Math.floor(Math.random() * destacadas.length)];
    const img = new Image();
    img.onload = () => {
      heroFoto.style.backgroundImage = `url('${foto.url}')`;
      heroFoto.classList.add('visible');
    };
    img.src = foto.url;
    heroFoto.dataset.puesta = '1';
  }
  const _renderGaleriaPortada = window.renderGaleriaPortada;
  window.renderGaleriaPortada = function () {
    _renderGaleriaPortada();
    ponerFotoHero();
  };
  ponerFotoHero();
})();
