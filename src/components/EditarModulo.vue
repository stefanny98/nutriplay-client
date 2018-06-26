<template>
  <div class="editarmodulo">
    <template>
      <div class="row">
      <div class="col-md-6">
      <card title="Detalle">
        <b-container>
          <b-row align-h="center">
            <textarea rows="2" v-model="titulo" placeholder="Titulo"></textarea><br>
            <textarea rows="2" v-model="descripcion" placeholder="Descripcion"></textarea><br>
           </b-row><br>
        </b-container>
      </card>
      </div>
       <div class="col-md-6">
        <card title="Contenido">
        <b-container>
          <b-row align-h="center">
           <textarea rows="2" v-model="contenido1" placeholder="Primer contenido"></textarea><br>
           <textarea rows="2" v-model="contenido2" placeholder="Segundo contenido"></textarea><br>
          </b-row><br>
        </b-container>
        </card>
       </div>
      </div>
      <div class="row">
      <div class="col-md-6 col-xl-4">
        <card title="Módulo">
          <b-container>
          <b-row align-h="center">
           <input type="file" @change="previewImage" accept="image/*" ref="imagen1"><br>
           </b-row>
          <b-row align-h="center">
            <div class="image-preview" v-if="imageData1.length > 0">
            <img class="preview" :src="imageData1">
            </div>
             </b-row><br>
          </b-container>
        </card>
      </div>
      <div class="col-md-6 col-xl-4">
        <card title="1° Contenido">
          <b-container>
          <b-row align-h="center">
           <input type="file" @change="previewImage2" accept="image/*" ref="imagen2"><br>
           </b-row>
          <b-row align-h="center">
            <div class="image-preview" v-if="imageData2.length > 0">
            <img class="preview" :src="imageData2">
            </div>
             </b-row><br>
          </b-container>
        </card>
      </div>
      <div class="col-md-6 col-xl-4">
        <card title="2do Contenido">
          <b-container>
          <b-row align-h="center">
           <input type="file" @change="previewImage3" accept="image/*" ref="imagen3"><br>
           </b-row>
          <b-row align-h="center">
            <div class="image-preview" v-if="imageData3.length > 0">
            <img class="preview" :src="imageData3">
            </div>
             </b-row><br>
          </b-container>
        </card>
      </div>
      </div>
      <div class="row">
      <div class="col-md-6 col-xl-4">
        <card title="Pregunta 1">
          <b-container>
          <b-row align-h="center">
            <input type="text" v-model="pregunta1" placeholder="Pregunta"><br>
          </b-row>
          Alternativas:
         <b-form-radio-group v-model="alt1">
           <b-form-radio value="a1"></b-form-radio>
           <input type="text" v-model="preg1_alt1" placeholder="Alternativa"><br>
           <b-form-radio value="a2"></b-form-radio>
           <input type="text" v-model="preg1_alt2" placeholder="Alternativa"><br>
           <b-form-radio value="a3"></b-form-radio>
           <input type="text" v-model="preg1_alt3" placeholder="Alternativa">
         </b-form-radio-group><br>
       </b-container>
     </card>
      </div>
      <div class="col-md-6 col-xl-4">
        <card title="Pregunta 2">
        <b-container>
        <b-row align-h="center">
            <input type="text" v-model="pregunta2" placeholder="Pregunta"><br>
          </b-row>
          Alternativas:
         <b-form-radio-group v-model="alt2">
           <b-form-radio value="a1"></b-form-radio>
           <input type="text" v-model="preg2_alt1" placeholder="Alternativa"><br>
           <b-form-radio value="a2"></b-form-radio>
           <input type="text" v-model="preg2_alt2" placeholder="Alternativa"><br>
           <b-form-radio value="a3"></b-form-radio>
           <input type="text" v-model="preg2_alt3" placeholder="Alternativa">
         </b-form-radio-group><br>
       </b-container>
       </card>
       </div>
       <div class="col-md-6 col-xl-4">
         <card title="Pregunta 3">
        <b-container>
          <b-row align-h="center">
            <input type="text" v-model="pregunta3" placeholder="Pregunta"><br>
          </b-row>
          Alternativas:
         <b-form-radio-group v-model="alt3">
           <b-form-radio value="a1"></b-form-radio>
           <input type="text" v-model="preg3_alt1" placeholder="Alternativa"><br>
           <b-form-radio value="a2"></b-form-radio>
           <input type="text" v-model="preg3_alt2" placeholder="Alternativa"><br>
           <b-form-radio value="a3"></b-form-radio>
           <input type="text" v-model="preg3_alt3" placeholder="Alternativa">
         </b-form-radio-group><br>
        </b-container>
      </card>
       </div>
      </div>
      <b-row align-h="around">
            <b-button to="/modulos" variant="danger" class="btn btn-round">Cancelar</b-button>
            <b-button variant="success" class="btn btn-round" v-on:click="actualizar">Actualizar</b-button>
          </b-row>
    </template>
  </div>
