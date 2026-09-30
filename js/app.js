
// ══════════════════════════════════════════════
// CONEXIÓN CON EL BACKEND (carpeta /api)
// ══════════════════════════════════════════════
const API = 'api';
let TOKEN = sessionStorage.getItem('falla_token') || '';

// ══════════════════════════════════════════════
// IDIOMA (Español / Valenciano)
// ══════════════════════════════════════════════
let idiomaActual = (function () {
  try { return localStorage.getItem('falla_idioma') || 'es'; } catch (e) { return 'es'; }
})();
function localeActual() { return idiomaActual === 'va' ? 'ca-ES' : 'es-ES'; }

// Diccionario ES → VA para todo el texto fijo de la web (menús, títulos,
// botones, formularios...). El contenido que escribe el admin (noticias,
// eventos, biografías, pies de foto) NO se traduce automáticamente: si no
// coincide exactamente con una clave de aquí, se queda tal cual en español.
const TRADUCCIONES = {
  // Navegación
  'Asociación Cultural': 'Associació Cultural',
  'Historia': 'Història',
  'Noticias': 'Notícies',
  'Actividades': 'Activitats',
  'Eventos': 'Esdeveniments',
  'Falleros': 'Fallers',
  'Galería': 'Galeria',
  'Únete': 'Uneix-te',
  '🏛️ Portal Fallero': '🏛️ Portal Faller',
  '🔐 Modo Administrador Activo': '🔐 Mode Administrador Actiu',

  // Hero
  'Tradición, fuego y alegría valenciana. Una falla con alma de mar y corazón de pueblo, celebrando la fiesta más grande del mundo.':
    'Tradició, foc i alegria valenciana. Una falla amb ànima de mar i cor de poble, celebrant la festa més gran del món.',
  '🔥 Cuenta Atrás': '🔥 Compte Arrere',
  '🏛️ Portal del Fallero': '🏛️ Portal del Faller',
  'Descubre': 'Descobreix',

  // Historia
  'Nuestros Orígenes': 'Els Nostres Orígens',
  'Una historia de fuego y tradición': 'Una història de foc i tradició',
  'Desde nuestra fundación, la Falla La Marina ha sido símbolo de la cultura valenciana en el barrio.':
    'Des de la nostra fundació, la Falla La Marina ha sigut símbol de la cultura valenciana al barri.',
  'Raíces en el barrio': 'Arrels al barri',
  'La Falla La Marina nació con el espíritu de los falleros que aman su tierra y sus tradiciones. El ancla de nuestro escudo representa la vinculación con el mar, con el esfuerzo y con la firmeza de nuestra identidad valenciana.':
    "La Falla La Marina va nàixer amb l'esperit dels fallers que estimen la seua terra i les seues tradicions. L'àncora del nostre escut representa la vinculació amb la mar, amb l'esforç i amb la fermesa de la nostra identitat valenciana.",
  'Año tras año, nuestros falleros y falleras trabajan con ilusión para crear una falla que refleje los valores de nuestra comunidad: creatividad, crítica y festejo.':
    "Any rere any, els nostres fallers i falleres treballen amb il·lusió per a crear una falla que reflectisca els valors de la nostra comunitat: creativitat, crítica i festa.",
  'Las dos banderas de nuestro escudo —la española y la valenciana— simbolizan el orgullo de nuestras raíces y la unión de nuestros falleros bajo el mismo sueño.':
    "Les dues banderes del nostre escut —l'espanyola i la valenciana— simbolitzen l'orgull de les nostres arrels i la unió dels nostres fallers davall el mateix somni.",
  'años de historia': "anys d'història",
  'Premios en Sección Especial': 'Premis en Secció Especial',

  // Noticias
  'Actualidad': 'Actualitat',
  'Últimas Noticias': 'Últimes Notícies',
  'Mantente al día con todo lo que ocurre en la Falla La Marina. Haz clic en una noticia para leerla completa.':
    "Mantín-te al dia amb tot el que passa a la Falla La Marina. Fes clic en una notícia per a llegir-la completa.",
  'Leer noticia completa': 'Llegir notícia completa',
  '🔒 Título oculto': '🔒 Títol ocult',
  'Esta noticia todavía guarda su sorpresa. Vuelve pronto para descubrirla.':
    'Esta notícia encara guarda la seua sorpresa. Torna prompte per a descobrir-la.',
  '🔒 Noticia bloqueada': '🔒 Notícia bloquejada',
  'Disponible el': 'Disponible el',
  '✨ Esta noticia todavía guarda su sorpresa. Vuelve el': "✨ Esta notícia encara guarda la seua sorpresa. Torna el",
  'para leerla completa.': 'per a llegir-la completa.',
  '🔒 Programada': '🔒 Programada',
  'Cargando noticias...': 'Carregant notícies...',
  'Cargando representantes...': 'Carregant representants...',
  'Cargando galería...': 'Carregant galeria...',

  // Actividades
  'Todo el año': "Tot l'any",
  'Nuestras Actividades': 'Les Nostres Activitats',
  'Mucho más que una falla. Somos una familia que celebra todo el año.':
    "Molt més que una falla. Som una família que celebra tot l'any.",
  'Mascletàs': 'Mascletades',
  'Vibramos cada mediodía con la pólvora y el fuego en las fiestas grandes de marzo.':
    'Vibrem cada migdia amb la pólvora i el foc en les festes grans de març.',
  'Ofrenda': 'Ofrena',
  'Llevamos flores a la Virgen con todo el orgullo de nuestra comisión engalanada.':
    "Portem flors a la Mare de Déu amb tot l'orgull de la nostra comissió engalanada.",
  'Paellas y Cenas': 'Paelles i Sopars',
  'Nos reunimos a comer juntos durante todo el año. La mejor excusa para estar en familia.':
    "Ens reunim per a menjar junts durant tot l'any. La millor excusa per a estar en família.",
  'Deportes': 'Esports',
  'Campeonatos y actividades deportivas para los falleros de todas las edades.':
    'Campionats i activitats esportives per als fallers de totes les edats.',
  'Fiestas': 'Festes',
  'Verbenas, bailes y celebraciones para que el espíritu fallero dure todo el año.':
    "Revetles, balls i celebracions perquè l'esperit faller dure tot l'any.",
  'Infantil': 'Infantil',
  'Actividades especiales para los más pequeños de la falla, los falleros del futuro.':
    'Activitats especials per als més menuts de la falla, els fallers del futur.',
  'Cultura': 'Cultura',
  'Tradiciones, actos culturales y actividades que mantienen viva la esencia fallera durante todo el año.':
    "Tradicions, actes culturals i activitats que mantenen viva l'essència fallera durant tot l'any.",
  'La fiesta del año con música remember, temazos inolvidables y baile sin parar hasta el último minuto.':
    "La festa de l'any amb música remember, temes inoblidables i ball sense parar fins a l'últim minut.",

  // Calendario
  'Agenda Fallera': 'Agenda Fallera',
  'Calendario de Eventos': "Calendari d'Esdeveniments",
  'Todos los actos y eventos de la Falla La Marina. ¡No te pierdas ninguno!':
    "Tots els actes i esdeveniments de la Falla La Marina. No et perdes cap!",
  'Lun': 'Dl', 'Mar': 'Dt', 'Mié': 'Dc', 'Jue': 'Dj', 'Vie': 'Dv', 'Sáb': 'Ds', 'Dom': 'Dg',
  '📅 Próximos Eventos': '📅 Pròxims Esdeveniments',
  'No hay eventos próximos programados.': 'No hi ha esdeveniments pròxims programats.',
  'Gestión de Eventos': "Gestió d'Esdeveniments",
  '➕ Añadir nuevo evento': "➕ Afegir nou esdeveniment",

  // Cuenta atrás
  '🔥 Cuenta atrás para Les Falles 2027': '🔥 Compte arrere per a Les Falles 2027',
  'El fuego más esperado del año. La noche en que todo arde.': 'El foc més esperat de l\'any. La nit en què tot crema.',
  'Días': 'Dies', 'Horas': 'Hores', 'Min': 'Min', 'Seg': 'Seg',

  // Falleros
  'Nuestra Gente': 'La Nostra Gent',
  'Los Falleros de La Marina': 'Els Fallers de La Marina',
  'Una gran familia unida por la tradición y el amor a les falles.':
    "Una gran família unida per la tradició i l'amor a les falles.",
  'Falleros Adultos': 'Fallers Adults',
  'Falleros Infantiles': 'Fallers Infantils',
  'Años de Historia': "Anys d'Història",
  'Premios Obtenidos': 'Premis Obtinguts',
  'Representantes': 'Representants',

  // Carnet
  'Tu Identidad Fallera': 'La Teua Identitat Fallera',
  '🪪 Genera tu Carnet Fallero': '🪪 Genera el Teu Carnet Faller',
  'Crea tu carnet digital y tu marco para Instagram personalizados. ¡Descárgalos y compártelos!':
    "Crea el teu carnet digital i el teu marc per a Instagram personalitzats. Descarrega'ls i comparteix-los!",
  'Nombre completo': 'Nom complet',
  'Cargo o categoría': 'Càrrec o categoria',
  'Ejercicio': 'Exercici',
  'Tu foto': 'La teua foto',
  '(opcional)': '(opcional)',
  '📷 Subir foto de perfil': '📷 Puja foto de perfil',
  'Color del carnet': 'Color del carnet',
  '⬇️ Descargar carnet': '⬇️ Descarregar carnet',
  '🪪 Carnet fallero': '🪪 Carnet faller',

  // Galería
  'Recuerdos': 'Records',
  'Galería de Imágenes': 'Galeria d\'Imatges',
  '📷 Galería de Imágenes': '📷 Galeria d\'Imatges',
  'Momentos únicos de nuestra falla a lo largo de los años.': 'Moments únics de la nostra falla al llarg dels anys.',
  'Ver galería completa': 'Veure galeria completa',
  '📤 Subir fotos': '📤 Pujar fotos',
  'Todavía no se ha subido ninguna foto.': 'Encara no s\'ha pujat cap foto.',

  // Contacto
  'Únete a Nosotros': 'Uneix-te a Nosaltres',
  'Contacta con la Falla': 'Contacta amb la Falla',
  '¿Quieres ser fallero/a? ¿Tienes alguna pregunta? Escríbenos.': 'Vols ser faller/a? Tens alguna pregunta? Escriu-nos.',
  'Información de contacto': 'Informació de contacte',
  'Dirección': 'Adreça',
  'Email': 'Correu electrònic',
  'Teléfono': 'Telèfon',
  'Casal Fallero': 'Casal Faller',
  'Correo electrónico': 'Correu electrònic',
  'Motivo del contacto': 'Motiu del contacte',
  'Selecciona una opción...': 'Selecciona una opció...',
  'Información general': 'Informació general',
  'Colaboración o patrocinio': "Col·laboració o patrocini",
  'Otro': 'Un altre',
  'Mensaje': 'Missatge',
  'Enviar Mensaje ✉️': 'Enviar Missatge ✉️',
  '✅ ¡Mensaje enviado! Nos pondremos en contacto contigo pronto.': 'Missatge enviat! Ens posarem en contacte amb tu prompte.',

  // Footer
  'Asociación Cultural Falla La Marina': 'Associació Cultural Falla La Marina',
  'Inicio': 'Inici',
  'Les Falles': 'Les Falles',
  'Contacto': 'Contacte',
  'Diseñado y desarrollado por': 'Dissenyat i desenvolupat per',

  // Cookies
  'Esta web utiliza cookies propias para mejorar tu experiencia de navegación. Al continuar, aceptas nuestra':
    'Esta web utilitza cookies pròpies per a millorar la teua experiència de navegació. En continuar, acceptes la nostra',
  'Política de Privacidad y Términos de Uso': "Política de Privacitat i Termes d'Ús",
  'Solo necesarias': 'Només necessàries',
  'Aceptar todo ✓': 'Acceptar tot ✓',

  // Acceso administrador / portal fallero
  '🔐 Acceso Administrador': '🔐 Accés Administrador',
  'Usuario': 'Usuari',
  'Contraseña': 'Contrasenya',
  '🔑 Acceso Falleros': '🔑 Accés Fallers',
  'Cerrar sesión': 'Tancar sessió',
  'Evento al que quieres apuntarte': "Esdeveniment al qual vols apuntar-te",
  'Comentarios o necesidades especiales': 'Comentaris o necessitats especials',
  '👨‍👩‍👧 Apuntar a tu familia': '👨‍👩‍👧 Apuntar la teua família',
  '¿Quieres apuntar también a alguien de tu familia? Marca a todos los que quieras inscribir.': 'Vols apuntar també algú de la teua família? Marca tots els que vulgues inscriure.',
  'Inscribir ✓': 'Inscriure ✓',
  '(tú)': '(tu)',
  'Ya inscrito': 'Ja inscrit',

  // Modal evento (admin)
  'Nombre del evento *': "Nom de l'esdeveniment *",
  'Fecha *': 'Data *',
  'Hora': 'Hora',
  'Lugar': 'Lloc',
  'Descripción': 'Descripció',
  'Categoría': 'Categoria',
  'Color en calendario': 'Color en calendari',

  // Botones comunes del panel admin
  '✏️ Editar': '✏️ Editar',
  '💾 Guardar cambios': '💾 Guardar canvis',
  'Cancelar': 'Cancel·lar',
  '✕ Cancelar': '✕ Cancel·lar',
  'Eliminar': 'Eliminar',
  '🗑️ Eliminar noticia': '🗑️ Eliminar notícia',
};

