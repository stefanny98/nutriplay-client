<template>
  <div class="alimento">
    <template>
      <card>
      <b-container>
          <b-row align-h="center">
        <b-button variant="success" to="/alimentos/nuevo">Nuevo alimento</b-button></b-row><br>
      <b-table fixed bordered hover :items="alimentos" :fields="fields" head-variant="dark" class="text-center">
        <span slot="acciones" slot-scope="data">
          <b-button variant="warning" :to="{ name: 'Editar Alimento', params: { id: data.item['.key'] } }"><span class="ti-pencil"></span></b-button>
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
let alimentosRef = firebase.database().ref('alimento')
export default {
  data () {
    return {
      fields: [{ key: 'mensaje', sortable: true }, 'acciones']
    }
  },
  name: 'alimento',
  methods: {
    eliminar (uid) {
      this.$swal({
        title: '¿Estás seguro?',
        text: 'El alimento se eliminará de la lista.',
        icon: 'warning',
        buttons: {
          cancel: {text: 'Cancelar', value: false, visible: true, className: 'btncancelar', closeModal: true},
          confirm: {text: 'Aceptar', value: true, visible: true, className: 'btnaceptar', closeModal: true}
        }
      }).then((result) => {
        if (result) {
          alimentosRef.child(uid).remove()
          this.$swal('El registro se eliminó.')
        }
      })
    }
  },
  firebase: {
    alimentos: alimentosRef
  }
}
</script>
<style scoped>
</style>
