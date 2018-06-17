<template>
  <div class="nuevareceta">
    <template>
      <card>
        <b-container>
        <b-row align-h="center">
         <input type="text" v-model="titulo" placeholder="Titulo"><br>
         <input type="text" v-model="descripcion" placeholder="Descripcion"><br>
         <input type="text" v-model="ingredientes" placeholder="Ingredientes"><br>
         <input type="text" v-model="contenido" placeholder="Contenido"><br>
         <input type="file" @change="previewImage" accept="image/*" ref="imagen">
          </b-row>
         <b-row align-h="center">
          <div class="image-preview" v-if="imageData.length > 0">
          <img class="preview" :src="imageData">
          </div>
          </b-row><br>
           <b-row align-h="around">
          <b-button variant="success" class="btn btn-round" v-on:click="agregar">Aceptar</b-button>
          <b-button to="/recetas" variant="danger" class="btn btn-round">Cancelar</b-button>
        </b-row>
      </b-container>
    </card>
    </template>
  </div>
</template>

<script>
import firebase from 'firebase'
const recetasRef = firebase.database().ref('receta')
const coleccionRecetaRef = firebase.database().ref('coleccion_receta')
export default {
  data () {
    return {
      imageData: '',
      titulo: '',
      descripcion: '',
      ingredientes: '',
      contenido: ''
    }
  },
  name: 'nuevareceta',
  methods: {
    previewImage: function (evt) {
      var input = evt.target
      if (input.files && input.files[0]) {
        var reader = new FileReader()
        reader.onload = (e) => {
          this.imageData = e.target.result
        }
        reader.readAsDataURL(input.files[0])
      }
    },
    agregar () {
      var filename = this.$refs.imagen.files[0].name
      var tit = this.titulo
      var desc = this.descripcion
      var ing = this.ingredientes
      var cont = this.contenido
      var storageRef = firebase.storage().ref().child('imagenes/' + filename)
      storageRef.putString(this.imageData, 'data_url').then(function (snapshot) {
        snapshot.ref.getDownloadURL().then(function (downloadURL) {
          recetasRef.push({titulo: tit, descripcion: desc, imagen: downloadURL, ingredientes: ing, contenido: cont}).then((snapshot) => {
            const key = snapshot.key
            coleccionRecetaRef.once('value').then(function (snap) {
              snap.forEach(function (childSnap) {
                coleccionRecetaRef.child(childSnap.key).child(key).set(false)
              })
            })
          })
        })
      })
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
    img.preview {
    width: 200px;
    background-color: white;
    border: 1px solid #DDD;
    padding: 5px;
    }
</style>
