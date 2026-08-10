const cantidadPokemonPorPagina = 30;
const URL_POKEAPI = `https://pokeapi.co/api/v2/pokemon?limit=${cantidadPokemonPorPagina}&offset=`;

export async function obtenerListaPokemon(offset) {
  if (offset < 0 || offset > 1026) return null;

  try {
    const respuesta = await fetch(`${URL_POKEAPI}${offset}`);

    const datosListaGeneral = await respuesta.json();
    const listaURL = datosListaGeneral.results.map((pokemon) => pokemon.url);
    return {
      previousPageURL: datosListaGeneral.previous,
      nextPageURL: datosListaGeneral.next,
      listaURL: listaURL,
    };
  } catch (error) {
    console.error(
      `Error al obtener el listado desde el Pokémon ${offset + 1}: ${error}`,
    );
  }
}

export async function obtenerDatosPokemons(listadoPokemons) {
  if (!listadoPokemons) return null;

  try {
    const promesasPokemons = listadoPokemons.listaURL.map(async (url) => {
      const respuesta = await fetch(url);
      const pokemon = await respuesta.json();

      const tipo2 = pokemon.types[1] ? pokemon.types[1].type.name : "";

      return {
        id: pokemon.id,
        nombre: pokemon.name,
        img: pokemon.sprites.other["official-artwork"].front_default,
        tipo1: pokemon.types[0].type.name,
        tipo2,
      };
    });

    const datosPokemons = await Promise.all(promesasPokemons);
    return datosPokemons;
  } catch (error) {
    console.error(`Error al obtener los datos de Pokémon: ${error}`);
  }
}
