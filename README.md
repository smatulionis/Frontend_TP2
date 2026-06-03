# Grupo 6 — Proyecto Frontend TP2

> 🚀 **Deploy:** https://frontend-tp-2.vercel.app/
> 📦 **Repositorio:** https://github.com/smatulionis/Frontend_TP2

---

## Descripción del Proyecto

Este trabajo práctico corresponde a la materia Frontend de la Tecnicatura Superior en Desarrollo de Software. Es la evolución del TP1 (HTML/CSS/JS vanilla) migrado a una arquitectura de componentes en **React + Vite**. La aplicación funciona como una SPA (Single Page Application) con temática "Funky Collector Team": cada integrante es presentado como una figura de colección con página de perfil propia, habilidades, proyectos y contenido interactivo. Incluye además un explorador de datos JSON con búsqueda en tiempo real, consumo de API externa (Rick & Morty) con paginación, galería con Lightbox, árbol de renderizado y bitácora del proceso.

---

## Integrantes

| Nombre | GitHub |
|---|---|
| Sebastián Vitcop | [github.com/Sebasvitcop](https://github.com/Sebasvitcop) |
| Sebastián Matulionis | [github.com/smatulionis](https://github.com/smatulionis) |
| Melody Amaro | [github.com/melodyamaro](https://github.com/melodyamaro/) |
| Lucrecia Vigo | [github.com/LucreLucre](https://github.com/LucreLucre) |

---

## Tecnologías Utilizadas

- **React 18** — arquitectura de componentes y hooks (`useState`, `useEffect`)
- **React Router DOM v6** — navegación SPA con rutas anidadas y `Outlet`
- **Vite 5** — bundler y servidor de desarrollo con proxy para la API
- **JavaScript ES2022+** — lógica de interfaz, fetch asíncrono, caché en memoria
- **CSS3** — variables, animaciones, diseño responsivo con media queries
- **Google Fonts** — tipografía Fredoka
- **Rick & Morty API** — API externa pública para el módulo de personajes
- **Lorem Picsum** — imágenes para la galería interactiva
- **Devicons CDN** — iconografía del tech stack de cada integrante
- **Git / GitHub** — control de versiones y trabajo colaborativo
- **Vercel** — plataforma de deploy

---

## Estructura de Archivos

```
Frontend_TP2-main/
├── index.html                  ← Punto de entrada HTML
├── package.json
├── vite.config.js              ← Config Vite + proxy Rick & Morty
├── README.md
│
├── data/
│   └── datos.json              ← 20 discos para el Explorador
│
├── public/
│   └── img/                    ← Avatares Funko, logos y social icons
│
└── src/
    ├── App.jsx                 ← Toda la lógica y componentes de la SPA
    ├── main.jsx                ← Entry point React + BrowserRouter
    ├── styles.css              ← Estilos globales + design system
    └── assets/
        └── funky-logo.png      ← Logo del equipo
```

---

## Guía de Estilos

### Paleta de Colores

El TP2 adopta un tema oscuro "collector" que reemplaza la paleta pastel del TP1:

| Variable | Color | Hex |
|---|---|---|
| `--bg` | Fondo oscuro | `#0f1222` |
| `--surface` | Superficie de tarjeta | `#1b2238` |
| `--surface-2` | Superficie elevada | `#242d48` |
| `--yellow` | Acento amarillo | `#ffd93d` |
| `--pink` | Acento rosa | `#ff4fa3` |
| `--cyan` | Acento celeste | `#00d8ff` |
| `--purple` | Acento violeta | `#7c4dff` |
| `--orange` | Acento naranja | `#ff9800` |
| `--text` | Texto principal | `#ffffff` |
| `--muted` | Texto secundario | `rgba(255,255,255,0.78)` |

### Tipografías

- **Cuerpo y UI:** [Fredoka](https://fonts.google.com/specimen/Fredoka) — sans-serif redondeada, pesos 400 / 500 / 600 / 700

```
https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&display=swap
```

### Iconografía

- **Devicons** — iconos SVG de tecnologías (HTML5, CSS3, JS, React, GitHub, etc.) vía CDN de jsDelivr
- **Simple Icons** — icono de CodePen para portfolio
- **SVG propios** — icono de Instagram en `/public/img/social/`
- No se utiliza ninguna librería de íconos general (Bootstrap Icons, Font Awesome, etc.)

---

## Componentes React Clave

### `App` (raíz)
Renderiza el árbol de rutas dentro de `PageLoaderProvider`, que muestra `AppLoader` solo cuando una vista lo pide por carga real (por ejemplo, fetch a la API).

### `DashboardLayout`
Layout principal envuelve a todas las páginas vía `Outlet`. Gestiona el menú móvil (`menuOpen`), bloquea el scroll al abrir y cierra con tecla ESC.

### `PageLoaderProvider` + `AppLoader`
Loader global (logo + **"Cargando"**) solo si una pantalla lo activa con `showPageLoader()` mientras hay espera real (p. ej. petición a la API). Si la respuesta es inmediata (caché) o tarda menos de 200 ms, no se muestra para no molestar al usuario.

### `Sidebar` + `NavItem`
Sidebar fija con logo, sección "Catálogo" (rutas globales) y sección "Figuras" (rutas de integrantes generadas dinámicamente desde `teamMembers`). `NavItem` aplica la clase `is-active` con `NavLink`.

### `SkillBarCard` / `SkillBarList`
Barras de progreso animadas con sistema de rareza Funky (Common / Rare / Epic / Legendary) calculado por nivel. Animación CSS con variable `--skill-level`.

### `MemberPage` (Perfiles individuales)
Router dinámico via `useParams`. Renderiza el perfil correspondiente al slug. Cada perfil incluye: barras de habilidad, carrusel de proyectos con controles manuales y dots, tech stack con iconos, redes sociales con hover, toggle "Más sobre mí" y contenido exclusivo por integrante.

### `ExploradorPage`
Filtrado en tiempo real sobre `datos.json` (20 discos). Búsqueda por artista o título (busca inicio de palabra), combinada con selector de género dinámico.

### `ApiPage`
Fetch asíncrono a Rick & Morty API con: caché en `Map`, rate-limiting con intervalo mínimo de 450 ms, reintentos exponenciales ante error 429, paginación Anterior/Siguiente con indicador "Página X de Y" y estado de carga/error.

### `GaleriaPage`
Grid de 12 imágenes con Lightbox implementado vía `createPortal`. Funciones: zoom (+/−/reset/doble clic), navegación interna (anterior/siguiente), cierre con ESC y scroll de rueda del mouse.

### `ArbolPage` + `ComponentTreeDiagram`
Árbol de renderizado en SVG interactivo con zoom (+/− 25%) y scroll horizontal. Refleja la jerarquía real de componentes del `App.jsx`.

---

## Capturas de Pantalla



---

## Enlace al Proyecto Desplegado

> 🔗 https://frontend-tp-2.vercel.app/
---

## Evolución respecto al TP1

| Aspecto | TP1 | TP2 |
|---|---|---|
| Tecnología | HTML + CSS + JS vanilla | React + Vite + React Router |
| Navegación | Multi-página con `<a href>` | SPA con React Router + Sidebar fija |
| Estado | DOM manipulation | `useState` / `useEffect` |
| Datos | Hardcodeados en HTML | JSON externo + API externa |
| Reutilización | Copiar/pegar HTML | Componentes reutilizables |
| Tema visual | Paleta pastel, fondo claro | Tema oscuro "collector" con acentos neón |
| Interactividad | Toggle básico | Carrusel, Lightbox, filtros, paginación API |

---

## ✅ Checklist TP2 — Estado actual del proyecto

### Requerimientos Obligatorios de Estructura

| # | Requerimiento | Estado | Notas |
|---|---|---|---|
| **1** | **Sidebar fija estilo Dashboard** | ✅ Cumplido | `Sidebar` fija con logo, menú jerarquizado por secciones, responsive con overlay móvil |
| **1a** | Logo del grupo en sidebar | ✅ Cumplido | `funky-logo.png` con link a Home |
| **1b** | Menú jerarquizado con React Router | ✅ Cumplido | Secciones "Catálogo" y "Figuras" con `NavLink` y clase `is-active` |
| **2** | **Panel central / Dashboard Home** | ✅ Cumplido | `HomePage` con grilla de 4 tarjetas Funko tipo coleccionable |
| **2a** | Nombre y avatar en cada tarjeta | ✅ Cumplido | Nombre, rol y avatar Funko en cada card |
| **2b** | Animaciones de entrada y transiciones | ✅ Cumplido | CSS con `--card-delay` escalonado + animaciones de carga |
| **3** | **Sección individual por integrante** | ✅ Cumplido | 4 perfiles (`/integrantes/:slug`) vía `MemberPage` |
| **3a** | Barras de progreso animadas | ✅ Cumplido | `SkillBarCard` con sistema de rareza y animación CSS |
| **3b** | Carrusel de proyectos (mín. 3) | ✅ Cumplido | Carrusel con Anterior/Siguiente/dots en cada perfil |
| **3c** | Tech Stack con mín. 5 iconos | ✅ Cumplido | 5 iconos Devicons por integrante con efectos visuales |
| **3d** | Social Media con hover avanzado | ✅ Cumplido | Botones con escalado y cambio de color en hover |
| **4** | **Explorador de Datos JSON** | ✅ Cumplido | `ExploradorPage` con `datos.json` de 20 discos musicales |
| **4a** | JSON con 20 objetos | ✅ Cumplido | `data/datos.json` — 20 álbumes con id, título, artista, género, año |
| **4b** | Búsqueda por texto en tiempo real | ✅ Cumplido | Búsqueda por artista o título (inicio de palabra) |
| **4c** | Filtrado dinámico en React | ✅ Cumplido | Selector de género generado dinámicamente desde los datos |
| **5** | **Módulo API Externa** | ✅ Cumplido | `ApiPage` — Rick & Morty API con fetch asíncrono |
| **5a** | Manejo de estado de carga | ✅ Cumplido | Estado `loading` con mensaje visual |
| **5b** | Manejo de estado de error | ✅ Cumplido | Panel de error con botón "Reintentar" |
| **5c** | Paginación Anterior/Siguiente | ✅ Cumplido | Botones habilitados/deshabilitados + indicador "Página X de Y" |
| **6** | **Galería de Imágenes Interactiva** | ✅ Cumplido | `GaleriaPage` — 12 imágenes con grid y Lightbox |
| **6a** | Grid de imágenes | ✅ Cumplido | Grid responsivo con thumbnails |
| **6b** | Lightbox con zoom | ✅ Cumplido | Zoom +/−/reset, scroll de rueda, doble clic |
| **6c** | Navegación interna en Lightbox | ✅ Cumplido | Botones Anterior/Siguiente dentro del lightbox |
| **6d** | Cierre con tecla ESC | ✅ Cumplido | `keydown` listener con cleanup correcto |
| **7** | **Sección Bitácora** | ✅ Cumplido | `BitacoraPage` — timeline de 4 fases del proyecto |
| **7a** | Documentación de roles y flujo de trabajo 
| **7b** | Justificación de migración HTML → React | ✅ Cumplido | Fase "De lo estático a React" con comparativa técnica |
| **8** | **Árbol de Renderizado** | ✅ Cumplido | `ArbolPage` con SVG interactivo + zoom y scroll |
| **8a** | Componente raíz visible (App) | ✅ Cumplido | Nodo `App` como raíz del diagrama SVG |
| **8b** | Componentes de nivel superior (Layout, Sidebar) | ✅ Cumplido | `DashboardLayout`, `Sidebar`, `main.app-main` mapeados |
| **8c** | Desglose de componentes hijos | ✅ Cumplido | Cards, páginas, perfiles y componentes compartidos incluidos |

### Requerimientos de Documentación

| # | Requerimiento | Estado | Notas |
|---|---|---|---|
| **R1** | Título del proyecto con link al deploy | ✅
| **R2** | Descripción del objetivo | ✅ Cumplido | Incluida arriba |
| **R3** | Integrantes con links a GitHub | ✅ Cumplido | Tabla completa |
| **R4** | Tecnologías utilizadas | ✅ Cumplido | Lista detallada |
| **R5** | Estructura de archivos | ✅ Cumplido | Árbol de carpetas |
| **R6** | Guía de estilos (colores, tipografías, iconos) | ✅ Cumplido | Tabla de variables CSS + links |
| **R8** | Link al deploy | ✅ | Completar tras publicar en Vercel |
| **R9** | Evolución del proyecto | ✅ Cumplido | Tabla comparativa TP1 → TP2 |

---

### Uso de inteligencia artificial

#### Equipo — [Cursor](https://cursor.com/)

Se utilizó **Cursor** como entorno de desarrollo con asistente de IA integrado.

| Concepto | Detalle |
|---|---|
| **Herramienta** | Cursor (IDE con agente de código) |
| **Modelo de IA** | **Claude Opus 4.8** de Anthropic — en Cursor se selecciona como agente de razonamiento (*Claude Opus 4.8 Thinking*; identificador interno `claude-opus-4-8-thinking-high`) |
| **Uso en el proyecto** | Loader bajo demanda, corrección visual y mejoras de interfaz en portada y perfiles |

Tareas concretas en las que colaboró el agente:

- **Loader bajo demanda (`AppLoader`):** pantalla completa con logo Funky y **"Cargando"** solo cuando hay una carga real (API, etc.), no en cada cambio de ruta.
- **Avatares Funko del equipo:** ajustar la visualización de las imágenes en portada y páginas individuales para que no se vean cortadas (contenedor, `object-fit`, padding y rutas en `public/img/`).
- **Bitácora:** reemplazar párrafos por una **línea de tiempo** vertical con hitos del TP1 al TP2.
- **Portada principal:** animaciones en el **logo** y en el texto **"Funky Collector Team"** (degradado y efectos) para destacar el hero de la home.

#### Equipo — ChatGPT

Se utilizó **ChatGPT** como asistente para tareas puntuales y destrabar problemas técnicos durante la migración de HTML/CSS/JS vanilla a una arquitectura por componentes en React.

Por ejemplo:

- Transformar la estructura original en componentes reutilizables y repartir responsabilidades entre `App`, las páginas y los bloques de contenido;
- Adaptar la navegación con **React Router**, incluidas rutas dinámicas para los perfiles de integrantes;
- Revisar errores de implementación (assets, clases CSS, renderizado);
- Proponer ajustes de CSS cuando el layout se rompía en pantallas chicas o había que unificar estilos entre portada e internas.
- Crear el **logo del equipo Funky Collector Team** (`src/assets/funky-logo.png`) combinando los avatares Funko de cada integrante en una sola pieza gráfica para sidebar, loader y portada.

### Imágenes y avatares

Los avatares Funko de los integrantes fueron generados con **ChatGPT** a partir de fotos de referencia y luego integrados manualmente al proyecto como imágenes locales en `public/img/`.

También se utilizó **ChatGPT** para diseñar el **logo de Funky Collector Team**, uniendo en una misma composición los cuatro avatares Funko del equipo. Ese archivo se guardó como `funky-logo.png` y se usa en el sidebar, el loader de entrada y el hero de la portada principal.

**Prompt base para los avatares:**

> "Generá cuatro avatares estilo Funko Pop, tomando como referencia las siguientes imágenes, con estética colorida, fondo simple y rasgos diferenciados. Cada personaje debe verse como una figura de colección y vestimenta inspirada en un perfil tecnológico"

**Prompt literal para el logo del equipo:**

> "hacer un logo estilo funkos que quede bien con estos colores y estilos de este sitio web"

Se adjuntó una **captura de la portada** del proyecto como referencia visual para que la IA respetara la paleta y la estética del sitio (tema oscuro, acentos neón y estilo coleccionable).


---

_README — TP2 · Proyecto Frontend React · Grupo 6 · 2026_
