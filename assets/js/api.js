export async function obtenerListaPokemon(offset, cantidadPokemonPorPagina) {
  try {
    const offsetMin = 0;
    const offsetMax = 1024;
    if (offset < offsetMin || offset > offsetMax) return null;
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

      // habilidades para el modal
      const abilities = [];
      for (const a of pokemon.abilities) {
        abilities.push(a.ability.name);
      }
      // stats para el modal
      const stats = {};
      for (const s of pokemon.stats) {
        stats[s.stat.name] = s.base_stat;
      }
      return {
        id: pokemon.id,
        nombre: pokemon.name,
        img: pokemon.sprites.other["official-artwork"].front_default,
        tipo1: pokemon.types[0].type.name,
        tipo2,
        // modal
        stats,
        abilities,
      };
    });
    const datosPokemons = await Promise.all(promesasPokemons);
    return datosPokemons;
  } catch (error) {
    console.error(`Error al obtener los datos de los Pokémon: ${error}`);
  }
}
