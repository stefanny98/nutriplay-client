<template>
  <div class="nuevomodulo">
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
            <b-button variant="success" class="btn btn-round" v-on:click="agregar">Aceptar</b-button>
          </b-row>
    </template>
  </div>
</template>

<script>
import firebase from 'firebase'
const modulosRef = firebase.database().ref('modulo')
const storageRef = firebase.storage().ref()
export default {
  data () {
    return {
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
      alt1: 'a1',
      alt2: 'a1',
      alt3: 'a1'
    }
  },
  name: 'nuevomodulo',
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
    agregar () {
      var filename1 = this.$refs.imagen.files[0].name
      var filename2 = this.$refs.imagen.files[0].name
      var filename3 = this.$refs.imagen.files[0].name
      var preg1alt1estado = this.alt1 === 'a1'
      var preg1alt2estado = this.alt1 === 'a2'
      var preg1alt3estado = this.alt1 === 'a3'
      var preg2alt1estado = this.alt2 === 'a1'
      var preg2alt2estado = this.alt2 === 'a2'
      var preg2alt3estado = this.alt2 === 'a3'
      var preg3alt1estado = this.alt3 === 'a1'
      var preg3alt2estado = this.alt3 === 'a2'
      var preg3alt3estado = this.alt3 === 'a3'
      /* storageRef.child('imagenes/' + filename1).putString(this.imageData, 'data_url').then(function (snapshot) {
        snapshot.ref.getDownloadURL().then(function (downloadURL) {
          modulosRef.push({titulo: tit, descripcion: desc, picture: downloadURL})
        })
      }) */
      modulosRef.push({titulo: this.titulo, descripcion: this.descripcion, picture: 'https://firebasestorage.googleapis.com/v0/b/nutriplayapp.appspot.com/o/imagenes%2F25550332_1667884883279125_145417643569126787_n.jpg?alt=media&token=c5540f14-00c3-4cc4-a30d-ee4bd7224037'}).then((snapshot) => {
        const key = snapshot.key
        modulosRef.child(key).child('contenido').push({texto: this.contenido1, imagen: 'https://firebasestorage.googleapis.com/v0/b/nutriplayapp.appspot.com/o/imagenes%2F25550332_1667884883279125_145417643569126787_n.jpg?alt=media&token=c5540f14-00c3-4cc4-a30d-ee4bd7224037'})
        modulosRef.child(key).child('contenido').push({texto: this.contenido2, imagen: 'https://firebasestorage.googleapis.com/v0/b/nutriplayapp.appspot.com/o/imagenes%2F25550332_1667884883279125_145417643569126787_n.jpg?alt=media&token=c5540f14-00c3-4cc4-a30d-ee4bd7224037'})
        modulosRef.child(key).child('pregunta').push({pregunta: this.pregunta1}).then((preg1) => {
          modulosRef.child(key).child('pregunta').child(preg1.key).child('alternativa').push({nombre: this.preg1_alt1, estado: preg1alt1estado})
          modulosRef.child(key).child('pregunta').child(preg1.key).child('alternativa').push({nombre: this.preg1_alt2, estado: preg1alt2estado})
          modulosRef.child(key).child('pregunta').child(preg1.key).child('alternativa').push({nombre: this.preg1_alt3, estado: preg1alt3estado})
        })
        modulosRef.child(key).child('pregunta').push({pregunta: this.pregunta2}).then((preg2) => {
          modulosRef.child(key).child('pregunta').child(preg2.key).child('alternativa').push({nombre: this.preg2_alt1, estado: preg2alt1estado})
          modulosRef.child(key).child('pregunta').child(preg2.key).child('alternativa').push({nombre: this.preg2_alt2, estado: preg2alt2estado})
          modulosRef.child(key).child('pregunta').child(preg2.key).child('alternativa').push({nombre: this.preg2_alt3, estado: preg2alt3estado})
        })
        modulosRef.child(key).child('pregunta').push({pregunta: this.pregunta3}).then((preg3) => {
          modulosRef.child(key).child('pregunta').child(preg3.key).child('alternativa').push({nombre: this.preg3_alt1, estado: preg3alt1estado})
          modulosRef.child(key).child('pregunta').child(preg3.key).child('alternativa').push({nombre: this.preg3_alt2, estado: preg3alt2estado})
          modulosRef.child(key).child('pregunta').child(preg3.key).child('alternativa').push({nombre: this.preg3_alt3, estado: preg3alt3estado})
        })
      })
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
