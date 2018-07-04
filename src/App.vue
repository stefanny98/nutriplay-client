<template>
  <div :class="{'nav-open': $sidebar.showSidebar}">
  <div id='app' class='wrapper'>
  <side-bar>
      <template slot='links'>
        <li class="nav-item" v-for="route in menuItems">
        <router-link :to="route.path" class="nav-link">
          <i :class="route.icon"></i>
           <h5> {{ route.title }} </h5>
        </router-link>
        </li>
      <br>
      <b-container>
        <b-row align-h="around">
        <button v-if='isAuth' @click='signout' type="button" class="btn btn-info">Cerrar Sesión</button>
      </b-row>
      </b-container>
      </template>
      <mobile-menu>
      </mobile-menu>
    </side-bar>
    <div class='main-panel' v-bind:class="{'navlogin': !isAuth}">
      <top-navbar v-if='isAuth'></top-navbar>
       <dashboard-content @click.native="toggleSidebar">
      </dashboard-content>
      <br>
      <content-footer v-if='isAuth'></content-footer>
    </div>
</div>
</div>
</template>
<script>
import TopNavbar from './layout/dashboard/TopNavbar.vue'
import ContentFooter from './layout/dashboard/ContentFooter.vue'
import DashboardContent from './layout/dashboard/Content.vue'
import MobileMenu from './layout/dashboard/MobileMenu'
import firebase from 'firebase'
// import schedule from 'node-schedule'
/*
schedule.scheduleJob('48 14 * * *', () => {
  console.log('probando schedule')
}) */
firebase.initializeApp({
  apiKey: 'AIzaSyBjdHVqfpCeQaNq09nPTCQgev1IR-Kx8i4',
  authDomain: 'nutriplayapp.firebaseapp.com',
  databaseURL: 'https://nutriplayapp.firebaseio.com',
  projectId: 'nutriplayapp',
  storageBucket: 'nutriplayapp.appspot.com',
  messagingSenderId: '824738567319'
})

export default {
  data () {
    return {
      navlogin: false
    }
  },
  components: {
    TopNavbar,
    ContentFooter,
    DashboardContent,
    MobileMenu
  },
  computed: {
    appTitle () {
      return this.$store.state.appTitle
    },
    ruta () {
      return this.$router.history.current.path
    },
    isAuth () {
      return this.$store.getters.isAuth
    },
    isAdmin () {
      return this.$store.state.admin
    },
    menuItems () {
      if (this.isAuth) {
        if (this.isAdmin == null) {
          return [ ]
        } else if (this.isAdmin) {
          return [
            {title: 'Usuarios', path: '/usuarios', icon: 'ti-user'},
            {title: 'Modulos', path: '/modulos', icon: 'ti-bookmark-alt'},
            {title: 'Recetas', path: '/recetas', icon: 'ti-notepad'},
            {title: 'Juegos', path: '/juegos', icon: 'ti-face-smile'},
            {title: 'Alimentos', path: '/alimentos', icon: 'ti-bag'},
            {title: 'Tips', path: '/tips', icon: 'ti-check-box'}
          ]
        } else {
          return [
            {title: 'Inicio', path: '/paginaprincipal', icon: 'ti-home'},
            {title: 'Recetas', path: '/misrecetas', icon: 'ti-notepad'},
            {title: 'Ranking', path: '/ranking', icon: 'ti-star'},
            {title: 'Perfil', path: '/perfil', icon: 'ti-user'}
          ]
        }
      }
    }
  },
  methods: {
    signout () {
      this.$store.dispatch('userSignOut')
    },
    toggleSidebar () {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false)
      }
    }
  }
}
</script>
<style lang="scss">
p#tituloverde {
  text-align:center;
  font-size:3em;
  margin:10px 0 10px 0;
  color:#83bf21;
  font-family:Galada;
}

.table#verde {
  .thead-dark {
    th {
      background-color: #83bf21;
      border-color: #83bf21;
    }
  }
}
div.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.table#naranja {
  .thead-dark {
    th {
      background-color: #FF9800;
      border-color: #FF9800;
    }
  }
}
.main-panel.navlogin {
      position: absolute;
      left: 0;
    }

.main-panel.navlogin {
    width: 100%;
    max-height: 100vh;
    overflow: scroll;
  }
 input {
  font-family: "Roboto", sans-serif;
  outline: 0;
  background: #f2f2f2;
  width: 80%;
  border: 0;
  margin: 0 0 15px;
  padding: 15px;
  box-sizing: border-box;
  font-size: 17px;
  border-radius: 10px;
}
    textarea {
    outline: 0;
    background: #f2f2f2;
    width: 80%;
    border: 0;
    margin: 0 0 15px;
    padding: 15px;
    box-sizing: border-box;
    font-size: 14px;
    border-radius: 10px;
    }
</style>
