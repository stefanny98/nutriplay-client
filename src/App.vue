<template>
  <div :class="{'nav-open': $sidebar.showSidebar}">
  <div id='app' class='wrapper'>
  <!--  <b-navbar toggleable='md' type='dark' variant='info'>

  <b-navbar-toggle target='nav_collapse'></b-navbar-toggle>

  <b-navbar-brand>{{ appTitle }}</b-navbar-brand>

  <b-collapse is-nav id='nav_collapse'>

    <b-navbar-nav>
      <div v-for='item in menuItems'>
      <b-nav-item :to='item.path'>
     {{ item.title }}
    </b-nav-item>
  </div>
  <b-nav-item v-if='isAuth' @click='signout'>Salir</b-nav-item>
    </b-navbar-nav>
  </b-collapse>
</b-navbar>
    <router-view/>
  </div>  -->
  <side-bar>
      <template slot='links'>
        <li class="nav-item" v-for="route in menuItems">
    <router-link :to="route.path" class="nav-link" active-class="active">
        {{ route.title }}
    </router-link>
</li>
     <!--   <template v-for='item in menuItems'>
     <li class="nav-item">  <a class="nav-link" :to='item.path' :name='item.title'></a></li>
       <sidebar-link :to='item.path' :name='item.title' :icon='item.icon'/>
      </template> -->
      <b-container><br>
        <b-row align-h="around">
        <button v-if='isAuth' @click='signout' type="button" class="btn btn-info">Salir</button>
      </b-row>
      </b-container>
      </template>
      <mobile-menu>
      </mobile-menu>
    </side-bar>
    <div class='main-panel'>
      <top-navbar></top-navbar>
       <dashboard-content @click.native="toggleSidebar">
      </dashboard-content>
      <content-footer></content-footer>
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
import schedule from 'node-schedule'
console.log('scheduuule')
schedule.scheduleJob('48 14 * * *', () => {
  console.log('hellooo world')
})
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
      /* if (this.isAuth) {
        console.log(this.isAdmin)
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
            {title: 'Perfil', path: '/perfil', icon: 'ti-user'}
          ]
        } */
      if (this.isAuth && this.isAdmin) {
        console.log('Administrador')
        return [
          {title: 'Usuarios', path: '/usuarios', icon: 'ti-user'},
          {title: 'Recetas', path: '/recetas', icon: 'ti-notepad'},
          {title: 'Juegos', path: '/juegos', icon: 'ti-face-smile'},
          {title: 'Alimentos', path: '/alimentos', icon: 'ti-bag'},
          {title: 'Modulos', path: '/modulos', icon: 'ti-bookmark-alt'},
          {title: 'Tips', path: '/tips', icon: 'ti-check-box'}
        ]
      } else if (this.isAuth && !this.isAdmin) {
        console.log('Usuarios')
        return [
          {title: 'Inicio', path: '/paginaprincipal', icon: 'ti-home'},
          {title: 'Perfil', path: '/perfil', icon: 'ti-user'}
        ]
      } else if (!this.isAuth) {
        console.log('No autorizado')
        return [
          {title: 'Bienvenido', path: '/bienvenido', icon: 'ti-user'},
          {title: 'Login', path: '/login', icon: 'ti-user'},
          {title: 'Registro', path: '/registro', icon: 'ti-user'}
        ]
      } else {
        return [ ]
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
</style>
