<template>
  <div class="alimento">
    <template>
      <card>
      <b-container>
          <b-row align-h="center">
        <b-button variant="success" to="/alimentos/nuevo">Nuevo alimento</b-button></b-row><br>
      <b-table class="myTable" fixed bordered hover :items="alimentos" :fields="fields" head-variant="dark">
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
      alimentosRef.child(uid).remove()
    }
  },
  firebase: {
    alimentos: alimentosRef
  }
}
</script>
<style scoped>
.myTable thead {
   background-color: #08AB06;
}
</style>
