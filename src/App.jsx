import { useState } from "react";
import { Link, Navigate, NavLink, Outlet, Route, Routes, useParams } from "react-router-dom";

const teamMembers = [
  {
    slug: "sebastian-vitcop",
    name: "Sebastián Vitcop",
    role: "Frontend Dev",
    description: "Especializado en estructura visual, base semantica y composicion de interfaces.",
    avatar: "/img/fotosebasV.png",
    accent: "var(--accent-sky)",
    initials: "SV",
    page: "vitcop",
  },
  {
    slug: "sebastian-matulionis",
    name: "Sebastián Matulionis",
    role: "Frontend Developer",
    description: "Enfocado en UI, organizacion de contenido y mejoras de experiencia de usuario.",
    avatar: "/img/avatar_sebastian.png",
    accent: "var(--accent-mint)",
    initials: "SM",
    page: "matulionis",
  },
  {
    slug: "melody-amaro",
    name: "Melody Amaro",
    role: "Desarrollo web",
    description: "Aporta criterio visual, interactividad y una mirada sensible sobre la narrativa del sitio.",
    avatar: "/img/melody-avatar.png",
    accent: "var(--accent-peach)",
    initials: "MA",
    page: "melody",
  },
  {
    slug: "lucrecia-vigo",
    name: "Lucrecia Vigo",
    role: "Backend Developer",
    description: "Suma organización, contenido personal y una propuesta interactiva para su pagina propia.",
    avatar: "/img/avatar_lucrecia.png",
    accent: "var(--accent-lilac)",
    initials: "LV",
    page: "lucrecia",
  },
];

const sebastianMatulionisSkills = [
  { name: "HTML semántico", level: 92, note: "Estructuras claras y accesibles." },
  { name: "CSS responsive", level: 88, note: "Layouts flexibles y consistentes." },
  { name: "JavaScript", level: 76, note: "Interactividad y logica de interfaz." },
  { name: "Git / GitHub", level: 74, note: "Versionado y trabajo colaborativo." },
  { name: "React", level: 62, note: "Componentes y navegacion SPA." },
];

const sebastianMatulionisProjects = [
  {
    title: "Landing de presentacion",
    summary: "Maqueta centrada en contenido visual, bloques destacados y jerarquia tipografica.",
    stack: ["HTML", "CSS", "Responsive"],
    focus: "Trabaje en la organizacion de secciones y en una experiencia de lectura mas clara.",
  },
  {
    title: "Dashboard academico",
    summary: "Interfaz con tarjetas, sidebar y rutas internas para ordenar la informacion del equipo.",
    stack: ["React", "React Router", "CSS"],
    focus: "Me enfoque en transformar contenido estatico en una navegacion mas intuitiva.",
  },
  {
    title: "Bitacora interactiva",
    summary: "Registro visual del avance del proyecto con bloques reutilizables y mejor lectura.",
    stack: ["JavaScript", "UI", "Componentes"],
    focus: "Busque que la documentacion del proceso se vea mas dinamica y facil de seguir.",
  },
];

const sebastianMatulionisTechStack = [
  { name: "HTML5", glyph: "</>", tone: "sky" },
  { name: "CSS3", glyph: "#", tone: "mint" },
  { name: "JavaScript", glyph: "JS", tone: "peach" },
  { name: "React", glyph: "R", tone: "lilac" },
  { name: "GitHub", glyph: "GH", tone: "sky" },
];

