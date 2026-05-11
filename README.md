# Grupo 6 — Proyecto Frontend TP1

> 🚀 **Deploy:** https://frontend-tp-1.vercel.app/

---

## Descripción del Proyecto

Este trabajo práctico corresponde a la materia Frontend de la Tecnicatura Superior en Desarrollo de Software. El objetivo es construir un sitio web estático que funcione como presentación grupal del equipo, donde cada integrante cuenta con una tarjeta personal que muestra su información, habilidades e intereses. El proyecto incluye una portada de acceso, una sección de bitácora que documenta el proceso de desarrollo, y páginas individuales para cada integrante con interactividad implementada en JavaScript. Todo el sitio fue desarrollado con HTML semántico, CSS con diseño responsivo y JavaScript vanilla.

---

## Integrantes

| Nombre | GitHub |
|---|---|
| Sebastián Vitcop | github.com/Sebasvitcop |
| Sebastián Matulionis | https://github.com/smatulionis |
| Melody Amaro | https://github.com/melodyamaro/ |
| Lucrecia Vigo | https://github.com/LucreLucre |

---

## Tecnologías Utilizadas

- **HTML5** — estructura semántica de todas las páginas
- **CSS3** — estilos, diseño responsivo con media queries, variables CSS y animaciones
- **JavaScript (ES5/vanilla)** — interactividad en portada y páginas individuales
- **Google Fonts** — tipografías DM Sans y Fraunces
- **Git / GitHub** — control de versiones y repositorio del proyecto
- **Vercel** — plataforma de deploy y publicación

---

## Estructura de Archivos

```
/
├── index.html              ← Portada principal del sitio
├── bitacora.html           ← Sección bitácora del proceso
├── README.md               ← Este archivo
│
├── css/
│   ├── styles.css          ← Estilos globales (portada y bitácora)
│   ├── sebastianv.css      ← Estilos tarjeta Sebastián Vitcop
│   ├── sebastian.css      ← Estilos tarjeta Sebastián Matulionis
│   ├── melody.css          ← Estilos tarjeta Melody Amaro
│   └── lucrecia.css      ← Estilos tarjeta Lucrecia Vigo
│
├── js/
│   ├── script.js           ← JS global de la portada
│   ├── sebastianv.js       ← JS tarjeta Sebastián Vitcop
│   ├── sebastian.js       ← JS tarjeta Sebastián Matulionis
│   ├── melody.js          ← JS tarjeta Melody Amaro
│   └── lucrecia.js         ← JS tarjeta Lucrecia Vigo
│
├── img/
│   ├── fotoSebasV.png      ← Avatar Sebastián Vitcop
│   ├── avatar_sebastian.png← Avatar Sebastián Matulionis
│   ├── melody-avatar.png   ← Avatar Melody Amaro
│   └── avatar_lucrecia.png ← Avatar Lucrecia Vigo
│
└── integrantes/
    ├── sebastianv.html     ← Tarjeta Sebastián Vitcop
    ├── sebastian.html      ← Tarjeta Sebastián Matulionis
    ├── melody.html         ← Tarjeta Melody Amaro
    └── lucrecia.html       ← Tarjeta Lucrecia Vigo
```

---

## Guía de Estilos

### Paleta de Colores

El sitio utiliza una paleta compartida entre todas las páginas:

| Uso | Color | Hex |
|---|---|---|
| Fondo degradado (inicio) | Verde menta | `#c5f5e8` |
| Fondo degradado (medio) | Azul cielo | `#dceef9` |
| Acento azul | Jordy Blue | `#9ac4f8` |
| Acento verde | Aquamarine | `#99edcc` |
| Acento naranja | Durazno | `#ffc09f` |
| Texto principal | Café oscuro | `#534541` |
| Texto secundario | Café medio | `#6e4a42` |
| Superficie / fondo tarjeta | Blanco | `#ffffff` |
| Superficie tintada | Verde pálido | `#eef8f5` |

### Tipografías

