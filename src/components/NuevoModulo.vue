<template>
  <div class="nuevomodulo">
    <template>
      <card>
      <b-container>
        <b-row align-h="center">
         <input type="text" v-model="titulo" placeholder="Titulo"><br>
         <input type="text" v-model="descripcion" placeholder="Descripcion"><br>
         <input type="file" @change="previewImage" accept="image/*" ref="imagen"><br>
         <textarea rows="2" v-model="contenido1" placeholder="Primer contenido"></textarea><br>
         <textarea rows="2" v-model="contenido2" placeholder="Segundo contenido"></textarea><br>
         </b-row>
        <b-row align-h="center">
          <div class="image-preview" v-if="imageData.length > 0">
          <img class="preview" :src="imageData">
          </div>
       </b-row><br>
        <b-row align-h="around">
          <b-button variant="success" class="btn btn-round" v-on:click="agregar">Aceptar</b-button>
          <b-button to="/modulos" variant="danger" class="btn btn-round">Cancelar</b-button>
        </b-row>
      </b-container>
      </card>
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
      contenido1: '',
      contenido2: '',
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
     // var filename = this.$refs.imagen.files[0].name
      modulosRef.push({titulo: this.titulo, descripcion: this.descripcion, picture: 'https://firebasestorage.googleapis.com/v0/b/nutriplayapp.appspot.com/o/imagenes%2F25550332_1667884883279125_145417643569126787_n.jpg?alt=media&token=c5540f14-00c3-4cc4-a30d-ee4bd7224037'}).then((snapshot) => {
        const key = snapshot.key
        modulosRef.child(key).child('contenido').push({texto: this.contenido1})
        modulosRef.child(key).child('contenido').push({texto: this.contenido2})
      })
    /*  var storageRef = firebase.storage().ref().child('imagenes/' + filename)
      storageRef.putString(this.imageData, 'data_url').then(function (snapshot) {
        snapshot.ref.getDownloadURL().then(function (downloadURL) {
          modulosRef.push({titulo: tit, descripcion: desc, picture: downloadURL})
        })
      }) */
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
    textarea {
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
