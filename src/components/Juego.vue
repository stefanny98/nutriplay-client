<template>
  <div class="juego">
    <template>
      <card>
      <b-container>
         <b-row align-h="center">
        <b-button variant="success" to="/juegos/nuevo">Nuevo Juego</b-button>
      </b-row>
      <br>
     <b-table fixed bordered small hover :items="juegos" :fields="fields" head-variant="light">
        <template slot="estado" slot-scope="data">
        <div v-if="data.item.estado">Verdadero</div>
          <div v-else>Falso</div>
        </template>
        <span slot="acciones" slot-scope="data">
          <b-button variant="warning" :to="{ name: 'Editar Juego', params: { id: data.item['.key'] } }"><span class="ti-pencil"></span></b-button>
          <b-button v-on:click="eliminar(data.item['.key'])" variant="danger"><span class="ti-trash"></span></b-button>
         </span>
      </b-table>
    </b-container>
      </card>
    </template>
  </div>
</template>

<script>
import firebase from 'firebase'
let juegosRef = firebase.database().ref('juego')
let coleccionjuegosRef = firebase.database().ref('coleccion_juego')
export default {
  data () {
    return {
      fields: [{ key: 'titulo', sortable: true }, 'pregunta', {key: 'estado', name: 'estado'}, 'acciones']
    }
  },
  name: 'juego',
  methods: {
    eliminar (uid) {
      juegosRef.child(uid).remove()
      coleccionjuegosRef.once('value').then(function (snap) {
        snap.forEach(function (childSnap) {
          coleccionjuegosRef.child(childSnap.key).child(uid).remove()
        })
      })
    }
  },
  firebase: {
    juegos: juegosRef
  }
}
</script>
