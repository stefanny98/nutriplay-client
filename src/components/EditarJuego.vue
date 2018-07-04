<template>
  <div class="editarjuego">
    <template>
      <card>
      <b-container>
        <p id="tituloverde">Editar Juego</p>
         <b-row align-h="center">
         <input type="text" v-model="titulo" placeholder="Titulo"><br>
         <input type="text" v-model="pregunta" placeholder="Descripcion"><br>
         <input type="text" v-model="respuesta" placeholder="Ingredientes"><br>
         </b-row>
         <b-row align-h="center">
         <b-form-radio-group v-model="estado">
         <b-form-radio :value="true">Verdadero</b-form-radio>
         <b-form-radio :value="false">Falso</b-form-radio>
         </b-form-radio-group>
        </b-row>
          <br>
          <b-row align-h="center">
           <b-form-radio-group v-model="tipo">
           <b-form-radio value="facil">Fácil</b-form-radio>
           <b-form-radio value="intermedio">Intermedio</b-form-radio>
           <b-form-radio value="dificil">Difícil</b-form-radio>
           </b-form-radio-group>
          </b-row><br>
           <b-row align-h="around">
          <b-button to="/juegos" variant="danger" class="btn btn-round">Cancelar</b-button>
          <b-button variant="success" class="btn btn-round" v-on:click="actualizar">Actualizar</b-button>
        </b-row><br>
    </b-container>
      </card>
    </template>
  </div>
</template>

<script>
import firebase from 'firebase'
import router from '@/router'
var juegosRef = firebase.database().ref('juego')
export default {
  data () {
    return {
      titulo: '',
      pregunta: '',
      respuesta: '',
      estado: '',
      tipo: ''
    }
  },
  name: 'editarjuego',
  created () {
    this.id = this.$route.params.id
    const juegodata = juegosRef.child(this.id)
    juegodata.on('value', snapshot => {
      var juego = snapshot.val()
      this.titulo = juego.titulo
      this.pregunta = juego.pregunta
      this.respuesta = juego.respuesta
      this.estado = juego.estado
      this.tipo = juego.tipo
    })
  },
  methods: {
    actualizar () {
      if (this.titulo === '' || this.pregunta === '' || this.respuesta === '' || this.tipo === '') {
        this.$swal('Campos Incompletos', 'Complete todos los campos.', 'warning')
        return false
      }
      var uid = this.id
      var puntos
      if (this.tipo === 'facil') {
        puntos = 10
      } else if (this.tipo === 'intermedio') {
        puntos = 20
      } else {
        puntos = 40
      }
      juegosRef.child(uid).update({titulo: this.titulo, pregunta: this.pregunta, respuesta: this.respuesta, estado: this.estado, tipo: this.tipo, puntos: puntos})
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
