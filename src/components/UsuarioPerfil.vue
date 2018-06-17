<template>
  <div class="usuperfil">
    <template>
    <div class="row">
      <div class="col-xl-4 col-lg-5 col-md-6">
        <card class="card-user">
      <div slot="image">
        <img :src="usuario.avatar" alt="...">
      </div>
      <div>
        <div class="author">
          <img class="avatar" src="https://firebasestorage.googleapis.com/v0/b/nutriplayapp.appspot.com/o/componentes%2Fmodulo.png?alt=media&token=a667b784-b209-4975-bfa1-900402f6a9b6" alt="...">
          <h4 class="title">{{ usuario.nombre }}
            <br>
            <a href="#">
              <small>{{ usuario.correo }}</small>
            </a>
          </h4>
        </div>
        <p class="description text-center">
          "I like the way you work it
          <br> No diggity
          <br> I wanna bag it up"
        </p>
      </div>
  </card>
      </div>
    </div>
    </template>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  data () {
    return {
      usuario: [],
      imagenP: ''
    }
  },
  name: 'usuperfil',
  methods: {
  },
  computed: {
  },
  created () {
    const userId = firebase.auth().currentUser.uid
    const usuarioRef = firebase.database().ref('usuario').child(userId)
    usuarioRef.on('value', snapshot => {
      this.usuario = snapshot.val()
      this.imagenP = snapshot.val().avatar
    }, errorObject => {
      console.log('Error: ' + errorObject.code)
    })
  }
}
</script>
<style scoped>
</style>