// Placeholders de campos (se gestionan aparte porque no son texto visible)
const TRADUCCIONES_PLACEHOLDER = {
  'Ej: María García López': 'Ex: Maria Garcia López',
  'Tu nombre y apellidos': 'El teu nom i cognoms',
  'Escribe tu mensaje aquí...': 'Escriu el teu missatge ací...',
  'Usuario': 'Usuari',
  'Contraseña': 'Contrasenya',
  'Tu usuario': 'El teu usuari',
  'Tu contraseña': 'La teua contrasenya',
  'Alergias, necesidades especiales, acompañantes...': "Al·lèrgies, necessitats especials, acompanyants...",
  'Ej: Paella de falla': 'Ex: Paella de falla',
  'Ej: Casal Fallero': 'Ex: Casal Faller',
  'Describe el evento...': "Descriu l'esdeveniment...",
};

// Normaliza espacios/saltos de línea para que la clave coincida sin importar
// la indentación del HTML (el navegador los colapsa igual al pintarlos)
function normalizarTexto(s) { return s.trim().replace(/\s+/g, ' '); }

const _idiomaOriginales = new WeakMap();

function traducirTextosVisibles(idioma) {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(nodo) {
      const padre = nodo.parentElement;
      if (!padre) return NodeFilter.FILTER_REJECT;
      if (padre.closest('script,style')) return NodeFilter.FILTER_REJECT;
      if (!nodo.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    }
  });
  let nodo;
  while ((nodo = walker.nextNode())) {
    if (!_idiomaOriginales.has(nodo)) _idiomaOriginales.set(nodo, nodo.nodeValue);
    const original = _idiomaOriginales.get(nodo);
    const clave = normalizarTexto(original);
    const nuevoValor = (idioma === 'va' && TRADUCCIONES[clave]) ? TRADUCCIONES[clave] : original;
    if (nodo.nodeValue !== nuevoValor) nodo.nodeValue = nuevoValor; // evita mutaciones "en vacío"
  }

  document.querySelectorAll('[placeholder]').forEach(el => {
    if (!_idiomaOriginales.has(el)) _idiomaOriginales.set(el, el.getAttribute('placeholder'));
    const original = _idiomaOriginales.get(el);
    const nuevoValor = (idioma === 'va' && TRADUCCIONES_PLACEHOLDER[original]) ? TRADUCCIONES_PLACEHOLDER[original] : original;
    if (el.getAttribute('placeholder') !== nuevoValor) el.setAttribute('placeholder', nuevoValor);
  });
}

// Vigila cualquier cambio en la página (nuevas noticias, paneles admin,
// tarjetas que se repintan al editar...) y vuelve a traducir automáticamente
// si estamos en valenciano — así no hay que acordarse de llamarlo a mano
// cada vez que se añade una función de renderizado nueva.
let _traduciendoAhora = false;
const _observadorIdioma = new MutationObserver(() => {
  if (_traduciendoAhora || idiomaActual !== 'va') return;
  _traduciendoAhora = true;
  traducirTextosVisibles('va');
  _traduciendoAhora = false;
});
_observadorIdioma.observe(document.body, { childList: true, subtree: true, characterData: true });

function actualizarBotonIdioma() {
  document.querySelectorAll('.nav-idioma-btn').forEach(btn => {
    btn.textContent = idiomaActual === 'va' ? '🌐 ES' : '🌐 VA';
    btn.title = idiomaActual === 'va' ? 'Canviar a castellà' : 'Cambiar a valenciano';
  });
}

function aplicarIdioma(idioma) {
  idiomaActual = idioma;
  document.documentElement.lang = idioma === 'va' ? 'ca' : 'es';
  try { localStorage.setItem('falla_idioma', idioma); } catch (e) { /* modo privado, sin storage */ }

  // Volvemos a pintar las partes generadas por JS (así el texto fijo que
  // incluyen sus plantillas también pasa por el diccionario más abajo)
  renderNoticias();
  renderCalendario();
  renderProximosEventos();
  renderListaEventosPortal();
  renderRepresentantes();
  renderGaleriaPortada();

  traducirTextosVisibles(idioma);
  actualizarBotonIdioma();
}

function cambiarIdioma() {
  aplicarIdioma(idiomaActual === 'va' ? 'es' : 'va');
}

async function api(ruta, opciones = {}) {
  const cfg = { method: opciones.method || 'GET', headers: {} };
  if (TOKEN) {
    cfg.headers['Authorization'] = 'Bearer ' + TOKEN;
    cfg.headers['X-Token'] = TOKEN;          // por si el servidor filtra Authorization
  }
  if (opciones.body !== undefined) {
    cfg.headers['Content-Type'] = 'application/json';
    cfg.body = JSON.stringify(opciones.body);
  }

  let resp = await fetch(`${API}/${ruta}`, cfg);

  // Si el hosting no aplica el .htaccess, se prueba la ruta directa al router
  if (resp.status === 404 && !API.includes('index.php')) {
    const alt = await fetch(`api/index.php/${ruta}`, cfg);
    if (alt.status !== 404) resp = alt;
  }

  let datos = null;
  try { datos = await resp.json(); } catch (e) { /* respuesta sin JSON */ }

  if (resp.status === 401 && TOKEN) {         // sesión caducada
    TOKEN = '';
    sessionStorage.removeItem('falla_token');
  }
  if (!resp.ok) throw new Error((datos && datos.error) || `Error ${resp.status}`);
  return datos;
}

function guardarToken(t) {
  TOKEN = t || '';
  if (TOKEN) sessionStorage.setItem('falla_token', TOKEN);
  else sessionStorage.removeItem('falla_token');
}

// ══════════════════════════════════════════════
// DATOS BASE
// ══════════════════════════════════════════════
let adminMode = false;
let noticiaEditandoId = null;
let repFotoPendiente = false;   // true si se ha subido una foto nueva sin guardar aún

// Representantes (Junta Directiva) — editable desde el modo administrador
let representantes = [
  {
    id: 1,
    cargo: 'Presidente',
    nombre: 'VICTOR BELINCHON MONGE',
    iniciales: 'P',
    foto: null,
    descripcion: 'Presidente de la Falla La Marina. Coordina la junta directiva y representa a la comisión ante la Junta Central Fallera y el resto de entidades falleras y municipales.'
  },
  {
    id: 2,
    cargo: 'Fallera Major',
    nombre: 'LARA DE LA CRUZ HUGUET',
    iniciales: 'FM',
    foto: null,
    descripcion: 'Fallera Major de la Falla La Marina. Representa a la comisión durante todo el ejercicio fallero en actos, ofrendas y celebraciones.'
  },
  {
    id: 3,
    cargo: 'Fallera Major Infantil',
    nombre: 'NAIARA ALEIXANDRE GARCIA',
    iniciales: 'FMI',
    foto: null,
    descripcion: 'Fallera Major Infantil de la Falla La Marina. Acompaña a los falleros más pequeños y representa a la sección infantil en los actos de la comisión.'
  },
  {
    id: 4,
    cargo: 'Presidenta Infantil',
    nombre: 'SERENA MORA NAVARRO',
    iniciales: 'PI',
    foto: null,
    descripcion: 'Presidenta Infantil de la Falla La Marina. Vela por la organización de las actividades de la sección infantil junto con la junta directiva.'
  }
];

// Noticias
// Gradientes disponibles para la imagen de una noticia cuando no tiene foto (solo emoji)
const GRADIENTES_NOTICIA = {
  'ni-azul':   'linear-gradient(135deg, var(--azul-medio), var(--azul-claro))',
  'ni-dorado': 'linear-gradient(135deg, var(--azul-oscuro), var(--azul-medio))',
  'ni-rojo':   'linear-gradient(135deg, var(--azul-claro), var(--azul-palido))',
};

// ── Bloqueo de noticias: helpers de fecha ──────────────────────
function hoyISO() {
  const d = new Date();
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}
function estaBloqueada(n) {
  return !!(n.bloqueada && n.fechaDesbloqueo && n.fechaDesbloqueo > hoyISO());
}
function formatearFechaBonita(fechaISO) {
  if (!fechaISO) return '';
  const d = new Date(fechaISO + 'T00:00:00');
  return d.toLocaleDateString(localeActual(), { day: 'numeric', month: 'long', year: 'numeric' });
}
function textoDiasRestantes(fechaISO) {
  if (!fechaISO) return '';
  const hoy = new Date(hoyISO() + 'T00:00:00');
  const objetivo = new Date(fechaISO + 'T00:00:00');
  const dias = Math.ceil((objetivo - hoy) / 86400000);
  if (idiomaActual === 'va') {
    if (dias <= 0) return 'Molt prompte';
    if (dias === 1) return 'Demà';
    return `Falten ${dias} dies`;
  }
  if (dias <= 0) return 'Muy pronto';
  if (dias === 1) return 'Mañana';
  return `Faltan ${dias} días`;
}

let noticias = [
  {
    id: 1,
    emoji: '🎨',
    colorClass: 'ni-azul',
    foto: null,
    bloqueada: false,
    fechaDesbloqueo: null,
    fecha: 'Marzo 2026',
    titulo: 'El artista fallero presenta el boceto de la falla mayor',
    resumen: 'Este año la falla mayor sorprenderá con una temática marinera de gran impacto visual. El artista ha presentado un diseño de cinco cuerpos de altura.',
    tag: 'Falla Mayor',
    contenido: `<p>Este año la Falla La Marina ha apostado por un diseño innovador que combina la tradición valenciana con una temática marinera de gran impacto visual.</p>
<p>El artista fallero, con más de veinte años de experiencia en el sector, ha presentado ante la comisión un boceto que supera en ambición a cualquiera de sus trabajos anteriores. La falla constará de cinco cuerpos, con una altura total de dieciséis metros, siendo la más grande de la historia de nuestra comisión.</p>
<p>La temática gira en torno al mar y sus gentes: marineros, sirenas, embarcaciones tradicionales y el icónico ancla que forma parte de nuestro escudo. La figura central representará a una fallera vestida de marinera, mirando al horizonte desde la proa de un galeón.</p>
<p>La construcción comenzará en diciembre y se estima que necesitará más de tres mil horas de trabajo entre todos los artistas del taller.</p>`
  },
  {
    id: 2,
    emoji: '🌸',
    colorClass: 'ni-dorado',
    foto: null,
    bloqueada: false,
    fechaDesbloqueo: null,
    fecha: 'Febrero 2026',
    titulo: 'Exaltación de la fallera mayor y su corte de honor',
    resumen: 'Un emotivo acto llenó el salón de celebraciones con la exaltación de nuestra nueva fallera mayor, rodeada de toda la comisión.',
    tag: 'Actos Falleros',
    contenido: `<p>El pasado sábado celebramos uno de los actos más emotivos del año fallero: la exaltación de nuestra Fallera Major y su Cort d'Honor para el ejercicio 2026.</p>
<p>El Casal Fallero se llenó hasta los topes con más de trescientas personas entre falleros, familiares e invitados especiales. La velada comenzó con la actuación de la banda musical de la falla, seguida de un pasacalles que recorrió las principales calles del barrio.</p>
<p>La nueva Fallera Major, emocionada durante todo el acto, agradeció el apoyo de la comisión y prometió representar con orgullo a la Falla La Marina en todos los actos del año. Su Cort d'Honor está formada por seis falleras de distintas generaciones, simbolizando la unidad de nuestra familia fallera.</p>
<p>La noche finalizó con una cena de gala y un baile que se prolongó hasta bien entrada la madrugada.</p>`
  },
  {
    id: 3,
    emoji: '🎭',
    colorClass: 'ni-rojo',
    foto: null,
    bloqueada: false,
    fechaDesbloqueo: null,
    fecha: 'Enero 2026',
    titulo: 'Gran éxito de elección de representantes y presentación de la ejecutiva 2027',
    resumen: 'Más de 200 asistentes disfrutaron de la gala de elección donde se anunciaron los representantes para el próximo ejercicio.',
    tag: 'Eventos',
    contenido: `<p>La Falla La Marina vivió una de las noches más importantes del ejercicio con la gala de elección de representantes y presentación de la ejecutiva 2027. Más de doscientas personas llenaron el casal en un ambiente de emoción, orgullo y sentimiento fallero.</p>
<p>Durante el acto se dieron a conocer oficialmente los representantes que encabezarán a la comisión el próximo ejercicio, recibiendo el cariño y el aplauso de todos los asistentes. Un momento muy especial que marca el inicio de una nueva etapa para la falla.</p>
<p>Asimismo, se presentó a la nueva ejecutiva 2027, un equipo comprometido que asume con ilusión y responsabilidad el reto de guiar a la comisión durante el año fallero. El presidente destacó la importancia del trabajo en equipo y la unión como pilares fundamentales.</p>
<p>La velada concluyó con una celebración conjunta entre falleros, familiares y amigos, consolidando una noche que quedará en el recuerdo como un gran éxito de participación y convivencia.</p>`
  }
];

