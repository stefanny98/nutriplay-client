<template>
  <div class="modulo">
    <template>
      <card>
      <b-container>
          <b-row align-h="center">
        <b-button variant="success" to="/modulos/nuevo">Nuevo Modulo</b-button></b-row><br>
      <b-table fixed bordered hover :items="modulos" :fields="fields" head-variant="light"></b-table>
    </b-container>
      </card>
    </template>
  </div>
</template>

<script>
import firebase from 'firebase'
let modulosRef = firebase.database().ref('modulo')
export default {
  data () {
    return {
      fields: [{ key: 'titulo', sortable: true }, 'descripcion']
    }
  },
  name: 'modulo',
  methods: {},
  firebase: {
    modulos: modulosRef
  }
}
</script>
