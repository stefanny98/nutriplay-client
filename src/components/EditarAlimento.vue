<template>
  <div class="editaralimento">
    <template>
      <card>
      <b-container>
        <p id="tituloverde">Editar Dato</p>
         <b-row align-h="center">
         <input type="text" v-model="mensaje" placeholder="Mensaje"><br>
        </b-row><br>
           <b-row align-h="around">
          <b-button to="/alimentos" variant="danger" class="btn btn-round">Cancelar</b-button>
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
var alimentoRef = firebase.database().ref('alimento')
export default {
  data () {
    return {
      id: 0,
      mensaje: ''
    }
  },
  name: 'editaralimento',
  created () {
    this.id = this.$route.params.id
    const alimentodata = alimentoRef.child(this.id)
    alimentodata.on('value', snapshot => {
      var alimento = snapshot.val()
      this.mensaje = alimento.mensaje
    })
  },
  methods: {
    actualizar () {
      if (this.mensaje === '') {
        this.$swal('Campos Incompletos', 'Complete todos los campos.', 'warning')
        return false
      }
      var uid = this.id
      alimentoRef.child(uid).update({mensaje: this.mensaje})
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