// Eventos del calendario
let eventos = [
  { id: 1, nombre: 'Presentació de la Fallera Major 2027', fecha: '2026-09-19', hora: '19:30', lugar: 'Casal Fallero', descripcion: 'Acto de presentación de la Fallera Major i el President y sus cortes de honor.', categoria: 'especial', color: 'dorado' },
  { id: 2, nombre: 'Cena de inicio de ejercicio', fecha: '2026-10-10', hora: '21:30', lugar: 'Casal Fallero', descripcion: 'Cena de hermandad para arrancar el ejercicio 2026-27.', categoria: 'general', color: 'azul' },
  { id: 3, nombre: 'Reunión general de la comisión', fecha: '2026-11-13', hora: '20:00', lugar: 'Casal Fallero', descripcion: 'Reunión abierta a todos los falleros: cuotas, loteria y calendario del ejercicio.', categoria: 'general', color: 'azul' },
  { id: 4, nombre: 'Sopar de Nadal', fecha: '2026-12-19', hora: '21:00', lugar: 'Casal Fallero', descripcion: 'Cena de Navidad con sorteo de la cesta y visita del Tió.', categoria: 'general', color: 'rojo' },
  { id: 5, nombre: 'Exaltació de la Fallera Major', fecha: '2027-01-16', hora: '19:00', lugar: 'Casal Fallero', descripcion: 'Acto de exaltación con cena de gala posterior.', categoria: 'especial', color: 'dorado' },
  { id: 6, nombre: 'Taller infantil de ninots', fecha: '2027-02-13', hora: '11:00', lugar: 'Casal Fallero', descripcion: 'Taller de manualidades para los falleros infantiles.', categoria: 'infantil', color: 'verde' },
  { id: 7, nombre: 'Plantà de la falla', fecha: '2027-03-15', hora: '08:00', lugar: 'Plaça de la falla', descripcion: 'Montaje del monumento. Se necesitan manos: apúntate para el turno de mañana o de tarde.', categoria: 'especial', color: 'rojo' },
  { id: 8, nombre: 'Ofrena a la Mare de Déu', fecha: '2027-03-17', hora: '17:00', lugar: 'Salida desde el Casal', descripcion: 'Desfile de la ofrenda floral. Indispensable vestir de fallero/a.', categoria: 'especial', color: 'dorado' },
  { id: 9, nombre: 'Cremà', fecha: '2027-03-19', hora: '22:00', lugar: 'Plaça de la falla', descripcion: 'Cremà del monumento y despedida del ejercicio.', categoria: 'especial', color: 'rojo' }
];

let inscripciones = [];
let eventoEditandoId = null;
let calMes = new Date().getMonth();
let calAnyo = new Date().getFullYear();

// ══════════════════════════════════════════════
// UTILIDADES
// ══════════════════════════════════════════════
function mostrarToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('visible');
  setTimeout(() => t.classList.remove('visible'), 3000);
}

function cerrarModal(id) {
  document.getElementById(id).classList.remove('activo');
  // Restaurar scroll si no hay otros modales abiertos
  if (!document.querySelector('.modal-overlay.activo')) {
    document.body.style.overflow = '';
  }
}

function abrirModal(id) {
  cerrarMenu(); // cierra menú hamburguesa si está abierto
  document.getElementById(id).classList.add('activo');
  document.body.style.overflow = 'hidden'; // bloquea scroll en iOS
}

// Cerrar modal al hacer clic fuera
document.querySelectorAll('.modal-overlay').forEach(ov => {
  ov.addEventListener('click', e => { if (e.target === ov) ov.classList.remove('activo'); });
});

// ══════════════════════════════════════════════
// ADMIN
// ══════════════════════════════════════════════
// Las credenciales ya NO están aquí: las valida el servidor (/api/login)

function toggleAdmin() {
  if (adminMode) {
    // Desactivar modo admin
    adminMode = false;
    const btn = document.getElementById('btnAdminFlotante');
    const badge = document.getElementById('adminBadge');
    const panelCal = document.getElementById('adminCalendario');
    btn.classList.remove('admin-activo');
    btn.textContent = '🔐 Admin';
    badge.classList.remove('visible');
    panelCal.style.display = 'none';
    api('logout', { method: 'POST' }).catch(() => {});
    guardarToken('');
    falleroLogueado = null;
    inscripciones = [];
    renderNoticias();
    renderProximosEventos();
    renderGaleriaPortada();
    mostrarToast('🔒 Modo administrador desactivado');
  } else {
    // Mostrar modal de login
    document.getElementById('admin-usuario').value = '';
    document.getElementById('admin-pass').value = '';
    document.getElementById('admin-login-error').style.display = 'none';
    abrirModal('modalAdminLogin');
    setTimeout(() => document.getElementById('admin-usuario').focus(), 200);
  }
}

async function loginAdmin() {
  const usuario = document.getElementById('admin-usuario').value.trim();
  const pass = document.getElementById('admin-pass').value;
  const errorEl = document.getElementById('admin-login-error');

  const fallar = () => {
    errorEl.style.display = 'block';
    document.getElementById('admin-pass').value = '';
    document.getElementById('admin-pass').focus();
    setTimeout(() => { errorEl.style.display = 'none'; }, 3000);
  };

  try {
    const res = await api('login', { method: 'POST', body: { usuario, password: pass } });
    if (!res.fallero.esAdmin) { fallar(); return; }

    guardarToken(res.token);
    falleroLogueado = res.fallero;
    cerrarModal('modalAdminLogin');
    adminMode = true;

    document.getElementById('btnAdminFlotante').classList.add('admin-activo');
    document.getElementById('btnAdminFlotante').textContent = '🔓 Salir de Admin';
    document.getElementById('adminBadge').classList.add('visible');
    document.getElementById('adminCalendario').style.display = 'block';

    await cargarInscripciones();
    renderNoticias();
    renderProximosEventos();
    renderGaleriaPortada();
    mostrarToast('🔐 Modo administrador activado. ¡Bienvenido, ' + res.fallero.nombre + '!');
  } catch (e) {
    fallar();
  }
}

// ══════════════════════════════════════════════
// NOTICIAS
// ══════════════════════════════════════════════
async function cargarNoticias() {
  try {
    const datos = await api('noticias');
    if (Array.isArray(datos) && datos.length) noticias = datos;
  } catch (e) {
    console.warn('No se pudieron cargar las noticias desde el servidor, se usan las de ejemplo:', e.message);
  }
}

function renderNoticias() {
  const grid = document.getElementById('noticias-grid');
  grid.innerHTML = noticias.map(n => {
    const imgHtml = `<div class="noticia-img ${n.foto ? '' : n.colorClass}" ${n.foto ? `style="background-image:url('${n.foto}');background-size:cover;background-position:center;"` : ''}>${n.foto ? '' : n.emoji}</div>`;

    // El bloqueo solo afecta a lo que ve el público; el admin siempre ve la noticia completa
    if (estaBloqueada(n) && !adminMode) {
      return `
        <div class="noticia-card noticia-card-bloqueada" onclick="abrirNoticia(${n.id})">
          <div class="noticia-img-blur-wrap">
            ${imgHtml}
            <div class="noticia-lock-overlay">
              <div class="noticia-lock-icono">🔒</div>
              <div class="noticia-lock-texto">Disponible el<br><strong>${formatearFechaBonita(n.fechaDesbloqueo)}</strong></div>
              <div class="noticia-lock-dias">${textoDiasRestantes(n.fechaDesbloqueo)}</div>
            </div>
          </div>
          <div class="noticia-body">
            <h3 class="noticia-titulo-oculto">🔒 Título oculto</h3>
            <p class="noticia-resumen-oculto">Esta noticia todavía guarda su sorpresa. Vuelve pronto para descubrirla.</p>
          </div>
        </div>
      `;
    }

    return `
      <div class="noticia-card" onclick="abrirNoticia(${n.id})">
        ${n.bloqueada && adminMode ? `<div class="noticia-ribbon-admin">🔒 Programada</div>` : ''}
        ${imgHtml}
        <div class="noticia-body">
          <p class="noticia-fecha">${n.fecha}</p>
          <h3>${n.titulo}</h3>
          <p>${n.resumen}</p>
          <span class="noticia-tag">${n.tag}</span>
          <div class="noticia-leer-mas">Leer noticia completa</div>
        </div>
      </div>
    `;
  }).join('');
}

function abrirNoticia(id, cambiarUrl = true) {

  if (cambiarUrl) {
    const url = new URL(window.location.href);
    url.searchParams.set('noticia', id);
    window.history.pushState({}, '', url);
  }
  const n = noticias.find(x => x.id === id);
  if (!n) return;
  noticiaEditandoId = id;

  const header = document.getElementById('modalNoticiaHeader');
  header.style.background = `linear-gradient(135deg, var(--azul-oscuro), var(--azul-medio))`;

  // El bloqueo solo afecta a lo que ve el público; el admin ve siempre la noticia completa
  const bloqueadaParaVisitante = estaBloqueada(n) && !adminMode;

  document.getElementById('modalNoticiaTitulo').textContent = bloqueadaParaVisitante ? '🔒 Noticia bloqueada' : n.titulo;

  const avisoAdmin = (adminMode && estaBloqueada(n))
    ? `<div class="nc-aviso-bloqueo">🔒 Esta noticia está bloqueada para el público hasta el <strong>${formatearFechaBonita(n.fechaDesbloqueo)}</strong>. Solo tú, como admin, la ves completa.</div>`
    : '';

  const metaHtml = bloqueadaParaVisitante
    ? ''
    : `<span class="noticia-fecha" id="nc-fecha">${n.fecha}</span><span class="noticia-tag" id="nc-tag">${n.tag}</span>`;

  const tituloHtml = bloqueadaParaVisitante
    ? `<h2 class="noticia-completa-titulo nc-titulo-oculto">🔒 Título oculto hasta el ${formatearFechaBonita(n.fechaDesbloqueo)}</h2>`
    : `<h2 class="noticia-completa-titulo" id="nc-titulo">${n.titulo}</h2>`;

  const body = document.getElementById('modalNoticiaBody');
  body.innerHTML = `
    ${avisoAdmin}
    <div id="nc-img-wrap">${bloqueadaParaVisitante ? vistaImagenBloqueadaHtml(n) : vistaImagenNoticiaHtml(n)}</div>
    <div class="noticia-completa-meta" id="nc-meta-wrap">${metaHtml}</div>
    <div id="nc-bloqueo-wrap"></div>
    <div id="nc-titulo-wrap">${tituloHtml}</div>
    <div id="nc-cuerpo-wrap">
      ${bloqueadaParaVisitante
        ? `<div class="nc-cuerpo-bloqueado-msg">✨ Esta noticia todavía guarda su sorpresa. Vuelve el <strong>${formatearFechaBonita(n.fechaDesbloqueo)}</strong> para leerla completa.</div>`
        : `<div class="noticia-completa-cuerpo" id="nc-cuerpo">${n.contenido}</div>`}
    </div>
    ${adminMode ? renderEditorAdmin(n) : ''}
  `;
  abrirModal('modalNoticia');
}
function abrirNoticiaDesdeURL() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('noticia'), 10);

  if (!id) return;

  const comprobar = setInterval(() => {
    if (noticias && noticias.length > 0) {
      clearInterval(comprobar);
      abrirNoticia(id, false);
    }
  }, 100);
}

// Vista de solo lectura de la imagen/emoji de una noticia (fuera de edición)
function vistaImagenNoticiaHtml(n) {
  if (n.foto) {
    return `<div class="noticia-completa-img" style="background-image:url('${n.foto}');background-size:cover;background-position:center;"></div>`;
  }
  const grad = GRADIENTES_NOTICIA[n.colorClass] || GRADIENTES_NOTICIA['ni-azul'];
  return `<div class="noticia-completa-img" style="background:${grad};">${n.emoji}</div>`;
}

// Vista difuminada + mensaje "guay" cuando la noticia está bloqueada para el público
function vistaImagenBloqueadaHtml(n) {
  const imgInner = n.foto
    ? `<div class="noticia-completa-img" style="background-image:url('${n.foto}');background-size:cover;background-position:center;"></div>`
    : `<div class="noticia-completa-img" style="background:${GRADIENTES_NOTICIA[n.colorClass] || GRADIENTES_NOTICIA['ni-azul']};">${n.emoji}</div>`;
  return `
    <div class="nc-img-bloqueado-wrap">
      <div class="nc-bloqueada-blur">${imgInner}</div>
      <div class="nc-lock-overlay">
        <div class="nc-lock-icono">🔒</div>
        <div class="nc-lock-texto">Esta noticia estará disponible el<br><strong>${formatearFechaBonita(n.fechaDesbloqueo)}</strong></div>
        <div class="nc-lock-dias">${textoDiasRestantes(n.fechaDesbloqueo)}</div>
      </div>
    </div>
  `;
}

function renderEditorAdmin(n) {
  return `
    <div class="admin-toolbar">
      <span class="admin-nota">🔐 Modo Admin: puedes editar esta noticia</span>
      <button class="admin-btn" onclick="activarEdicion(${n.id})">✏️ Editar</button>
      <button class="admin-btn peligro" onclick="borrarNoticia(${n.id})">🗑️ Eliminar noticia</button>
    </div>
  `;
}

// Bloque de edición del bloqueo: casilla + selector de fecha
function editorBloqueoNoticiaHtml(n) {
  return `
    <div class="nc-bloqueo-editor">
      <label class="nc-bloqueo-check">
        <input type="checkbox" id="nc-bloqueada-input" ${n.bloqueada ? 'checked' : ''}
               onchange="document.getElementById('nc-fecha-desbloqueo-input').disabled = !this.checked;">
        🔒 Bloquear esta noticia hasta una fecha
      </label>
      <input type="date" id="nc-fecha-desbloqueo-input" value="${n.fechaDesbloqueo || ''}" ${n.bloqueada ? '' : 'disabled'}>
    </div>
  `;
}

