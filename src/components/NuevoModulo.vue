<template>
  <div class="nuevomodulo">
    <template>
      <b-container>
         <input type="text" v-model="titulo" placeholder="Titulo"><br>
         <input type="text" v-model="descripcion" placeholder="Descripcion"><br>
         <input type="file" @change="previewImage" accept="image/*" ref="imagen">
          <div class="image-preview" v-if="imageData.length > 0">
          <img class="preview" :src="imageData">
          </div><br>
          <b-button variant="success" v-on:click="agregar">Aceptar</b-button>
    </b-container>
    </template>
  </div>
</template>

<script>
import firebase from 'firebase'
const modulosRef = firebase.database().ref('modulo')
export default {
  data () {
    return {
      imageData: '',
      titulo: '',
      descripcion: '',
      picture: ''
    }
  },
  name: 'nuevomodulo',
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
      var storageRef = firebase.storage().ref().child('imagenes/' + filename)
      storageRef.putString(this.imageData, 'data_url').then(function (snapshot) {
        snapshot.ref.getDownloadURL().then(function (downloadURL) {
          modulosRef.push({titulo: tit, descripcion: desc, picture: downloadURL})
        })
      })
    }
  }
}
</script>
<style scoped>
    .nuevomodulo{
    margin-top: 40px;
    }
    input {
    margin: 10px 0;
    width: 30%;
    padding: 15px;
    }
    button {
    margin-top: 20px;
    width: 20%;
    cursor: pointer;
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
