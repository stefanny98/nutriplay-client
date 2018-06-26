<template>
  <div class="home">
    <template>
      <card title="Lista de Usuarios"><br>
      <b-container>
      <b-table fixed bordered hover :items="usuarios" :fields="fields" head-variant="dark" class="text-center">
      </b-table>
    </b-container>
      </card>
    </template>
  </div>
</template>

<script>
import firebase from 'firebase'

var usuariosRef = firebase.database().ref('usuario')
usuariosRef.once('value')
  .then(function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
    })
  })
export default {
  data () {
    return {
      fields: [{ key: 'nombre', sortable: true }, { key: 'monedas', sortable: true }, { key: 'exp', sortable: true }]
    }
  },
  name: 'home',
  methods: {},
  firebase: {
    usuarios: usuariosRef
  }
}
</script>