function activarEdicion(id) {
  const n = noticias.find(x => x.id === id);
  if (!n) return;

  // Imagen: emoji + color de fondo, o foto real
  document.getElementById('nc-img-wrap').innerHTML = editorImagenNoticiaHtml(n);

  // Fecha y etiqueta, ahora en campos de texto editables
  document.getElementById('nc-meta-wrap').innerHTML = `
    <input type="text" class="nc-meta-input" id="nc-fecha-input" value="${n.fecha}" placeholder="Ej: Marzo 2026">
    <input type="text" class="nc-meta-input" id="nc-tag-input" value="${n.tag}" placeholder="Ej: Actos Falleros">
  `;

  // Bloqueo programado: activar/desactivar + fecha de desbloqueo
  document.getElementById('nc-bloqueo-wrap').innerHTML = editorBloqueoNoticiaHtml(n);

  // Editar título
  const tituloEl = document.getElementById('nc-titulo');
  tituloEl.contentEditable = 'true';
  tituloEl.style.borderRadius = '6px';

  // Añadir barra de herramientas y hacer editable el cuerpo
  const cuerpoWrap = document.getElementById('nc-cuerpo-wrap');
  cuerpoWrap.innerHTML = `
    <div class="editor-barra">
      <button class="editor-btn" onclick="document.execCommand('bold')"><b>N</b></button>
      <button class="editor-btn" onclick="document.execCommand('italic')"><i>C</i></button>
      <button class="editor-btn" onclick="document.execCommand('underline')"><u>S</u></button>
      <button class="editor-btn" onclick="document.execCommand('insertParagraph')">¶ Párrafo</button>
    </div>
    <div class="noticia-completa-cuerpo" id="nc-cuerpo" contenteditable="true">${n.contenido}</div>
  `;

  // Reemplazar botón editar por guardar
  const toolbar = document.querySelector('.admin-toolbar');
  toolbar.innerHTML = `
    <span class="admin-nota" style="color:var(--dorado);">✏️ Editando ahora...</span>
    <button class="admin-btn" onclick="guardarNoticia(${id})" style="background:#27ae60;">💾 Guardar cambios</button>
    <button class="admin-btn" onclick="abrirNoticia(${id})">✕ Cancelar</button>
  `;
}

// Bloque de imagen en modo edición: si hay foto, permite cambiarla o quitarla;
// si no, permite escribir un emoji y elegir el color de fondo, o subir una foto
function editorImagenNoticiaHtml(n) {
  if (n.foto) {
    return `
      <div class="noticia-completa-img" style="background-image:url('${n.foto}');background-size:cover;background-position:center;">
        <button type="button" class="nc-foto-quitar" onclick="quitarFotoNoticia(${n.id})">✕ Usar emoji en su lugar</button>
        <label class="nc-foto-cambiar" for="nc-foto-input">📷 Cambiar foto</label>
        <input type="file" id="nc-foto-input" accept="image/png,image/jpeg,image/webp,image/gif" style="display:none" onchange="cargarFotoNoticia(this, ${n.id})">
      </div>
    `;
  }
  const grad = GRADIENTES_NOTICIA[n.colorClass] || GRADIENTES_NOTICIA['ni-azul'];
  return `
    <div class="noticia-completa-img" style="background:${grad};">
      <input type="text" id="nc-emoji-input" class="nc-emoji-input" value="${n.emoji}" maxlength="4" oninput="cambiarEmojiNoticia(${n.id}, this.value)">
      <div class="nc-color-swatches">
        ${Object.keys(GRADIENTES_NOTICIA).map(c => `<button type="button" class="nc-swatch ${c}" title="Usar este color de fondo" onclick="cambiarColorNoticia(${n.id}, '${c}')"></button>`).join('')}
      </div>
      <label class="nc-foto-cambiar" for="nc-foto-input">📷 Subir foto en su lugar</label>
      <input type="file" id="nc-foto-input" accept="image/png,image/jpeg,image/webp,image/gif" style="display:none" onchange="cargarFotoNoticia(this, ${n.id})">
    </div>
  `;
}

function cambiarEmojiNoticia(id, valor) {
  const n = noticias.find(x => x.id === id);
  if (n) n.emoji = valor || '📰';
}

function cambiarColorNoticia(id, colorClass) {
  const n = noticias.find(x => x.id === id);
  if (!n) return;
  n.colorClass = colorClass;
  document.getElementById('nc-img-wrap').innerHTML = editorImagenNoticiaHtml(n);
}

function cargarFotoNoticia(input, id) {
  const file = input.files[0];
  if (!file) return;
  if (!file.type.startsWith('image/')) { mostrarToast('⚠️ Selecciona un archivo de imagen'); return; }
  if (file.size > 3 * 1024 * 1024) { mostrarToast('⚠️ La imagen no puede superar los 3MB'); return; }
  const reader = new FileReader();
  reader.onload = e => {
    const n = noticias.find(x => x.id === id);
    if (!n) return;
    n.foto = e.target.result;
    document.getElementById('nc-img-wrap').innerHTML = editorImagenNoticiaHtml(n);
  };
  reader.readAsDataURL(file);
}

function quitarFotoNoticia(id) {
  const n = noticias.find(x => x.id === id);
  if (!n) return;
  n.foto = null;
  document.getElementById('nc-img-wrap').innerHTML = editorImagenNoticiaHtml(n);
}

async function guardarNoticia(id) {
  const n = noticias.find(x => x.id === id);
  if (!n) return;
  const tituloEl = document.getElementById('nc-titulo');
  const cuerpoEl = document.getElementById('nc-cuerpo');
  const fechaEl = document.getElementById('nc-fecha-input');
  const tagEl = document.getElementById('nc-tag-input');
  const bloqueadaEl = document.getElementById('nc-bloqueada-input');
  const fechaDesbloqueoEl = document.getElementById('nc-fecha-desbloqueo-input');

  const titulo = tituloEl.innerText.trim();
  const contenido = cuerpoEl.innerHTML;
  const resumen = cuerpoEl.innerText.trim().substring(0, 160) + '...';
  const fecha = (fechaEl && fechaEl.value.trim()) || n.fecha;
  const tag = (tagEl && tagEl.value.trim()) || n.tag;
  const bloqueada = bloqueadaEl ? bloqueadaEl.checked : !!n.bloqueada;
  const fechaDesbloqueo = fechaDesbloqueoEl ? (fechaDesbloqueoEl.value || null) : (n.fechaDesbloqueo || null);

  if (bloqueada && !fechaDesbloqueo) {
    mostrarToast('⚠️ Elige una fecha de desbloqueo para poder bloquear la noticia');
    return;
  }

  try {
    const actualizada = await api(`noticias/${id}`, {
      method: 'PUT',
      body: { titulo, resumen, contenido, fecha, tag, emoji: n.emoji, colorClass: n.colorClass, foto: n.foto, bloqueada, fechaDesbloqueo }
    });
    Object.assign(n, actualizada);
    mostrarToast('✅ Noticia guardada en el servidor');
  } catch (e) {
    mostrarToast('⚠️ ' + e.message);
    return;
  }
  renderNoticias();
  abrirNoticiaDesdeURL();
  cerrarModal('modalNoticia');
}

async function borrarNoticia(id) {
  if (!confirm('¿Seguro que quieres eliminar esta noticia?')) return;
  try {
    await api(`noticias/${id}`, { method: 'DELETE' });
    noticias = noticias.filter(x => x.id !== id);
    renderNoticias();
    cerrarModal('modalNoticia');
    mostrarToast('🗑️ Noticia eliminada');
  } catch (e) {
    mostrarToast('⚠️ ' + e.message);
  }
}

// ══════════════════════════════════════════════
// REPRESENTANTES (Junta Directiva)
// ══════════════════════════════════════════════
async function cargarRepresentantes() {
  try {
    const datos = await api('representantes');
    if (Array.isArray(datos) && datos.length) representantes = datos;
  } catch (e) {
    console.warn('No se pudieron cargar los representantes desde el servidor, se usan los datos por defecto:', e.message);
  }
}

function renderRepresentantes() {
  const grid = document.getElementById('junta-grid');
  if (!grid) return;
  grid.innerHTML = representantes.map(r => `
    <div class="junta-card" onclick="abrirRepresentante(${r.id})">
      <div class="avatar" ${r.foto ? `style="background-image:url('${r.foto}');"` : ''}>${r.foto ? '' : r.iniciales}</div>
      <h4>${r.nombre}</h4>
      <p>${r.cargo}</p>
    </div>
  `).join('');
}

function abrirRepresentante(id) {
  const r = representantes.find(x => x.id === id);
  if (!r) return;
  repFotoPendiente = false;

  document.getElementById('repModalCargo').textContent = r.cargo;

  const body = document.getElementById('repModalBody');
  body.innerHTML = `
    <div class="rep-marco" id="rep-marco">
      ${r.foto ? `<img src="${r.foto}" alt="${r.nombre}">` : `<span class="rep-marco-inicial">${r.iniciales}</span>`}
    </div>
    <span class="rep-cargo-tag">${r.cargo}</span>
    <h3 class="rep-nombre">${r.nombre}</h3>
    <div class="rep-descripcion" id="rep-descripcion">${r.descripcion}</div>
    ${adminMode ? renderEditorRepAdmin(r) : ''}
  `;
  abrirModal('modalRepresentante');
}

function renderEditorRepAdmin(r) {
  return `
    <div class="admin-toolbar" id="rep-admin-toolbar" style="justify-content:center;">
      <span class="admin-nota">🔐 Modo Admin: puedes editar la foto y el texto</span>
      <button class="admin-btn" onclick="activarEdicionRep(${r.id})">✏️ Editar</button>
    </div>
  `;
}

function activarEdicionRep(id) {
  const r = representantes.find(x => x.id === id);
  if (!r) return;

  // Marco con opción de cambiar foto
  const marco = document.getElementById('rep-marco');
  marco.innerHTML = `
    ${r.foto ? `<img src="${r.foto}" alt="${r.nombre}">` : `<span class="rep-marco-inicial">${r.iniciales}</span>`}
    <label class="rep-foto-editar" for="rep-foto-input">📷 Cambiar foto</label>
    <input type="file" id="rep-foto-input" accept="image/*" style="display:none" onchange="cargarFotoRepresentante(this, ${id})">
  `;

  // Descripción editable
  const descEl = document.getElementById('rep-descripcion');
  descEl.contentEditable = 'true';
  descEl.focus();

  // Barra de herramientas: guardar / cancelar
  const toolbar = document.getElementById('rep-admin-toolbar');
  toolbar.innerHTML = `
    <span class="admin-nota" style="color:var(--dorado);">✏️ Editando ahora...</span>
    <button class="admin-btn" onclick="guardarRepresentante(${id})" style="background:#27ae60;">💾 Guardar cambios</button>
    <button class="admin-btn" onclick="abrirRepresentante(${id})">✕ Cancelar</button>
  `;
}

function cargarFotoRepresentante(input, id) {
  const file = input.files[0];
  if (!file) return;
  if (!file.type.startsWith('image/')) { mostrarToast('⚠️ Selecciona un archivo de imagen'); return; }
  if (file.size > 3 * 1024 * 1024) { mostrarToast('⚠️ La imagen no puede superar los 3MB'); return; }
  const reader = new FileReader();
  reader.onload = e => {
    const r = representantes.find(x => x.id === id);
    if (!r) return;
    r.foto = e.target.result;
    repFotoPendiente = true;
    activarEdicionRep(id); // repinta el marco con la nueva foto, sigue en modo edición
  };
  reader.readAsDataURL(file);
}

async function guardarRepresentante(id) {
  const r = representantes.find(x => x.id === id);
  if (!r) return;
  const descEl = document.getElementById('rep-descripcion');
  const body = { descripcion: descEl.innerHTML.trim() };
  if (repFotoPendiente) body.foto = r.foto;

  try {
    const actualizado = await api(`representantes/${id}`, { method: 'PUT', body });
    Object.assign(r, actualizado);
    mostrarToast('✅ Ficha de representante guardada en el servidor');
  } catch (e) {
    mostrarToast('⚠️ ' + e.message);
    return;
  }
  repFotoPendiente = false;
  renderRepresentantes();
  cerrarModal('modalRepresentante');
}

// ══════════════════════════════════════════════
// GALERÍA DE FOTOS
// ══════════════════════════════════════════════
let galeria = [];

async function cargarGaleria() {
  try {
    galeria = await api('galeria');
  } catch (e) {
    console.warn('No se pudo cargar la galería:', e.message);
  }
}

// Portada: solo las fotos marcadas como "destacada"
function renderGaleriaPortada() {
  const cont = document.getElementById('galeria-grid-portada');
  if (!cont) return;
  const destacadas = galeria.filter(g => g.destacada);
  if (!destacadas.length) {
    cont.innerHTML = `<div class="galeria-vacio">Todavía no hay fotos destacadas en portada.${adminMode ? ' Pulsa "Ver galería completa" para subir fotos y marcar las que quieras mostrar aquí.' : ''}</div>`;
    return;
  }
  cont.innerHTML = destacadas.map(g => `
    <div class="galeria-item" onclick="abrirGaleria()">
      <img src="${g.url}" alt="${g.nombre}" loading="lazy">
      <div class="galeria-label">${g.nombre}</div>
    </div>
  `).join('');
}

function abrirGaleria() {
  renderGaleriaModal();
  abrirModal('modalGaleria');
}

function renderGaleriaModal() {
  const body = document.getElementById('galModalBody');

  const subirHtml = adminMode ? `
    <div class="gal-subir-wrap">
      <label class="gal-subir-label" for="gal-input-fotos">📤 Subir fotos</label>
      <input type="file" id="gal-input-fotos" accept="image/png,image/jpeg,image/webp,image/gif" multiple style="display:none" onchange="manejarSubidaFotos(this)">
      <div class="gal-progreso" id="gal-progreso"></div>
      <p style="font-size:0.78rem;color:var(--texto-suave);margin-top:0.4rem;">
        Puedes seleccionar varias fotos a la vez: se irán subiendo una tras otra y aparecerán aquí abajo según se completen.
        Formatos admitidos: JPG, PNG, GIF o WEBP (máx. 8MB cada una). Pulsa sobre el nombre de cada foto para renombrarla, y en ⭐ para que salga en portada.
      </p>
    </div>
  ` : '';

  const gridHtml = galeria.length
    ? `<div class="gal-modal-grid" id="gal-modal-grid">${galeria.map(fichaGaleriaHtml).join('')}</div>`
    : `<p style="text-align:center;color:var(--texto-suave);">Todavía no se ha subido ninguna foto.</p>`;

  body.innerHTML = subirHtml + gridHtml;
}

