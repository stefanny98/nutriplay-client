<template>
  <div class="nuevareceta">
    <template>
      <card>
        <b-container>
        <p id="tituloverde">Nueva Receta</p>
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
          <b-row align-h="center">
           <b-form-radio-group v-model="tipo">
           <b-form-radio value="comun">Común</b-form-radio>
           <b-form-radio value="especial">Especial</b-form-radio>
           <b-form-radio value="mitico">Mítico</b-form-radio>
           </b-form-radio-group>
          </b-row><br>
           <b-row align-h="around">
          <b-button to="/recetas" variant="danger" class="btn btn-round">Cancelar</b-button>
          <b-button variant="success" class="btn btn-round" v-on:click="agregar">Aceptar</b-button>
        </b-row><br>
      </b-container>
    </card>
    </template>
  </div>
</template>

<script>
import firebase from 'firebase'
import router from '@/router'
const recetasRef = firebase.database().ref('receta')
const coleccionRecetaRef = firebase.database().ref('coleccion_receta')
export default {
  data () {
    return {
      imageData: '',
      titulo: '',
      descripcion: '',
      ingredientes: '',
      contenido: '',
      tipo: 'comun'
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
      if (this.$refs.imagen.files[0] === undefined || this.titulo === '' || this.descripcion === '' || this.ingredientes === '' ||
        this.contenido === '') {
        this.$swal('Campos Incompletos', 'Complete todos los campos.', 'warning')
        return false
      }
      var filename = this.$refs.imagen.files[0].name
      var tit = this.titulo
      var desc = this.descripcion
      var ing = this.ingredientes
      var cont = this.contenido
      var tipo = this.tipo
      var monedas
      if (tipo === 'comun') {
        monedas = 100
      } else if (tipo === 'especial') {
        monedas = 200
      } else {
        monedas = 400
      }
      var storageRef = firebase.storage().ref().child('imagenes/' + filename)
      storageRef.putString(this.imageData, 'data_url').then(function (snapshot) {
        snapshot.ref.getDownloadURL().then(function (downloadURL) {
          recetasRef.push({titulo: tit, descripcion: desc, imagen: downloadURL, ingredientes: ing, contenido: cont, tipo: tipo, moneda: monedas}).then((snapshot) => {
            const key = snapshot.key
            coleccionRecetaRef.once('value').then(function (snap) {
              snap.forEach(function (childSnap) {
                coleccionRecetaRef.child(childSnap.key).child(key).set(false)
              })
            })
          })
        })
      })
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
