<template>
  <div class="nuevojuego">
    <template>
      <card>
      <b-container><br>
         <b-alert show variant="danger" dismissible v-model="alert">Complete todos los campos</b-alert>
         <b-row align-h="center">
         <input type="text" v-model="titulo" placeholder="Titulo"/><br>
         <input type="text" v-model="pregunta" placeholder="Pregunta"/><br>
         <input type="text" v-model="respuesta" placeholder="Respuesta"/><br>
          </b-row><br>
         <b-row align-h="center">
         <b-form-radio-group v-model="estado">
         <b-form-radio value=true>Verdadero</b-form-radio>
         <b-form-radio value=false>Falso</b-form-radio>
         </b-form-radio-group>
          </b-row><br>
           <b-row align-h="around">
          <b-button variant="success" v-on:click="agregar" class="btn btn-round">Aceptar</b-button>
          <b-button to="/juegos" variant="danger" class="btn btn-round">Cancelar</b-button>
         </b-row><br>
    </b-container>
    </card>
    </template>
  </div>
</template>

<script>
import firebase from 'firebase'
import { ChartCard } from '@/utils/index'
import router from '@/router'
const juegosRef = firebase.database().ref('juego')
const coleccionjuegosRef = firebase.database().ref('coleccion_juego')
export default {
  components: {
    ChartCard
  },
  data () {
    return {
      titulo: '',
      pregunta: '',
      respuesta: '',
      estado: true,
      alert: false
    }
  },
  name: 'nuevojuego',
  methods: {
    agregar (e) {
      if (this.titulo !== '' && this.pregunta !== '' && this.respuesta !== '') {
        juegosRef.push({titulo: this.titulo, pregunta: this.pregunta, respuesta: this.respuesta, estado: this.estado}).then(
          (snapshot) => {
            const key = snapshot.key
            coleccionjuegosRef.once('value').then(function (snap) {
              snap.forEach(function (childSnap) {
                coleccionjuegosRef.child(childSnap.key).child(key).set(true)
              })
            })
          })
        router.push('/juegos')
      } else {
        this.alert = true
        e.preventDefault()
      }
    }
  }
}
</script>
<style scoped>
    .card {
    /* background-color: #b7f258 83bf21;
      background-color: #b7f258; */
    }
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
