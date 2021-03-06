import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import router from '@/router'
Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    appTitle: 'NutriPlay',
    user: null,
    error: null,
    loading: false,
    admin: null
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setAdmin (state, payload) {
      state.admin = payload
    }
  },
  actions: {
    userSignUp ({commit}, payload) {
      commit('setLoading', true)
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password).then(
        (user) => {
          commit('setUser', user.user.uid)
          commit('setLoading', false)
          router.push('/inicio')
        })
        .catch(error => {
          commit('setError', error.message)
          commit('setLoading', false)
        })
    },
    userSignIn ({commit}, payload) {
      commit('setLoading', true)
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password).then(
        user => {
          commit('setUser', user.user.uid)
          commit('setLoading', false)
          commit('setError', null)
          firebase.database().ref('usuario').child(user.user.uid).once('value').then(
            function (snapshot) {
              var estado = snapshot.hasChild('rol')
              commit('setAdmin', estado)
              if (estado) {
                router.push('/usuarios')
              } else {
                router.push('/paginaprincipal')
              }
            })
        })
        .catch(error => {
          commit('setError', error.message)
          commit('setLoading', false)
        })
    },
    userSignInProvider ({commit}, payload) {
      commit('setLoading', true)
      var provider
      if (payload === 'facebook') {
        provider = new firebase.auth.FacebookAuthProvider()
      } else {
        provider = new firebase.auth.GoogleAuthProvider()
      }
      firebase.auth().signInWithPopup(provider).then(
        function (result) {
          var user = result.user
          var email
          commit('setUser', user.uid)
          commit('setLoading', false)
          commit('setError', null)
          user.providerData.forEach(function (profile) {
            email = profile.email
          })
          var isNew = result.additionalUserInfo.isNewUser
          if (isNew) {
            firebase.database().ref('usuario').child(user.uid).set({nombre: user.displayName, exp: 0, monedas: 0, avatar: user.photoURL != null ? user.photoURL : null, correo: email != null ? email : null})
            firebase.database().ref('receta').once('value').then(function (snap) {
              snap.forEach(function (childSnap) {
                var recetaid = childSnap.key
                firebase.database().ref('coleccion_receta').child(user.uid).child(recetaid).set(false)
              })
            })
            firebase.database().ref('modulo').once('value').then(function (snap) {
              snap.forEach(function (childSnap) {
                var moduloid = childSnap.key
                firebase.database().ref('coleccion_modulo').child(user.uid).child(moduloid).set(false)
              })
            })
            firebase.database().ref('juego').once('value').then(function (snap) {
              snap.forEach(function (childSnap) {
                var juegoid = childSnap.key
                firebase.database().ref('coleccion_juego').child(user.uid).child(juegoid).set(true)
              })
            })
            firebase.database().ref('alimento').once('value').then(function (snap) {
              snap.forEach(function (childSnap) {
                var alimentoid = childSnap.key
                firebase.database().ref('coleccion_alimento').child(user.uid).child(alimentoid).set(false)
              })
            })
          }
          // router.push('/inicio')
          // Redirección
          firebase.database().ref('usuario').child(user.uid).once('value').then(
            function (snapshot) {
              var estado = snapshot.hasChild('rol')
              commit('setAdmin', estado)
              if (estado) {
                router.push('/usuarios')
              } else {
                router.push('/paginaprincipal')
              }
            })
        }).catch(function (error) {
        commit('setError', error.message)
        commit('setLoading', false)
      })
    },
    autoSignIn ({commit}, payload) {
      commit('setUser', payload.uid)
      firebase.database().ref('usuario').child(payload.uid).once('value').then(
        function (snapshot) {
          var estado = snapshot.hasChild('rol')
          commit('setAdmin', estado)
        })
    },
    userSignOut ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
      commit('setAdmin', false)
      router.push('/login')
    }
  },
  getters: {
    isAuth (state) {
      return state.user !== null && state.user !== undefined
    }
  }
})
