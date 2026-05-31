import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  Link,
  Navigate,
  NavLink,
  Outlet,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";
import datosJSON from '../data/datos.json';
import funkyLogo from './assets/funky-logo.png';

const teamMembers = [
  {
    slug: "sebastian-vitcop",
    name: "Sebastián Vitcop",
    role: "Frontend Dev",
    description: "Especializado en estructura visual, base semantica y composicion de interfaces.",
    avatar: "/img/sebastianvit_funko.png",
    accent: "var(--accent-sky)",
    initials: "SV",
    page: "vitcop",
  },
  {
    slug: "sebastian-matulionis",
    name: "Sebastián Matulionis",
    role: "Frontend Developer",
    description: "Enfocado en UI, organizacion de contenido y mejoras de experiencia de usuario.",
    avatar: "/img/sebastianmatu_funko.png",
    accent: "var(--accent-mint)",
    initials: "SM",
    page: "matulionis",
  },
  {
    slug: "melody-amaro",
    name: "Melody Amaro",
    role: "Desarrollo web",
    description: "Aporta criterio visual, interactividad y una mirada sensible sobre la narrativa del sitio.",
    avatar: "/img/melody_funko.png",
    accent: "var(--accent-peach)",
    initials: "MA",
    page: "melody",
  },
  {
    slug: "lucrecia-vigo",
    name: "Lucrecia Vigo",
    role: "Backend Developer",
    description: "Suma organización, contenido personal y una propuesta interactiva para su pagina propia.",
    avatar: "/img/lucrecia_funko.png",
    accent: "var(--accent-lilac)",
    initials: "LV",
    page: "lucrecia",
  },
];

const sebastianMatulionisSkills = [
  { name: "HTML semántico", level: 92, note: "Estructuras claras y accesibles." },
  { name: "CSS responsive", level: 88, note: "Layouts flexibles y consistentes." },
  { name: "JavaScript", level: 76, note: "Interactividad y lógica de interfaz." },
  { name: "Git / GitHub", level: 74, note: "Versionado y trabajo colaborativo." },
  { name: "React", level: 62, note: "Componentes y navegación SPA." },
];

const sebastianMatulionisProjects = [
  {
    title: "Landing de presentación",
    summary: "Maqueta centrada en contenido visual, bloques destacados y jerarquía tipográfica.",
    stack: ["HTML", "CSS", "Responsive"],
    focus: "Trabaje en la organización de secciones y en una experiencia de lectura más clara.",
  },
  {
    title: "Dashboard académico",
    summary: "Interfaz con tarjetas, sidebar y rutas internas para ordenar la información del equipo.",
    stack: ["React", "React Router", "CSS"],
    focus: "Me enfoque en transformar contenido estático en una navegación más intuitiva.",
  },
  {
    title: "Bitácora interactiva",
    summary: "Registro visual del avance del proyecto con bloques reutilizables y mejor lectura.",
    stack: ["JavaScript", "UI", "Componentes"],
    focus: "Busqué que la documentación del proceso se vea más dinámica y fácil de seguir.",
  },
];

