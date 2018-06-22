import Vue from 'vue'
import Router from 'vue-router'
// import DashboardLayout from '@/layout/dashboard/DashboardLayout.vue'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Registro from '@/components/Registro'
import NotFound from '@/components/NotFound'
import Modulo from '@/components/Modulo'
import Receta from '@/components/Receta'
import Juego from '@/components/Juego'
import Alimento from '@/components/Alimento'
import Tip from '@/components/Tip'
import NuevoAlimento from '@/components/NuevoAlimento'
import NuevaReceta from '@/components/NuevaReceta'
import NuevoModulo from '@/components/NuevoModulo'
import NuevoJuego from '@/components/NuevoJuego'
import NuevoTip from '@/components/NuevoTip'
import EditarReceta from '@/components/EditarReceta'
import EditarJuego from '@/components/EditarJuego'
import EditarAlimento from '@/components/EditarAlimento'
import EditarTip from '@/components/EditarTip'
import UsuarioHome from '@/components/UsuarioHome'
import UsuarioPerfil from '@/components/UsuarioPerfil'
import firebase from 'firebase'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [ /* {
    path: '/',
    component: DashboardLayout,
    redirect: '/dashboard',
    children: [ */
    {
      path: '/bienvenido',
      name: 'Bienvenido',
      component: HelloWorld
    },
    {
      path: '/usuarios',
      name: 'Usuarios',
      component: Home,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/registro',
      name: 'Registro',
      component: Registro
    },
    {
      path: '/modulos',
      name: 'Modulos',
      component: Modulo,
      meta: { requiresAuth: true }
    },
    {
      path: '/alimentos',
      name: 'Alimentos',
      component: Alimento,
      meta: { requiresAuth: true }
    },
    {
      path: '/alimentos/nuevo',
      name: 'Nuevo Alimento',
      component: NuevoAlimento,
      meta: { requiresAuth: true }
    },
    {
      path: '/alimentos/:id',
      name: 'Editar Alimento',
      component: EditarAlimento,
      meta: { requiresAuth: true }
    },
    {
      path: '/tips',
      name: 'Tips',
      component: Tip,
      meta: { requiresAuth: true }
    },
    {
      path: '/tips/nuevo',
      name: 'Nuevo Tip',
      component: NuevoTip,
      meta: { requiresAuth: true }
    },
    {
      path: '/tips/:id',
      name: 'Editar Tip',
      component: EditarTip,
      meta: { requiresAuth: true }
    },
    {
      path: '/recetas',
      name: 'Recetas',
      component: Receta,
      meta: { requiresAuth: true }
    },
    {
      path: '/recetas/nuevo',
      name: 'Nueva Receta',
      component: NuevaReceta,
      meta: { requiresAuth: true }
    },
    {
      path: '/recetas/:id',
      name: 'Editar Receta',
      component: EditarReceta,
      meta: { requiresAuth: true }
    },
    {
      path: '/modulos/nuevo',
      name: 'NuevoModulo',
      component: NuevoModulo,
      meta: { requiresAuth: true }
    },
    {
      path: '/juegos',
      name: 'Juegos',
      component: Juego,
      meta: { requiresAuth: true }
    },
    {
      path: '/juegos/nuevo',
      name: 'Nuevo Juego',
      component: NuevoJuego,
      meta: { requiresAuth: true }
    },
    {
      path: '/juegos/:id',
      name: 'Editar Juego',
      component: EditarJuego,
      meta: { requiresAuth: true }
    },
    {
      path: '/paginaprincipal',
      name: 'UsuarioHome',
      component: UsuarioHome,
      meta: { requiresAuth: true }
    },
    {
      path: '/perfil',
      name: 'Mi Perfil',
      component: UsuarioPerfil,
      meta: { requiresAuth: true }
    },
    {
      path: '*',
      component: NotFound
    }
  ]
  // }]
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isAuth = firebase.auth().currentUser
  if (requiresAuth && !isAuth) {
    next('/login')
  } else {
    next()
  }
})

export default router
