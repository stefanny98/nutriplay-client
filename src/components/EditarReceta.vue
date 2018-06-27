<template>
  <div class="editarreceta">
    <template>
      <card>
      <b-container>
        <p id="tituloverde">Editar Receta</p>
         <b-row align-h="center">
         <input type="text" v-model="titulo" placeholder="Titulo"><br>
         <input type="text" v-model="descripcion" placeholder="Descripcion"><br>
         <input type="text" v-model="ingredientes" placeholder="Ingredientes"><br>
         <input type="text" v-model="contenido" placeholder="Contenido"><br>
         <input type="file" @change="previewImage" accept="image/*" ref="imagen"><br>
        </b-row>
         <b-row align-h="center">
          <div class="image-preview" v-if="imageData.length > 0">
          <img class="preview" :src="imageData">
          </div>
          </b-row><br>
           <b-row align-h="around">
          <b-button to="/recetas" variant="danger" class="btn btn-round">Cancelar</b-button>
          <b-button variant="success" class="btn btn-round" v-on:click="actualizar">Actualizar</b-button>
        </b-row>
    </b-container>
      </card>
    </template>
  </div>
</template>

<script>
import firebase from 'firebase'
import router from '@/router'
var recetasRef = firebase.database().ref('receta')
export default {
  data () {
    return {
      id: 0,
      imageData: '',
      titulo: '',
      descripcion: '',
      ingredientes: '',
      contenido: '',
      imagen: '',
      imagenueva: false
    }
  },
  name: 'editarreceta',
  created () {
    this.id = this.$route.params.id
    const recetadata = recetasRef.child(this.id)
    recetadata.on('value', snapshot => {
      var receta = snapshot.val()
      this.titulo = receta.titulo
      this.descripcion = receta.descripcion
      this.ingredientes = receta.ingredientes
      this.contenido = receta.contenido
      this.imageData = receta.imagen
      this.imagen = receta.imagen
    })
  },
  methods: {
    previewImage: function (evt) {
      var input = evt.target
      if (input.files && input.files[0]) {
        var reader = new FileReader()
        reader.onload = (e) => {
          this.imageData = e.target.result
          this.imagenueva = true
        }
        reader.readAsDataURL(input.files[0])
      }
    },
    actualizar () {
      if (this.titulo === '' || this.descripcion === '' || this.ingredientes === '' || this.contenido === '') {
        this.$swal('Campos Incompletos', 'Complete todos los campos.', 'warning')
        return false
      }
      var filename
      if (this.$refs.imagen.files[0] !== undefined) {
        filename = this.$refs.imagen.files[0].name
      }
      var tit = this.titulo
      var desc = this.descripcion
      var img = this.imageData
      var ing = this.ingredientes
      var cont = this.contenido
      var uid = this.id
      var imgnueva = this.imagenueva
      if (imgnueva) {
        firebase.storage().refFromURL(this.imagen).delete()
        var storageRef = firebase.storage().ref().child('imagenes/' + filename)
        storageRef.putString(img, 'data_url').then(function (snapshot) {
          snapshot.ref.getDownloadURL().then(function (downloadURL) {
            recetasRef.child(uid).update({imagen: downloadURL})
          })
        })
      }
      recetasRef.child(uid).update({titulo: tit, descripcion: desc, ingredientes: ing, contenido: cont})
      router.push('/recetas')
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
