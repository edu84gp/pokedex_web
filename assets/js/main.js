import { obtenerListaPokemon, obtenerDatosPokemons } from "./api.js";
import {
  insertarHTML,
  actualizarBotones,
  cantidadPokemonPorPagina,
  actualizarPaginacion,
  generarModal,
  cerrarModal,
} from "./ui.js";

let paginaInicial = 1;
const btnNext = document.getElementById("btn-next");
const btnPrev = document.getElementById("btn-prev");
const menuPaginacion = document.getElementById("menu-paginacion");
let datosPokemons = [];

async function cargarPagina(paginaActual) {
  try {
    let offset = (paginaActual - 1) * cantidadPokemonPorPagina;
    // obtener lista de pokémons y sus datos
    const lista = await obtenerListaPokemon(offset, cantidadPokemonPorPagina);

    datosPokemons = await obtenerDatosPokemons(lista);
    const insertarPokemons = await insertarHTML(datosPokemons);

    actualizarBotones(paginaActual);
  } catch (error) {
    console.log("Error al cargar la página: ", error);
  }
}

actualizarPaginacion(paginaInicial);
await cargarPagina(paginaInicial);

btnNext.addEventListener("click", () => {
  paginaInicial++;
  actualizarPaginacion(paginaInicial);
  cargarPagina(paginaInicial);
});

btnPrev.addEventListener("click", () => {
  paginaInicial--;
  actualizarPaginacion(paginaInicial);
  cargarPagina(paginaInicial);
});

menuPaginacion.addEventListener("click", (event) => {
  if (event.target.classList.contains("btn-pagina")) {
    paginaInicial = Number(event.target.dataset.pagina);
    actualizarPaginacion(paginaInicial);
    cargarPagina(paginaInicial);
  }
});

// modal
const main = document.querySelector("main");
const modalOverlay = document.getElementById("modal-overlay");
const modalCard = document.getElementById("modal-card");

main.addEventListener("click", (event) => {
  const tarjeta = event.target.closest(".carta-pokemon");
  if (!tarjeta) return;
  const tarjetaID = Number(tarjeta.dataset.id);
  const pokemon = datosPokemons.find((pokemon) => pokemon.id === tarjetaID);

  generarModal(pokemon);
});
// cerrar modal
modalOverlay.addEventListener("click", (event)=>{
if (event.target === modalOverlay) cerrarModal()})
  
