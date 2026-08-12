import { obtenerListaPokemon, obtenerDatosPokemons } from "./api.js";
import { insertarHTML } from "./ui.js";

let paginaActual = 1

async function cargarPagina(numeroPagina) {
  try {
    let cantidadPokemonPorPagina = 30;
    let offset = (numeroPagina - 1)*cantidadPokemonPorPagina;
    // obtener lista de pokémons y sus datos
    const lista = await obtenerListaPokemon(offset, cantidadPokemonPorPagina);
    const datosPokemons = await obtenerDatosPokemons(lista);
    console.log(datosPokemons)


    
  } catch (error) {
    console.log("Error al cargar la página: ", error)
  }

}


await cargarPagina(paginaActual)

