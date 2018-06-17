<template>
  <div class="receta">
    <template>
      <card>
      <b-container>
        <b-row align-h="center">
          <b-button variant="success" to="/recetas/nuevo">Nueva Receta</b-button>
        </b-row>
          <br>
          <div slot="raw-content" class="table-responsive">
            <b-table fixed bordered hover :items="recetas" :fields="fields" head-variant="light">
         <span slot="acciones" slot-scope="data">
          <b-button variant="warning" :to="{ name: 'Editar Receta', params: { id: data.item['.key'] } }"><span class="ti-pencil"></span></b-button>
          <b-button v-on:click="eliminar(data.item['.key'])" variant="danger"><span class="ti-trash"></span></b-button>
         </span>
      </b-table>
          </div>
    </b-container>
        </card>
    </template>
  </div>
</template>

<script>
import firebase from 'firebase'
let recetasRef = firebase.database().ref('receta')
let coleccionRecetaRef = firebase.database().ref('coleccion_receta')
/* juegosRef.once('value').then(function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      console.log('id: ' + childSnapshot.key)
      //console.log(childSnapshot.val())
      var juego = childSnapshot.val()
      juego.key = childSnapshot.key
      this.datos.push(juego)
    })
    console.log(datos) */
export default {
  data () {
    return {
      fields: [{ key: 'titulo', sortable: true }, 'descripcion', 'acciones']
    }
  },
  name: 'receta',
  methods: {
    eliminar (uid) {
      recetasRef.child(uid).once('value').then(function (snap) {
        let imagenRef = firebase.storage().refFromURL(snap.val().imagen)
        imagenRef.delete()
      })
      recetasRef.child(uid).remove()
      coleccionRecetaRef.once('value').then(function (snap) {
        snap.forEach(function (childSnap) {
          coleccionRecetaRef.child(childSnap.key).child(uid).remove()
        })
      })
    }
  },
  firebase: {
    recetas: recetasRef
  }
}
</script>