</template>

<script>
import firebase from 'firebase'
import router from '@/router'
const modulosRef = firebase.database().ref('modulo')
// const storageRef = firebase.storage().ref()
export default {
  data () {
    return {
      id: 0,
      titulo: '',
      descripcion: '',
      contenido1: '',
      contenido2: '',
      imageData1: '',
      imageData2: '',
      imageData3: '',
      pregunta1: '',
      pregunta2: '',
      pregunta3: '',
      preg1_alt1: '',
      preg1_alt2: '',
      preg1_alt3: '',
      preg2_alt1: '',
      preg2_alt2: '',
      preg2_alt3: '',
      preg3_alt1: '',
      preg3_alt2: '',
      preg3_alt3: '',
      alt1: '',
      alt2: '',
      alt3: ''
    }
  },
  name: 'editarmodulo',
  created () {
    this.id = this.$route.params.id
    const modulodata = modulosRef.child(this.id)
    modulodata.on('value', snapshot => {
      var modulo = snapshot.val()
      this.titulo = modulo.titulo
      this.descripcion = modulo.descripcion
      this.imageData1 = modulo.picture
      this.contenido1 = modulo.contenido.texto1
      this.contenido2 = modulo.contenido.texto2
      this.imageData2 = modulo.contenido.imagen1
      this.imageData3 = modulo.contenido.imagen2
      this.pregunta1 = modulo.pregunta1.pregunta
      this.preg1_alt1 = modulo.pregunta1.alternativa1.nombre
    })
  },
  methods: {
    previewImage: function (evt) {
      var input = evt.target
      if (input.files && input.files[0]) {
        var reader = new FileReader()
        reader.onload = (e) => {
          this.imageData1 = e.target.result
        }
        reader.readAsDataURL(input.files[0])
      }
    },
    previewImage2: function (evt) {
      var input = evt.target
      if (input.files && input.files[0]) {
        var reader = new FileReader()
        reader.onload = (e) => {
          this.imageData2 = e.target.result
        }
        reader.readAsDataURL(input.files[0])
      }
    },
    previewImage3: function (evt) {
      var input = evt.target
      if (input.files && input.files[0]) {
        var reader = new FileReader()
        reader.onload = (e) => {
          this.imageData3 = e.target.result
        }
        reader.readAsDataURL(input.files[0])
      }
    },
    actualizar () {
      // var filename = this.$refs.imagen.files[0].name
      /*  var tit = this.titulo
      var desc = this.descripcion
      var ing = this.ingredientes
      var cont = this.contenido
      var uid = this.id
      recetasRef.child(uid).update({titulo: tit, descripcion: desc, ingredientes: ing, contenido: cont}) */
      router.push('/recetas')
      /* var storageRef = firebase.storage().ref().child('imagenes/' + filename)
      storageRef.putString(this.imageData, 'data_url').then(function (snapshot) {
        snapshot.ref.getDownloadURL().then(function (downloadURL) {
          recetasRef.child(uid).update({titulo: tit, descripcion: desc, ingredientes: ing, contenido: cont})
        })
      }) */
    }
  }
}
</script>
<style scoped>
    input {
    margin: 8px 0;
    width: 80%;
    padding: 10px;
    }
    textarea {
    margin: 10px 0;
    width: 80%;
    padding: 10px;
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
