<template>
    <div class="container">
        <div v-if="!ganador">
            <div v-if="tieneIntentos">
                <div class="puntajes">
                    <h1>Puntaje: {{ puntaje }}</h1>
                    <h1>Intento: {{ intento }}</h1>
                </div>
                <div class="imagenes">
                    <img :src=imagen1 alt="No se pudo cargar imagen 1">
                    <p>{{ nombre1 }}</p>
                    <img :src=imagen2 alt="No se pudo cargar imagen 1">
                    <p>{{ nombre2 }}</p>
                    <img :src=imagen3 alt="No se pudo cargar imagen 1">
                    <p>{{ nombre3 }}</p>
                </div>
                <button v-on:click="jugar()">Jugar</button>
            </div>
        </div>
        <div class="perdiste" v-if="!tieneIntentos">
            <h1> Has utilizado tus 5 intentos</h1>
            <h1> El juego ha terminado, intentalo nuevamente</h1>
            <button v-on:click="nuevojuego()">Nuevo Juego</button>
        </div>

        <div class="ganaste" v-if="ganador">
            <h1>Puntaje: {{ puntaje }}</h1>
            <h1> Felicitaciones has ganado un premio de $10.000,00</h1>
            <button v-on:click="nuevojuego()">Nuevo Juego</button>
        </div>

    </div>
</template>

<script>
import { obtenerPokemonfachada } from "../client/PokemonClient.js"
export default {
    data() {
        return {
            pokemon1: null,
            pokemon2: null,
            pokemon3: null,
            respuesta1: null,
            respuesta2: null,
            respuesta3: null,
            imagen1: "https://dummyimage.com/250x250",
            imagen2: "https://dummyimage.com/250x250",
            imagen3: "https://dummyimage.com/250x250",
            nombre1: "xxxxxxxxx",
            nombre2: "xxxxxxxxx",
            nombre3: "xxxxxxxxx",
            puntaje: 0,
            intento: 0,
            tieneIntentos: true,
            ganador: false,
        }
    },
    methods: {
        nuevojuego() {
            this.pokemon1 = null;
            this.pokemon2 = null;
            this.pokemon3 = null;
            this.respuesta1 = null;
            this.respuesta2 = null;
            this.respuesta3 = null;
            this.imagen1 = "https://dummyimage.com/250x250";
            this.imagen2 = "https://dummyimage.com/250x250";
            this.imagen3 = "https://dummyimage.com/250x250";
            this.nombre1 = "xxxxxxxxx";
            this.nombre2 = "xxxxxxxxx";
            this.nombre3 = "xxxxxxxxx";
            this.puntaje = 0;
            this.intento = 0;
            this.tieneIntentos = true;
            this.gandor = false;
        },
        async obtenerPokemon() {
            return await obtenerPokemonfachada()
        },
        async cambiarImagenes() {
            this.imagen1 = this.pokemon1.sprites.front_default;
            this.imagen2 = this.pokemon2.sprites.front_default;
            this.imagen3 = this.pokemon3.sprites.front_default;
        },

        async cambiarNombre() {
            this.nombre1 = this.respuesta1.name;
            this.nombre2 = this.respuesta2.name;
            this.nombre3 = this.respuesta3.name;

        },
        async sumarPuntos() {
            if (this.pokemon1.name === this.respuesta1.name
                && this.pokemon2.name === this.respuesta2.name
                && this.pokemon3.name === this.respuesta3.name
            ) {
                this.puntaje = this.puntaje + 5;
            } else if (
                (this.pokemon1.name === this.respuesta1.name
                    && this.pokemon2.name === this.respuesta2.name
                ) ||
                (this.pokemon1.name === this.respuesta1.name
                    && this.pokemon3.name === this.respuesta3.name)
                ||
                (this.pokemon2.name === this.respuesta2.name
                    && this.pokemon3.name === this.respuesta3.name)
            ) {
                this.puntaje = this.puntaje + 2;
            }
        },
        async jugar() {

            if (this.puntaje > 10) {
                this.gandor = true;
            }
            if (this.intento > 4) {
                this.tieneIntentos = false;
            }

            this.pokemon1 = await this.obtenerPokemon();
            this.pokemon2 = await this.obtenerPokemon();
            this.pokemon3 = await this.obtenerPokemon();
            this.respuesta1 = await this.obtenerPokemon();
            this.respuesta2 = await this.obtenerPokemon();
            this.respuesta3 = await this.obtenerPokemon();
            this.cambiarImagenes();
            this.cambiarNombre();
            this.sumarPuntos();
            this.intento = this.intento + 1;
        },

    },


}
</script>

<style>
.container {
    text-align: center;
}

.imagenes {
    display: flex;

}

button {
    margin: 30px;
    background-color: white;
    margin: 1px;
    padding: 8px 10px;
}

.perdiste {
    color: red;

}

.ganaste {
    color: rgb(4, 253, 241);
}
</style>