<template>
  <div class="editartip">
    <template>
      <card>
      <b-container><br>
         <b-row align-h="center">
         <input type="text" v-model="mensaje" placeholder="Mensaje"><br>
        </b-row><br>
           <b-row align-h="around">
          <b-button to="/tips" variant="danger" class="btn btn-round">Cancelar</b-button>
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
var tipRef = firebase.database().ref('tip')
export default {
  data () {
    return {
      id: 0,
      mensaje: ''
    }
  },
  name: 'editartip',
  created () {
    this.id = this.$route.params.id
    const tipdata = tipRef.child(this.id)
    tipdata.on('value', snapshot => {
      var tip = snapshot.val()
      this.mensaje = tip.mensaje
    })
  },
  methods: {
    actualizar () {
      var uid = this.id
      tipRef.child(uid).update({mensaje: this.mensaje})
      router.push('/tips')
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
