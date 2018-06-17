<template>
  <div class="registro">
    <b-alert show variant="danger" dismissible v-model="alert">{{ error }}</b-alert>
    <h3>Crear una nueva cuenta</h3>
    <input type="text" v-model="email" placeholder="Email" required><br>
    <input type="password" v-model="password" placeholder="Password" required><br>
    <button v-on:click="signup">Registrarse</button>
    <span>Regresar al <router-link to="/login">Inicio</router-link>.</span>
  </div>
</template>

<script>
// import firebase from 'firebase'

export default {
  name: 'registro',
  data () {
    return {
      email: '',
      password: '',
      alert: false
    }
  },
  computed: {
    error () {
      return this.$store.state.error
    },
    loading () {
      return this.$store.state.loading
    }
  },
  methods: {
    /* signup: function () {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
        (user) => {
          this.$router.replace('inicio')
        },
        (err) => {
          alert(':( ' + err.message)
        }
      )
    } */
    signup () {
      this.$store.dispatch('userSignUp', {email: this.email, password: this.password})
    }
  },
  watch: {
    error (value) {
      if (value) {
        this.alert = true
      }
    },
    alert (value) {
      if (!value) {
        this.$store.commit('setError', null)
      }
    }
  }
}
</script>
<style scoped>
    .registro{
    margin-top: 40px;
    }
    input {
    margin: 10px 0;
    width: 20%;
    padding: 15px;
    }
    button {
    margin-top: 20px;
    width: 10%;
    cursor: pointer;
    }
    span {
    display: block;
    margin-top: 20px;
    font-size: 11px;
    }
</style>
