<template>
  <div class="usuperfil">
    <template>
    <div class="row">
      <div class="col-xl-4 col-lg-5 col-md-6">
        <card class="card-user">
      <div slot="image">
        <img :src="usuario.avatar" alt="...">
      </div>
      <div><br><br>
        <div class="author"><br><br>
          <h3 class="title">{{ usuario.nombre }}
            <br>
              <small>{{ usuario.correo }}</small>
          </h3>
        </div>
        <p class="description text-center">
        </p>
      </div>
  </card>
      </div>
      <div class="col-xl-8 col-lg-7 col-md-6">
        <card class="card">
        <p class="title">Actualizar Perfil</p>
        <b-container>
        <div class="row">
          <div class="col 12">
             <input type="text"
                      label="Nombre"
                      placeholder="Nombre"
                      v-model="usuario.nombre"/>
          </div>
        </div><br>
      <b-row align-h="center">
        <div class="row">
          <div class="col-md-6">
            <button @click='actualizar' class="btn btn-success" round>
            Guardar Cambios
            </button>
          </div>
        </div>
      </b-row>
    </b-container>
        </card>
      </div>
    </div>
    </template>
  </div>
</template>

<script>
import firebase from 'firebase'
const usuarioRef = firebase.database().ref('usuario')
export default {
  data () {
    return {
      usuario: []
    }
  },
  name: 'usuperfil',
  methods: {
    actualizar () {
      const userId = firebase.auth().currentUser.uid
      usuarioRef.child(userId).update({nombre: this.usuario.nombre})
    }
  },
  computed: {
  },
  created () {
    const userId = firebase.auth().currentUser.uid
    usuarioRef.child(userId).on('value', snapshot => {
      this.usuario = snapshot.val()
    }, errorObject => {
      console.log('Error: ' + errorObject.code)
    })
  }
}
</script>
<style scoped>
p.title {
  text-align:center;
  font-size:2em;
  margin:20px 0 20px 0;
  font-family:Galada;
}
</style>
