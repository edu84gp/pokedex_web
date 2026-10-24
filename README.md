<div align="center">

# ⚡ POKÉDEX WEB ⚡

### Explora los 1025 Pokémon con una experiencia retro-moderna

_«Atrapa» datos en tiempo real desde la PokéAPI con paginación fluida, tarjetas interactivas y ficha detallada de cada Pokémon._

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![PokéAPI](https://img.shields.io/badge/PokéAPI-FF1F1F?style=for-the-badge&logo=pokemon&logoColor=white)
![Responsive](https://img.shields.io/badge/Responsive-090D1A?style=for-the-badge&logo=csswizardry&logoColor=FFDE00)
![No Dependencies](https://img.shields.io/badge/Zero_Dependencies-8899BB?style=for-the-badge&logo=npm&logoColor=white)

[Ver Demo](https://edu84gp.github.io/pokedex_web/) · [Características](#-características) · [Tecnologías](#️-tecnologías) · [Instalación](#-instalación-y-uso)

</div>

---

## 📖 ¿Qué es esta app?

**Pokédex Web** es una aplicación front-end que recrea la clásica Pokédex en el navegador. Consume la API pública **[PokéAPI](https://pokeapi.co/)** para mostrar los **1025 Pokémon** en un grid paginado de tarjetas coleccionables.

Al hacer clic en cualquier tarjeta se abre un **modal de detalle** con sus estadísticas base (_HP, Ataque, Defensa, Ataque/Defensa Especial, Velocidad_), habilidades y tipos, todo ello con una estética **retro-gaming** (tipografía _Press Start 2P_) combinada con un diseño moderno oscuro, animaciones suaves y código de color por tipo.

> Ideal para fans de Pokémon, para practicar consumo de APIs REST con JavaScript vanilla y como pieza de portfolio de desarrollo Front-End.

---

## ✨ Características

| Funcionalidad                | Descripción                                                                                                                          |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| 🗂️ **Grid paginado**         | 30 Pokémon por página, 35 páginas. Navegación con anterior / siguiente + salto directo a ±5 páginas.                                 |
| 🔢 **Contador de rango**     | Cabecera dinámica: _«Mostrando Pokémon del X al Y»_.                                                                                 |
| 🃏 **Tarjetas interactivas** | Nº formateado (`#0001`), artwork oficial, nombre y tipos. Efecto _shine_, zoom y glow al hover.                                      |
| 🎨 **Color por tipo**        | 19 tipos (fire, water, electric, dragon…) con su color oficial aplicado a tarjeta, modal y badges. Soporta doble tipo.               |
| 🔍 **Modal de detalle**      | Ficha completa: artwork grande con animación flotante, stats en grid bicolor, lista de habilidades. Cierre por botón ✕ o clic fuera. |
| ⚡ **Carga paralela**        | Peticiones en paralelo con `Promise.all()` para traer los 30 detalles de cada página sin bloqueos.                                   |
| 📱 **100% Responsive**       | Grid adaptativo 5 → 4 → 3 → 2 → 1 columnas. Modal a 2 columnas en desktop y apilado con scroll en móvil.                             |
| 🛡️ **Manejo de errores**     | Validación de `offset` (0–1024) y `try/catch` en capa API y UI.                                                                      |

---

## 🛠️ Tecnologías

**Sin frameworks. Sin dependencias. 100% Vanilla.**

| Tecnología                    | Uso en el proyecto                                                                                                                       |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| **HTML5 semántico**           | Estructura `header / main / nav / footer`, modal accesible.                                                                              |
| **CSS3 moderno**              | Grid + Flexbox, variables CSS, animaciones `@keyframes` (`shine`, `modal-rise-in`, flotación), `backdrop-filter: blur()`, Media Queries. |
| **JavaScript ES6+ (Módulos)** | `import / export`, `async/await`, `fetch`, `Promise.all()`, delegación de eventos, renderizado dinámico del DOM.                         |
| **PokéAPI REST**              | Endpoints `GET /pokemon?limit=&offset=` + detalle por URL. Artwork `official-artwork`.                                                   |
| **Google Fonts**              | `Press Start 2P` (títulos retro) + `Nunito` (legibilidad en datos).                                                                      |

### 🧠 Arquitectura limpia (separación de responsabilidades)

```text
pokedex_web/
├── index.html              # Shell + paginación + overlay del modal
├── README.md
└── assets/
    ├── css/
    │   ├── style.css       # Tema global, grid, tarjetas, paginación, responsive
    │   └── modal.css       # Overlay, ficha detalle, stats, animaciones
    ├── js/
        ├── api.js          # Capa de datos: fetch a PokéAPI, normalización
        ├── ui.js           # Capa de vista: render grid, paginación, modal
        └── main.js         # Orquestador: estado de página + eventos
    └── favicon.svg     # Icono del sitio (Poké Ball en SVG)
```

- `api.js` → solo habla con la red y devuelve objetos limpios `{ id, nombre, img, tipo1, tipo2, stats, abilities }`.
- `ui.js` → solo toca el DOM. Exporta `insertarHTML()`, `actualizarPaginacion()`, `generarModal()` / `cerrarModal()`.
- `main.js` → gestiona el estado (`paginaInicial`) y conecta ambas capas.

---

## 🚀 Instalación y uso

No necesita build ni `npm install`. Solo un servidor estático local (los ES Modules no funcionan con `file://`).

**1. Clona el repositorio:**

```bash
git clone https://github.com/edu84gp/pokedex_web.git
cd pokedex_web
```

**2. Sirve el proyecto (elige una opción):**

```bash
# Opción A — Python
python -m http.server 5500

# Opción B — Node
npx serve .

# Opción C — VS Code
# Clic derecho en index.html → "Open with Live Server"
```

**3. Abre en el navegador:**

```
http://localhost:5500
```

### 🕹️ Cómo probarlo

1. Navega con **Página anterior / siguiente** o salta directamente desde el menú numérico.
2. Pasa el ratón sobre una tarjeta para ver el efecto holográfico.
3. Haz **clic en cualquier Pokémon** para abrir su ficha (stats + habilidades).
4. Cierra con la **✕** o haciendo clic fuera del modal.
5. Reduce el ancho del navegador para ver el responsive.

---

## 🔄 Cómo funciona (flujo de datos)

```text
Usuario cambia de página
        ↓
main.js calcula offset = (pagina - 1) * 30
        ↓
api.js → GET pokeapi.co/api/v2/pokemon?limit=30&offset=X → lista de 30 URLs
        ↓
api.js → 30× fetch en paralelo (Promise.all) → normaliza datos
        ↓
ui.js → renderiza header + grid + badges de tipo + paginación
        ↓
Click en tarjeta → busca en memoria (datosPokemons.find by id) → genera modal
```

---

## 🎨 Diseño UI/UX

- **Tema oscuro espacial** (`#090D1A`) con acentos amarillo Pokémon (`#FFDE00`) y rojo (`#EE1515`).
- Tipografía dual: pixel-art para titulares, sans-serif gruesa para datos.
- Tarjetas con degradado metálico animado + borde y sombra que reaccionan al hover.
- Modal dividido: izquierda visual (fondo según tipo principal) + derecha datos sobre fondo oscuro.
- Stats con código de color individual (HP rojo, ATK naranja, DEF amarillo…).

---

## 💼 Por qué destaca este proyecto

> Si eres reclutador/a o cliente, esto es lo que demuestra:

- ✅ Consumo real de **API REST externa** con paginación y transformación de datos.
- ✅ JavaScript moderno sin frameworks: módulos, asincronía, `Promise.all`, delegación de eventos.
- ✅ **Código organizado** en capas (API / UI / controlador), fácil de mantener y escalar.
- ✅ CSS avanzado desde cero: Grid, Flex, animaciones, responsive multi-breakpoint, sin Bootstrap/Tailwind.
- ✅ Atención al detalle visual y a la **experiencia de usuario** (estados hover, transiciones, modal fluido).
- ✅ Gestión de errores y casos borde (offsets inválidos, Pokémon sin segundo tipo, fallos de red).

---

## 🗺️ Roadmap / Mejoras futuras

- [ ] 🔎 Buscador por nombre / Nº + filtro por tipo.
- [ ] ⭐ Favoritos con `localStorage`.
- [ ] 📊 Barras visuales de stats y comparador de Pokémon.
- [ ] 🔊 Cry (sonido) del Pokémon vía API.
- [ ] 🌙 Skeleton loaders durante la carga.
- [ ] 🧪 Tests con Vitest + despliegue en GitHub Pages / Netlify.

_¿Tienes una idea o quieres esta app adaptada a tu negocio? ¡Hablemos!_

---

## 👨‍💻 Autor

Desarrollado con ❤️ por **Eduardo García** — _Full-Stack Developer_

- 🐙 GitHub: [@edu84gp](https://github.com/edu84gp)
- 💼 LinkedIn: [edu84gp](https://www.linkedin.com/in/edu84gp/)
- 💼 Proyecto: `pokedex_web` — pieza de portfolio Front-End (HTML · CSS · JS + APIs REST)

> Abierto a prácticas, junior roles y proyectos freelance. Si te ha gustado esta Pokédex, revisa mis otros repos o contáctame por GitHub o LinkedIn.

---

## 📄 Licencia y créditos

- Código bajo licencia **MIT** (ver `LICENSE`) con fines educativos y de portfolio.
- Datos e imágenes © **PokéAPI / Pokémon — Nintendo / Creatures Inc. / GAME FREAK inc.** Este proyecto no está afiliado ni respaldado por Nintendo.
- Fuentes: _Press Start 2P_ y _Nunito_ (Google Fonts, SIL Open Font License).

<div align="center">

**Gotta catch 'em all! ⚡**

_Si te gusta, deja una ⭐ en el repo — ¡gracias por pasarte!_

</div>
