<template>
  <div class="tip">
    <template>
      <card>
      <b-container>
          <b-row align-h="center">
        <b-button variant="success" to="/tips/nuevo">Nuevo tip</b-button></b-row><br>
      <b-table class="myTable" fixed bordered hover :items="tips" :fields="fields" head-variant="dark">
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
      tipsRef.child(uid).remove()
    }
  },
  firebase: {
    tips: tipsRef
  }
}
</script>
<style scoped>
.myTable thead {
   background-color: #08AB06;
}
</style>
