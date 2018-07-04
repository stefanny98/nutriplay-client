<template>
  <div class="verreceta">
    <template>
      <div class="row">
      <div class="col-xl-4 col-lg-5 col-md-6">
        <card class="card-user">
      <div slot="image">
        <img :src="imageData" alt="...">
      </div><br><br>
      <div><br><br>
        <div class="author">
          <p class="title">{{ titulo }}
          </p><br>
        </div>
        <p class="description text-center">
          {{ descripcion }}
        </p>
      </div>
  </card>
      </div>
      <div class="col-xl-8 col-lg-7 col-md-6">
        <card class="card">
          <p class="title">Ingredientes</p>
        <b-container>
        <div class="row">
          <div class="col 12"><ul v-for="ing in ingredientes">
           <li > {{ ing }} </li>
         </ul>
          </div>
        </div>
      <b-row align-h="center">
        <div class="row">
          <div class="col-md-6">
          </div>
        </div>
      </b-row>
    </b-container>
        </card>
        <card class="card">
          <p class="title">Preparación</p>
        <b-container>
        <div class="row">
          <div class="col 12"><ul v-for="cont in contenido">
           <li > {{ cont }} </li>
         </ul>
          </div>
        </div>
      <b-row align-h="center">
        <div class="row">
          <div class="col-md-6">
          </div>
        </div>
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
let recetasRef = firebase.database().ref('receta')
export default {
  data () {
    return {
      id: 0,
      imageData: '',
      titulo: '',
      descripcion: '',
      ingredientes: [],
      contenido: []
    }
  },
  name: 'verreceta',
  methods: {
  },
  created () {
    this.id = this.$route.params.id
    const recetadata = recetasRef.child(this.id)
    recetadata.on('value', snapshot => {
      var receta = snapshot.val()
      this.titulo = receta.titulo
      this.descripcion = receta.descripcion
      this.imageData = receta.imagen
      this.ingredientes = receta.ingredientes.split('-')
      this.contenido = receta.contenido.split('-')
    })
  }
}
</script>
<style type="scss" scoped>
p.title {
  text-align:center;
  font-size:2em;
  margin:20px 0 20px 0;
  color:#FF9900;
  font-family:'Galada';
}
</style>
