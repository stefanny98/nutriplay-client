<template>
  <div class="usuhome">
    <template>
      <b-container>
       <p class="verde">Bienvenido(a) {{ usuario.nombre }}</p><br>
    </b-container>
    <div class="row">
      <div class="col-md-6" v-for="stats in statsCards" :key="stats.title">
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
    <div class="row">
      <div class="col-md-6">
        <card>
        <b-container>
          <p class="verde sub">Tip del día</p>
          <b-row align-h="center">
          <img class="tipimg" src="https://firebasestorage.googleapis.com/v0/b/nutriplayapp.appspot.com/o/avatares%2Fav2.png?alt=media&token=0d611b31-45e4-4e98-b194-143bf5efc166"/>
          </b-row>
           <b-row align-h="center">
          <h5>{{ tip.mensaje }}</h5>
        </b-row>
      </b-container>
        </card>
      </div>
      <div class="col-md-6">
        <card>
        <b-container>
          <p class="verde sub">Alimento del día</p>
          <b-row align-h="center">
          <img class="tipimg" src="https://firebasestorage.googleapis.com/v0/b/nutriplayapp.appspot.com/o/avatares%2Fav5.png?alt=media&token=030f5bb6-7061-49c6-8a3a-c4d71d8d69f9"/>
        </b-row>
        <b-row align-h="center">
          <h5>{{ alimento.mensaje }}</h5>
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
import { StatsCard } from '@/utils/index'
const tipRef = firebase.database().ref('tip').child('1')
const alimentoRef = firebase.database().ref('dato').child('1')
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
          value: ''
        },
        {
          type: 'success',
          img: 'https://firebasestorage.googleapis.com/v0/b/nutriplayapp.appspot.com/o/componentes%2Fmodulo.png?alt=media&token=a667b784-b209-4975-bfa1-900402f6a9b6',
          title: 'Experiencia',
          value: ''
        }
      ],
      tip: '',
      alimento: ''
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
    tipRef.on('value', snapshot => {
      this.tip = snapshot.val()
    })
    alimentoRef.on('value', snapshot => {
      this.alimento = snapshot.val()
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
  .tipimg {
    width: 30%;
    height: 30%;
  }
  .verde {
  text-align:center;
  font-size:3em;
  margin:20px 0 20px 0;
  color:#83bf21;
  font-family:Galada;
}
.verde.sub{
  font-size:2em;
}
</style>
