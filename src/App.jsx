import { useState, useEffect } from "react";
import { Link, Navigate, NavLink, Outlet, Route, Routes, useParams } from "react-router-dom";
import datosJSON from '../data/datos.json';

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
  { name: "PHP", glyph: "php", tone: "sky" },
  { name: "MySQL", glyph: "db", tone: "mint" },
  { name: "NestJS", glyph: "N", tone: "peach" },
  { name: "Python", glyph: "py", tone: "lilac" },
  { name: "Prisma", glyph: "▲", tone: "sky" },
];

const lucreciaSocialLinks = [
  { label: "GitHub", handle: "@lucrelucre", href: "#", tone: "sky" },
  { label: "LinkedIn", handle: "Perfil profesional", href: "#", tone: "mint" },
  { label: "Portfolio", handle: "Proyectos", href: "#", tone: "peach" },
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
  return `FUNKO #${String(index + 1).padStart(3, "0")}`;
}

function App() {
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
        <div className="sidebar-logo sidebar-logo--pop" aria-hidden="true">
          POP!
        </div>
        <div className="sidebar-brand-copy">
          <span className="sidebar-eyebrow">Coleccion React</span>
          <strong>Funko Universe</strong>
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
          <span className="page-kicker">Funko Universe</span>
          <h1>🎉 FUNKO COLLECTOR TEAM 🎉</h1>
          <p>
            Bienvenido a la colección oficial del Grupo 6.
            Cada integrante es una edición especial con habilidades,
            intereses y características únicas.
          </p>
        </div>
      </header>

      <section className="home-section" aria-labelledby="home-team-title">
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
                <span className="funko-box-brand">Funko</span>
                <span className="funko-box-number">{formatFunkoNumber(index)}</span>
              </div>
              <div className="home-member-avatar-wrap" aria-hidden="true">
                <span className="pop-sticker">POP!</span>
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

function BitacoraPage() {
  return (
    <section className="page">
      <header className="page-hero">
        <span className="page-kicker">Bitácora</span>
        <h1>Continuidad del proceso</h1>
        <p>
          Esta bitácora retoma el registro del TP1 y lo amplía durante la migración a React. El
          objetivo es dejar documentado el recorrido completo: cómo se repartieron los roles, cómo
          se organizó el trabajo en equipo y de qué manera la estructura estática fue convirtiéndose
          en una aplicación modular con navegación por rutas.
        </p>
      </header>

      <div className="content-grid">
        <article className="surface-card">
          <h2>Base heredada</h2>
          <p>
            El TP1 partía de una portada, una bitácora central y páginas individuales para cada
            integrante. Esa base estática en HTML y JS simple se tomó como punto de partida para no
            perder continuidad entre etapas. En esta nueva versión se respetó esa idea original, pero
            se reorganizó para que el contenido pudiera crecer sin repetir estructuras ni depender de
            archivos aislados para cada sección.
          </p>
        </article>

        <article className="surface-card">
          <h2>Roles y flujo de trabajo</h2>
          <p>
            Para ordenar el trabajo se usó Trello como tablero central de seguimiento. Allí se
            repartieron las tareas por integrante, se marcaron prioridades y se fue registrando qué
            quedaba pendiente, qué estaba en progreso y qué ya podía integrarse al proyecto. En la
            práctica, cada integrante pudo concentrarse en una parte concreta: estructura general,
            páginas individuales, estilo visual, contenido o navegación.
          </p>
        </article>

        <article className="surface-card">
          <h2>De lo estático a React</h2>
          <p>
            La migración empezó por identificar patrones repetidos en la versión original: cabeceras,
            tarjetas, enlaces y secciones similares que se copiaban entre páginas. React permitió
            separar esos bloques en componentes reutilizables y llevar la navegación a una SPA con
            rutas, lo que simplificó el mantenimiento y dio una estructura más clara para mostrar la
            información del grupo.
          </p>
        </article>

        <article className="surface-card">
          <h2>Evolución técnica</h2>
          <p>
            El paso a React también ayudó a ordenar mejor la lógica del proyecto. La portada dejó de
            depender de archivos sueltos y pasó a convivir con una base común de layout, sidebar y
            rutas internas. Eso hizo posible conservar la identidad visual del TP1, pero con una
            arquitectura más limpia, más fácil de extender y más adecuada para seguir sumando
            contenido en futuras entregas.
          </p>
        </article>
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

function ApiPage() {
  const [personajes, setPersonajes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const [haySiguiente, setHaySiguiente] = useState(true);

  useEffect(() => {
    const fetchPersonajes = async () => {
      setLoading(true); 
      setError(null);   

      try {
        // API de Rick and Morty 
        const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${paginaActual}`);
        
        if (!response.ok) {
          throw new Error("Ocurrió un error al traer los datos.");
        }
        
        const data = await response.json();
        
        // Guardamos los resultados
        setPersonajes(data.results);
        
        // La API de Rick & Morty guarda el "next" adentro del objeto "info"
        setHaySiguiente(!!data.info.next); 
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); 
      }
    };

    fetchPersonajes();
  }, [paginaActual]); 

  const irPaginaAnterior = () => {
    if (paginaActual > 1) setPaginaActual((prev) => prev - 1);
  };

  const irPaginaSiguiente = () => {
    if (haySiguiente) setPaginaActual((prev) => prev + 1);
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
            <div className="carousel-controls" aria-label="Controles de paginación">
              <button 
                type="button" 
                className="carousel-btn" 
                onClick={irPaginaAnterior}
                disabled={paginaActual === 1 || loading}
                style={{ opacity: (paginaActual === 1 || loading) ? 0.5 : 1 }}
              >
                Anterior
              </button>
              
              <span className="project-carousel-step" style={{ margin: "0 10px" }}>
                Página {paginaActual}
              </span>
              
              <button 
                type="button" 
                className="carousel-btn" 
                onClick={irPaginaSiguiente}
                disabled={!haySiguiente || loading}
                style={{ opacity: (!haySiguiente || loading) ? 0.5 : 1 }}
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
            <div style={{ textAlign: "center", padding: "40px", color: "#d9534f" }}>
              <h3>Error: {error}</h3>
              <p>Revisá la consola para más detalles.</p>
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

function GaleriaPage() {
  const idsPicsum = [10, 22, 29, 37, 40, 53, 64, 75, 82, 96, 104, 108];

  const imagenesData = idsPicsum.map((imgId, i) => ({
    id: i + 1,
    urlThumb: `https://picsum.photos/id/${imgId}/400/300`, // Misma imagen, tamaño chico
    urlFull: `https://picsum.photos/id/${imgId}/1200/900`,  // Misma imagen, tamaño grande
    alt: `Obra visual número ${i + 1}`,
    titulo: `Obra Visual ${i + 1}`,
}));
  // Estado para guardar el INDEX de la imagen abierta (null si está cerrada)
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  // --- LÓGICA DE CIERRE CON TECLA ESC ---
  useEffect(() => {
    // Definimos la función que escucha el teclado
    const handleKeyDown = (e) => {
      if (selectedImageIndex !== null && (e.key === "Escape" || e.key === "Esc")) {
        closeLightbox();
      }
    };

    // Agregamos el "escuchador" al documento
    document.addEventListener("keydown", handleKeyDown);

    // Función de limpieza (para no duplicar escuchadores)
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImageIndex]); // Se ejecuta cada vez que el estado cambia

  // --- FUNCIONES DE NAVEGACIÓN Y CIERRE ---
  const openLightbox = (index) => {
    setSelectedImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
  };

  const showPrev = (e) => {
    e.stopPropagation(); // Evita que se cierre el lightbox al hacer clic en el botón
    setSelectedImageIndex((prevIndex) => 
      prevIndex === 0 ? imagenesData.length - 1 : prevIndex - 1
    );
  };

  const showNext = (e) => {
    e.stopPropagation(); // Evita que se cierre el lightbox al hacer clic en el botón
    setSelectedImageIndex((prevIndex) => 
      prevIndex === imagenesData.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Variable para tener la información de la imagen abierta actualmente
  const selectedImage = selectedImageIndex !== null ? imagenesData[selectedImageIndex] : null;

  return (
    <section className="page">
      <header className="page-hero">
        <span className="page-kicker">Multimedia</span>
        <h1>Galería Interactiva</h1>
        <p>Visualizador tipo Grid con funcionalidad de Lightbox integrada (cierre con ESC).</p>
      </header>

      <div className="content-grid">
        <article className="surface-card" style={{ gridColumn: "1 / -1" }}>
          
          {/* --- 1. VISUALIZADOR TIPO GRID (Usamos detail-grid del CSS base) --- */}
          <div className="detail-grid">
            {imagenesData.map((img, index) => (
              <article 
                key={img.id} 
                className="detail-card" 
                style={{ cursor: "pointer", transition: "transform 0.2s" }}
                onClick={() => openLightbox(index)} // Abre el lightbox en este index
              >
                <img 
                  src={img.urlThumb} 
                  alt={img.alt} 
                  style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "12px" }} 
                />
                <div style={{ padding: "10px" }}>
                  <h4 style={{ margin: 0, fontSize: "14px" }}>{img.titulo}</h4>
                </div>
              </article>
            ))}
          </div>

        </article>
      </div>

      {/* --- 2. FUNCIONALIDAD LIGHTBOX (Renderizado condicional con estado) --- */}
      {selectedImage && (
        <div 
          className="lightbox-overlay" 
          onClick={closeLightbox} // Cierra si hacés clic en el fondo oscuro
          style={{
            position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
            backgroundColor: "rgba(0,0,0,0.85)", zIndex: 1000,
            display: "flex", justifyContent: "center", alignItems: "center",
            cursor: "zoom-out", transition: "opacity 0.3s"
          }}
        >
          {/* Contenedor principal de la imagen (más grande) */}
          <div 
            className="lightbox-content" 
            onClick={(e) => e.stopPropagation()} // Evita cerrar si hacés clic en la imagen
            style={{ 
              position: "relative", maxWidth: "90%", maxHeight: "90%", 
              display: "flex", flexDirection: "column", alignItems: "center",
              gap: "10px"
            }}
          >
            {/* Imagen Grande */}
            <img 
              src={selectedImage.urlFull} 
              alt={selectedImage.alt} 
              style={{ maxWidth: "100%", maxHeight: "80vh", borderRadius: "12px", boxShadow: "0 10px 30px rgba(0,0,0,0.5)", cursor: "default" }} 
            />
            
            {/* Título de la imagen */}
            <div style={{ color: "#fff", backgroundColor: "rgba(0,0,0,0.5)", padding: "10px 20px", borderRadius: "20px", fontSize: "14px" }}>
               {selectedImage.titulo}
            </div>

            {/* --- NAVEGACIÓN INTERNA --- */}
            
            {/* Botón Cerrar (X) */}
            <button 
              onClick={closeLightbox}
              style={{ position: "absolute", top: "-20px", right: "-20px", background: "#fff", color: "#333", border: "none", borderRadius: "50%", width: "40px", height: "40px", fontSize: "20px", cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center", boxShadow: "0 4px 10px rgba(0,0,0,0.2)" }}
            >
              ×
            </button>
            
            {/* Botón Anterior (<<) */}
            <button 
              onClick={showPrev}
              style={{ position: "absolute", left: "-60px", top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.2)", color: "#fff", border: "none", borderRadius: "50%", width: "50px", height: "50px", fontSize: "24px", cursor: "pointer" }}
            >
              &lt;
            </button>

            {/* Botón Siguiente (>>) */}
            <button 
              onClick={showNext}
              style={{ position: "absolute", right: "-60px", top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.2)", color: "#fff", border: "none", borderRadius: "50%", width: "50px", height: "50px", fontSize: "24px", cursor: "pointer" }}
            >
              &gt;
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

function ArbolPage() {
  return (
    <section className="page">
      <header className="page-hero">
        <span className="page-kicker">Arquitectura</span>
        <h1>Árbol de Renderizado</h1>
        <p>
          Representación esquemática de la jerarquía de componentes de nuestra aplicación SPA.
          Muestra cómo fluye la información desde el enrutador principal hasta los componentes de presentación.
        </p>
      </header>

      <div className="content-grid">
        <article className="surface-card" style={{ gridColumn: "1 / -1" }}>
          <h2>Diagrama Jerárquico</h2>
          <p style={{ marginBottom: "20px" }}>
            El componente raíz envuelve la estructura del diseño (Layout), el cual mantiene 
            la barra lateral estática y un contenedor dinámico (Outlet) donde se inyectan las vistas.
          </p>
          
          {/* Contenedor del esquema con scroll horizontal por si en celulares queda chico */}
          <div style={{ 
            background: "#1e1e1e", 
            color: "#d4d4d4", 
            padding: "24px", 
            borderRadius: "16px",
            overflowX: "auto",
            fontFamily: "monospace",
            fontSize: "15px",
            lineHeight: "1.6",
            boxShadow: "inset 0 4px 10px rgba(0,0,0,0.2)"
          }}>
<pre style={{ margin: 0 }}>
{`App (BrowserRouter + Routes)
 └── DashboardLayout (Layout de nivel superior)
      ├── Sidebar (Navegación persistente)
      │    └── NavItem (Enlaces de enrutamiento)
      │
      └── Outlet (Contenedor de renderizado dinámico)
           ├── HomePage
           │    ├── HeroSection
           │    └── GridCards (Información del equipo)
           │
           ├── BitacoraPage
           │    └── SurfaceCards (Artículos documentados)
           │
           ├── ExploradorPage
           │    ├── BarraDeFiltros (Inputs y Selects)
           │    └── DetailGrid (Renderizado de JSON)
           │
           ├── ApiPage
           │    ├── ControlesDePaginacion (Botones Prev/Next)
           │    └── DetailGrid (Grilla de Personajes)
           │
           ├── GaleriaPage
           │    ├── DetailGrid (Grilla de miniaturas)
           │    └── LightboxOverlay (Modal de imagen condicional)
           │         └── ControlesInternos (Cerrar, Prev, Next)
           │
           └── TeamPage
                └── MemberPage (Ruta dinámica /:slug)
                     └── PageShell (Plantilla base)
                          ├── MemberInfoGrid (Datos estructurados)
                          ├── ToggleCard (Acordeón de detalles extra)
                          └── LucreciaMoodCard / SkillBars (Componentes únicos por perfil)`}
</pre>
          </div>
        </article>

        <article className="surface-card" style={{ gridColumn: "1 / -1" }}>
          <h2>Referencias de la Arquitectura</h2>
          <ul className="detail-list">
            <li><strong>Componente Raíz:</strong> <code>App</code> es el gestor central que define las rutas.</li>
            <li><strong>Nivel Superior:</strong> <code>DashboardLayout</code> y <code>Sidebar</code> estructuran la interfaz (App Shell).</li>
            <li><strong>Componentes Hijos:</strong> Las páginas (como <code>GaleriaPage</code> o <code>ApiPage</code>) manejan su propio estado local e inyectan componentes de presentación (Cards, Modals) según sea necesario.</li>
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
              <span className="funko-box-brand">Funko</span>
              <span className="funko-box-number">{formatFunkoNumber(index)}</span>
            </div>
            <div className="member-avatar" style={{ background: member.accent }}>
              <img src={member.avatar} alt="" aria-hidden="true" className="member-avatar-image" />
              <span className="pop-sticker">POP!</span>
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
          <div className="skill-bars" aria-label="Barras de progreso de habilidades">
            {sebastianMatulionisSkills.map((skill) => (
              <article key={skill.name} className="skill-bar-card">
                <div className="skill-bar-header">
                  <div>
                    <h3>{skill.name}</h3>
                    <p>{skill.note}</p>
                  </div>
                  <strong className={`rarity-badge rarity-badge--${getFunkoRarity(skill.level).tone}`}>
                    {getFunkoRarity(skill.level).stars} {getFunkoRarity(skill.level).label}
                  </strong>
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
          <div className="skill-bars" aria-label="Barras de progreso de habilidades">
            {lucreciaSkills.map((skill) => (
              <article key={skill.name} className="skill-bar-card">
                <div className="skill-bar-header">
                  <div>
                    <h3>{skill.name}</h3>
                    <p>{skill.note}</p>
                  </div>
                  <strong className={`rarity-badge rarity-badge--${getFunkoRarity(skill.level).tone}`}>
                    {getFunkoRarity(skill.level).stars} {getFunkoRarity(skill.level).label}
                  </strong>
                </div>
              </article>
            ))}
          </div>
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
                  {tech.glyph}
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
                <span>{item.label}</span>
                <small>{item.handle}</small>
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
