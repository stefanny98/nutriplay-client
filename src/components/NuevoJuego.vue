<template>
  <div class="nuevojuego">
    <template>
      <card>
      <b-container>
        <p id="tituloverde">Nuevo Juego</p>
         <b-row align-h="center">
         <input type="text" v-model="titulo" placeholder="Titulo"/><br>
         <input type="text" v-model="pregunta" placeholder="Pregunta"/><br>
         <input type="text" v-model="respuesta" placeholder="Respuesta"/><br>
          </b-row><br>
         <b-row align-h="center">
         <b-form-radio-group v-model="estado">
         <b-form-radio :value="true">Verdadero</b-form-radio>
         <b-form-radio :value="false">Falso</b-form-radio>
         </b-form-radio-group>
          </b-row><br>
          <b-row align-h="center">
          <h6>Dificultad</h6>
          </b-row>
          <b-row align-h="center">
           <b-form-radio-group v-model="tipo">
           <b-form-radio value="facil">Fácil</b-form-radio>
           <b-form-radio value="intermedio">Intermedio</b-form-radio>
           <b-form-radio value="dificil">Difícil</b-form-radio>
           </b-form-radio-group>
          </b-row><br>
           <b-row align-h="around">
          <b-button to="/juegos" variant="danger" class="btn btn-round">Cancelar</b-button>
          <b-button variant="success" v-on:click="agregar" class="btn btn-round">Aceptar</b-button>
         </b-row><br>
    </b-container>
    </card>
    </template>
  </div>
</template>

<script>
import firebase from 'firebase'
import router from '@/router'
const juegosRef = firebase.database().ref('juego')
const coleccionjuegosRef = firebase.database().ref('coleccion_juego')
export default {
  components: {
  },
  data () {
    return {
      titulo: '',
      pregunta: '',
      respuesta: '',
      estado: true,
      tipo: 'facil'
    }
  },
  name: 'nuevojuego',
  methods: {
    agregar (e) {
      if (this.titulo === '' || this.pregunta === '' || this.respuesta === '') {
        this.$swal('Campos Incompletos', 'Complete todos los campos.', 'warning')
        return false
      }
      var puntos
      if (this.tipo === 'facil') {
        puntos = 10
      } else if (this.tipo === 'intermedio') {
        puntos = 20
      } else {
        puntos = 40
      }
      juegosRef.push({titulo: this.titulo, pregunta: this.pregunta, respuesta: this.respuesta, estado: this.estado, tipo: this.tipo, puntos: puntos}).then(
        (snapshot) => {
          const key = snapshot.key
          coleccionjuegosRef.once('value').then(function (snap) {
            snap.forEach(function (childSnap) {
              coleccionjuegosRef.child(childSnap.key).child(key).set(true)
            })
          })
        })
      router.push('/juegos')
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
