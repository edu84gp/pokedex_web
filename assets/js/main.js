import { obtenerListaPokemon, obtenerDatosPokemons } from "./api.js";


console.log(await obtenerDatosPokemons(await obtenerListaPokemon(0)))