function fichaGaleriaHtml(g) {
  const controlesAdmin = adminMode ? `
    <div class="gal-item-controles">
      <button class="gal-star-btn ${g.destacada ? 'activa' : ''}" title="${g.destacada ? 'Quitar de portada' : 'Destacar en portada'}" onclick="toggleDestacada(${g.id}, this)">⭐</button>
      <button class="gal-del-btn" title="Eliminar foto" onclick="borrarFotoGaleria(${g.id})">🗑</button>
    </div>
  ` : '';
  const caption = adminMode
    ? `<div class="gal-item-caption" contenteditable="true" onblur="renombrarFotoGaleria(${g.id}, this)">${g.nombre}</div>`
    : `<div class="gal-item-caption">${g.nombre}</div>`;
  return `
    <div class="gal-item" id="gal-item-${g.id}">
      <a href="${g.url}" target="_blank" rel="noopener">
        <img src="${g.url}" alt="${g.nombre}" loading="lazy">
      </a>
      ${controlesAdmin}
      ${caption}
    </div>
  `;
}

// Sube los archivos elegidos uno detrás de otro (no en paralelo), para que
// vayan apareciendo en la galería según se van completando.
async function manejarSubidaFotos(input) {
  const archivos = Array.from(input.files || []);
  if (!archivos.length) return;
  const progreso = document.getElementById('gal-progreso');

  for (let i = 0; i < archivos.length; i++) {
    const file = archivos[i];
    if (progreso) progreso.textContent = `Subiendo foto ${i + 1} de ${archivos.length}...`;
    try {
      const nombreDefecto = file.name.replace(/\.[^.]+$/, '').replace(/[_-]+/g, ' ').trim();
      const nueva = await subirFotoGaleria(file, nombreDefecto);
      galeria.push(nueva);
      renderGaleriaModal(); // aparece al instante, antes de pasar a la siguiente foto
    } catch (e) {
      mostrarToast('⚠️ ' + file.name + ': ' + e.message);
    }
  }

  const p2 = document.getElementById('gal-progreso');
  if (p2) p2.textContent = '✅ Subida completada';
  input.value = '';
  renderGaleriaPortada();
  setTimeout(() => { const p = document.getElementById('gal-progreso'); if (p) p.textContent = ''; }, 2500);
}

// Sube UNA foto como multipart/form-data (no como JSON: api() no vale aquí)
async function subirFotoGaleria(file, nombre) {
  const fd = new FormData();
  fd.append('foto', file);
  fd.append('nombre', nombre || '');
  const headers = {};
  if (TOKEN) { headers['Authorization'] = 'Bearer ' + TOKEN; headers['X-Token'] = TOKEN; }

  const resp = await fetch(`${API}/galeria`, { method: 'POST', headers, body: fd });
  let datos = null;
  try { datos = await resp.json(); } catch (e) { /* respuesta sin JSON */ }
  if (!resp.ok) throw new Error((datos && datos.error) || `Error ${resp.status}`);
  return datos;
}

async function toggleDestacada(id, btn) {
  const g = galeria.find(x => x.id === id);
  if (!g) return;
  try {
    const actualizado = await api(`galeria/${id}`, { method: 'PUT', body: { destacada: !g.destacada } });
    Object.assign(g, actualizado);
    btn.classList.toggle('activa', g.destacada);
    btn.title = g.destacada ? 'Quitar de portada' : 'Destacar en portada';
    renderGaleriaPortada();
  } catch (e) {
    mostrarToast('⚠️ ' + e.message);
  }
}

async function renombrarFotoGaleria(id, el) {
  const g = galeria.find(x => x.id === id);
  if (!g) return;
  const nuevoNombre = el.textContent.trim();
  if (!nuevoNombre || nuevoNombre === g.nombre) { el.textContent = g.nombre; return; }
  try {
    const actualizado = await api(`galeria/${id}`, { method: 'PUT', body: { nombre: nuevoNombre } });
    Object.assign(g, actualizado);
    renderGaleriaPortada();
  } catch (e) {
    mostrarToast('⚠️ ' + e.message);
    el.textContent = g.nombre;
  }
}

async function borrarFotoGaleria(id) {
  if (!confirm('¿Seguro que quieres eliminar esta foto? No se puede deshacer.')) return;
  try {
    await api(`galeria/${id}`, { method: 'DELETE' });
    galeria = galeria.filter(x => x.id !== id);
    renderGaleriaModal();
    renderGaleriaPortada();
    mostrarToast('🗑️ Foto eliminada');
  } catch (e) {
    mostrarToast('⚠️ ' + e.message);
  }
}

// ══════════════════════════════════════════════
// BASE DE DATOS FALLEROS (cargada desde base_de_datos.xlsx)
// ══════════════════════════════════════════════
// Los falleros ya NO se leen del Excel en el navegador: viven en la base de
// datos del servidor. Para actualizarlos, ejecuta herramientas/importar_falleros.py
// y sube el SQL generado desde phpMyAdmin.
let falleroLogueado = null; // {id, nombre, apellidos, usuario, esAdmin}

async function cargarEventos() {
  try {
    eventos = await api('eventos');
  } catch (e) {
    console.warn('No se pudieron cargar los eventos:', e.message);
  }
}

async function cargarInscripciones() {
  if (!falleroLogueado) { inscripciones = []; return; }
  try {
    inscripciones = falleroLogueado.esAdmin
      ? await api('inscripciones')
      : await api('inscripciones/mias');
  } catch (e) {
    inscripciones = [];
  }
}

// Restaura la sesión si el fallero recarga la página
async function restaurarSesion() {
  if (!TOKEN) return;
  try {
    falleroLogueado = await api('me');
    await cargarInscripciones();
  } catch (e) {
    guardarToken('');
    falleroLogueado = null;
  }
}

// ══════════════════════════════════════════════
// PORTAL DEL FALLERO
// ══════════════════════════════════════════════
function abrirPortal() {
  // Resetear a pantalla de login si nadie está logueado
  if (!falleroLogueado) {
    document.getElementById('portal-login-screen').style.display = 'block';
    document.getElementById('portal-contenido').style.display = 'none';
    document.getElementById('fallero-usuario').value = '';
    document.getElementById('fallero-pass').value = '';
    document.getElementById('fallero-login-error').style.display = 'none';
  }
  abrirModal('modalPortal');
  if (!falleroLogueado) setTimeout(() => document.getElementById('fallero-usuario').focus(), 200);
}

async function loginFallero() {
  const usuario = document.getElementById('fallero-usuario').value.trim();
  const pass = document.getElementById('fallero-pass').value.trim();
  const errorEl = document.getElementById('fallero-login-error');

  let encontrado = null;
  try {
    const res = await api('login', { method: 'POST', body: { usuario, password: pass } });
    guardarToken(res.token);
    encontrado = res.fallero;
  } catch (e) {
    errorEl.textContent = '⚠️ ' + e.message;
    errorEl.style.display = 'block';
    document.getElementById('fallero-pass').value = '';
    document.getElementById('fallero-pass').focus();
    setTimeout(() => errorEl.style.display = 'none', 3000);
    return;
  }

  falleroLogueado = encontrado;
  await cargarEventos();
  await cargarInscripciones();

  document.getElementById('portal-login-screen').style.display = 'none';
  document.getElementById('portal-contenido').style.display = 'block';
  const nombreCompleto = (encontrado.nombre + ' ' + encontrado.apellidos).trim();
  document.getElementById('portal-nombre-usuario').textContent = nombreCompleto;

  // Mostrar pestaña admin si es administrador
  const tabAdminBtn = document.getElementById('tab-admin-btn');
  if (encontrado.esAdmin || adminMode) {
    tabAdminBtn.style.display = 'block';
    actualizarFiltroAdmin();
  } else {
    tabAdminBtn.style.display = 'none';
  }

  // Cambiar a primera pestaña
  cambiarTabPorId('tab-eventos');
  renderListaEventosPortal();
  renderMisInscripciones();
  renderCalendario();
  renderProximosEventos();
  mostrarToast(`👋 ¡Bienvenido/a, ${nombreCompleto}!`);

  // Primera vez que entra: recordarle que cambie la contraseña inicial
  if (falleroLogueado.passCambiada === false) {
    setTimeout(() => {
      mostrarToast('🔑 Cambia tu contraseña inicial desde el botón de arriba');
    }, 3200);
  }
}

function logoutFallero() {
  api('logout', { method: 'POST' }).catch(() => {});
  guardarToken('');
  falleroLogueado = null;
  inscripciones = [];
  document.getElementById('portal-login-screen').style.display = 'block';
  document.getElementById('portal-contenido').style.display = 'none';
  mostrarToast('🔒 Sesión cerrada');
}

// ── Cambio de contraseña del propio fallero ──
async function cambiarPassword() {
  if (!falleroLogueado) { mostrarToast('⚠️ Inicia sesión primero'); return; }

  const actual = prompt('Contraseña actual:');
  if (actual === null) return;
  const nueva = prompt('Nueva contraseña (mínimo 6 caracteres):');
  if (nueva === null) return;
  const repetir = prompt('Repite la nueva contraseña:');
  if (repetir === null) return;

  if (nueva !== repetir) { mostrarToast('⚠️ Las contraseñas no coinciden'); return; }
  if (nueva.trim().length < 6) { mostrarToast('⚠️ Mínimo 6 caracteres'); return; }

  try {
    await api('password', { method: 'POST', body: { actual, nueva } });
    falleroLogueado.passCambiada = true;
    mostrarToast('✅ Contraseña actualizada');
  } catch (e) {
    mostrarToast('⚠️ ' + e.message);
  }
}

function cambiarTab(tabId) {
  cambiarTabPorId(tabId);
  event.currentTarget.classList.add('activo');
}

function cambiarTabPorId(tabId) {
  document.querySelectorAll('.portal-seccion').forEach(s => s.classList.remove('activo'));
  document.querySelectorAll('.portal-tab').forEach(t => t.classList.remove('activo'));
  const el = document.getElementById(tabId);
  if (el) el.classList.add('activo');
  if (tabId === 'tab-admin-inscripciones') renderAdminInscripciones();
}

function renderListaEventosPortal() {
  const hoy = new Date();
  const proximos = eventos
    .filter(e => new Date(e.fecha) >= hoy)
    .sort((a,b) => new Date(a.fecha) - new Date(b.fecha));

  const lista = document.getElementById('listaEventosPortal');
  if (proximos.length === 0) {
    lista.innerHTML = '<p style="color:var(--texto-suave);text-align:center;padding:2rem;">No hay eventos próximos programados.</p>';
  } else {
    lista.innerHTML = proximos.map(ev => {
      const fecha = new Date(ev.fecha + 'T12:00:00');
      const dia = fecha.getDate();
      const mes = fecha.toLocaleDateString(localeActual(), {month:'short'}).toUpperCase();
      const yaInscrito = falleroLogueado && inscripciones.some(i => i.eventoId === ev.id && i.usuario === falleroLogueado.usuario);
      return `
        <div class="evento-inscripcion">
          <div class="evento-fecha-badge">
            <div class="dia">${dia}</div>
            <div class="mes">${mes}</div>
          </div>
          <div class="evento-info">
            <h4>${ev.nombre}</h4>
            <p>${ev.descripcion}</p>
            <div class="evento-meta">
              ${ev.hora ? `<span>🕐 ${ev.hora}</span>` : ''}
              ${ev.lugar ? `<span>📍 ${ev.lugar}</span>` : ''}
              <span>${ev.categoria === 'especial' ? '⭐ Especial' : ev.categoria === 'infantil' ? '👶 Infantil' : '📌 General'}</span>
            </div>
          </div>
          <button class="btn-inscribirse ${yaInscrito ? 'inscrito' : ''}" onclick="inscribirseRapido(${ev.id})">
            ${yaInscrito ? '✓ Inscrito' : 'Apuntarme'}
          </button>
        </div>
      `;
    }).join('');
  }

  // Rellenar select del formulario
  const sel = document.getElementById('ins-evento');
  if (sel) {
    sel.innerHTML = '<option value="">Selecciona un evento...</option>' +
      proximos.map(ev => `<option value="${ev.id}">${ev.nombre} (${ev.fecha})</option>`).join('');
  }
}

