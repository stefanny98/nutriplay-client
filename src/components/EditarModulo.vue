<template>
  <div class="editarmodulo">
    <template>
      <p id="tituloverde">Editar Módulo</p>
      <div class="row">
      <div class="col-md-6">
      <card title="Detalle">
        <b-container>
          <b-row align-h="center">
             <textarea rows="1" v-model="titulo" placeholder="Titulo"></textarea>
          </b-row>
          <b-row align-h="center">
            <textarea rows="2" v-model="descripcion" placeholder="Descripcion"></textarea><br>
           </b-row><br>
        </b-container>
      </card>
      </div>
       <div class="col-md-6">
        <card title="Contenido">
        <b-container>
          <b-row align-h="center">
           <textarea rows="5" v-model="txtPrincipal" placeholder="Texto Principal"></textarea>
           </b-row><br>
        </b-container>
        </card>
       </div>
      </div>
      <div class="row">
      <div class="col-md-6">
        <card title="Contenido">
          <b-container>
          <b-row align-h="center">
           <input v-model="sub1" placeholder="Primer Subtitulo"/><br>
          </b-row>
          <b-row align-h="center">
           <input v-model="txt1" placeholder="Primer texto"/><br>
          </b-row>
          <b-row align-h="center">
           <input v-model="sub2" placeholder="Segundo Subtitulo"/><br>
          </b-row>
          <b-row align-h="center">
           <input v-model="txt2" placeholder="Segundo texto"/><br>
          </b-row><br>
          </b-container>
        </card>
      </div>
      <div class="col-md-6">
        <card title="Contenido">
          <b-container>
         <b-row align-h="center">
           <input v-model="sub3" placeholder="Tercer Subtitulo"/><br>
          </b-row>
          <b-row align-h="center">
           <input v-model="txt3" placeholder="Tercer texto"/><br>
          </b-row>
          <b-row align-h="center">
           <input v-model="sub4" placeholder="Cuarto Subtitulo"/><br>
          </b-row>
          <b-row align-h="center">
           <input v-model="txt4" placeholder="Cuarto texto"/><br>
          </b-row><br>
          </b-container>
        </card>
      </div>
      </div>
      <div class="row">
      <div class="col-md-6 col-xl-4">
        <card title="Imagen Detalle">
          <b-container>
          <b-row align-h="center">
           <input type="file" @change="previewImagenG" accept="image/*" ref="imagenG"><br>
           </b-row>
          <b-row align-h="center">
            <div class="image-preview" v-if="imageGData.length > 0">
            <img class="preview" :src="imageGData">
            </div>
             </b-row><br>
          </b-container>
        </card>
      </div>
      <div class="col-md-6 col-xl-4">
        <card title="Imagen Principal">
          <b-container>
          <b-row align-h="center">
           <input type="file" @change="previewImagenPri" accept="image/*" ref="imagenPri"><br>
           </b-row>
          <b-row align-h="center">
            <div class="image-preview" v-if="imagePriData.length > 0">
            <img class="preview" :src="imagePriData">
            </div>
             </b-row><br>
          </b-container>
        </card>
      </div>
      <div class="col-md-6 col-xl-4">
        <card title="Imagen 1">
          <b-container>
          <b-row align-h="center">
           <input type="file" @change="previewImage1" accept="image/*" ref="imagen1"><br>
           </b-row>
          <b-row align-h="center">
            <div class="image-preview" v-if="imageData1.length > 0">
            <img class="preview" :src="imageData1">
            </div>
             </b-row><br>
          </b-container>
        </card>
      </div>
      </div>
      <div class="row">
      <div class="col-md-6 col-xl-4">
        <card title="Imagen 2">
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
        <card title="Imagen 3">
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
      <div class="col-md-6 col-xl-4">
        <card title="Imagen 4">
          <b-container>
          <b-row align-h="center">
           <input type="file" @change="previewImage4" accept="image/*" ref="imagen4"><br>
           </b-row>
          <b-row align-h="center">
            <div class="image-preview" v-if="imageData4.length > 0">
            <img class="preview" :src="imageData4">
            </div>
             </b-row><br>
          </b-container>
        </card>
      </div>
      </div>
      <div class="row">
      <div class="col-md-6 col-xl-4">
        <card title="Pregunta Nivel Fácil">
          <b-container>
          <b-row align-h="center">
            <input type="text" v-model="pregunta1" placeholder="Pregunta"><br>
          </b-row>
          Alternativas:
         <b-form-radio-group v-model="alt1"><br>
          <b-row align-h="center">
           <b-form-radio value="a1"></b-form-radio>
           <input type="text" v-model="preg1_alt1" placeholder="Alternativa 1">
          </b-row>
          <b-row align-h="center">
           <b-form-radio value="a2"></b-form-radio>
           <input type="text" v-model="preg1_alt2" placeholder="Alternativa 2">
          </b-row>
          <b-row align-h="center">
           <b-form-radio value="a3"></b-form-radio>
           <input type="text" v-model="preg1_alt3" placeholder="Alternativa 3">
          </b-row>
         </b-form-radio-group><br>
       </b-container>
     </card>
      </div>
      <div class="col-md-6 col-xl-4">
        <card title="Pregunta Nivel Intermedio">
        <b-container>
        <b-row align-h="center">
            <input type="text" v-model="pregunta2" placeholder="Pregunta"><br>
          </b-row>
          Alternativas:
         <b-form-radio-group v-model="alt2"><br>
          <b-row align-h="center">
           <b-form-radio value="a1"></b-form-radio>
           <input type="text" v-model="preg2_alt1" placeholder="Alternativa 1">
         </b-row>
         <b-row align-h="center">
           <b-form-radio value="a2"></b-form-radio>
           <input type="text" v-model="preg2_alt2" placeholder="Alternativa 2">
         </b-row>
         <b-row align-h="center">
           <b-form-radio value="a3"></b-form-radio>
           <input type="text" v-model="preg2_alt3" placeholder="Alternativa 3">
          </b-row>
         </b-form-radio-group><br>
       </b-container>
       </card>
       </div>
       <div class="col-md-6 col-xl-4">
         <card title="Pregunta Nivel Difícil">
        <b-container>
          <b-row align-h="center">
            <input type="text" v-model="pregunta3" placeholder="Pregunta"><br>
          </b-row>
          Alternativas:
         <b-form-radio-group v-model="alt3"><br>
          <b-row align-h="center">
           <b-form-radio value="a1"></b-form-radio>
           <input type="text" v-model="preg3_alt1" placeholder="Alternativa 1">
         </b-row>
         <b-row align-h="center">
           <b-form-radio value="a2"></b-form-radio>
           <input type="text" v-model="preg3_alt2" placeholder="Alternativa 2">
         </b-row>
         <b-row align-h="center">
           <b-form-radio value="a3"></b-form-radio>
           <input type="text" v-model="preg3_alt3" placeholder="Alternativa 3">
         </b-row>
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
      txtPrincipal: '',
      txt1: '',
      txt2: '',
      txt3: '',
      txt4: '',
      sub1: '',
      sub2: '',
      sub3: '',
      sub4: '',
      imageGData: '',
      imagePriData: '',
      imageData1: '',
      imageData2: '',
      imageData3: '',
      imageData4: '',
      imagenG: '',
      imagenP: '',
      imagen1: '',
      imagen2: '',
      imagen3: '',
      imagen4: '',
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
      imagenuevaP: false,
      imagenuevaG: false,
      imagenueva1: false,
      imagenueva2: false,
      imagenueva3: false,
      imagenueva4: false
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
      this.imageGData = modulo.picture
      this.imagePriData = modulo.contenido.imagenPrincipal
      this.imageData1 = modulo.contenido.imagen1
      this.imageData2 = modulo.contenido.imagen2
      this.imageData3 = modulo.contenido.imagen3
      this.imageData4 = modulo.contenido.imagen4
      this.imgG = modulo.picture
      this.imgP = modulo.contenido.imagenPrincipal
      this.img1 = modulo.contenido.imagen1
      this.img2 = modulo.contenido.imagen2
      this.img3 = modulo.contenido.imagen3
      this.img4 = modulo.contenido.imagen4
      this.txtPrincipal = modulo.contenido.textoPrincipal
      this.txt1 = modulo.contenido.texto1
      this.txt2 = modulo.contenido.texto2
      this.txt3 = modulo.contenido.texto3
      this.txt4 = modulo.contenido.texto4
      this.sub1 = modulo.contenido.subtitulo1
      this.sub2 = modulo.contenido.subtitulo2
      this.sub3 = modulo.contenido.subtitulo3
      this.sub4 = modulo.contenido.subtitulo4
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
    previewImagenG: function (evt) {
      var input = evt.target
      if (input.files && input.files[0]) {
        var reader = new FileReader()
        reader.onload = (e) => {
          this.imageGData = e.target.result
          this.imagenuevaG = true
        }
        reader.readAsDataURL(input.files[0])
      }
    },
    previewImagenPri: function (evt) {
      var input = evt.target
      if (input.files && input.files[0]) {
        var reader = new FileReader()
        reader.onload = (e) => {
          this.imagePriData = e.target.result
          this.imagenuevaP = true
        }
        reader.readAsDataURL(input.files[0])
      }
    },
    previewImage1: function (evt) {
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
    previewImage4: function (evt) {
      var input = evt.target
      if (input.files && input.files[0]) {
        var reader = new FileReader()
        reader.onload = (e) => {
          this.imageData4 = e.target.result
          this.imagenueva4 = true
        }
        reader.readAsDataURL(input.files[0])
      }
    },
    actualizar () {
      if (this.titulo === '' || this.descripcion === '' || this.txtPrincipal === '' || this.txt1 === '' || this.txt2 === '' || this.txt3 === '' || this.txt4 === '' || this.sub1 === '' || this.sub2 === '' || this.sub3 === '' || this.sub4 === '' || this.pregunta1 === '' || this.pregunta2 === '' || this.preg1_alt1 === '' || this.preg1_alt2 === '' || this.preg1_alt3 === '' || this.preg2_alt1 === '' || this.preg2_alt2 === '' || this.preg2_alt3 === '' || this.preg3_alt1 === '' || this.preg3_alt2 === '' || this.preg3_alt3 === '') {
        this.$swal('Campos Incompletos', 'Complete todos los campos.', 'warning')
        return false
      }
      var filenameG
      var filenameP
      var filename1
      var filename2
      var filename3
      var filename4
      if (this.$refs.imagenG.files[0] !== undefined) {
        filenameG = this.$refs.imagenG.files[0].name
      }
      if (this.$refs.imagenPri.files[0] !== undefined) {
        filenameP = this.$refs.imagenPri.files[0].name
      }
      if (this.$refs.imagen1.files[0] !== undefined) {
        filename1 = this.$refs.imagen1.files[0].name
      }
      if (this.$refs.imagen2.files[0] !== undefined) {
        filename2 = this.$refs.imagen2.files[0].name
      }
      if (this.$refs.imagen3.files[0] !== undefined) {
        filename3 = this.$refs.imagen3.files[0].name
      }
      if (this.$refs.imagen4.files[0] !== undefined) {
        filename4 = this.$refs.imagen4.files[0].name
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
      const iG = this.imageGData
      const iP = this.imagePriData
      const i1 = this.imageData1
      const i2 = this.imageData2
      const i3 = this.imageData3
      const i4 = this.imageData4
      const txtP = this.txtPrincipal
      const t1 = this.txt1
      const t2 = this.txt2
      const t3 = this.txt3
      const t4 = this.txt4
      const s1 = this.sub1
      const s2 = this.sub2
      const s3 = this.sub3
      const s4 = this.sub4
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
      const imgnuevaG = this.imagenuevaG
      const imgnuevaP = this.imagenuevaP
      const imgnueva1 = this.imagenueva1
      const imgnueva2 = this.imagenueva2
      const imgnueva3 = this.imagenueva3
      const imgnueva4 = this.imagenueva4
      if (imgnuevaG) {
        firebase.storage().refFromURL(this.imgG).delete()
        storageRef.child('modulos/' + filenameG).putString(iG, 'data_url').then(function (snapshot) {
          snapshot.ref.getDownloadURL().then(function (imageG) {
            modulosRef.child(uid).update({picture: imageG})
          })
        })
      }
      if (imgnuevaP) {
        firebase.storage().refFromURL(this.imgP).delete()
        storageRef.child('modulos/' + filenameP).putString(iP, 'data_url').then(function (snapshot) {
          snapshot.ref.getDownloadURL().then(function (imageP) {
            modulosRef.child(uid).update({imagenPrincipal: imageP})
          })
        })
      }
      if (imgnueva1) {
        firebase.storage().refFromURL(this.img1).delete()
        storageRef.child('modulos/' + filename1).putString(i1, 'data_url').then(function (snapshot) {
          snapshot.ref.getDownloadURL().then(function (image1) {
            modulosRef.child(uid).child('contenido').update({imagen1: image1})
          })
        })
      }
      if (imgnueva2) {
        firebase.storage().refFromURL(this.img2).delete()
        storageRef.child('modulos/' + filename2).putString(i2, 'data_url').then(function (snapshot) {
          snapshot.ref.getDownloadURL().then(function (image2) {
            modulosRef.child(uid).child('contenido').update({imagen2: image2})
          })
        })
      }
      if (imgnueva3) {
        firebase.storage().refFromURL(this.img3).delete()
        storageRef.child('modulos/' + filename3).putString(i3, 'data_url').then(function (snapshot) {
          snapshot.ref.getDownloadURL().then(function (image3) {
            modulosRef.child(uid).child('contenido').update({imagen3: image3})
          })
        })
      }
      if (imgnueva4) {
        firebase.storage().refFromURL(this.img4).delete()
        storageRef.child('modulos/' + filename4).putString(i4, 'data_url').then(function (snapshot) {
          snapshot.ref.getDownloadURL().then(function (image4) {
            modulosRef.child(uid).child('contenido').update({imagen4: image4})
          })
        })
      }
      modulosRef.child(uid).update({titulo: ti, descripcion: des})
      modulosRef.child(uid).child('contenido').update({textoPrincipal: txtP, subtitulo1: s1, texto1: t1, subtitulo2: s2, texto2: t2, subtitulo3: s3, texto3: t3, subtitulo4: s4, texto4: t4})
      modulosRef.child(uid).child('pregunta1').update({pregunta: p1, tipo: 'facil', puntos: 50, alternativa1: {nombre: p1a1, estado: preg1alt1estado}, alternativa2: {nombre: p1a2, estado: preg1alt2estado}, alternativa3: {nombre: p1a3, estado: preg1alt3estado}})
      modulosRef.child(uid).child('pregunta2').update({pregunta: p2, tipo: 'intermedio', puntos: 100, alternativa1: {nombre: p2a1, estado: preg2alt1estado}, alternativa2: {nombre: p2a2, estado: preg2alt2estado}, alternativa3: {nombre: p2a3, estado: preg2alt3estado}})
      modulosRef.child(uid).child('pregunta3').update({pregunta: p3, tipo: 'dificil', puntos: 150, alternativa1: {nombre: p3a1, estado: preg3alt1estado}, alternativa2: {nombre: p3a2, estado: preg3alt2estado}, alternativa3: {nombre: p3a3, estado: preg3alt3estado}})
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
