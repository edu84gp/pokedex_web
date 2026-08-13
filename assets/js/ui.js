const header = document.querySelector("header");
const imgPokeball =
  "https://imgs.search.brave.com/7Ah9iH1Gqr4hB_TGWOD96bmyJBNIwIxdkim8_YXn9S8/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy8z/LzM5L1Bva2ViYWxs/LlBORz9fPTIwMDcx/MTI4MjMyMzQx";
const main = document.querySelector("main");
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");
const menuPaginacion = document.getElementById("menu-paginacion");
const footer = document.querySelector("footer");

export let cantidadPokemonPorPagina = 30;
let cantidadTotalPokemons = 1025;

export async function insertarHTML(datosPokemons) {
  try {
    const pokemonInicial = datosPokemons[0].id;
    const pokemonFinal = datosPokemons[datosPokemons.length - 1].id;
    // Insertar HTML en el header
    header.innerHTML = `<div class="pokeball"><img src="${imgPokeball}" alt="pokeball"></div>
    <h1>POKÉDEX</h1>
    <p class="mostrando">Mostrando Pokémon del ${pokemonInicial} al ${pokemonFinal}</p>`;

    // Limpiar e insertar el GRID de pokémons
    main.innerHTML = `
           <section id="grid-pokemons" class="grid-5 gap-3">
    </section>`;

    
    // añadir tarjetas al grid
    const gridPokemons = document.getElementById("grid-pokemons");
    for (const pokemon of datosPokemons) {
      const tipo1 = pokemon.tipo1;
      const id = String(pokemon.id).padStart(4, "0");
      const tipo2 = pokemon.tipo2;
      // html de las tarjetas
      const htmlTarjeta = `<div class="carta-pokemon ${tipo1}">
      <div class="id-pokemon"><span class="caja bg-green">#${id}</span></div>
<div class="imagen-pokemon"><img src="${pokemon.img}"></div>
<div class="nombre-pokemon">${pokemon.nombre}</div>
<div class="tipos-pokemon gap-6">
<div class="caja ${tipo1}">${pokemon.tipo1}</div>`

// Según si hay tipo 2 o no, finalizamos el html de una u otra manera
      let htmlTipo2 = ""
      tipo2
        ? (htmlTipo2= `<div class="caja ${tipo2}">${tipo2}</div></div></div>`)
        : (htmlTipo2= `</div></div>`);

        gridPokemons.innerHTML += `${htmlTarjeta} ${htmlTipo2}`;
    }
  } catch (error) {
    console.error(
      `Se ha producido un error al insertar el código HTML: ${error}`,
    );
  }
}

const totalPaginas = Math.ceil(
  cantidadTotalPokemons / cantidadPokemonPorPagina,
);

// Visibilizar o invisibilizar los botones del menú de navegación según la página en la que nos encontremos
export function actualizarBotones(paginaActual) {
  try {
    if (paginaActual <= 1) {
      btnPrev.classList = "invisible";
    } else if (paginaActual >= totalPaginas) {
      btnNext.classList = "invisible";
    } else {
      btnNext.classList = "visible";
      btnPrev.classList = "visible";
    }
  } catch (error) {
    console.error("Error al insertar el menú de paginación, error: ", error);
  }
  menuPaginacion.innerHTML;
}

// actualizacion del menu de paginación 
export function actualizarPaginacion(paginaActual) {
  try {
    let htmlContenido = "";

    for (
      let numeroPagina = paginaActual - 5;
      numeroPagina <= paginaActual;
      numeroPagina++
    ) {
      if (paginaActual === 1) {
        htmlContenido = "";
      } else if (numeroPagina === paginaActual) {
        htmlContenido += " &#8230; Página actual &#8230; ";
      } else if (numeroPagina >= 1) {
        htmlContenido += `<button class="btn-pagina" data-pagina="${numeroPagina}"> ${numeroPagina} </button>`;
      }
    }

    for (
      let numeroPagina = paginaActual + 1;
      numeroPagina <= paginaActual + 5;
      numeroPagina++
    ) {
      if (numeroPagina <= totalPaginas) {
        htmlContenido += `<button class="btn-pagina" data-pagina="${numeroPagina}"> ${numeroPagina} </button>`;
      }
    }
    menuPaginacion.innerHTML = htmlContenido;
  } catch (error) {
    console.error(
      "Se ha producido un error al actualizar el menú de paginación: ",
      error,
    );
  }
}