// Traducción de textos generados por JS (los fijos del HTML los traduce el diccionario)
function tr(texto) { return (idiomaActual === 'va' && TRADUCCIONES[texto]) || texto; }
function esc(t) {
  return String(t ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

let _famEventoId = null;

// Punto de entrada único para apuntarse (botón "Apuntarme" y pestaña "Inscribirse").
// Si el fallero tiene más familiares, le pregunta a cuáles quiere apuntar también.
async function iniciarInscripcion(eventoId, comentarios) {
  if (!falleroLogueado) { mostrarToast('⚠️ Inicia sesión primero'); return; }
  if (!eventoId) { mostrarToast('⚠️ Selecciona un evento'); return; }

  let fam;
  try {
    fam = await api(`familia?eventoId=${eventoId}`);
  } catch (e) {
    mostrarToast('⚠️ ' + e.message);
    return;
  }

  // Sin familiares: se apunta directamente, como siempre
  if (!fam.miembros || fam.miembros.length <= 1) {
    await enviarInscripciones(eventoId, [falleroLogueado.id], comentarios);
    return;
  }

  _famEventoId = eventoId;
  const ev = eventos.find(e => e.id === eventoId);
  document.getElementById('familia-evento').textContent = ev ? `${ev.nombre} · ${ev.fecha}` : '';
  document.getElementById('familia-comentarios').value = comentarios || '';

  document.getElementById('familia-lista').innerHTML = fam.miembros.map(m => {
    const dis = m.inscrito ? 'disabled' : '';
    // Él mismo aparece marcado por defecto; los familiares, sin marcar
    const marcado = (m.esYo && !m.inscrito) ? 'checked' : '';
    return `
      <label class="familia-item ${m.inscrito ? 'deshabilitado' : ''} ${marcado ? 'marcado' : ''}">
        <input type="checkbox" value="${m.id}" ${dis} ${marcado} onchange="actualizarSeleccionFamilia()">
        <span class="fam-nombre">${esc(m.nombreCompleto)}${m.esYo ? ' ' + esc(tr('(tú)')) : ''}</span>
        ${m.inscrito ? `<span class="fam-etiqueta ok">✓ ${esc(tr('Ya inscrito'))}</span>` : ''}
      </label>`;
  }).join('');

  actualizarSeleccionFamilia();
  abrirModal('modalFamilia');
}

function actualizarSeleccionFamilia() {
  const marcados = document.querySelectorAll('#familia-lista input:checked:not(:disabled)');
  document.querySelectorAll('#familia-lista .familia-item').forEach(l => {
    l.classList.toggle('marcado', !!l.querySelector('input:checked:not(:disabled)'));
  });
  const btn = document.getElementById('familia-confirmar');
  btn.disabled = marcados.length === 0;
  btn.textContent = marcados.length > 1 ? `Inscribir a ${marcados.length} personas ✓` : 'Inscribir ✓';
}

async function confirmarInscripcionFamilia() {
  const ids = [...document.querySelectorAll('#familia-lista input:checked:not(:disabled)')].map(i => parseInt(i.value));
  if (ids.length === 0) return;
  const comentarios = document.getElementById('familia-comentarios').value.trim();
  const btn = document.getElementById('familia-confirmar');
  btn.disabled = true;
  const ok = await enviarInscripciones(_famEventoId, ids, comentarios);
  if (ok) cerrarModal('modalFamilia'); else actualizarSeleccionFamilia();
}

// Envía la inscripción al servidor y refresca las pantallas del portal
async function enviarInscripciones(eventoId, falleroIds, comentarios) {
  const ev = eventos.find(e => e.id === eventoId);
  let res;
  try {
    res = await api('inscripciones', { method: 'POST', body: { eventoId, falleroIds, comentarios: comentarios || '' } });
    await cargarInscripciones();
  } catch (e) {
    mostrarToast('⚠️ ' + e.message);
    return false;
  }
  renderListaEventosPortal();
  renderMisInscripciones();
  if (falleroLogueado.esAdmin || adminMode) actualizarFiltroAdmin();

  const n = (res.creadas || []).length;
  const nombreEv = ev ? ev.nombre : 'el evento';
  mostrarToast(n > 1
    ? `✅ ${n} personas apuntadas a "${nombreEv}"`
    : `✅ ¡Apuntado a "${nombreEv}"!`);
  return true;
}

function inscribirseRapido(eventoId) {
  return iniciarInscripcion(eventoId, '');
}

async function enviarInscripcion() {
  const eventoId = parseInt(document.getElementById('ins-evento').value);
  const comentarios = document.getElementById('ins-comentarios').value.trim();
  await iniciarInscripcion(eventoId, comentarios);
  document.getElementById('ins-comentarios').value = '';
}

function renderMisInscripciones() {
  const contenedor = document.getElementById('misInscripciones');
  // Las mías y las de mi familia (el servidor ya solo devuelve las de mi familia,
  // salvo al admin, que recibe todas: por eso se vuelve a filtrar aquí)
  const esDeMiFamilia = i => falleroLogueado && (
    i.falleroId === falleroLogueado.id ||
    (falleroLogueado.numFamilia != null && i.numFamilia === falleroLogueado.numFamilia));
  const misIns = inscripciones.filter(esDeMiFamilia);
  if (misIns.length === 0) {
    contenedor.innerHTML = '<p style="color:var(--texto-suave);font-style:italic;text-align:center;padding:2rem;">Aún no te has apuntado a ningún evento.</p>';
    return;
  }
  contenedor.innerHTML = misIns.map((ins) => {
    const ev = eventos.find(e => e.id === ins.eventoId);
    if (!ev) return '';
    const fecha = new Date(ev.fecha + 'T12:00:00');
    return `
      <div style="border:1px solid var(--azul-hielo);border-radius:8px;padding:1rem;margin-bottom:0.75rem;display:flex;align-items:center;gap:1rem;">
        <span style="font-size:1.5rem;">✅</span>
        <div style="flex:1;">
          <strong style="color:var(--azul-oscuro)">${ev.nombre}</strong>
          ${ins.falleroId !== falleroLogueado.id ? `<p style="font-size:0.85rem;font-weight:600;color:var(--azul-medio);margin-top:2px;">👤 ${esc(ins.nombreCompleto)}</p>` : ''}
          <p style="font-size:0.82rem;color:var(--texto-suave);margin-top:2px;">${fecha.toLocaleDateString(localeActual(),{weekday:'long',day:'numeric',month:'long'})} · ${ev.lugar}</p>
          ${ins.comentarios ? `<p style="font-size:0.78rem;color:var(--azul-claro);margin-top:2px;">💬 ${ins.comentarios}</p>` : ''}
        </div>
        <button onclick="cancelarInscripcion(${ins.id})" style="background:#fde8e8;color:var(--rojo-falla);border:none;cursor:pointer;padding:6px 12px;border-radius:6px;font-size:0.75rem;font-weight:600;">Cancelar</button>
      </div>
    `;
  }).join('');
}

async function cancelarInscripcion(id) {
  try {
    await api(`inscripciones/${id}`, { method: 'DELETE' });
    await cargarInscripciones();
  } catch (e) {
    mostrarToast('⚠️ ' + e.message);
    return;
  }
  renderMisInscripciones();
  renderListaEventosPortal();
  if (falleroLogueado && (falleroLogueado.esAdmin || adminMode)) actualizarFiltroAdmin();
  mostrarToast('ℹ️ Inscripción cancelada');
}

// ══════════════════════════════════════════════
// ADMIN: VER Y EXPORTAR INSCRIPCIONES
// ══════════════════════════════════════════════
function actualizarFiltroAdmin() {
  const sel = document.getElementById('filtro-evento-admin');
  if (!sel) return;
  const valAnterior = sel.value;
  sel.innerHTML = '<option value="">Todos los eventos</option>' +
    eventos.map(ev => `<option value="${ev.id}">${ev.nombre} (${ev.fecha})</option>`).join('');
  sel.value = valAnterior;
  renderAdminInscripciones();
}

function renderAdminInscripciones() {
  const lista = document.getElementById('admin-inscripciones-lista');
  const total = document.getElementById('admin-inscripciones-total');
  const filtroId = parseInt(document.getElementById('filtro-evento-admin')?.value) || null;

  const filtradas = filtroId
    ? inscripciones.filter(i => i.eventoId === filtroId)
    : inscripciones;

  if (filtradas.length === 0) {
    lista.innerHTML = '<p style="color:var(--texto-suave);font-style:italic;text-align:center;padding:2rem;">No hay inscripciones para este filtro.</p>';
    total.textContent = '';
    return;
  }

  lista.innerHTML = filtradas.map(ins => {
    const ev = eventos.find(e => e.id === ins.eventoId);
    return `
      <div class="inscripcion-admin-card">
        <span style="font-size:1.4rem;">👤</span>
        <div>
          <div class="insc-nombre">${ins.nombreCompleto || ins.nombre}</div>
          <div class="insc-meta">
            📅 <strong>${ev ? ev.nombre : 'Evento desconocido'}</strong>
            ${ev ? ` · ${ev.fecha}` : ''}
            ${ins.comentarios ? ` · 💬 ${ins.comentarios}` : ''}
            · <span style="color:var(--azul-claro)">🕐 ${ins.timestamp}</span>
          </div>
          ${(ins.numFamilia != null || (ins.inscritoPorId && ins.inscritoPorId !== ins.falleroId)) ? `<div class="insc-por">
            ${ins.numFamilia != null ? `👨‍👩‍👧 Familia nº ${ins.numFamilia}` : ''}
            ${(ins.inscritoPorId && ins.inscritoPorId !== ins.falleroId) ? ` · ✍️ Apuntado por ${esc(ins.inscritoPor)}` : ''}
          </div>` : ''}
        </div>
      </div>
    `;
  }).join('');

  total.textContent = `Total: ${filtradas.length} inscripción${filtradas.length !== 1 ? 'es' : ''}`;
}

function exportarInscripcionesXLSX() {
  const filtroId = parseInt(document.getElementById('filtro-evento-admin')?.value) || null;
  const filtradas = filtroId ? inscripciones.filter(i => i.eventoId === filtroId) : inscripciones;

  const filas = filtradas.map(ins => {
    const ev = eventos.find(e => e.id === ins.eventoId);
    return {
      'Evento': ev ? ev.nombre : 'Desconocido',
      'Fecha Evento': ev ? ev.fecha : '',
      'Nombre': ins.nombre,
      'Apellidos': ins.apellidos,
      'Usuario': ins.usuario,
      'Nº Familia': ins.numFamilia ?? '',
      'Apuntado por': (ins.inscritoPorId && ins.inscritoPorId !== ins.falleroId) ? ins.inscritoPor : '',
      'Comentarios': ins.comentarios || '',
      'Fecha Inscripción': ins.timestamp
    };
  });

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(filas.length > 0 ? filas : [{'Evento':'', 'Fecha Evento':'', 'Nombre':'', 'Apellidos':'', 'Usuario':'', 'Nº Familia':'', 'Apuntado por':'', 'Comentarios':'', 'Fecha Inscripción':''}]);
  // Ajustar anchos de columna
  ws['!cols'] = [30, 14, 18, 22, 16, 11, 22, 30, 20].map(w => ({ wch: w }));
  XLSX.utils.book_append_sheet(wb, ws, 'Inscripciones');
  XLSX.writeFile(wb, `inscripciones_falla_${new Date().toISOString().slice(0,10)}.xlsx`);
  mostrarToast('📥 Archivo Excel descargado');
}

// ══════════════════════════════════════════════
// CALENDARIO
// ══════════════════════════════════════════════
const MESES = {
  es: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
  va: ['Gener','Febrer','Març','Abril','Maig','Juny','Juliol','Agost','Setembre','Octubre','Novembre','Desembre'],
};
const MESES_CORTOS = {
  es: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
  va: ['Gen','Feb','Mar','Abr','Mai','Jun','Jul','Ago','Set','Oct','Nov','Des'],
};

function cambiarMes(delta) {
  calMes += delta;
  if (calMes > 11) { calMes = 0; calAnyo++; }
  if (calMes < 0) { calMes = 11; calAnyo--; }
  renderCalendario();
}

function renderCalendario() {
  document.getElementById('calTitulo').textContent = `${MESES[idiomaActual][calMes]} ${calAnyo}`;

  const hoy = new Date();
  const primerDia = new Date(calAnyo, calMes, 1);
  const ultimoDia = new Date(calAnyo, calMes + 1, 0);

  // Lunes = 0, ajuste
  let inicioSemana = primerDia.getDay() - 1;
  if (inicioSemana < 0) inicioSemana = 6;

  const grid = document.getElementById('calGrid');
  // Mantener las cabeceras
  const cabeceras = Array.from(grid.querySelectorAll('.cal-dia-lbl'));
  grid.innerHTML = '';
  cabeceras.forEach(c => grid.appendChild(c));

  // Días del mes anterior
  const diasMesAnterior = new Date(calAnyo, calMes, 0).getDate();
  for (let i = inicioSemana - 1; i >= 0; i--) {
    const cel = crearCelda(diasMesAnterior - i, true);
    grid.appendChild(cel);
  }

  // Días del mes actual
  for (let d = 1; d <= ultimoDia.getDate(); d++) {
    const fechaStr = `${calAnyo}-${String(calMes+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const esHoy = hoy.getDate() === d && hoy.getMonth() === calMes && hoy.getFullYear() === calAnyo;
    const cel = crearCelda(d, false, esHoy);
    // Añadir chips de eventos
    const evsDia = eventos.filter(e => e.fecha === fechaStr);
    evsDia.forEach(ev => {
      const chip = document.createElement('span');
      chip.className = `cal-evento-chip chip-${ev.color}`;
      chip.textContent = ev.nombre;
      chip.title = `${ev.nombre} · ${ev.hora || ''} · ${ev.lugar || ''}`;
      chip.onclick = (e) => { e.stopPropagation(); verEventoCalendario(ev.id); };
      cel.appendChild(chip);
    });
    grid.appendChild(cel);
  }

  // Completar hasta 42 celdas
  const totalCeldas = inicioSemana + ultimoDia.getDate();
  const celdasDeFin = 42 - totalCeldas;
  for (let d = 1; d <= celdasDeFin; d++) {
    grid.appendChild(crearCelda(d, true));
  }

  renderProximosEventos();
}

function crearCelda(num, otroMes, esHoy = false) {
  const cel = document.createElement('div');
  cel.className = 'cal-celda' + (otroMes ? ' otro-mes' : '') + (esHoy ? ' hoy' : '');
  const numEl = document.createElement('div');
  numEl.className = 'cal-num';
  numEl.textContent = num;
  cel.appendChild(numEl);
  return cel;
}

function verEventoCalendario(id) {
  const ev = eventos.find(e => e.id === id);
  if (!ev) return;
  const fecha = new Date(ev.fecha + 'T12:00:00');
  const fechaLegible = fecha.toLocaleDateString(localeActual(), {weekday:'long', day:'numeric', month:'long', year:'numeric'});
  mostrarToast(`📅 ${ev.nombre} · ${fechaLegible} ${ev.hora ? '· ' + ev.hora : ''}`);
}

function renderProximosEventos() {
  const hoy = new Date(); hoy.setHours(0,0,0,0);
  const proximos = eventos
    .filter(e => new Date(e.fecha + 'T12:00:00') >= hoy)
    .sort((a,b) => new Date(a.fecha) - new Date(b.fecha))
    .slice(0, 5);

  const lista = document.getElementById('proximosEventosLista');
  if (proximos.length === 0) {
    lista.innerHTML = '<p style="color:var(--texto-suave);font-style:italic;">No hay eventos próximos.</p>';
    return;
  }
  lista.innerHTML = proximos.map(ev => {
    const fecha = new Date(ev.fecha + 'T12:00:00');
    const fechaLegible = fecha.toLocaleDateString(localeActual(), {day:'numeric', month:'short'});
    return `
      <div class="prox-evento">
        <span class="pe-fecha">${fechaLegible}</span>
        <div class="pe-info">
          <h5>${ev.nombre}</h5>
          <p>${ev.hora ? ev.hora + ' · ' : ''}${ev.lugar || ''}</p>
        </div>
        <div class="pe-acciones" style="display:${adminMode?'flex':'none'}">
          <button class="pe-btn-editar" onclick="editarEvento(${ev.id})">✏️ Editar</button>
          <button class="pe-btn-borrar" onclick="borrarEvento(${ev.id})">🗑️</button>
        </div>
      </div>
    `;
  }).join('');
}

// ══════════════════════════════════════════════
// GESTIÓN DE EVENTOS (ADMIN)
// ══════════════════════════════════════════════
function abrirModalEvento(id = null) {
  eventoEditandoId = id;
  document.getElementById('modalEventoTitulo').textContent = id ? 'Editar Evento' : 'Nuevo Evento';
  if (id) {
    const ev = eventos.find(e => e.id === id);
    document.getElementById('ev-id').value = ev.id;
    document.getElementById('ev-nombre').value = ev.nombre;
    document.getElementById('ev-fecha').value = ev.fecha;
    document.getElementById('ev-hora').value = ev.hora || '';
    document.getElementById('ev-lugar').value = ev.lugar || '';
    document.getElementById('ev-descripcion').value = ev.descripcion || '';
    document.getElementById('ev-categoria').value = ev.categoria || 'general';
    document.getElementById('ev-color').value = ev.color || 'azul';
    // Seleccionar chip de color
    document.querySelectorAll('.color-chip').forEach(c => {
      c.classList.toggle('seleccionado', c.dataset.color === ev.color);
    });
  } else {
    document.getElementById('ev-id').value = '';
    document.getElementById('ev-nombre').value = '';
    document.getElementById('ev-fecha').value = '';
    document.getElementById('ev-hora').value = '';
    document.getElementById('ev-lugar').value = '';
    document.getElementById('ev-descripcion').value = '';
    document.getElementById('ev-categoria').value = 'general';
    document.getElementById('ev-color').value = 'azul';
    document.querySelectorAll('.color-chip').forEach(c => c.classList.toggle('seleccionado', c.dataset.color === 'azul'));
  }
  abrirModal('modalEvento');
}

function editarEvento(id) { abrirModalEvento(id); }

function seleccionarColor(chip) {
  document.querySelectorAll('.color-chip').forEach(c => c.classList.remove('seleccionado'));
  chip.classList.add('seleccionado');
  document.getElementById('ev-color').value = chip.dataset.color;
}

async function guardarEvento() {
  const nombre = document.getElementById('ev-nombre').value.trim();
  const fecha = document.getElementById('ev-fecha').value;
  if (!nombre || !fecha) { mostrarToast('⚠️ Nombre y fecha son obligatorios'); return; }

  const datos = {
    nombre,
    fecha,
    hora: document.getElementById('ev-hora').value,
    lugar: document.getElementById('ev-lugar').value.trim(),
    descripcion: document.getElementById('ev-descripcion').value.trim(),
    categoria: document.getElementById('ev-categoria').value,
    color: document.getElementById('ev-color').value
  };

  const idExistente = parseInt(document.getElementById('ev-id').value);
  try {
    if (idExistente) {
      await api(`eventos/${idExistente}`, { method: 'PUT', body: datos });
      mostrarToast(`✅ Evento "${nombre}" actualizado`);
    } else {
      await api('eventos', { method: 'POST', body: datos });
      mostrarToast(`✅ Evento "${nombre}" añadido`);
    }
    await cargarEventos();
  } catch (e) {
    mostrarToast('⚠️ ' + e.message);
    return;
  }

  cerrarModal('modalEvento');
  renderCalendario();
  renderProximosEventos();
  renderListaEventosPortal();
  if (falleroLogueado && (falleroLogueado.esAdmin || adminMode)) actualizarFiltroAdmin();
}

async function borrarEvento(id) {
  const ev = eventos.find(e => e.id === id);
  if (!confirm(`¿Borrar el evento "${ev ? ev.nombre : ''}"?`)) return;
  try {
    await api(`eventos/${id}`, { method: 'DELETE' });
    await cargarEventos();
  } catch (e) {
    mostrarToast('⚠️ ' + e.message);
    return;
  }
  renderCalendario();
  renderProximosEventos();
  renderListaEventosPortal();
  mostrarToast('🗑️ Evento eliminado');
}

// ══════════════════════════════════════════════
// CUENTA ATRÁS
// ══════════════════════════════════════════════
function actualizarCuentaAtras() {
  const objetivo = new Date('2027-03-15T00:00:00+01:00');
  const diff = objetivo - new Date();
  if (diff <= 0) { document.getElementById('cd-dias').textContent = '¡YA!'; return; }
  document.getElementById('cd-dias').textContent = String(Math.floor(diff/86400000)).padStart(2,'0');
  document.getElementById('cd-horas').textContent = String(Math.floor((diff%86400000)/3600000)).padStart(2,'0');
  document.getElementById('cd-min').textContent = String(Math.floor((diff%3600000)/60000)).padStart(2,'0');
  document.getElementById('cd-seg').textContent = String(Math.floor((diff%60000)/1000)).padStart(2,'0');
}
actualizarCuentaAtras();
setInterval(actualizarCuentaAtras, 1000);

// ══════════════════════════════════════════════
// FORMULARIO CONTACTO
// ══════════════════════════════════════════════
function enviarForm() {
  const nombre = document.getElementById('f-nombre').value;
  const email = document.getElementById('f-email').value;
  if (!nombre || !email) { alert('Por favor rellena nombre y email.'); return; }
  document.getElementById('msg-exito').style.display = 'block';
  ['f-nombre','f-email','f-mensaje'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('f-motivo').value = '';
}

// ══════════════════════════════════════════════
// MENÚ HAMBURGUESA
// ══════════════════════════════════════════════
function toggleMenu() {
  const links = document.getElementById('navLinks');
  const btn   = document.getElementById('navHamburguesa');
  const abierto = links.classList.toggle('abierto');
  btn.classList.toggle('abierto', abierto);
  // Bloquear scroll del body cuando el menú está abierto
  document.body.style.overflow = abierto ? 'hidden' : '';
}

function cerrarMenu() {
  const links = document.getElementById('navLinks');
  const btn   = document.getElementById('navHamburguesa');
  links.classList.remove('abierto');
  btn.classList.remove('abierto');
  document.body.style.overflow = '';
}

// Cerrar menú al hacer scroll
window.addEventListener('scroll', () => {
  if (document.getElementById('navLinks').classList.contains('abierto')) {
    cerrarMenu();
  }
}, { passive: true });

// ══════════════════════════════════════════════
// SCROLL ACTIVO NAVBAR
// ══════════════════════════════════════════════
const secciones = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  secciones.forEach(s => {
    const top = s.offsetTop - 80;
    const bottom = top + s.offsetHeight;
    if (window.scrollY >= top && window.scrollY < bottom) {
      document.querySelectorAll('.nav-links a').forEach(a => {
        a.style.color = a.getAttribute('href') === '#'+s.id ? 'var(--dorado-claro)' : '';
      });
    }
  });
});

// ══════════════════════════════════════════════
// INIT
// ══════════════════════════════════════════════
// No pintamos noticias/representantes/galería con los datos de ejemplo:
// mostramos un aviso de "cargando" hasta que llegan los datos reales del
// servidor (cargarNoticias/cargarRepresentantes/cargarGaleria, más abajo).
// Así nunca se ve un "parpadeo" de contenido viejo antes del real.
document.getElementById('noticias-grid').innerHTML = '<div class="cargando-mensaje">Cargando noticias...</div>';
document.getElementById('junta-grid').innerHTML = '<div class="cargando-mensaje">Cargando representantes...</div>';
document.getElementById('galeria-grid-portada').innerHTML = '<div class="cargando-mensaje">Cargando galería...</div>';
renderCalendario();


// ══════════════════════════════════════════════
// CARNET FALLERO
// ══════════════════════════════════════════════
let carnetBg    = '#0d3a6e';
let carnetTxt   = '#ffffff';
let escudoImg   = null;
let fotoFallero = null;

// Precargar escudo
(function precargarEscudo() {
  const img = new Image();
  img.onload  = () => { escudoImg = img; previsualizarCarnet(); previsualizarMarco(); };
  img.onerror = () => { escudoImg = null; };
  img.src = 'escudo.png';
})();

function elegirColorCarnet(btn) {
  document.querySelectorAll('.carnet-color-btn').forEach(b => b.classList.remove('activo'));
  btn.classList.add('activo');
  carnetBg  = btn.dataset.bg;
  carnetTxt = btn.dataset.txt;
  previsualizarCarnet();
  previsualizarMarco();
}

function cargarFotoFallero(input) {
  if (!input.files || !input.files[0]) return;
  const reader = new FileReader();
  reader.onload = e => {
    const img = new Image();
    img.onload = () => { fotoFallero = img; previsualizarCarnet(); previsualizarMarco(); };
    img.src = e.target.result;
  };
  reader.readAsDataURL(input.files[0]);
}

/* ── Dibuja imagen recortada en círculo ── */
function dibujarCirculo(ctx, img, cx, cy, r) {
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.clip();
  // Escalar para cubrir el círculo (object-fit: cover)
  const scale = Math.max((r * 2) / img.width, (r * 2) / img.height);
  const w = img.width  * scale;
  const h = img.height * scale;
  ctx.drawImage(img, cx - w / 2, cy - h / 2, w, h);
  ctx.restore();
}

/* ══════════════════════════
   CARNET (560 × 340)
══════════════════════════ */
function previsualizarCarnet() {
  const canvas = document.getElementById('carnetCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = 560, H = 340;
  const nombre = document.getElementById('carnet-nombre').value || 'Tu Nombre Aquí';
  const cargo  = document.getElementById('carnet-cargo').value;
  const anyo   = document.getElementById('carnet-anyo').value;

  ctx.clearRect(0, 0, W, H);

  // ── Fondo con gradiente sutil ──
  const grad = ctx.createLinearGradient(0, 0, W, H);
  grad.addColorStop(0, carnetBg);
  const hex2rgba = (h, a) => {
    const r = parseInt(h.slice(1,3),16), g = parseInt(h.slice(3,5),16), b = parseInt(h.slice(5,7),16);
    return `rgba(${r},${g},${b},${a})`;
  };
  grad.addColorStop(1, hex2rgba(carnetBg, 0.75));
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.roundRect(0, 0, W, H, 18);
  ctx.fill();

  // ── Patrón de puntos decorativo (fondo) ──
  ctx.fillStyle = 'rgba(255,255,255,0.025)';
  for (let x = 20; x < W; x += 22) {
    for (let y = 20; y < H; y += 22) {
      ctx.beginPath();
      ctx.arc(x, y, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // ── Franja dorada lateral izquierda ──
  const gLat = ctx.createLinearGradient(0, 0, 0, H);
  gLat.addColorStop(0, '#f0c040');
  gLat.addColorStop(1, '#c8960a');
  ctx.fillStyle = gLat;
  ctx.beginPath();
  ctx.roundRect(0, 0, 9, H, [18, 0, 0, 18]);
  ctx.fill();

  // ── Cabecera: franja semitransparente ──
  ctx.fillStyle = 'rgba(255,255,255,0.05)';
  ctx.fillRect(9, 0, W - 9, 72);

  // ── Línea dorada bajo cabecera ──
  ctx.strokeStyle = '#c8960a';
  ctx.lineWidth = 1;
  ctx.globalAlpha = 0.6;
  ctx.beginPath();
  ctx.moveTo(22, 72); ctx.lineTo(W - 18, 72);
  ctx.stroke();
  ctx.globalAlpha = 1;

  // ── Escudo (o ⚓ si no carga) en cabecera ──
  const esX = 52, esY = 36, esR = 26;
  if (escudoImg) {
    // Clip circular con sombra
    ctx.save();
    ctx.shadowColor = 'rgba(0,0,0,0.4)';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(esX, esY, esR, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.1)';
    ctx.fill();
    ctx.restore();
    dibujarCirculo(ctx, escudoImg, esX, esY, esR - 2);
    // Borde dorado
    ctx.strokeStyle = '#c8960a';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(esX, esY, esR, 0, Math.PI * 2);
    ctx.stroke();
  } else {
    ctx.fillStyle = 'rgba(255,255,255,0.1)';
    ctx.beginPath();
    ctx.arc(esX, esY, esR, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#c8960a';
    ctx.font = 'bold 24px serif';
    ctx.textAlign = 'center';
    ctx.fillText('⚓', esX, esY + 8);
  }

  // ── Nombre falla (cabecera) ──
  ctx.textAlign = 'left';
  ctx.fillStyle = 'rgba(255,255,255,0.75)';
  ctx.font = '600 11px "Raleway", sans-serif';
  ctx.fillText('ASOCIACIÓ CULTURAL', 88, 26);
  ctx.fillStyle = '#f0c040';
  ctx.font = 'bold 18px "Raleway", sans-serif';
  ctx.fillText('FALLA LA MARINA', 88, 48);
  ctx.fillStyle = 'rgba(255,255,255,0.35)';
  ctx.font = '10px "Raleway", sans-serif';
  ctx.fillText('Puerto de Sagunto · Valencia', 88, 64);

  // ── Ejercicio y etiqueta (derecha) ──
  ctx.textAlign = 'right';
  ctx.fillStyle = 'rgba(255,255,255,0.45)';
  ctx.font = '10px "Raleway", sans-serif';
  ctx.fillText('CARNET FALLERO', W - 18, 26);
  ctx.fillStyle = '#c8960a';
  ctx.font = 'bold 11px "Raleway", sans-serif';
  ctx.fillText('EXERCICI ' + anyo, W - 18, 44);

  // ── Avatar (foto o inicial) ──
  const ax = 72, ay = 195, ar = 54;
  // Sombra
  ctx.save();
  ctx.shadowColor = 'rgba(0,0,0,0.5)';
  ctx.shadowBlur = 16;
  ctx.fillStyle = 'rgba(255,255,255,0.08)';
  ctx.beginPath();
  ctx.arc(ax, ay, ar, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  if (fotoFallero) {
    dibujarCirculo(ctx, fotoFallero, ax, ay, ar - 2);
  } else {
    ctx.fillStyle = 'rgba(255,255,255,0.1)';
    ctx.beginPath();
    ctx.arc(ax, ay, ar, 0, Math.PI * 2);
    ctx.fill();
    const ini = nombre.trim().charAt(0).toUpperCase() || '?';
    ctx.fillStyle = 'rgba(255,255,255,0.85)';
    ctx.font = 'bold 40px "Raleway", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(ini, ax, ay + 14);
  }
  // Borde dorado avatar
  ctx.strokeStyle = '#c8960a';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(ax, ay, ar, 0, Math.PI * 2);
  ctx.stroke();

  // ── Datos personales ──
  ctx.textAlign = 'left';

  // Nombre
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 21px "Raleway", sans-serif';
  let nd = nombre;
  while (ctx.measureText(nd).width > 350 && nd.length > 4) nd = nd.slice(0, -1);
  if (nd !== nombre) nd += '…';
  ctx.fillText(nd, 148, 152);

  // Cargo
  ctx.fillStyle = '#f0c040';
  ctx.font = 'bold 12px "Raleway", sans-serif';
  ctx.fillText(cargo.toUpperCase(), 148, 174);

  // Separador
  ctx.strokeStyle = 'rgba(255,255,255,0.12)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(148, 184); ctx.lineTo(W - 20, 184);
  ctx.stroke();

  // Número de fallero (estético)
  ctx.fillStyle = 'rgba(255,255,255,0.38)';
  ctx.font = '10px "Raleway", sans-serif';
  ctx.fillText('EXERCICI · MEMBRE ACTIU', 148, 200);

  // ── Zona inferior ──
  ctx.fillStyle = 'rgba(255,255,255,0.05)';
  ctx.fillRect(9, H - 58, W - 9, 58);
  ctx.strokeStyle = 'rgba(255,255,255,0.08)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(9, H - 58); ctx.lineTo(W, H - 58);
  ctx.stroke();

  // Barras de código decorativas
  ctx.fillStyle = 'rgba(255,255,255,0.2)';
  const barras = [8,12,5,10,3,14,6,9,10,13,4,6,8,11,6,12,7,4,10,14,5,9,12,10,4,8,6,13,10,8,11,6,9,5,12];
  let bx = 22;
  barras.forEach(bh => { ctx.fillRect(bx, H - 50, 3, bh); bx += 5; });

  ctx.fillStyle = 'rgba(255,255,255,0.28)';
  ctx.font = '9px monospace';
  ctx.textAlign = 'left';
  ctx.fillText('FM·' + anyo.replace('–','-') + '·' + nombre.replace(/\s/g,'').substring(0,10).toUpperCase(), 22, H - 12);

  // Sello circular
  ctx.save();
  ctx.strokeStyle = 'rgba(200,150,10,0.5)';
  ctx.lineWidth = 1.5;
  ctx.setLineDash([3,3]);
  ctx.beginPath();
  ctx.arc(W - 46, H - 32, 24, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
  ctx.fillStyle = 'rgba(200,150,10,0.45)';
  ctx.font = 'bold 8px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('VÀLID', W - 46, H - 36);
  ctx.fillText(anyo.split('–')[1] || '2027', W - 46, H - 24);
}

/* ══════════════════════════
   MARCO INSTAGRAM (600 × 600 en canvas, export 1080×1080)
══════════════════════════ */
function previsualizarMarco() {
  const canvas = document.getElementById('marcoCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const S = 600;
  const nombre = document.getElementById('carnet-nombre').value || 'Tu Nombre Aquí';
  const cargo  = document.getElementById('carnet-cargo').value;
  const anyo   = document.getElementById('carnet-anyo').value;

  ctx.clearRect(0, 0, S, S);

  // Fondo degradado radial
  const grad = ctx.createRadialGradient(S/2, S/2, 60, S/2, S/2, S * 0.8);
  const r2 = parseInt(carnetBg.slice(1,3),16);
  const g2 = parseInt(carnetBg.slice(3,5),16);
  const b2 = parseInt(carnetBg.slice(5,7),16);
  grad.addColorStop(0, `rgba(${Math.min(r2+30,255)},${Math.min(g2+30,255)},${Math.min(b2+40,255)},1)`);
  grad.addColorStop(1, carnetBg);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, S, S);

  // Patrón diagonal decorativo
  ctx.save();
  ctx.strokeStyle = 'rgba(255,255,255,0.04)';
  ctx.lineWidth = 1;
  for (let i = -S; i < S * 2; i += 28) {
    ctx.beginPath();
    ctx.moveTo(i, 0); ctx.lineTo(i + S, S);
    ctx.stroke();
  }
  ctx.restore();

  // Marco dorado exterior
  const mg = 16;
  ctx.strokeStyle = '#c8960a';
  ctx.lineWidth = 3;
  ctx.strokeRect(mg, mg, S - mg*2, S - mg*2);
  // Marco interior fino
  ctx.strokeStyle = 'rgba(200,150,10,0.35)';
  ctx.lineWidth = 1;
  ctx.strokeRect(mg + 8, mg + 8, S - (mg+8)*2, S - (mg+8)*2);

  // Esquinas decorativas
  const drawCorner = (x, y, dx, dy) => {
    ctx.strokeStyle = '#f0c040';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(x + dx*22, y); ctx.lineTo(x, y); ctx.lineTo(x, y + dy*22);
    ctx.stroke();
  };
  drawCorner(mg, mg, 1, 1);
  drawCorner(S-mg, mg, -1, 1);
  drawCorner(mg, S-mg, 1, -1);
  drawCorner(S-mg, S-mg, -1, -1);

  // Foto o avatar grande central
  const cx = S / 2, cy = S / 2 - 40, cr = 115;
  // Sombra
  ctx.save();
  ctx.shadowColor = 'rgba(0,0,0,0.6)';
  ctx.shadowBlur = 30;
  ctx.fillStyle = carnetBg;
  ctx.beginPath();
  ctx.arc(cx, cy, cr, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  if (fotoFallero) {
    dibujarCirculo(ctx, fotoFallero, cx, cy, cr - 3);
  } else {
    ctx.fillStyle = 'rgba(255,255,255,0.1)';
    ctx.beginPath();
    ctx.arc(cx, cy, cr, 0, Math.PI * 2);
    ctx.fill();
    const ini = nombre.trim().charAt(0).toUpperCase() || '?';
    ctx.fillStyle = 'rgba(255,255,255,0.8)';
    ctx.font = 'bold 90px "Raleway", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(ini, cx, cy + 32);
  }
  // Anillo dorado
  ctx.strokeStyle = '#c8960a';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(cx, cy, cr, 0, Math.PI * 2);
  ctx.stroke();
  ctx.strokeStyle = 'rgba(240,192,64,0.3)';
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.arc(cx, cy, cr + 8, 0, Math.PI * 2);
  ctx.stroke();

  // Escudo pequeño abajo-derecha del avatar
  const esX2 = cx + cr * 0.72, esY2 = cy + cr * 0.72;
  ctx.fillStyle = carnetBg;
  ctx.beginPath();
  ctx.arc(esX2, esY2, 30, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#c8960a';
  ctx.lineWidth = 2;
  ctx.stroke();
  if (escudoImg) {
    dibujarCirculo(ctx, escudoImg, esX2, esY2, 26);
  } else {
    ctx.fillStyle = '#c8960a';
    ctx.font = '22px serif';
    ctx.textAlign = 'center';
    ctx.fillText('⚓', esX2, esY2 + 8);
  }

  // Nombre
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 32px "Raleway", sans-serif';
  ctx.textAlign = 'center';
  let ndm = nombre;
  while (ctx.measureText(ndm).width > S - 80 && ndm.length > 4) ndm = ndm.slice(0,-1);
  if (ndm !== nombre) ndm += '…';
  ctx.fillText(ndm, S/2, cy + cr + 44);

  // Cargo
  ctx.fillStyle = '#f0c040';
  ctx.font = 'bold 16px "Raleway", sans-serif';
  ctx.fillText(cargo.toUpperCase(), S/2, cy + cr + 68);

  // Falla + ejercicio
  ctx.fillStyle = 'rgba(255,255,255,0.55)';
  ctx.font = '13px "Raleway", sans-serif';
  ctx.fillText('FALLA LA MARINA · ' + anyo, S/2, cy + cr + 90);

  // Banda inferior con escudo
  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  ctx.fillRect(mg + 1, S - 70, S - (mg+1)*2, 54);

  if (escudoImg) {
    dibujarCirculo(ctx, escudoImg, S/2 - 60, S - 43, 18);
  }
  ctx.fillStyle = '#c8960a';
  ctx.font = 'bold 13px "Raleway", sans-serif';
  ctx.fillText('ASSOCIACIÓ CULTURAL FALLA LA MARINA', S/2 + (escudoImg ? 14 : 0), S - 47);
  ctx.fillStyle = 'rgba(255,255,255,0.45)';
  ctx.font = '11px "Raleway", sans-serif';
  ctx.fillText('Puerto de Sagunto · Valencia · España', S/2 + (escudoImg ? 14 : 0), S - 30);
}

function descargarCarnet() {
  const nombre = document.getElementById('carnet-nombre').value.trim();
  if (!nombre) { mostrarToast('✏️ Escribe tu nombre primero'); return; }
  // Renderizar a resolución 2× para nitidez
  const c = document.getElementById('carnetCanvas');
  previsualizarCarnet();
  const link = document.createElement('a');
  link.download = 'carnet-fallero-' + nombre.toLowerCase().replace(/\s+/g,'-') + '.png';
  link.href = c.toDataURL('image/png');
  link.click();
  mostrarToast('🪪 ¡Carnet descargado!');
}

function descargarMarco() {
  const nombre = document.getElementById('carnet-nombre').value.trim();
  if (!nombre) { mostrarToast('✏️ Escribe tu nombre primero'); return; }
  // Exportar a 1080×1080 escalando el canvas de 600
  const src = document.getElementById('marcoCanvas');
  previsualizarMarco();
  const out = document.createElement('canvas');
  out.width = 1080; out.height = 1080;
  const octx = out.getContext('2d');
  octx.drawImage(src, 0, 0, 1080, 1080);
  const link = document.createElement('a');
  link.download = 'marco-instagram-' + nombre.toLowerCase().replace(/\s+/g,'-') + '.png';
  link.href = out.toDataURL('image/png');
  link.click();
  mostrarToast('📸 ¡Marco para Instagram descargado!');
}

// Inicializar al cargar
document.addEventListener('DOMContentLoaded', async () => {
  previsualizarCarnet();
  previsualizarMarco();

  // Datos reales desde el servidor (en paralelo, no uno detrás de otro, para tardar menos)
  await Promise.all([
    cargarEventos(),
    cargarRepresentantes(),
    cargarGaleria(),
    cargarNoticias(),
    restaurarSesion(),
  ]);

  renderCalendario();
  renderProximosEventos();
  renderListaEventosPortal();
  renderRepresentantes();
  renderGaleriaPortada();
  renderNoticias();
  abrirNoticiaDesdeURL();

  // Restaura el idioma elegido en la visita anterior (traduce todo si estaba en valenciano)
  aplicarIdioma(idiomaActual);

  if (falleroLogueado) {
    document.getElementById('portal-login-screen').style.display = 'none';
    document.getElementById('portal-contenido').style.display = 'block';
    document.getElementById('portal-nombre-usuario').textContent =
      (falleroLogueado.nombre + ' ' + falleroLogueado.apellidos).trim();
    document.getElementById('tab-admin-btn').style.display =
      falleroLogueado.esAdmin ? 'block' : 'none';
    renderMisInscripciones();
    if (falleroLogueado.esAdmin) actualizarFiltroAdmin();
  }
});

// ══════════════════════════════════════════════
// COOKIES / TÉRMINOS
// ══════════════════════════════════════════════
function abrirTerminos() {
  abrirModal('modalTerminos');
}
function aceptarCookies() {
  document.getElementById('cookieBanner').classList.add('oculto');
  try { localStorage.setItem('falla_cookies', 'todas'); } catch (e) { /* modo privado */ }
}
function rechazarCookies() {
  document.getElementById('cookieBanner').classList.add('oculto');
  try { localStorage.setItem('falla_cookies', 'necesarias'); } catch (e) { /* modo privado */ }
}
// Mostrar el aviso solo si el visitante todavía no ha elegido
(function () {
  let elegido = null;
  try { elegido = localStorage.getItem('falla_cookies'); } catch (e) { /* modo privado */ }
  const banner = document.getElementById('cookieBanner');
  banner.classList.add('oculto');
  if (!elegido) setTimeout(() => banner.classList.remove('oculto'), 800);
})();

