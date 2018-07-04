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
import EditarModulo from '@/components/EditarModulo'
import UsuarioHome from '@/components/UsuarioHome'
import UsuarioPerfil from '@/components/UsuarioPerfil'
import UsuarioReceta from '@/components/UsuarioReceta'
import UsuarioRecetaDetalle from '@/components/UsuarioRecetaDetalle'
import UsuarioRanking from '@/components/UsuarioRanking'
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
      path: '/',
      name: 'Bienvenido',
      component: HelloWorld
    },
    {
      path: '/usuarios',
      name: 'Usuarios',
      component: Home,
      meta: { requiresAuth: true, requiresAdmin: true }
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
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/alimentos',
      name: 'Alimentos',
      component: Alimento,
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/alimentos/nuevo',
      name: 'Nuevo Alimento',
      component: NuevoAlimento,
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/alimentos/:id',
      name: 'Editar Alimento',
      component: EditarAlimento,
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/tips',
      name: 'Tips',
      component: Tip,
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/tips/nuevo',
      name: 'Nuevo Tip',
      component: NuevoTip,
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/tips/:id',
      name: 'Editar Tip',
      component: EditarTip,
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/recetas',
      name: 'Recetas',
      component: Receta,
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/recetas/nuevo',
      name: 'Nueva Receta',
      component: NuevaReceta,
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/recetas/:id',
      name: 'Editar Receta',
      component: EditarReceta,
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/modulos/nuevo',
      name: 'NuevoModulo',
      component: NuevoModulo,
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/modulos/:id',
      name: 'Editar Modulo',
      component: EditarModulo,
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/juegos',
      name: 'Juegos',
      component: Juego,
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/juegos/nuevo',
      name: 'Nuevo Juego',
      component: NuevoJuego,
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/juegos/:id',
      name: 'Editar Juego',
      component: EditarJuego,
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/paginaprincipal',
      name: 'Inicio',
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
      path: '/misrecetas',
      name: 'Tienda de Recetas',
      component: UsuarioReceta,
      meta: { requiresAuth: true }
    },
    {
      path: '/recetadetalle/:id',
      name: 'Ver Receta',
      component: UsuarioRecetaDetalle,
      meta: { requiresAuth: true }
    },
    {
      path: '/ranking',
      name: 'Ranking',
      component: UsuarioRanking,
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
  const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin)
  const isAuth = firebase.auth().currentUser
  var isAdmin = false
  if (isAuth) {
    isAdmin = firebase.auth().currentUser.email === 'nutriplayadmin@gmail.com'
  }
  if (requiresAuth && !isAuth) {
    next('/login')
  } else if (requiresAuth && requiresAdmin && !isAdmin) {
    next('/paginaprincipal')
  } else {
    next()
  }
})
export default router
