<template>
  <div class="modulo">
    <template>
      <card>
      <b-container>
            <p id="tituloverde">Módulos</p>
          <b-row align-h="center">
        <b-button variant="success" to="/modulos/nuevo">Nuevo Módulo</b-button></b-row><br>
      <b-table fixed bordered hover :items="modulos" :fields="fields" head-variant="dark" class="text-center" id="verde">
        <span slot="acciones" slot-scope="data">
          <b-button variant="warning" :to="{ name: 'Editar Modulo', params: { id: data.item['.key'] } }"><span class="ti-pencil"></span></b-button>
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
let modulosRef = firebase.database().ref('modulo')
let coleccionModuloRef = firebase.database().ref('coleccion_modulo')
export default {
  data () {
    return {
      fields: [{ key: 'titulo', sortable: true }, 'descripcion', 'acciones']
    }
  },
  name: 'modulo',
  methods: {
    eliminar (uid) {
      this.$swal({
        title: '¿Estás seguro?',
        text: 'El módulo se eliminará de la lista.',
        icon: 'warning',
        buttons: {
          cancel: {
            text: 'Cancelar',
            value: false,
            visible: true,
            className: 'btncancelar',
            closeModal: true
          },
          confirm: {
            text: 'Aceptar',
            value: true,
            visible: true,
            className: 'btnaceptar',
            closeModal: true
          }
        }
      }).then((result) => {
        if (result) {
          modulosRef.child(uid).once('value').then(function (snap) {
            firebase.storage().refFromURL(snap.val().picture).delete()
            firebase.storage().refFromURL(snap.val().contenido.imagen1).delete()
            firebase.storage().refFromURL(snap.val().contenido.imagen2).delete()
          })
          modulosRef.child(uid).remove()
          coleccionModuloRef.once('value').then(function (snap) {
            snap.forEach(function (childSnap) {
              coleccionModuloRef.child(childSnap.key).child(uid).remove()
            })
          })
          this.$swal('El registro se eliminó.')
        }
      })
    }
  },
  firebase: {
    modulos: modulosRef
  }
}
</script>
<style type="text/css">
  .btnaceptar {
    background-color: #229863;
    border-color: #229863;
  }
  .btncancelar {
    background-color: #bd2130;
    border-color: #b21f2d;
    color: #ffffff;
  }
</style>