const sebastianMatulionisSocialLinks = [
  { label: "GitHub", handle: "@sebastianm", href: "#", tone: "sky" },
  { label: "LinkedIn", handle: "Perfil profesional", href: "#", tone: "mint" },
  { label: "Instagram", handle: "@seba.dev", href: "#", tone: "peach" },
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

function App() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route index element={<HomePage />} />
        <Route path="bitacora" element={<BitacoraPage />} />
        <Route path="integrantes" element={<TeamPage />} />
        <Route path="integrantes/:slug" element={<MemberPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

function DashboardLayout() {
  return (
    <div className="app-shell">
      <Sidebar />
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
}

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-logo" aria-hidden="true">
          G6
        </div>
        <div className="sidebar-brand-copy">
          <span className="sidebar-eyebrow">TP2 React</span>
          <strong>Grupo 6</strong>
        </div>
      </div>

      <nav className="sidebar-nav" aria-label="Navegacion principal">
        <div className="sidebar-section">
          <span className="sidebar-section-label">General</span>
          <NavItem to="/" end>
            Portada
          </NavItem>
          <NavItem to="/bitacora">Bitacora</NavItem>
        </div>

        <div className="sidebar-section">
          <span className="sidebar-section-label">Integrantes</span>
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
          <span className="page-kicker">Tecnicatura en Desarrollo de Software</span>
          <h1>Equipo N 6</h1>
          <p>
            Somos un grupo de estudiantes enfocados en crear interfaces claras, humanas y bien
            organizadas con HTML y CSS. Este proyecto reúne perfiles distintos dentro de una misma
            identidad visual.
          </p>
        </div>
      </header>

      <section className="home-section" aria-labelledby="home-team-title">
        <div className="section-heading">
          <span className="section-kicker">Nuestro Equipo</span>
          <h2 id="home-team-title">Nuestro Equipo</h2>
        </div>

        <div className="home-team-grid">
          {teamMembers.map((member, index) => (
            <Link
              key={member.slug}
              to={`/integrantes/${member.slug}`}
              className="home-member-card"
              style={{ "--card-delay": `${index * 90}ms` }}
            >
              <div className="home-member-avatar-wrap" aria-hidden="true">
                <img src={member.avatar} alt="" className="home-member-avatar" />
              </div>
              <div className="home-member-copy">
                <h3>{member.name}</h3>
                <p>{member.role}</p>
                <span>Ver pagina individual</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="content-grid home-info-grid">
          <article className="surface-card">
            <h2>Enfoque</h2>
            <p>Diseño de interfaces, estructura semántica y presentaciones personales.</p>
          </article>

          <article className="surface-card">
            <h2>Herramientas</h2>
            <p>HTML, CSS y JavaScript aplicado con una base visual compartida.</p>
          </article>
        </div>
      </section>
    </section>
  );
}

function BitacoraPage() {
  return (
    <section className="page">
      <header className="page-hero">
        <span className="page-kicker">Bitacora</span>
        <h1>Continuidad del proceso</h1>
        <p>
          Esta bitacora retoma el registro del TP1 y lo sigue ampliando durante la migracion a React.
          El objetivo es dejar documentado el recorrido completo: decisiones, problemas, resoluciones y
          cambios de rumbo que fueron dando forma al proyecto.
        </p>
      </header>

      <div className="content-grid">
        <article className="surface-card">
          <h2>Base heredada</h2>
          <p>
            El TP1 partia de una portada, una bitacora central y paginas individuales para cada
            integrante. Esa estructura se mantiene como punto de partida para no perder continuidad
            entre etapas.
          </p>
        </article>

        <article className="surface-card">
          <h2>Primera decision de TP2</h2>
          <p>
            La nueva navegacion se organizo con una Sidebar fija tipo dashboard para convertir la
            estructura anterior en una SPA mas clara, jerarquizada y preparada para escalar.
          </p>
        </article>

        <article className="surface-card">
          <h2>Dificultad detectada</h2>
          <p>
            El desafio principal fue traducir la experiencia estatica a una arquitectura de
            componentes sin romper el recorrido del usuario ni perder la identidad visual del grupo.
          </p>
        </article>

        <article className="surface-card">
          <h2>Resolucion aplicada</h2>
          <p>
            Se definio una base React con rutas para la portada, la bitacora y cada integrante. De
            este modo, la migracion no borra el TP1, sino que lo reorganiza sobre una estructura mas
            flexible.
          </p>
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
        <h1>Listado del equipo</h1>
        <p>
          Desde esta vista se accede a cada pagina individual de forma clara, consistente y preparada
          para seguir ampliandose.
        </p>
      </header>

      <div className="team-grid">
        {teamMembers.map((member) => (
          <NavLink key={member.slug} to={`/integrantes/${member.slug}`} className="member-card">
            <div className="member-avatar" style={{ background: member.accent }}>
              {member.initials}
            </div>
            <div className="member-copy">
              <h2>{member.name}</h2>
              <p>{member.role}</p>
              <span>Ver pagina individual</span>
            </div>
          </NavLink>
        ))}
      </div>
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
          <div className="skill-bars" aria-label="Barras de progreso de habilidades">
            {sebastianMatulionisSkills.map((skill) => (
              <article key={skill.name} className="skill-bar-card">
                <div className="skill-bar-header">
                  <div>
                    <h3>{skill.name}</h3>
                    <p>{skill.note}</p>
                  </div>
                  <strong>{skill.level}%</strong>
                </div>
                <div className="skill-bar-track" aria-hidden="true">
                  <span
                    className="skill-bar-fill"
                    style={{ "--skill-level": `${skill.level}%` }}
                  />
                </div>
              </article>
            ))}
          </div>
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
                  {tech.glyph}
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
                <span>{item.label}</span>
                <small>{item.handle}</small>
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

  return (
    <PageShell
      member={member}
      kicker="Perfil de integrante"
      className={showDetails ? "melody-theme-day" : ""}
      title={member.name}
      tagline="Hola, mi nombre es Melody Amaro. Soy estudiante de desarrollo web. En los ultimos meses estoy haciendo proyectos dedicados al frontend. Me gusta aprender siempre alguna tecnologia nueva y actualmente lo relacionado a la inteligencia artificial. Me gustaria en un futuro ayudar a empresas a potenciar sus ventas con esa tecnologia."
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
              <p>33 años</p>
            </div>
          </div>
        </article>

        <article className="surface-card">
          <h2>Habilidades</h2>
          <ul className="detail-list pill-list">
            <li>HTML estructurado</li>
            <li>CSS (layout y estilos)</li>
            <li>JavaScript básico</li>
            <li>Trabajo en equipo / Git</li>
          </ul>
        </article>

        <article className="surface-card">
          <h2>Películas favoritas</h2>
          <ul className="detail-list pill-list">
            <li>Batman: el caballero de la noche</li>
            <li>Orgullo y prejuicio</li>
            <li>Forrest Gump</li>
          </ul>
        </article>

        <article className="surface-card">
          <h2>Discos musicales favoritos</h2>
          <ul className="detail-list pill-list">
            <li>Born this way — Lady Gaga</li>
            <li>Future Nostalgia - Dua Lipa</li>
            <li>Madonna - Confessions on a Dance Floor</li>
          </ul>
        </article>
      </div>

      <article className="surface-card member-toggle-card">
        <div className="toggle-row">
          <h2>Detalles extra</h2>
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
              <h3>Hobbies y pasatiempos</h3>
              <ul className="detail-list">
                <li>Me gusta ver películas de terror, suspenso, aventura y ciencia ficción.</li>
                <li>Me encanta viajar y aprovecho para conocer un lugar nuevo cada vez que puedo.</li>
              </ul>
            </article>
            <article className="detail-card">
              <h3>Objetivos a corto plazo</h3>
              <ul className="detail-list">
                <li>Profundizar JavaScript (DOM, eventos y buenas prácticas de código).</li>
                <li>Participar en un proyecto grupal con entregas claras y revisión entre pares.</li>
                <li>Mejorar mi portfolio con piezas que muestren proceso, no solo resultado final.</li>
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

  return (
    <PageShell
      member={member}
      kicker="Perfil de integrante"
      title={member.name}
      tagline="Estudiante de la Tecnicatura Superior en Desarrollo de Software. Me gusta la programación, en particular la orientación hacia el backend y las bases de datos. Disfruto aprender sobre nuevas tecnologías, probar herramientas y construir proyectos que me permitan seguir creciendo en el área de software."
    >
      <div className="content-grid">
        <article className="surface-card">
          <h2>Datos</h2>
          <div className="content-grid member-mini-grid">
            <div className="mini-block">
              <h3>Ubicación actual</h3>
              <p>Casilda, Santa Fe, Argentina</p>
            </div>
            <div className="mini-block">
              <h3>Edad</h3>
              <p>40 años</p>
            </div>
          </div>
        </article>

        <article className="surface-card">
          <h2>Habilidades</h2>
          <ul className="detail-list pill-list">
            <li>PHP</li>
            <li>Python</li>
            <li>MySQL</li>
            <li>JavaScript</li>
          </ul>
        </article>

        <article className="surface-card">
          <h2>Peliculas favoritas</h2>
          <ul className="detail-list pill-list">
            <li>Una mente brillante</li>
            <li>Bastardos sin gloria</li>
            <li>UP: una aventura de altura</li>
          </ul>
        </article>

        <article className="surface-card">
          <h2>Discos musicales favoritos</h2>
          <ul className="detail-list pill-list">
            <li>Mediterráneo - Joan Manuel Serrat</li>
            <li>¿Dónde están los ladrones? - Shakira</li>
            <li>Vasos vacíos - Los fabulosos Cadillacs</li>
          </ul>
        </article>
      </div>

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
                <li>Leer. No me imagino la vida sin libros, son mi compañía desde muy pequeña.</li>
                <li>Viajar. Nada como conocer lugares nuevos y ver paisajes de ensueños.</li>
                <li>Tener animales cerca. Pelos, plumas, escamas y exoesqueletos, en ese orden.</li>
              </ul>
            </article>
            <article className="detail-card">
              <h3>En el futuro quisiera</h3>
              <ul className="detail-list">
                <li>Seguir aprendiendo siempre, de áreas nuevas y variadas.</li>
                <li>Contribuir a proyectos que tengan un impacto positivo en la sociedad.</li>
                <li>Tener más confianza en mis ideas locas y llevarlas a cabo.</li>
              </ul>
            </article>
          </section>
        ) : null}
      </article>

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
