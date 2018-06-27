<template>
  <div class="tip">
    <template>
      <card>
      <b-container>
        <p id="tituloverde">Tips</p>
          <b-row align-h="center">
        <b-button variant="success" to="/tips/nuevo">Nuevo tip</b-button></b-row><br>
      <b-table fixed bordered hover :items="tips" :fields="fields" head-variant="dark" class="text-center" id="verde">
        <span slot="acciones" slot-scope="data">
          <b-button variant="warning" :to="{ name: 'Editar Tip', params: { id: data.item['.key'] } }"><span class="ti-pencil"></span></b-button>
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
let tipsRef = firebase.database().ref('tip')
export default {
  data () {
    return {
      fields: [{ key: 'mensaje', sortable: true }, 'acciones']
    }
  },
  name: 'tip',
  methods: {
    eliminar (uid) {
      this.$swal({
        title: '¿Estás seguro?',
        text: 'Este registro se eliminará de la lista.',
        icon: 'warning',
        buttons: {
          cancel: {text: 'Cancelar', value: false, visible: true, className: 'btncancelar', closeModal: true},
          confirm: {text: 'Aceptar', value: true, visible: true, className: 'btnaceptar', closeModal: true}
        }
      }).then((result) => {
        if (result) {
          tipsRef.child(uid).remove()
          this.$swal('El registro se eliminó.')
        }
      })
    }
  },
  firebase: {
    tips: tipsRef
  }
}
</script>
<style scoped>
</style>