- **Títulos y nombres:** [Fraunces](https://fonts.google.com/specimen/Fraunces) — serif display, peso 600
- **Cuerpo y UI:** [DM Sans](https://fonts.google.com/specimen/DM+Sans) — sans-serif, pesos 400 / 600 / 700

```
https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,600;0,9..40,700&family=Fraunces:opsz,wght@9..144,600&display=swap
```

### Iconografía y Avatares

No se utiliza ninguna librería de iconos externa. Las imágenes de perfil de cada integrante son **avatares generados con IA** para preservar la privacidad, en lugar de fotos reales.

---

## JavaScript — Funciones Dinámicas

### Portada (`index.html` + `js/script.js`)

**Función:** Mostrar/ocultar mensaje del equipo

En la portada hay un botón "Ver mensaje del equipo" que permite mostrar u ocultar un mensaje breve del equipo. Al activarlo, el contenido aparece dentro de un panel accesible y el botón actualiza `aria-expanded` y su texto según el estado. Además, la página aplica una clase en el `body` para modificar el fondo cuando el mensaje está visible, reforzando la interacción visual.

---

### Sebastián Vitcop (`integrantes/sebastianv.html` + `js/sebastianv.js`)

**Función:** Toggle "Mostrar más sobre mí"

Al hacer clic en el botón **"Mostrar más sobre mí"**, se despliega una sección oculta con información adicional del integrante (hobbies, bandas favoritas y objetivos). Al hacer clic nuevamente, la sección se oculta y el texto del botón cambia a **"Ocultar detalles"**. La función también actualiza el atributo `aria-expanded` para accesibilidad.

```javascript
btnToggle.addEventListener("click", function () {
  var isHidden = extra.hasAttribute("hidden");
  if (isHidden) {
    extra.removeAttribute("hidden");
    btnToggle.textContent = labelLess;
  } else {
    extra.setAttribute("hidden", "hidden");
    btnToggle.textContent = labelMore;
  }
});
```
---

### Sebastián Matulionis (`integrantes/sebastian.html` + `js/sebastian.js`)

**Función:** Toggle "Mostrar más sobre mí" y cambio de tema

Al hacer clic en el botón **"Mostrar más sobre mí"**, se despliega la información adicional de la tarjeta personal. También se activa una clase visual en la página para cambiar el tema y darle más destaque a la tarjeta. Al volver a hacer clic, la sección se oculta nuevamente y el estilo vuelve a su estado original.

---

### Melody Amaro (`integrantes/melody.html` + `js/melody.js`)

**Función:** Toggle "Mostrar más sobre mí" + cambio de tema

Al hacer clic en el botón **"Mostrar más sobre mí"**, se despliega/oculta la sección **"Detalles extra"**. Además, al mostrar el contenido extra se aplica un **cambio de estilo** en la página alternando una clase de tema en el `body` (para evidenciar interactividad visual). El botón actualiza `aria-expanded` para accesibilidad.

---

### Lucrecia Vigo (`integrantes/lucrecia.html` + `js/lucrecia.js`)
**Función:** Toggle "Mostrar más sobre mí" adaptada de la realizada por mis compañeros.

**Función:** Recomendador por humor.
Muestra 4 opciones de estado de ánimo (aventurero, reflexivo, melancólico y feliz) y, al seleccionar uno, despliega un área en la que sugiere una película, un disco musical y una actividad para realizar, relacionándolos con el humor elegido.
<img width="1143" height="595" alt="image" src="https://github.com/user-attachments/assets/0a243ca0-3080-45e3-800d-141f78d406ae" />


---

## Enlace al Proyecto Desplegado

> 🔗 https://frontend-tp-1.vercel.app/

---

## Uso de Inteligencia Artificial

### Herramientas utilizadas

| Herramienta | Uso |
|---|---|
| **Claude (Anthropic)** | Asistencia en código CSS, debugging y estructura HTML — Sebastián Vitcop |
| **Cursor** | Asistencia en JavaScript (toggle + cambio de tema) y ajustes de contenido — Melody Amaro |
| **Claude (Sonnet 4.6)** | Asistencia en interacción JavaScript - Lucrecia Vigo|
| **ChatGPT** | Apoyo para revisar ideas, proponer mejoras de redacción y resolver dudas técnicas específicas durante el desarrollo — Sebastián Matulionis |

### Uso en Contenido y Código

**Sebastián Vitcop** utilizó Claude como asistente técnico para resolver problemas puntuales durante el desarrollo: ajuste de estilos CSS para lograr la foto circular en la tarjeta del índice, corrección de conflictos con `git stash` y `git pull --rebase`, y consultas sobre cómo aplicar la paleta de colores compartida del equipo a su tarjeta individual. El código y las decisiones de diseño fueron tomadas por el integrante; la IA actuó como guía para resolver dudas específicas.

**Melody Amaro** utilizó Cursor como apoyo para implementar la interactividad de su tarjeta: mostrar/ocultar la sección de detalles (“Más sobre mí”) con actualización de `aria-expanded` y aplicar un cambio de estilo alternando una clase de tema en el `body`. También se utilizó para revisar estructura HTML/CSS y coherencia visual con la portada.

**Lucrecia Vigo** utilizó Claude (Sonnet 4.6) para crear interactividad js en su tarjeta personal. La misma sugiere una película, un album musical y una actividad según 4 estados de ánimo disponibles para elegir (aventurero, reflexivo, melancólico y feliz). Al seleccionar un estado de ánimo, se despliega un espacio con las sugerencias relacionadas. El código fue generado por la IA, pero integrado a una funcionalidad preexistente por la desarrolladora.

**Sebastián Matulionis** utilizó ChatGPT como apoyo durante el desarrollo para resolver dudas puntuales y ordenar la estructura del HTML. También se usó para consultar ideas de implementación de estilos de CSS y para el desarrollo de la función de Javascript en la sección "Más sobre mí".

### Imágenes y Avatares

**Sebastián Vitcop:** El avatar fue generado a partir de una foto personal propia. El prompt utilizado fue generar una caricatura animada en estilo ilustración a partir de la foto original.

**Melody Amaro:** El avatar se generó con ChatGPT a partir de una foto de referencia para mantener privacidad. Además del estilo ilustrado alineado al resto del equipo, en la composición se incluyeron **elementos visuales relacionados con hobbies e intereses personales** (por ejemplo cine y viajes), para que la imagen refleje mejor quién soy más allá del retrato.

**Lucrecia Vigo** El avatar fue generado a partir de una foto personal y mostrándole los avatares de los compañeros para que copie el estilo. Se usó ChatGPT.

**Sebastián Matulionis:** El avatar se generó con ChatGPT a partir de una foto personal. El prompt pidió un retrato en forma de avatar con contexto de programador.

---

_README — TP1 · Proyecto Frontend · 2026_
_Este archivo será ampliado en TP2 y TP3 con capturas de pantalla, mejoras implementadas y evolución del proyecto._
