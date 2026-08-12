
export async function obtenerListaPokemon(offset, cantidadPokemonPorPagina) {
  const offsetMin = 0;
  const offsetMax = 1024;

  if (offset < offsetMin || offset > offsetMax) return null;
  // if (cantidadPokemonPorPagina != Number) return null;

  try {
    const URL_POKEAPI = `https://pokeapi.co/api/v2/pokemon?limit=${cantidadPokemonPorPagina}&offset=${offset}`;
    const respuesta = await fetch(`${URL_POKEAPI}`);

    const datosListaGeneral = await respuesta.json();
    const listaURL = datosListaGeneral.results.map((pokemon) => pokemon.url);
    return listaURL;
  } catch (error) {
    console.error(
      `Error al obtener el listado desde el Pokémon ${offset + 1}: ${error}`,
    );
  }
}

export async function obtenerDatosPokemons(listadoPokemons) {
  try {
    if (!listadoPokemons) return null;
    const promesasPokemons = listadoPokemons.map(async (url) => {
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
    console.error(`Error al obtener los datos de los Pokémon: ${error}`);
  }
}
