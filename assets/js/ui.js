const header = document.querySelector("header");
const imgPokeball =
  "https://imgs.search.brave.com/7Ah9iH1Gqr4hB_TGWOD96bmyJBNIwIxdkim8_YXn9S8/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy8z/LzM5L1Bva2ViYWxs/LlBORz9fPTIwMDcx/MTI4MjMyMzQx";
const main = document.querySelector("main");
const menuPaginacion = document.getElementById("menu-paginacion");
const footer = document.querySelector("footer");

export async function insertarHTML(datosPokemons, previousPage, nextPage) {
  try {
    const pokemonInicial = datosPokemons[0].id;
    const pokemonFinal = datosPokemons[datosPokemons.length - 1].id;

    header.innerHTML = `<div class="pokeball"><img src="${imgPokeball}" alt="pokeball"></div>
    <h1>POKÉDEX</h1>
    <p class="">Mostrando los Pokémon del ${datosPokemons[0].id} al ${pokemonFinal}</p>`;

    main.innerHTML = `
           <section id="grid-pokemons" class="grid-5">
    </section>`;

    const gridPokemons = document.getElementById("grid-pokemons");

    for (const pokemon of datosPokemons) {
      const tipo1 = pokemon.tipo1;
      const id = String(pokemon.id).padStart(4, "0");

      gridPokemons.innerHTML += `<div class="carta-pokemon tipo-${tipo1}">
      <div class="id-pokemon">#${id}</div>
<div class="imagen-pokemon"><img src="${pokemon.img}"></div>
<div class="nombre-pokemon">${pokemon.nombre}</div>
<div class="tipos-pokemon">
<div class="${tipo1}">${pokemon.tipo1}</div>`;

      if (pokemon.tipo2) {
        const tipo2 = pokemon.tipo2;

        gridPokemons.innerHTML += `
        <div class="${tipo2}">${tipo2}</div>
        </div></div>`;
      } else {
        gridPokemons.innerHTML += `</div></div>`;
      }
    }

    console.log(nextPage)
    previousPage ? menuPaginacion.innerHTML += `<a href="${previousPage}">P&aacute;gina anterior</a>` : null;
    
    nextPage ? menuPaginacion.innerHTML += `<a href="${nextPage}">P&aacute;gina siguiente</a>` : null
    
  } catch (error) {
    console.error(
      `Se ha producido un error al insertar el código HTML: ${error}`,
    );
  }
}
