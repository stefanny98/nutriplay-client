<template>
  <div class="nuevoalimento">
    <template>
      <card>
        <b-container>
        <p id="tituloverde">Nuevo Dato</p>
        <b-row align-h="center">
         <input type="text" v-model="mensaje" placeholder="Mensaje"><br>
          </b-row><br>
           <b-row align-h="around">
          <b-button to="/alimentos" variant="danger" class="btn btn-round">Cancelar</b-button>
          <b-button variant="success" class="btn btn-round" v-on:click="agregar">Aceptar</b-button>
        </b-row><br>
      </b-container>
    </card>
    </template>
  </div>
</template>

<script>
import firebase from 'firebase'
import router from '@/router'
const alimentoRef = firebase.database().ref('alimento')
export default {
  data () {
    return {
      mensaje: ''
    }
  },
  name: 'nuevoalimento',
  methods: {
    agregar () {
      if (this.mensaje === '') {
        this.$swal('Campos Incompletos', 'Complete todos los campos.', 'warning')
        return false
      }
      alimentoRef.push({mensaje: this.mensaje})
      router.push('/alimentos')
    }
  }
}
</script>
<style scoped>
    input {
    margin: 10px 0;
    width: 60%;
    padding: 15px;
    }
    p {
    margin-top: 40px;
    font-size: 13px;
    }
    p a {
    text-decoration: underline;
    cursor: pointer;
    }
    img.preview {
    width: 200px;
    background-color: white;
    border: 1px solid #DDD;
    padding: 5px;
    }
</style>
