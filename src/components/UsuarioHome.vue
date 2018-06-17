<template>
  <div class="usuhome">
    <template>
      <b-container>
       <h2>Bienvenid@ {{ usuario.nombre }}</h2><br>
    </b-container>
    <div class="row">
      <div class="col-md-6 col-xl-4" v-for="stats in statsCards" :key="stats.title">
        <stats-card>
          <div class="icon-big text-center" :class="`icon-${stats.type}`" slot="header">
            <img :src="`${stats.img}`"/>
          </div>
          <div class="numbers" slot="content">
            <p>{{stats.title}}</p>
            {{stats.value}}
          </div>
        </stats-card>
      </div>
    </div>
    </template>
  </div>
</template>

<script>
import firebase from 'firebase'
import { StatsCard } from '@/utils/index'
export default {
  components: {
    StatsCard
  },
  data () {
    return {
      usuario: [],
      statsCards: [
        {
          type: 'warning',
          img: 'https://firebasestorage.googleapis.com/v0/b/nutriplayapp.appspot.com/o/componentes%2Fmoneda.png?alt=media&token=42b55de0-d216-4435-baa4-bd81aa3981b9',
          title: 'Monedas',
          value: '',
          footerText: 'Updated now',
          footerIcon: 'ti-reload'
        },
        {
          type: 'success',
          img: 'https://firebasestorage.googleapis.com/v0/b/nutriplayapp.appspot.com/o/componentes%2Fmodulo.png?alt=media&token=a667b784-b209-4975-bfa1-900402f6a9b6',
          title: 'Experiencia',
          value: '',
          footerText: 'Last day',
          footerIcon: 'ti-calendar'
        },
        {
          type: 'danger',
          img: 'https://firebasestorage.googleapis.com/v0/b/nutriplayapp.appspot.com/o/componentes%2Fmoneda.png?alt=media&token=42b55de0-d216-4435-baa4-bd81aa3981b9',
          title: 'Medallas',
          value: '',
          footerText: 'In the last hour',
          footerIcon: 'ti-timer'
        }
      ]
    }
  },
  name: 'usuhome',
  methods: {
  },
  computed: {
  },
  created () {
    const userId = firebase.auth().currentUser.uid
    const usuarioRef = firebase.database().ref('usuario').child(userId)
    usuarioRef.on('value', snapshot => {
      this.usuario = snapshot.val()
      this.statsCards[0].value = snapshot.val().monedas
      this.statsCards[1].value = snapshot.val().exp
    }, errorObject => {
      console.log('Error: ' + errorObject.code)
    })
  }
}
</script>
<style scoped>
  img {
    width: 70px;
    height: 70px;
    padding: 5px;
  }
</style>
