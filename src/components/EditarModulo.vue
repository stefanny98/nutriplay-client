<template>
  <div class="editarmodulo">
    <template>
      <p id="tituloverde">Editar Módulo</p>
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
const storageRef = firebase.storage().ref()
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
      imagen1: '',
      imagen2: '',
      imagen3: '',
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
      alt3: '',
      imagenueva1: false,
      imagenueva2: false,
      imagenueva3: false
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
      this.imagen1 = modulo.picture
      this.contenido1 = modulo.contenido.texto1
      this.contenido2 = modulo.contenido.texto2
      this.imageData2 = modulo.contenido.imagen1
      this.imageData3 = modulo.contenido.imagen2
      this.imagen2 = modulo.contenido.imagen1
      this.imagen3 = modulo.contenido.imagen2
      this.pregunta1 = modulo.pregunta1.pregunta
      this.pregunta2 = modulo.pregunta2.pregunta
      this.pregunta3 = modulo.pregunta3.pregunta
      this.preg1_alt1 = modulo.pregunta1.alternativa1.nombre
      this.preg1_alt2 = modulo.pregunta1.alternativa2.nombre
      this.preg1_alt3 = modulo.pregunta1.alternativa3.nombre
      this.preg2_alt1 = modulo.pregunta2.alternativa1.nombre
      this.preg2_alt2 = modulo.pregunta2.alternativa2.nombre
      this.preg2_alt3 = modulo.pregunta2.alternativa3.nombre
      this.preg3_alt1 = modulo.pregunta3.alternativa1.nombre
      this.preg3_alt2 = modulo.pregunta3.alternativa2.nombre
      this.preg3_alt3 = modulo.pregunta3.alternativa3.nombre
      if (modulo.pregunta1.alternativa1.estado) {
        this.alt1 = 'a1'
      } else if (modulo.pregunta1.alternativa2.estado) {
        this.alt1 = 'a2'
      } else if (modulo.pregunta1.alternativa3.estado) {
        this.alt1 = 'a3'
      }
      if (modulo.pregunta2.alternativa1.estado) {
        this.alt2 = 'a1'
      } else if (modulo.pregunta2.alternativa2.estado) {
        this.alt2 = 'a2'
      } else if (modulo.pregunta2.alternativa3.estado) {
        this.alt2 = 'a3'
      }
      if (modulo.pregunta3.alternativa1.estado) {
        this.alt3 = 'a1'
      } else if (modulo.pregunta3.alternativa2.estado) {
        this.alt3 = 'a2'
      } else if (modulo.pregunta3.alternativa3.estado) {
        this.alt3 = 'a3'
      }
    })
  },
  methods: {
    previewImage: function (evt) {
      var input = evt.target
      if (input.files && input.files[0]) {
        var reader = new FileReader()
        reader.onload = (e) => {
          this.imageData1 = e.target.result
          this.imagenueva1 = true
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
          this.imagenueva2 = true
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
          this.imagenueva3 = true
        }
        reader.readAsDataURL(input.files[0])
      }
    },
    actualizar () {
      if (this.imageData1 === '' || this.imageData2 === '' || this.imageData3 === '' || this.titulo === '' || this.descripcion === '' ||
        this.contenido1 === '' || this.contenido2 === '' || this.pregunta1 === '' || this.pregunta2 === '' || this.preg1_alt1 === '' || this.preg1_alt2 === '' || this.preg1_alt3 === '' || this.preg2_alt1 === '' || this.preg2_alt2 === '' || this.preg2_alt3 === '' || this.preg3_alt1 === '' || this.preg3_alt2 === '' || this.preg3_alt3 === '') {
        this.$swal('Campos Incompletos', 'Complete todos los campos.', 'warning')
        return false
      }
      var filename1
      var filename2
      var filename3
      if (this.$refs.imagen1.files[0] !== undefined) {
        filename1 = this.$refs.imagen1.files[0].name
      }
      if (this.$refs.imagen2.files[0] !== undefined) {
        filename2 = this.$refs.imagen2.files[0].name
      }
      if (this.$refs.imagen3.files[0] !== undefined) {
        filename3 = this.$refs.imagen3.files[0].name
      }
      var preg1alt1estado = this.alt1 === 'a1'
      var preg1alt2estado = this.alt1 === 'a2'
      var preg1alt3estado = this.alt1 === 'a3'
      var preg2alt1estado = this.alt2 === 'a1'
      var preg2alt2estado = this.alt2 === 'a2'
      var preg2alt3estado = this.alt2 === 'a3'
      var preg3alt1estado = this.alt3 === 'a1'
      var preg3alt2estado = this.alt3 === 'a2'
      var preg3alt3estado = this.alt3 === 'a3'
      const ti = this.titulo
      const des = this.descripcion
      const i1 = this.imageData1
      const i2 = this.imageData2
      const i3 = this.imageData3
      const c1 = this.contenido1
      const c2 = this.contenido2
      const p1 = this.pregunta1
      const p2 = this.pregunta2
      const p3 = this.pregunta3
      const p1a1 = this.preg1_alt1
      const p1a2 = this.preg1_alt2
      const p1a3 = this.preg1_alt3
      const p2a1 = this.preg2_alt1
      const p2a2 = this.preg2_alt2
      const p2a3 = this.preg2_alt3
      const p3a1 = this.preg3_alt1
      const p3a2 = this.preg3_alt2
      const p3a3 = this.preg3_alt3
      const uid = this.id
      const imgnueva1 = this.imagenueva1
      const imgnueva2 = this.imagenueva2
      const imgnueva3 = this.imagenueva3
      if (imgnueva1) {
        firebase.storage().refFromURL(this.imagen1).delete()
        storageRef.child('modulos/' + filename1).putString(i1, 'data_url').then(function (snapshot) {
          snapshot.ref.getDownloadURL().then(function (image1) {
            modulosRef.child(uid).update({picture: image1})
          })
        })
      }
      if (imgnueva2) {
        firebase.storage().refFromURL(this.imagen2).delete()
        storageRef.child('modulos/' + filename2).putString(i2, 'data_url').then(function (snapshot) {
          snapshot.ref.getDownloadURL().then(function (image2) {
            modulosRef.child(uid).child('contenido').update({imagen1: image2})
          })
        })
      }
      if (imgnueva3) {
        firebase.storage().refFromURL(this.imagen3).delete()
        storageRef.child('modulos/' + filename3).putString(i3, 'data_url').then(function (snapshot) {
          snapshot.ref.getDownloadURL().then(function (image3) {
            modulosRef.child(uid).child('contenido').update({imagen2: image3})
          })
        })
      }
      modulosRef.child(uid).update({titulo: ti, descripcion: des})
      modulosRef.child(uid).child('contenido').update({texto1: c1, texto2: c2})
      modulosRef.child(uid).child('pregunta1').update({pregunta: p1, alternativa1: {nombre: p1a1, estado: preg1alt1estado}, alternativa2: {nombre: p1a2, estado: preg1alt2estado}, alternativa3: {nombre: p1a3, estado: preg1alt3estado}})
      modulosRef.child(uid).child('pregunta2').update({pregunta: p2, alternativa1: {nombre: p2a1, estado: preg2alt1estado}, alternativa2: {nombre: p2a2, estado: preg2alt2estado}, alternativa3: {nombre: p2a3, estado: preg2alt3estado}})
      modulosRef.child(uid).child('pregunta3').update({pregunta: p3, alternativa1: {nombre: p3a1, estado: preg3alt1estado}, alternativa2: {nombre: p3a2, estado: preg3alt2estado}, alternativa3: {nombre: p3a3, estado: preg3alt3estado}})
      router.push('/modulos')
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
