<template>
  <div class="login">
     <card>
    <b-container><br>
    <b-alert show variant="danger" dismissible v-model="alert">{{ error }}</b-alert>  
    <b-row align-h="center">
    <input type="text" v-model="email" placeholder="Email"><br>
    <input type="password" v-model="password" placeholder="Password"><br>
    </b-row><br>
   <b-row align-h="center">
    <b-button v-on:click="login" :disabled="loading" variant="info">Iniciar Sesión</b-button><br>
  </b-row><br>
  <b-row align-h="center">
    <b-button style="background: #3b5998" v-on:click="loginfb">Ingresar con Facebook</b-button><br>
  </b-row><br>
  <b-row align-h="center">
    <b-button v-on:click="loginGoogle" >Ingresar con Google</b-button>
  </b-row><br>
  </b-container>
  </card>
  </div>
</template>

<script>

export default {
  name: 'login',
  data () {
    return {
      email: '',
      password: '',
      alert: false
    }
  },
  methods: {
    login () {
      this.$store.dispatch('userSignIn', {email: this.email, password: this.password})
    },
    loginfb () {
      this.$store.dispatch('userSignInProvider', 'facebook')
    },
    loginGoogle () {
      this.$store.dispatch('userSignInProvider', 'google')
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
</style>