const sebastianMatulionisTechStack = [
  { name: "HTML5", tone: "sky", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "CSS3", tone: "mint", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { name: "JavaScript", tone: "peach", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "React", tone: "lilac", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "GitHub", tone: "sky", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
];

const sebastianMatulionisSocialLinks = [
  {
    label: "GitHub",
    handle: "@sebastianm",
    href: "#",
    tone: "sky",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  },
  {
    label: "LinkedIn",
    handle: "Perfil profesional",
    href: "#",
    tone: "mint",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg",
  },
  {
    label: "Instagram",
    handle: "@seba.dev",
    href: "#",
    tone: "peach",
    icon: "/img/social/instagram.svg",
  },
];


const lucreciaSkills = [
  { name: "Bases de Datos", level: 92, note: "Modelado relacional y MySQL." },
  { name: "Backend Core", level: 88, note: "Lógica de servidor con PHP y Python." },
  { name: "Migración & APIs", level: 82, note: "Implementaciones con Prisma y NestJS." },
  { name: "JavaScript", level: 75, note: "Interactividad y consumo de datos en el cliente." },
  { name: "Infraestructura", level: 70, note: "Fundamentos de Cloud y Ciberseguridad." },
];

const lucreciaProjects = [
  {
    title: "Sistema Liga Casildense",
    summary: "Migración de sistema de gestión deportivo desde PHP/XAMPP hacia un entorno con Prisma y NestJS.",
    stack: ["NestJS", "Prisma", "MySQL"],
    focus: "Diseño centrado en la confianza entre clubes, gestionando registros mediante codigoInterno sin necesidad de listas por partido.",
  },
  {
    title: "App Entrenamiento Cognitivo",
    summary: "Aplicación móvil con juegos mentales enfocados en el rendimiento de deportistas.",
    stack: ["JavaScript", "Lógica", "UI"],
    focus: "Desarrollo de módulos interactivos como MentalRotation, MemoryMatrix y SemanticStream.",
  },
  {
    title: "Cazador de Raíces",
    summary: "Actividad gamificada para el aula orientada a la enseñanza de matemáticas.",
    stack: ["Lógica", "Educación", "Algoritmos"],
    focus: "Uso de conjuntos de polinomios para enseñar la regla de Ruffini de forma visual e interactiva.",
  }
];

const lucreciaTechStack = [
  { name: "PHP", tone: "sky", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
  { name: "MySQL", tone: "mint", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "NestJS", tone: "peach", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg" },
  { name: "Python", tone: "lilac", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "Prisma", tone: "sky", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg" },
];

const lucreciaSocialLinks = [
  {
    label: "GitHub",
    handle: "@lucrelucre",
    href: "#",
    tone: "sky",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  },
  {
    label: "LinkedIn",
    handle: "Perfil profesional",
    href: "#",
    tone: "mint",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg",
  },
  {
    label: "Portfolio",
    handle: "Proyectos",
    href: "#",
    tone: "peach",
    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/codepen.svg",
  },
];

const melodySkills = [
  { name: "HTML semántico", level: 88, note: "Estructura clara y accesible." },
  { name: "CSS / Responsive", level: 85, note: "Layouts flexibles y estilos cuidados." },
  { name: "JavaScript", level: 72, note: "Interactividad y manipulación del DOM." },
  { name: "React", level: 64, note: "Componentes y navegación SPA." },
  { name: "IA aplicada", level: 70, note: "Exploración de herramientas de inteligencia artificial." },
];

const melodyProjects = [
  {
    title: "Tarjeta personal interactiva",
    summary: "Página individual con secciones desplegables y cambio de tema desde JavaScript.",
    stack: ["HTML", "CSS", "JavaScript"],
    focus: "Trabajé la interactividad y la accesibilidad del toggle de detalles.",
  },
  {
    title: "Migración del TP1 a React",
    summary: "Reescritura de la estructura estática hacia componentes y navegación por rutas.",
    stack: ["React", "React Router", "CSS"],
    focus: "Me enfoqué en reutilizar componentes y mantener la identidad visual del equipo.",
  },
  {
    title: "Experimentos con IA",
    summary: "Pruebas con herramientas de inteligencia artificial aplicadas a contenido y diseño.",
    stack: ["IA", "Prompting", "UI"],
    focus: "Busqué entender cómo integrar IA para potenciar ventas y experiencia de usuario.",
  },
];

const melodyTechStack = [
  { name: "HTML5", tone: "sky", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "CSS3", tone: "mint", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { name: "JavaScript", tone: "peach", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "React", tone: "lilac", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "GitHub", tone: "sky", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
];

const melodySocialLinks = [
  {
    label: "GitHub",
    handle: "@melodyamaro",
    href: "#",
    tone: "sky",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  },
  {
    label: "LinkedIn",
    handle: "Perfil profesional",
    href: "#",
    tone: "mint",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg",
  },
  {
    label: "Instagram",
    handle: "@melody.dev",
    href: "#",
    tone: "peach",
    icon: "/img/social/instagram.svg",
  },
];


const lucreciaMoodData = {
  aventurero: {
    movie: "UP: una aventura de altura",
    movieNote: "Porque a veces hay que lanzarse sin mapa.",
    album: "¿Dónde están los ladrones? — Shakira",
    albumNote: "Energía pura para emprender camino.",
    act: "Viajar",
    actNote: "Nada como descubrir un lugar nuevo.",
  },
  reflexivo: {
    movie: "Una mente brillante",
    movieNote: "Para pensar en grande y no rendirse.",
    album: "Mediterráneo — Joan Manuel Serrat",
    albumNote: "Poesía hecha música, ideal para pensar.",
    act: "Leer",
    actNote: "Un buen libro siempre es buena compañía.",
  },
  melancolico: {
    movie: "UP: una aventura de altura",
    movieNote: "Te va a hacer llorar y después sonreír.",
    album: "Vasos vacíos — Los Fabulosos Cadillacs",
    albumNote: "Para sentir y dejar pasar.",
    act: "Tener animales cerca",
    actNote: "Pelos, plumas o escamas: siempre ayudan.",
  },
  feliz: {
    movie: "Bastardos sin gloria",
    movieNote: "Intenso, audaz y lleno de adrenalina.",
    album: "Vasos vacíos — Los Fabulosos Cadillacs",
    albumNote: "Ritmo que no para.",
    act: "Leer",
    actNote: "Aprovechá el buen estado de ánimo para un libro nuevo.",
  },
};

const mysteryBoxPrizes = [
  "HTML Master",
  "CSS Wizard",
  "React Hero",
  "Git Guardian",
  "Frontend Legend",
  "JavaScript Ninja",
];

function getFunkoRarity(level) {
  if (level >= 90) {
    return { label: "Legendary", stars: "⭐⭐⭐⭐", tone: "legendary" };
  }

  if (level >= 75) {
    return { label: "Epic", stars: "⭐⭐⭐", tone: "epic" };
  }

  if (level >= 60) {
    return { label: "Rare", stars: "⭐⭐", tone: "rare" };
  }

  return { label: "Common", stars: "⭐", tone: "common" };
}

function formatFunkoNumber(index) {
  return `FUNKY #${String(index + 1).padStart(3, "0")}`;
}

function SkillBarCard({ skill }) {
  const rarity = getFunkoRarity(skill.level);

  return (
    <article className="skill-bar-card">
      <div className="skill-bar-header">
        <div className="skill-bar-title-row">
          <h3>{skill.name}</h3>
          <span className="skill-bar-level">{skill.level}%</span>
        </div>
        <p>{skill.note}</p>
        <strong className={`rarity-badge rarity-badge--${rarity.tone}`}>
          {rarity.stars} {rarity.label}
        </strong>
      </div>
      <div
        className="skill-bar-track"
        role="progressbar"
        aria-valuenow={skill.level}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${skill.name}: ${skill.level}%`}
      >
        <div
          className={`skill-bar-fill skill-bar-fill--${rarity.tone}`}
          style={{ "--skill-level": `${skill.level}%` }}
        />
      </div>
    </article>
  );
}

function SkillBarList({ skills }) {
  return (
    <div className="skill-bars" aria-label="Barras de progreso de habilidades">
      {skills.map((skill) => (
        <SkillBarCard key={skill.name} skill={skill} />
      ))}
    </div>
  );
}

function FunkoLogo({ className = "" }) {
  return (
    <div className={`funky-logo ${className}`.trim()}>
      <img src={funkyLogo} alt="Funky Collector Team" className="funko-logo-img" />
    </div>
  );
}

function AppLoader() {
  return (
    <div className="app-loader" role="status" aria-live="polite">
      <FunkoLogo className="app-loader-logo" />
      <p className="app-loader-text">Cargando</p>
    </div>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <AppLoader />;
  }

  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route index element={<HomePage />} />
        <Route path="bitacora" element={<BitacoraPage />} />
        <Route path="integrantes" element={<TeamPage />} />
        <Route path="integrantes/:slug" element={<MemberPage />} />
        <Route path="explorador" element={<ExploradorPage />} />
        <Route path="biblioteca" element={<ApiPage />} />
        <Route path="galeria" element={<GaleriaPage />} />
        <Route path="arbol" element={<ArbolPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

function DashboardLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  return (
    <div className={`app-shell${menuOpen ? " is-menu-open" : ""}`}>
      <button
        type="button"
        className="sidebar-toggle"
        onClick={() => setMenuOpen((value) => !value)}
        aria-expanded={menuOpen}
        aria-controls="main-sidebar"
      >
        <span className="sidebar-toggle-bars" aria-hidden="true" />
        <span className="sidebar-toggle-label">{menuOpen ? "Cerrar" : "Menú"}</span>
      </button>

      {menuOpen ? (
        <button
          type="button"
          className="sidebar-backdrop"
          aria-label="Cerrar menú de navegación"
          onClick={() => setMenuOpen(false)}
        />
      ) : null}

      <Sidebar />
      <main className="app-main">
        <div className="app-main-content">
          <Outlet />
        </div>
        <footer className="app-footer">
          <span className="app-footer-brand">Funky Collector Team</span>
          <p>© {new Date().getFullYear()} Grupo 6 — Todos los derechos reservados.</p>
        </footer>
      </main>
    </div>
  );
}

function Sidebar() {
  return (
    <aside id="main-sidebar" className="sidebar">
      <div className="sidebar-brand">
        <Link to="/" className="sidebar-logo-link" aria-label="Ir a la portada principal">
          <FunkoLogo />
        </Link>
        <div className="sidebar-brand-copy">
          <span className="sidebar-eyebrow">Coleccion React</span>
          <strong>Funky Universe</strong>
        </div>
      </div>

      <nav className="sidebar-nav" aria-label="Navegacion principal">
        <div className="sidebar-section">
          <span className="sidebar-section-label">Catalogo</span>
          <NavItem to="/" end>
            Portada principal
          </NavItem>
          <NavItem to="/bitacora">Bitacora geek</NavItem>
          <NavItem to="/explorador">Explorador de discos</NavItem>
          <NavItem to="/biblioteca">Caja sorpresa API</NavItem>
          <NavItem to="/galeria">Galeria coleccionable</NavItem>
          <NavItem to="/arbol">Arbol de render</NavItem>
        </div>

        <div className="sidebar-section">
          <span className="sidebar-section-label">Figuras</span>
          <div className="sidebar-submenu" aria-label="Paginas individuales">
            {teamMembers.map((member) => (
              <NavItem key={member.slug} to={`/integrantes/${member.slug}`}>
                {member.name}
              </NavItem>
            ))}
          </div>
        </div>
      </nav>
    </aside>
  );
}

function NavItem({ to, end, children }) {
  return (
    <NavLink to={to} end={end} className={({ isActive }) => `sidebar-link${isActive ? " is-active" : ""}`}>
      {children}
    </NavLink>
  );
}

function HomePage() {
  return (
    <section className="page page-home">
      <header className="page-hero page-hero--home">
        <div className="hero-copy">
          <span className="page-kicker">Funky Universe</span>
          <h1 className="hero-title">
            <span className="hero-title-gradient">Funky Collector Team</span>{" "}
            <span className="hero-title-emoji">🎉</span>
          </h1>
          <p>
            Bienvenido a la colección oficial del Grupo 6.
            Cada integrante es una edición especial con habilidades,
            intereses y características únicas.
          </p>
        </div>
        <div className="hero-logo-side">
          <img src={funkyLogo} alt="Funky Collector Team" className="hero-side-logo" />
        </div>
      </header>

      <section className="home-section" aria-labelledby="home-team-title">
        <svg className="svg-defs" width="0" height="0" aria-hidden="true" focusable="false">
          <defs>
            <clipPath id="avatarClip" clipPathUnits="objectBoundingBox">
              <circle cx="0.5" cy="0.5" r="0.5" />
            </clipPath>
          </defs>
        </svg>

        <div className="section-heading">
          <span className="section-kicker">Edicion limitada</span>
          <h2 id="home-team-title">Nuestra coleccion</h2>
        </div>

        <div className="home-team-grid">
          {teamMembers.map((member, index) => (
            <Link
              key={member.slug}
              to={`/integrantes/${member.slug}`}
              className="home-member-card"
              style={{ "--card-delay": `${index * 90}ms` }}
            >
              <div className="funko-box-top" aria-hidden="true">
                <span className="funko-box-brand">Funky</span>
                <span className="funko-box-number">{formatFunkoNumber(index)}</span>
              </div>
              <div className="home-member-avatar-wrap" aria-hidden="true">
                <span className="pop-sticker">Coleccion React</span>
                <img src={member.avatar} alt="" className="home-member-avatar" />
              </div>
              <div className="home-member-copy">
                <h3>{member.name}</h3>
                <p>{member.role}</p>
                <span>Ver figura completa</span>
              </div>
            </Link>
          ))}
        </div>

      </section>
    </section>
  );
}

const bitacoraTimeline = [
  {
    phase: "TP1",
    date: "Primera entrega",
    title: "Base heredada",
    highlights: [
      "Portada, bitácora central y tarjetas individuales en HTML semántico.",
      "Estilos por integrante y JS vanilla para interactividad básica.",
      "Deploy en Vercel como referencia visual del Grupo 6.",
    ],
    tags: ["HTML", "CSS", "JavaScript"],
  },
  {
    phase: "Organización",
    date: "Inicio del TP2",
    title: "Roles y flujo de trabajo",
    highlights: [
      "Trello para tareas, prioridades y estado (pendiente / en progreso / listo).",
      "GitFlow: main estable, develop de integración y ramas feature por módulo.",
      "Cada integrante con foco: layout, perfiles, estilos, contenido o rutas.",
    ],
    tags: ["Trello", "GitFlow", "GitHub"],
  },
  {
    phase: "Migración",
    date: "Desarrollo React",
    title: "De lo estático a React",
    highlights: [
      "Patrones repetidos del TP1 convertidos en componentes reutilizables.",
      "React Router: SPA con sidebar fijo y páginas por ruta.",
      "Vite como bundler; datos en JSON y secciones nuevas (API, galería, árbol).",
    ],
    tags: ["React", "Vite", "React Router"],
  },
  {
    phase: "TP2",
    date: "Entrega actual",
    title: "Evolución técnica",
    highlights: [
      "Layout común: DashboardLayout, Outlet, loader Funky y branding unificado.",
      "Perfiles enriquecidos, barras de habilidad, API Rick & Morty y galería con zoom.",
      "Árbol de renderizado en SVG alineado al código en App.jsx.",
    ],
    tags: ["SPA", "Componentes", "Funky"],
    isCurrent: true,
  },
];

function BitacoraPage() {
  return (
    <section className="page page-bitacora">
      <header className="page-hero">
        <span className="page-kicker">Bitácora</span>
        <h1>Línea de tiempo del proyecto</h1>
        <p>
          Recorrido del Grupo 6 desde el TP1 en HTML hasta la SPA React del TP2, en hitos ordenados
          cronológicamente.
        </p>
      </header>

      <div className="bitacora-timeline-wrap surface-card">
        <ol className="bitacora-timeline" aria-label="Línea de tiempo del desarrollo">
          {bitacoraTimeline.map((evento, index) => (
            <li
              key={evento.title}
              className={`bitacora-timeline-item${evento.isCurrent ? " is-current" : ""}`}
              style={{ "--timeline-index": index }}
            >
              <div className="bitacora-timeline-marker" aria-hidden="true">
                <span className="bitacora-timeline-dot" />
              </div>

              <article className="bitacora-timeline-card">
                <header className="bitacora-timeline-card-header">
                  <div className="bitacora-timeline-meta">
                    <span className="bitacora-timeline-phase">{evento.phase}</span>
                    <time className="bitacora-timeline-date" dateTime={evento.phase}>
                      {evento.date}
                    </time>
                  </div>
                  <h2>{evento.title}</h2>
                </header>

                <ul className="bitacora-timeline-highlights">
                  {evento.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <ul className="bitacora-timeline-tags" aria-label="Tecnologías y herramientas">
                  {evento.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}


function ExploradorPage() {
  const [busqueda, setBusqueda] = useState("");
  const [filtroGenero, setFiltroGenero] = useState("Todos");

  const generosUnicos = ["Todos", ...new Set(datosJSON.map((disco) => disco.genero))];

  const datosFiltrados = datosJSON.filter((disco) => {
    // Pasamos la búsqueda a minúsculas y sacamos los espacios de los bordes
    const termino = busqueda.toLowerCase().trim();
    
    let coincideTexto = true;

    if (termino !== "") {
      const titulo = disco.titulo.toLowerCase();
      const artista = disco.artista.toLowerCase();

      // Verificamos si empieza con la letra/palabra O si hay una palabra nueva que empiece así
      const tituloCoincide = titulo.startsWith(termino) || titulo.includes(` ${termino}`);
      const artistaCoincide = artista.startsWith(termino) || artista.includes(` ${termino}`);

      coincideTexto = tituloCoincide || artistaCoincide;
    }

    const coincideGenero = filtroGenero === "Todos" || disco.genero === filtroGenero;
    
    return coincideTexto && coincideGenero;
  });

  return (
    <section className="page">
      <header className="page-hero">
        <span className="page-kicker">Explorador</span>
        <h1>Discoteca del Grupo</h1>
        <p>Búsqueda y filtrado en tiempo real sobre nuestra colección musical.</p>
      </header>

      <div className="content-grid">
        <article className="surface-card" style={{ gridColumn: "1 / -1" }}>
          <div style={{ display: "flex", gap: "16px", marginBottom: "20px", flexWrap: "wrap" }}>
            
            {/* Buscador de texto (busca por artista o título) */}
            <input
              type="text"
              placeholder="Buscar por artista o disco..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              style={{ padding: "10px", borderRadius: "8px", border: "1px solid var(--line)", flexGrow: 1 }}
            />

            {/* Selector de género dinámico */}
            <select 
              value={filtroGenero} 
              onChange={(e) => setFiltroGenero(e.target.value)}
              style={{ padding: "10px", borderRadius: "8px", border: "1px solid var(--line)" }}
            >
              {generosUnicos.map((genero) => (
                <option key={genero} value={genero}>
                  {genero}
                </option>
              ))}
            </select>
          </div>

          {/* Renderizado de resultados */}
          <div className="detail-grid">
            {datosFiltrados.length > 0 ? (
              datosFiltrados.map((disco) => (
                <article key={disco.id} className="detail-card">
                  <h3>{disco.titulo}</h3>
                  <ul className="detail-list">
                    <li><strong>Artista:</strong> {disco.artista}</li>
                    <li><strong>Género:</strong> {disco.genero}</li>
                    <li><strong>Año:</strong> {disco.lanzamiento}</li>
                  </ul>
                </article>
              ))
            ) : (
              <p>No se encontraron discos para esta búsqueda.</p>
            )}
          </div>
        </article>
      </div>
    </section>
  );
}

const RICK_MORTY_CHARACTERS_BASE = import.meta.env.DEV
  ? "/api/rick-morty/character/"
  : "https://rickandmortyapi.com/api/character/";

const RICK_MORTY_MIN_INTERVAL_MS = 450;
const RICK_MORTY_MAX_RETRIES = 4;
const rickMortyPageCache = new Map();
let rickMortyLastRequestAt = 0;

function esperar(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function esperarIntervaloMinimo() {
  const ahora = Date.now();
  const restante = RICK_MORTY_MIN_INTERVAL_MS - (ahora - rickMortyLastRequestAt);
  if (restante > 0) await esperar(restante);
  rickMortyLastRequestAt = Date.now();
}

async function fetchRickMortyPagina(pagina, { signal } = {}) {
  const enCache = rickMortyPageCache.get(pagina);
  if (enCache) return enCache;

  let intento = 0;

  while (intento <= RICK_MORTY_MAX_RETRIES) {
    await esperarIntervaloMinimo();

    const response = await fetch(`${RICK_MORTY_CHARACTERS_BASE}?page=${pagina}`, { signal });

    if (response.status === 429) {
      if (intento === RICK_MORTY_MAX_RETRIES) {
        throw new Error(
          "La API limitó las peticiones (demasiadas en poco tiempo). Esperá unos segundos y tocá Reintentar."
        );
      }

      const retryAfterSec = Number.parseInt(response.headers.get("Retry-After") ?? "", 10);
      const esperaMs = Number.isFinite(retryAfterSec) && retryAfterSec > 0
        ? retryAfterSec * 1000
        : 800 * 2 ** intento;

      await esperar(esperaMs);
      intento += 1;
      continue;
    }

    if (!response.ok) {
      throw new Error(`Ocurrió un error al traer los datos (${response.status}).`);
    }

    const data = await response.json();
    rickMortyPageCache.set(pagina, data);
    return data;
  }

  throw new Error("No se pudo cargar la página.");
}

function ApiPage() {
  const [personajes, setPersonajes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(0);
  const [haySiguiente, setHaySiguiente] = useState(true);
  const [reloadToken, setReloadToken] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    let cancelado = false;

    const aplicarDatos = (data) => {
      setPersonajes(data.results);
      setTotalPaginas(data.info?.pages ?? 0);
      setHaySiguiente(!!data.info?.next);
    };

    const cargar = async () => {
      const enCache = rickMortyPageCache.get(paginaActual);

      if (!enCache) {
        setLoading(true);
      }

      setError(null);

      try {
        const data = await fetchRickMortyPagina(paginaActual, { signal: controller.signal });

        if (!cancelado) {
          aplicarDatos(data);
        }
      } catch (err) {
        if (cancelado || err.name === "AbortError") return;

        const mensaje =
          err instanceof TypeError && err.message === "Failed to fetch"
            ? "No se pudo conectar con la API. Si estás en desarrollo, reiniciá el servidor (npm run dev) tras cambios en vite.config."
            : err.message;

        setError(mensaje);
      } finally {
        if (!cancelado) {
          setLoading(false);
        }
      }
    };

    cargar();

    return () => {
      cancelado = true;
      controller.abort();
    };
  }, [paginaActual, reloadToken]);

  const reintentar = () => {
    rickMortyPageCache.delete(paginaActual);
    setReloadToken((t) => t + 1);
  };

  const irPaginaAnterior = () => {
    if (paginaActual > 1 && !loading) setPaginaActual((prev) => prev - 1);
  };

  const irPaginaSiguiente = () => {
    if (haySiguiente && !loading) setPaginaActual((prev) => prev + 1);
  };

  return (
    <section className="page">
      <header className="page-hero">
        <span className="page-kicker">API Externa</span>
        <h1>Personajes de Rick & Morty</h1>
        <p>
          Consumo asíncrono de API con manejo de estados (carga, error) y 
          paginación en tiempo real.
        </p>
      </header>

      <div className="content-grid">
        <article className="surface-card" style={{ gridColumn: "1 / -1" }}>
          
          {/* Controles de Paginación */}
          <div className="section-heading-row" style={{ marginBottom: "20px" }}>
            <h2>Catálogo de Personajes</h2>
            <div className="api-pagination" aria-label="Controles de paginación">
              <button
                type="button"
                className="carousel-btn"
                onClick={irPaginaAnterior}
                disabled={paginaActual === 1 || loading}
              >
                Anterior
              </button>

              <span className="api-pagination-indicator" aria-live="polite" aria-atomic="true">
                <span className="api-pagination-label">Página</span>
                <span className="api-pagination-current">{paginaActual}</span>
                {totalPaginas > 0 ? (
                  <>
                    <span className="api-pagination-sep">de</span>
                    <span className="api-pagination-total">{totalPaginas}</span>
                  </>
                ) : null}
              </span>

              <button
                type="button"
                className="carousel-btn"
                onClick={irPaginaSiguiente}
                disabled={!haySiguiente || loading}
              >
                Siguiente
              </button>
            </div>
          </div>

          {/* Manejo de Estados */}
          {loading ? (
            <div style={{ textAlign: "center", padding: "40px" }}>
              <h3>Cargando información... ⏳</h3>
            </div>
          ) : error ? (
            <div className="api-error-panel">
              <h3>Error: {error}</h3>
              <p>
                La API pública tiene límite de peticiones. Las páginas ya visitadas se guardan en
                caché; si volvés atrás no se vuelve a pedir a la red.
              </p>
              <button type="button" className="carousel-btn" onClick={reintentar} disabled={loading}>
                Reintentar
              </button>
            </div>
          ) : (
            <div className="detail-grid detail-grid--animated">
              {personajes.map((personaje) => (
                <article key={personaje.id} className="detail-card">
                  <img 
                    src={personaje.image} 
                    alt={personaje.name} 
                    style={{ width: "100%", borderRadius: "12px", marginBottom: "12px" }} 
                  />
                  <h3>{personaje.name}</h3>
                  <ul className="detail-list">
                    <li><strong>Estado:</strong> {personaje.status}</li>
                    <li><strong>Especie:</strong> {personaje.species}</li>
                  </ul>
                </article>
              ))}
            </div>
          )}

        </article>
      </div>
    </section>
  );
}

const LIGHTBOX_ZOOM_MIN = 1;
const LIGHTBOX_ZOOM_MAX = 3;
const LIGHTBOX_ZOOM_STEP = 0.25;

function GaleriaPage() {
  const idsPicsum = [10, 22, 29, 37, 40, 53, 64, 75, 82, 96, 104, 108];

  const imagenesData = idsPicsum.map((imgId, i) => ({
    id: i + 1,
    urlThumb: `https://picsum.photos/id/${imgId}/400/300`,
    urlFull: `https://picsum.photos/id/${imgId}/1200/900`,
    alt: `Obra visual número ${i + 1}`,
    titulo: `Obra Visual ${i + 1}`,
  }));

  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(LIGHTBOX_ZOOM_MIN);

  const selectedImage = selectedImageIndex !== null ? imagenesData[selectedImageIndex] : null;

  function openLightbox(index) {
    setSelectedImageIndex(index);
    setZoomLevel(LIGHTBOX_ZOOM_MIN);
  }

  function closeLightbox() {
    setSelectedImageIndex(null);
    setZoomLevel(LIGHTBOX_ZOOM_MIN);
  }

  function zoomIn() {
    setZoomLevel((value) => Math.min(LIGHTBOX_ZOOM_MAX, Number((value + LIGHTBOX_ZOOM_STEP).toFixed(2))));
  }

  function zoomOut() {
    setZoomLevel((value) => Math.max(LIGHTBOX_ZOOM_MIN, Number((value - LIGHTBOX_ZOOM_STEP).toFixed(2))));
  }

  function resetZoom() {
    setZoomLevel(LIGHTBOX_ZOOM_MIN);
  }

  function toggleZoom() {
    setZoomLevel((value) => (value > LIGHTBOX_ZOOM_MIN ? LIGHTBOX_ZOOM_MIN : 2));
  }

  function showPrev(e) {
    e.stopPropagation();
    setSelectedImageIndex((prevIndex) =>
      prevIndex === 0 ? imagenesData.length - 1 : prevIndex - 1,
    );
    setZoomLevel(LIGHTBOX_ZOOM_MIN);
  }

  function showNext(e) {
    e.stopPropagation();
    setSelectedImageIndex((prevIndex) =>
      prevIndex === imagenesData.length - 1 ? 0 : prevIndex + 1,
    );
    setZoomLevel(LIGHTBOX_ZOOM_MIN);
  }

  useEffect(() => {
    if (selectedImageIndex === null) {
      return undefined;
    }

    const handleKeyDown = (e) => {
      if (e.key === "Escape" || e.key === "Esc") {
        closeLightbox();
        return;
      }

      if (e.key === "+" || e.key === "=") {
        e.preventDefault();
        zoomIn();
      }

      if (e.key === "-") {
        e.preventDefault();
        zoomOut();
      }

      if (e.key === "0") {
        e.preventDefault();
        resetZoom();
      }
    };

    const handleWheel = (e) => {
      e.preventDefault();
      if (e.deltaY < 0) {
        zoomIn();
      } else if (e.deltaY > 0) {
        zoomOut();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("wheel", handleWheel);
    };
  }, [selectedImageIndex]);

  return (
    <section className="page">
      <header className="page-hero">
        <span className="page-kicker">Multimedia</span>
        <h1>Galería Interactiva</h1>
        <p>Grid con lightbox, zoom, navegación interna y cierre con ESC.</p>
      </header>

      <div className="content-grid">
        <article className="surface-card lightbox-grid-card">
          <div className="detail-grid">
            {imagenesData.map((img, index) => (
              <article
                key={img.id}
                className="detail-card gallery-thumb-card"
                onClick={() => openLightbox(index)}
              >
                <img src={img.urlThumb} alt={img.alt} className="gallery-thumb-image" />
                <div className="gallery-thumb-caption">
                  <h4>{img.titulo}</h4>
                </div>
              </article>
            ))}
          </div>
        </article>
      </div>

      {selectedImage
        ? createPortal(
            <div
              className="lightbox-overlay"
              onClick={closeLightbox}
              role="dialog"
              aria-modal="true"
              aria-label="Visor de imagen"
            >
              <button type="button" className="lightbox-close-btn" onClick={closeLightbox} aria-label="Cerrar visor">
                ×
              </button>

              <button
                type="button"
                className="lightbox-nav-btn lightbox-nav-btn--prev"
                onClick={showPrev}
                aria-label="Imagen anterior"
              >
                &lt;
              </button>

              <button
                type="button"
                className="lightbox-nav-btn lightbox-nav-btn--next"
                onClick={showNext}
                aria-label="Imagen siguiente"
              >
                &gt;
              </button>

              <div className="lightbox-toolbar" onClick={(e) => e.stopPropagation()}>
                <button
                  type="button"
                  className="lightbox-zoom-btn"
                  onClick={zoomOut}
                  disabled={zoomLevel <= LIGHTBOX_ZOOM_MIN}
                  aria-label="Alejar"
                >
                  −
                </button>
                <span className="lightbox-zoom-label">{Math.round(zoomLevel * 100)}%</span>
                <button
                  type="button"
                  className="lightbox-zoom-btn"
                  onClick={zoomIn}
                  disabled={zoomLevel >= LIGHTBOX_ZOOM_MAX}
                  aria-label="Acercar"
                >
                  +
                </button>
                <button type="button" className="lightbox-reset-btn" onClick={resetZoom}>
                  Reset
                </button>
                <span className="lightbox-caption">{selectedImage.titulo}</span>
              </div>

              <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                <div className="lightbox-viewport">
                  <img
                    src={selectedImage.urlFull}
                    alt={selectedImage.alt}
                    className="lightbox-image"
                    style={{ transform: `scale(${zoomLevel})` }}
                    onDoubleClick={toggleZoom}
                  />
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </section>
  );
}

const TREE_DIAGRAM_ZOOM_MIN = 0.75;
const TREE_DIAGRAM_ZOOM_MAX = 2;
const TREE_DIAGRAM_ZOOM_STEP = 0.25;

function ComponentTreeDiagram() {
  const [zoomLevel, setZoomLevel] = useState(1);

  function zoomIn() {
    setZoomLevel((value) =>
      Math.min(TREE_DIAGRAM_ZOOM_MAX, Number((value + TREE_DIAGRAM_ZOOM_STEP).toFixed(2))),
    );
  }

  function zoomOut() {
    setZoomLevel((value) =>
      Math.max(TREE_DIAGRAM_ZOOM_MIN, Number((value - TREE_DIAGRAM_ZOOM_STEP).toFixed(2))),
    );
  }

  function resetZoom() {
    setZoomLevel(1);
  }

  return (
    <div className="tree-diagram-viewer">
      <div className="tree-diagram-toolbar" aria-label="Controles del diagrama SVG">
        <button
          type="button"
          className="tree-diagram-zoom-btn"
          onClick={zoomOut}
          disabled={zoomLevel <= TREE_DIAGRAM_ZOOM_MIN}
          aria-label="Alejar diagrama"
        >
          −
        </button>
        <span className="tree-diagram-zoom-label">{Math.round(zoomLevel * 100)}%</span>
        <button
          type="button"
          className="tree-diagram-zoom-btn"
          onClick={zoomIn}
          disabled={zoomLevel >= TREE_DIAGRAM_ZOOM_MAX}
          aria-label="Acercar diagrama"
        >
          +
        </button>
        <button type="button" className="tree-diagram-reset-btn" onClick={resetZoom}>
          Ajustar
        </button>
        <span className="tree-diagram-hint">Deslizá horizontal o verticalmente para recorrer el diagrama</span>
      </div>

      <div className="tree-diagram-wrap">
        <div className="tree-diagram-stage">
          <svg
            className="tree-diagram-svg"
            viewBox="-24 -16 1248 900"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-labelledby="tree-diagram-title"
            style={{ width: `${zoomLevel * 100}%` }}
          >
        <title id="tree-diagram-title">Árbol de renderizado del proyecto React</title>

        <defs>
          <marker id="tree-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="rgba(255,255,255,0.65)" />
          </marker>
        </defs>

        <rect className="tree-node tree-node--entry" x="400" y="16" width="280" height="40" rx="12" />
        <text className="tree-label" x="540" y="42">main.jsx → BrowserRouter</text>

        <line className="tree-line" x1="540" y1="56" x2="540" y2="74" markerEnd="url(#tree-arrow)" />

        <rect className="tree-node tree-node--root" x="470" y="74" width="140" height="36" rx="10" />
        <text className="tree-label" x="540" y="98">App</text>

        <line className="tree-line" x1="540" y1="110" x2="540" y2="120" />
        <line className="tree-line" x1="300" y1="120" x2="780" y2="120" />
        <line className="tree-line" x1="300" y1="120" x2="300" y2="128" markerEnd="url(#tree-arrow)" />
        <line className="tree-line" x1="780" y1="120" x2="780" y2="128" markerEnd="url(#tree-arrow)" />

        <rect className="tree-node tree-node--loader" x="210" y="128" width="180" height="36" rx="10" />
        <text className="tree-label" x="300" y="152">AppLoader</text>

        <rect className="tree-node tree-node--root" x="700" y="128" width="160" height="36" rx="10" />
        <text className="tree-label" x="780" y="152">Routes</text>

        <line className="tree-line" x1="780" y1="164" x2="780" y2="182" markerEnd="url(#tree-arrow)" />

        <rect className="tree-node tree-node--layout" x="640" y="182" width="280" height="40" rx="12" />
        <text className="tree-label" x="780" y="208">DashboardLayout</text>

        <line className="tree-line" x1="320" y1="222" x2="320" y2="240" />
        <line className="tree-line" x1="860" y1="222" x2="860" y2="240" />
        <line className="tree-line" x1="320" y1="222" x2="860" y2="222" />

        <rect className="tree-node tree-node--layout" x="200" y="240" width="240" height="40" rx="12" />
        <text className="tree-label" x="320" y="266">Sidebar</text>

        <rect className="tree-node tree-node--layout" x="720" y="240" width="280" height="40" rx="12" />
        <text className="tree-label" x="860" y="266">main.app-main</text>

        <line className="tree-line" x1="320" y1="280" x2="320" y2="298" markerEnd="url(#tree-arrow)" />
        <rect className="tree-node tree-node--shared" x="230" y="298" width="180" height="32" rx="8" />
        <text className="tree-label tree-label--sm" x="320" y="318">FunkoLogo</text>
        <line className="tree-line" x1="320" y1="330" x2="320" y2="348" markerEnd="url(#tree-arrow)" />
        <rect className="tree-node tree-node--shared" x="230" y="348" width="180" height="32" rx="8" />
        <text className="tree-label tree-label--sm" x="320" y="368">NavItem</text>

        <line className="tree-line" x1="860" y1="280" x2="860" y2="298" markerEnd="url(#tree-arrow)" />
        <rect className="tree-node tree-node--outlet" x="600" y="298" width="500" height="300" rx="14" />
        <text className="tree-label" x="850" y="322">Outlet (rutas dinámicas)</text>

        <rect className="tree-node tree-node--page" x="620" y="338" width="120" height="28" rx="8" />
        <text className="tree-label tree-label--sm" x="680" y="356">HomePage</text>
        <rect className="tree-node tree-node--page" x="752" y="338" width="120" height="28" rx="8" />
        <text className="tree-label tree-label--sm" x="812" y="356">BitacoraPage</text>
        <rect className="tree-node tree-node--page" x="884" y="338" width="130" height="28" rx="8" />
        <text className="tree-label tree-label--sm" x="949" y="356">ExploradorPage</text>

        <rect className="tree-node tree-node--page" x="620" y="376" width="110" height="28" rx="8" />
        <text className="tree-label tree-label--sm" x="675" y="394">ApiPage</text>
        <rect className="tree-node tree-node--page" x="742" y="376" width="120" height="28" rx="8" />
        <text className="tree-label tree-label--sm" x="802" y="394">GaleriaPage</text>
        <rect className="tree-node tree-node--page" x="874" y="376" width="110" height="28" rx="8" />
        <text className="tree-label tree-label--sm" x="929" y="394">ArbolPage</text>

        <rect className="tree-node tree-node--page" x="620" y="414" width="110" height="28" rx="8" />
        <text className="tree-label tree-label--sm" x="675" y="432">TeamPage</text>
        <rect className="tree-node tree-node--page" x="742" y="414" width="120" height="28" rx="8" />
        <text className="tree-label tree-label--sm" x="802" y="432">MemberPage</text>
        <rect className="tree-node tree-node--page" x="874" y="414" width="120" height="28" rx="8" />
        <text className="tree-label tree-label--sm" x="934" y="432">NotFoundPage</text>

        <line className="tree-line" x1="850" y1="442" x2="850" y2="458" markerEnd="url(#tree-arrow)" />
        <rect className="tree-node tree-node--shared" x="665" y="458" width="370" height="32" rx="8" />
        <text className="tree-label tree-label--sm" x="850" y="478">PageShell → perfiles individuales</text>

        <rect className="tree-node tree-node--page" x="620" y="496" width="190" height="28" rx="8" />
        <text className="tree-label tree-label--sm" x="715" y="514">SebastianMatulionisPage</text>
        <rect className="tree-node tree-node--page" x="822" y="496" width="130" height="28" rx="8" />
        <text className="tree-label tree-label--sm" x="887" y="514">MelodyPage</text>
        <rect className="tree-node tree-node--page" x="620" y="532" width="150" height="28" rx="8" />
        <text className="tree-label tree-label--sm" x="695" y="550">SebastianVitcopPage</text>
        <rect className="tree-node tree-node--page" x="782" y="532" width="120" height="28" rx="8" />
        <text className="tree-label tree-label--sm" x="842" y="550">LucreciaPage</text>

        <line className="tree-line" x1="860" y1="598" x2="860" y2="616" markerEnd="url(#tree-arrow)" />
        <rect className="tree-node tree-node--layout" x="760" y="616" width="200" height="32" rx="8" />
        <text className="tree-label tree-label--sm" x="860" y="636">app-footer</text>

        <rect className="tree-node tree-node--shared" x="40" y="680" width="1000" height="150" rx="14" />
        <text className="tree-label" x="540" y="708">Componentes reutilizables (src/App.jsx)</text>
        <text className="tree-label tree-label--sm" x="540" y="738">
          SkillBarList · SkillBarCard · FunkoLogo · NavItem · MemberInfoGrid · MysteryBox
        </text>
        <text className="tree-label tree-label--note" x="540" y="768">
          Sin carpeta components/: toda la arquitectura vive en un único archivo App.jsx
        </text>
          </svg>
        </div>
      </div>
    </div>
  );
}

function ArbolPage() {
  return (
    <section className="page">
      <header className="page-hero">
        <span className="page-kicker">Arquitectura</span>
        <h1>Árbol de Renderizado</h1>
        <p>
          Diagrama gráfico de la jerarquía real de componentes de la SPA, alineado al código actual
          del proyecto React.
        </p>
      </header>

      <div className="content-grid">
        <article className="surface-card tree-diagram-card">
          <h2>Diagrama gráfico (SVG)</h2>
          <p>
            El flujo comienza en <code>main.jsx</code> con <code>BrowserRouter</code>, continúa en{" "}
            <code>App</code> (loader inicial o rutas) y desemboca en <code>DashboardLayout</code> con{" "}
            <code>Sidebar</code> + <code>Outlet</code>. Usá los controles de zoom y deslizá el recuadro
            para ver todo el SVG sin que se corte.
          </p>
          <ComponentTreeDiagram />
        </article>

        <article className="surface-card">
          <h2>Leyenda</h2>
          <ul className="detail-list tree-legend-list">
            <li><span className="tree-legend-swatch tree-legend-swatch--root" /> Raíz y enrutamiento (App, Routes)</li>
            <li><span className="tree-legend-swatch tree-legend-swatch--layout" /> Layout persistente (Sidebar, main, footer)</li>
            <li><span className="tree-legend-swatch tree-legend-swatch--page" /> Páginas renderizadas por ruta</li>
            <li><span className="tree-legend-swatch tree-legend-swatch--shared" /> Componentes compartidos reutilizables</li>
            <li><span className="tree-legend-swatch tree-legend-swatch--loader" /> Pantalla de carga inicial</li>
          </ul>
        </article>

        <article className="surface-card">
          <h2>Referencias de la arquitectura</h2>
          <ul className="detail-list">
            <li>
              <strong>Entrada:</strong> <code>main.jsx</code> monta la app con{" "}
              <code>BrowserRouter</code> y estilos globales.
            </li>
            <li>
              <strong>Raíz:</strong> <code>App</code> controla el loader (<code>AppLoader</code> +{" "}
              <code>FunkoLogo</code>) y el árbol de rutas.
            </li>
            <li>
              <strong>Layout:</strong> <code>DashboardLayout</code> fija <code>Sidebar</code> y renderiza
              páginas en <code>Outlet</code>.
            </li>
            <li>
              <strong>Perfiles:</strong> <code>MemberPage</code> delega en <code>PageShell</code> y la
              variante de cada integrante.
            </li>
          </ul>
        </article>
      </div>
    </section>
  );
}

function TeamPage() {
  return (
    <section className="page">
      <header className="page-hero">
        <span className="page-kicker">Integrantes</span>
        <h1>Colección Oficial</h1>
        <p>
          Desde esta vista se accede a cada pagina individual de forma clara, consistente y preparada
          para seguir ampliandose.
        </p>
      </header>

      <div className="team-grid">
        {teamMembers.map((member, index) => (
          <NavLink key={member.slug} to={`/integrantes/${member.slug}`} className="member-card">
            <div className="funko-box-top" aria-hidden="true">
              <span className="funko-box-brand">Funky</span>
              <span className="funko-box-number">{formatFunkoNumber(index)}</span>
            </div>
            <div className="member-avatar" style={{ background: member.accent }}>
              <img src={member.avatar} alt="" aria-hidden="true" className="member-avatar-image" />
            </div>
            <div className="member-copy">
              <h2>{member.name}</h2>
              <p>{member.role}</p>
              <span>Ver página individual</span>
            </div>
          </NavLink>
        ))}
      </div>

      <MysteryBox />
    </section>
  );
}

function MemberPage() {
  const { slug } = useParams();
  const member = teamMembers.find((item) => item.slug === slug);

  if (!member) {
    return <Navigate to="/integrantes" replace />;
  }

  if (member.page === "vitcop") {
    return <SebastianVitcopPage member={member} />;
  }

  if (member.page === "matulionis") {
    return <SebastianMatulionisPage member={member} />;
  }

  if (member.page === "melody") {
    return <MelodyPage member={member} />;
  }

  if (member.page === "lucrecia") {
    return <LucreciaPage member={member} />;
  }

  return <Navigate to="/integrantes" replace />;
}

function PageShell({ member, kicker, title, tagline, children, className = "" }) {
  return (
    <section className={`page member-page ${className}`.trim()}>
      <header className="page-hero member-hero">
        <span className="page-kicker">{kicker}</span>
        <div className="member-hero-top">
          <img src={member.avatar} alt="" aria-hidden="true" className="member-hero-avatar" />
          <div>
            <h1>{title}</h1>
            <p>{tagline}</p>
          </div>
        </div>
      </header>

      {children}
    </section>
  );
}

function MemberInfoGrid({ items }) {
  return (
    <div className="content-grid">
      {items.map((item) => (
        <article key={item.title} className="surface-card">
          <h2>{item.title}</h2>
          {Array.isArray(item.content) ? (
            <ul className="detail-list">
              {item.content.map((entry) => (
                <li key={entry}>{entry}</li>
              ))}
            </ul>
          ) : (
            <p>{item.content}</p>
          )}
        </article>
      ))}
    </div>
  );
}

function SebastianVitcopPage({ member }) {
  const [showExtra, setShowExtra] = useState(false);

  return (
    <PageShell
      member={member}
      kicker="Perfil de integrante"
      title={member.name}
      tagline="Mi nombre es Sebastián Vitcop. Soy estudiante de la Tecnicatura en Desarrollo Web y apasionado por la tecnología. Me gusta mucho el área de datos y me estoy formando en paralelo con cursos sobre la temática. En un futuro me gustaría trabajar en el sector de Data de alguna empresa. Además, me gusta hacer deporte y pasar tiempo al aire libre."
    >
      <MemberInfoGrid
        items={[
          { title: "Ubicación", content: "Buenos Aires, Argentina" },
          { title: "Edad", content: "28 años" },
          {
            title: "Habilidades",
            content: ["HTML", "CSS", "JavaScript (inicial)", "Git / GitHub"],
          },
          {
            title: "Películas favoritas",
            content: ["Interstellar", "The Social Network", "Moneyball"],
          },
          {
            title: "Discos musicales favoritos",
            content: ["Rocks — Aerosmith", "Honestidad Brutal — Andrés Calamaro", "Toys in the Attic — Aerosmith"],
          },
        ]}
      />

      <article className="surface-card member-toggle-card">
        <div className="toggle-row">
          <h2>Más sobre mí</h2>
          <button
            type="button"
            className="member-toggle-btn"
            aria-expanded={showExtra}
            aria-controls="sv-extra-react"
            onClick={() => setShowExtra((value) => !value)}
          >
            {showExtra ? "Ocultar detalles" : "Mostrar más sobre mí"}
          </button>
        </div>

        {showExtra ? (
          <div id="sv-extra-react" className="detail-grid detail-grid--animated">
            <article className="detail-card">
              <h3>Hobbies</h3>
              <ul className="detail-list">
                <li>Jugar al fútbol</li>
                <li>Hacer deporte en general</li>
                <li>Pasar tiempo al aire libre</li>
                <li>Viajar</li>
              </ul>
            </article>
            <article className="detail-card">
              <h3>Bandas favoritas</h3>
              <ul className="detail-list">
                <li>Aerosmith</li>
                <li>Andrés Calamaro</li>
              </ul>
            </article>
            <article className="detail-card detail-card--full">
              <h3>Objetivos</h3>
              <p>
                Profundizar mis conocimientos en análisis de datos y combinarlos con el desarrollo web
                para trabajar en el sector de Data. Me interesa seguir aprendiendo herramientas como
                Python y SQL en paralelo a la tecnicatura.
              </p>
            </article>
          </div>
        ) : null}
      </article>
    </PageShell>
  );
}

function SebastianMatulionisPage({ member }) {
  const [showDetails, setShowDetails] = useState(false);
  const [activeProject, setActiveProject] = useState(0);
  const currentProject = sebastianMatulionisProjects[activeProject];

  function goToPreviousProject() {
    setActiveProject((value) =>
      value === 0 ? sebastianMatulionisProjects.length - 1 : value - 1,
    );
  }

  function goToNextProject() {
    setActiveProject((value) =>
      value === sebastianMatulionisProjects.length - 1 ? 0 : value + 1,
    );
  }

  return (
    <PageShell
      member={member}
      kicker="Perfil de integrante"
      className={showDetails ? "sebastian-theme-day" : ""}
      title={member.name}
      tagline="Estudiante de desarrollo de software apasionado por la tecnología y el desarrollo web. Disfruto aprender constantemente, experimentar con nuevas herramientas y construir nuevos proyectos."
    >
      <div className="content-grid">
        <article className="surface-card">
          <h2>Datos</h2>
          <div className="content-grid member-mini-grid">
            <div className="mini-block">
              <h3>Ubicación actual</h3>
              <p>Buenos Aires, Argentina</p>
            </div>
            <div className="mini-block">
              <h3>Edad</h3>
              <p>31 años</p>
            </div>
          </div>
        </article>

        <article className="surface-card">
          <h2>Habilidades</h2>
          <SkillBarList skills={sebastianMatulionisSkills} />
        </article>

        <article className="surface-card">
          <div className="section-heading-row">
            <h2>Carrusel de proyectos</h2>
            <div className="carousel-controls" aria-label="Controles del carrusel">
              <button type="button" className="carousel-btn" onClick={goToPreviousProject}>
                Anterior
              </button>
              <button type="button" className="carousel-btn" onClick={goToNextProject}>
                Siguiente
              </button>
            </div>
          </div>

          <section className="project-carousel" aria-live="polite">
            <div className="project-carousel-card">
              <span className="project-carousel-step">
                Proyecto {activeProject + 1} de {sebastianMatulionisProjects.length}
              </span>
              <h3>{currentProject.title}</h3>
              <p>{currentProject.summary}</p>
              <p>{currentProject.focus}</p>
              <ul className="detail-list pill-list">
                {currentProject.stack.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="carousel-dots" aria-label="Seleccion de proyecto">
              {sebastianMatulionisProjects.map((project, index) => (
                <button
                  key={project.title}
                  type="button"
                  className={`carousel-dot${index === activeProject ? " is-active" : ""}`}
                  aria-label={`Ver ${project.title}`}
                  aria-pressed={index === activeProject}
                  onClick={() => setActiveProject(index)}
                />
              ))}
            </div>
          </section>
        </article>

        <article className="surface-card">
          <h2>Tech stack</h2>
          <div className="tech-stack-grid">
            {sebastianMatulionisTechStack.map((tech) => (
              <article key={tech.name} className={`tech-icon-card tech-icon-card--${tech.tone}`}>
                <span className="tech-icon-glyph" aria-hidden="true">
                  <img src={tech.icon} alt="" className="tech-icon-img" loading="lazy" />
                </span>
                <strong>{tech.name}</strong>
              </article>
            ))}
          </div>
        </article>

        <article className="surface-card">
          <h2>Social media</h2>
          <div className="social-media-grid">
            {sebastianMatulionisSocialLinks.map((item) => (
              <a
                key={item.label}
                className={`social-media-btn social-media-btn--${item.tone}`}
                href={item.href}
              >
                <span className="social-media-icon" aria-hidden="true">
                  <img src={item.icon} alt="" className="social-media-icon-img" loading="lazy" />
                </span>
                <span className="social-media-copy">
                  <span>{item.label}</span>
                  <small>{item.handle}</small>
                </span>
              </a>
            ))}
          </div>
        </article>
      </div>

    </PageShell>
  );
}

function MelodyPage({ member }) {
  const [showDetails, setShowDetails] = useState(false);

  const [activeProject, setActiveProject] = useState(0);
  const currentProject = melodyProjects[activeProject];

  function goToPreviousProject() {
    setActiveProject((value) =>
      value === 0 ? melodyProjects.length - 1 : value - 1
    );
  }

  function goToNextProject() {
    setActiveProject((value) =>
      value === melodyProjects.length - 1 ? 0 : value + 1
    );
  }

  return (
    <PageShell
      member={member}
      kicker="Perfil de integrante"
      className={showDetails ? "melody-theme-day" : ""}
      title={member.name}
      tagline="Hola, mi nombre es Melody Amaro. Soy estudiante de desarrollo web. En los ultimos meses estoy haciendo proyectos dedicados al frontend. Me gusta aprender siempre alguna tecnologia nueva y actualmente lo relacionado a la inteligencia artificial. Me gustaria en un futuro ayudar a empresas a potenciar sus ventas con esa tecnologia."
    >
      <div className="content-grid">
        {/* Datos Básicos */}
        <article className="surface-card">
          <h2>Datos</h2>
          <div className="content-grid member-mini-grid">
            <div className="mini-block">
              <h3>Ubicación actual</h3>
              <p>Buenos Aires, Argentina</p>
            </div>
            <div className="mini-block">
              <h3>Rol principal</h3>
              <p>Desarrollo web frontend</p>
            </div>
          </div>
        </article>

        {/* Barras de Progreso Animadas */}
        <article className="surface-card">
          <h2>Habilidades Técnicas</h2>
          <SkillBarList skills={melodySkills} />
        </article>

        {/* Carrusel de Proyectos */}
        <article className="surface-card">
          <div className="section-heading-row">
            <h2>Proyectos Destacados</h2>
            <div className="carousel-controls" aria-label="Controles del carrusel">
              <button type="button" className="carousel-btn" onClick={goToPreviousProject}>
                Anterior
              </button>
              <button type="button" className="carousel-btn" onClick={goToNextProject}>
                Siguiente
              </button>
            </div>
          </div>

          <section className="project-carousel" aria-live="polite">
            <div className="project-carousel-card">
              <span className="project-carousel-step">
                Proyecto {activeProject + 1} de {melodyProjects.length}
              </span>
              <h3>{currentProject.title}</h3>
              <p>{currentProject.summary}</p>
              <p>{currentProject.focus}</p>
              <ul className="detail-list pill-list">
                {currentProject.stack.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="carousel-dots" aria-label="Selección de proyecto">
              {melodyProjects.map((project, index) => (
                <button
                  key={project.title}
                  type="button"
                  className={`carousel-dot${index === activeProject ? " is-active" : ""}`}
                  aria-label={`Ver ${project.title}`}
                  aria-pressed={index === activeProject}
                  onClick={() => setActiveProject(index)}
                />
              ))}
            </div>
          </section>
        </article>

        {/* Tech Stack e Iconografía */}
        <article className="surface-card">
          <h2>Tech Stack</h2>
          <div className="tech-stack-grid">
            {melodyTechStack.map((tech) => (
              <article key={tech.name} className={`tech-icon-card tech-icon-card--${tech.tone}`}>
                <span className="tech-icon-glyph" aria-hidden="true">
                  <img src={tech.icon} alt="" className="tech-icon-img" loading="lazy" />
                </span>
                <strong>{tech.name}</strong>
              </article>
            ))}
          </div>
        </article>

        {/* Social Media y Links */}
        <article className="surface-card">
          <h2>Redes y Enlaces</h2>
          <div className="social-media-grid">
            {melodySocialLinks.map((item) => (
              <a
                key={item.label}
                className={`social-media-btn social-media-btn--${item.tone}`}
                href={item.href}
                target="_blank"
                rel="noreferrer"
              >
                <span className="social-media-icon" aria-hidden="true">
                  <img src={item.icon} alt="" className="social-media-icon-img" loading="lazy" />
                </span>
                <span className="social-media-copy">
                  <span>{item.label}</span>
                  <small>{item.handle}</small>
                </span>
              </a>
            ))}
          </div>
        </article>
      </div>

      {/* Detalles Extra (Toggle) */}
      <article className="surface-card member-toggle-card">
        <div className="toggle-row">
          <h2>Más sobre mí</h2>
          <button
            type="button"
            className="member-toggle-btn"
            aria-expanded={showDetails}
            aria-controls="melody-details-react"
            onClick={() => setShowDetails((value) => !value)}
          >
            {showDetails ? "Ocultar detalles" : "Mostrar más sobre mí"}
          </button>
        </div>

        {showDetails ? (
          <section id="melody-details-react" className="detail-grid detail-grid--animated">
            <article className="detail-card">
              <h3>Películas favoritas</h3>
              <ul className="detail-list">
                <li>Batman: el caballero de la noche</li>
                <li>Orgullo y prejuicio</li>
                <li>Forrest Gump</li>
              </ul>
            </article>
            <article className="detail-card">
              <h3>Discos musicales favoritos</h3>
              <ul className="detail-list">
                <li>Born this way — Lady Gaga</li>
                <li>Future Nostalgia - Dua Lipa</li>
                <li>Madonna - Confessions on a Dance Floor</li>
              </ul>
            </article>
            <article className="detail-card">
              <h3>Hobbies y pasatiempos</h3>
              <ul className="detail-list">
                <li>Me gusta ver películas de terror, suspenso, aventura y ciencia ficción.</li>
                <li>Me encanta viajar y aprovecho para conocer un lugar nuevo cada vez que puedo.</li>
              </ul>
            </article>
            <article className="detail-card detail-card--full">
              <h3>Cómo me gusta trabajar en equipo</h3>
              <p>
                Valoro la comunicación frecuente, las tareas bien definidas y poder pedir ayuda a
                tiempo. Prefiero documentar decisiones pequeñas (por ejemplo en jira) para que el resto
                del equipo sepa qué se hizo y por qué.
              </p>
            </article>
          </section>
        ) : null}
      </article>
    </PageShell>
  );
}

function LucreciaPage({ member }) {
  const [showDetails, setShowDetails] = useState(false);
  const [selectedMood, setSelectedMood] = useState("");
  const recommendation = selectedMood ? lucreciaMoodData[selectedMood] : null;

  // Estados y funciones para el carrusel de proyectos
  const [activeProject, setActiveProject] = useState(0);
  const currentProject = lucreciaProjects[activeProject];

  function goToPreviousProject() {
    setActiveProject((value) =>
      value === 0 ? lucreciaProjects.length - 1 : value - 1
    );
  }

  function goToNextProject() {
    setActiveProject((value) =>
      value === lucreciaProjects.length - 1 ? 0 : value + 1
    );
  }

  return (
    <PageShell
      member={member}
      kicker="Perfil de integrante"
      title={member.name}
      tagline="Estudiante de la Tecnicatura Superior en Desarrollo de Software y profesora de matemática. Disfruto del desarrollo backend, la creación de Micro-SaaS y priorizo escribir código modular que funcione a la perfección en mi entorno de VS Code y localhost."
    >
      <div className="content-grid">
        {/* Datos Básicos */}
        <article className="surface-card">
          <h2>Datos</h2>
          <div className="content-grid member-mini-grid">
            <div className="mini-block">
              <h3>Ubicación actual</h3>
              <p>Casilda, Santa Fe</p>
            </div>
            <div className="mini-block">
              <h3>Rol principal</h3>
              <p>Backend Developer</p>
            </div>
          </div>
        </article>

        {/* Barras de Progreso Animadas */}
        <article className="surface-card">
          <h2>Habilidades Técnicas</h2>
          <SkillBarList skills={lucreciaSkills} />
        </article>

        {/* Carrusel de Proyectos */}
        <article className="surface-card">
          <div className="section-heading-row">
            <h2>Proyectos Destacados</h2>
            <div className="carousel-controls" aria-label="Controles del carrusel">
              <button type="button" className="carousel-btn" onClick={goToPreviousProject}>
                Anterior
              </button>
              <button type="button" className="carousel-btn" onClick={goToNextProject}>
                Siguiente
              </button>
            </div>
          </div>

          <section className="project-carousel" aria-live="polite">
            <div className="project-carousel-card">
              <span className="project-carousel-step">
                Proyecto {activeProject + 1} de {lucreciaProjects.length}
              </span>
              <h3>{currentProject.title}</h3>
              <p>{currentProject.summary}</p>
              <p>{currentProject.focus}</p>
              <ul className="detail-list pill-list">
                {currentProject.stack.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="carousel-dots" aria-label="Selección de proyecto">
              {lucreciaProjects.map((project, index) => (
                <button
                  key={project.title}
                  type="button"
                  className={`carousel-dot${index === activeProject ? " is-active" : ""}`}
                  aria-label={`Ver ${project.title}`}
                  aria-pressed={index === activeProject}
                  onClick={() => setActiveProject(index)}
                />
              ))}
            </div>
          </section>
        </article>

        {/* Tech Stack e Iconografía */}
        <article className="surface-card">
          <h2>Tech Stack</h2>
          <div className="tech-stack-grid">
            {lucreciaTechStack.map((tech) => (
              <article key={tech.name} className={`tech-icon-card tech-icon-card--${tech.tone}`}>
                <span className="tech-icon-glyph" aria-hidden="true">
                  <img src={tech.icon} alt="" className="tech-icon-img" loading="lazy" />
                </span>
                <strong>{tech.name}</strong>
              </article>
            ))}
          </div>
        </article>

        {/* Social Media y Links */}
        <article className="surface-card">
          <h2>Redes y Enlaces</h2>
          <div className="social-media-grid">
            {lucreciaSocialLinks.map((item) => (
              <a
                key={item.label}
                className={`social-media-btn social-media-btn--${item.tone}`}
                href={item.href}
                target="_blank"
                rel="noreferrer"
              >
                <span className="social-media-icon" aria-hidden="true">
                  <img src={item.icon} alt="" className="social-media-icon-img" loading="lazy" />
                </span>
                <span className="social-media-copy">
                  <span>{item.label}</span>
                  <small>{item.handle}</small>
                </span>
              </a>
            ))}
          </div>
        </article>
      </div>

      {/* Detalles Extra (Toggle) */}
      <article className="surface-card member-toggle-card">
        <div className="toggle-row">
          <h2>Más sobre mí</h2>
          <button
            type="button"
            className="member-toggle-btn"
            aria-expanded={showDetails}
            aria-controls="lucrecia-details-react"
            onClick={() => setShowDetails((value) => !value)}
          >
            {showDetails ? "Ocultar detalles" : "Mostrar más sobre mí"}
          </button>
        </div>

        {showDetails ? (
          <section id="lucrecia-details-react" className="detail-grid detail-grid--animated">
            <article className="detail-card">
              <h3>Me gusta mucho</h3>
              <ul className="detail-list">
                <li>Leer. No me imagino la vida sin libros, son mi compañía desde pequeña.</li>
                <li>Viajar. Nada como conocer lugares nuevos y ver paisajes de ensueños.</li>
                <li>Tener animales cerca. Pelos, plumas, escamas y exoesqueletos.</li>
              </ul>
            </article>
            <article className="detail-card">
              <h3>En el futuro quisiera</h3>
              <ul className="detail-list">
                <li>Tener mis propios proyectos de software en marcha.</li>
                <li>Contribuir a proyectos que tengan un impacto positivo en la sociedad.</li>
                <li>Mantener un modelo de trabajo independiente y evitar la incomodidad de negociar precios masivamente.</li>
              </ul>
            </article>
          </section>
        ) : null}
      </article>

      {/* Tu Recomendador de Mood original */}
      <article className="surface-card lucrecia-mood-card">
        <h2>¿Cómo estás hoy?</h2>
        <p>Te recomiendo algo según tu humor:</p>
        <div className="mood-btns" role="group" aria-label="Elige tu humor">
          {Object.keys(lucreciaMoodData).map((mood) => (
            <button
              key={mood}
              type="button"
              className={`mood-btn${selectedMood === mood ? " is-active" : ""}`}
              aria-pressed={selectedMood === mood}
              onClick={() => setSelectedMood(mood)}
            >
              {mood === "aventurero" && "Aventurero"}
              {mood === "reflexivo" && "Reflexivo"}
              {mood === "melancolico" && "Melancólico"}
              {mood === "feliz" && "Feliz"}
            </button>
          ))}
        </div>

        {recommendation ? (
          <div className="recommendation-card detail-grid detail-grid--animated">
            <p>
              <strong>Película:</strong> <span>{recommendation.movie}</span>
              <br />
              <small>{recommendation.movieNote}</small>
            </p>
            <p>
              <strong>Disco:</strong> <span>{recommendation.album}</span>
              <br />
              <small>{recommendation.albumNote}</small>
            </p>
            <p>
              <strong>Actividad:</strong> <span>{recommendation.act}</span>
              <br />
              <small>{recommendation.actNote}</small>
            </p>
          </div>
        ) : null}
      </article>
    </PageShell>
  );
}

function MysteryBox() {
  const [reward, setReward] = useState("");

  function openMysteryBox() {
    const randomIndex = Math.floor(Math.random() * mysteryBoxPrizes.length);
    setReward(mysteryBoxPrizes[randomIndex]);
  }

  return (
    <article className="surface-card mystery-box-card">
      <h2>Mystery Box</h2>
      <p>Abre la caja sorpresa y descubre qué habilidad coleccionable te toca hoy.</p>
      <button type="button" className="mystery-box-btn" onClick={openMysteryBox}>
        Abrir Caja Sorpresa
      </button>
      {reward ? (
        <div className="mystery-box-reward" aria-live="polite">
          <span>Premio obtenido</span>
          <strong>{reward}</strong>
        </div>
      ) : null}
    </article>
  );
}

function NotFoundPage() {
  return (
    <section className="page">
      <header className="page-hero">
        <span className="page-kicker">404</span>
        <h1>Pagina no encontrada</h1>
        <p>La ruta solicitada no existe dentro de la nueva navegacion del proyecto.</p>
      </header>
    </section>
  );
}

export default App;
