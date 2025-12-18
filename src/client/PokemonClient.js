import axios from "axios";

const Pokemones = [3];

function obtenerNumero() {
    return Pokemones[Math.floor(Math.random() * Pokemones.length)];
}
const obtenerPokemon = async () => {
    const numero = obtenerNumero();
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon/" + numero).then(r => r.data);
    return response;
}

export async function obtenerPokemonfachada() {
    return await obtenerPokemon();
}
