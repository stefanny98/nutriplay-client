<template>
  <div class="login">
    <div class="login-page">
  <div class="form">
    <form class="login-form">
      <input type="text" v-model="email" placeholder="Email"><br>
      <input type="password" v-model="password" placeholder="Password"><br>
      <b-button v-on:click="login" :disabled="loading" variant="success">Iniciar Sesión</b-button><br><br>
      <b-button style="background: #3b5998" :disabled="loading" v-on:click="loginfb">Ingresar con Facebook</b-button><br><br>
      <b-button v-on:click="loginGoogle" :disabled="loading">Ingresar con Google</b-button>
    </form>
  </div>
</div>
  </div>
</template>

<script>

export default {
  name: 'login',
  data () {
    return {
      email: '',
      password: ''
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
      if (this.$store.state.error) {
        this.$swal('Credenciales incorrectas', 'Ingrese sus credenciales correctamente.', 'warning')
        this.$store.commit('setError', null)
      }
      return this.$store.state.error
    },
    loading () {
      return this.$store.state.loading
    }
  },
  watch: {
    error (value) {
      if (value) {
        this.$swal('Credenciales incorrectas', 'Ingrese sus credenciales correctamente.', 'warning')
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
/*
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
    } */
@import url(https://fonts.googleapis.com/css?family=Roboto:300);
.main-panel.navlogin {
  background-color: #76b852;
}
.login-page {
  width: 360px;
  padding: 5% 0 0;
  margin: auto;
}
.form {
  position: relative;
  z-index: 1;
  background: #FFFFFF;
  max-width: 360px;
  margin: 0 auto 50px;
  padding: 45px;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}
.form input {
  font-family: "Roboto", sans-serif;
  outline: 0;
  background: #f2f2f2;
  width: 100%;
  border: 0;
  margin: 0 0 15px;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
  border-radius: 10px;
}
.form button {
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
  outline: 0;
  width: 100%;
  border: 0;
  padding: 15px;
  color: #FFFFFF;
  font-size: 14px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;
}

.container {
  position: relative;
  z-index: 1;
  max-width: 300px;
  margin: 0 auto;
}
.container:before, .container:after {
  content: "";
  display: block;
  clear: both;
}
.container .info {
  margin: 50px auto;
  text-align: center;
}
.container .info h1 {
  margin: 0 0 15px;
  padding: 0;
  font-size: 36px;
  font-weight: 300;
  color: #1a1a1a;
}
.container .info span {
  color: #4d4d4d;
  font-size: 12px;
}
.container .info span a {
  color: #000000;
  text-decoration: none;
}
.container .info span .fa {
  color: #EF3B3A;
}
body {
  background-color: #76b852; /* fallback for old browsers */
  background: -webkit-linear-gradient(right, #76b852, #8DC26F);
  background: -moz-linear-gradient(right, #76b852, #8DC26F);
  background: -o-linear-gradient(right, #76b852, #8DC26F);
  background: linear-gradient(to left, #76b852, #8DC26F);
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
