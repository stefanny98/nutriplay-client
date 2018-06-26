<template>
  <div class="receta">
    <template>
          <div class="row">
          <div class="col-md-6">
        <card>
        <b-container>
          <p id="verde">Mis Recetas</p>
          <br>
          <div slot="raw-content" class="table-responsive">
            <b-table bordered hover :items="recetas" :fields="fields" head-variant="dark" class="text-center">
         <span slot="acciones" slot-scope="data">
          <b-button variant="success" :to="{ name: 'Ver Receta', params: { id: data.item['key'] } }"><span class="ti-eye"></span></b-button>
         </span>
      </b-table>
          </div>
    </b-container>
        </card>
        </div>
        <div class="col-md-6">
           <card>
        <b-container>
          <p>Tienda</p>
          <br>
          <div slot="raw-content" class="table-responsive">
            <b-table bordered hover :items="tienda" :fields="fields" head-variant="dark" class="text-center" id="naranja">
         <span slot="acciones" slot-scope="data">
          <b-button variant="success" @click="alerta(data.item['key'])">{{ data.item['moneda'] }}<span class="ti-money"></span></b-button>
         </span>
      </b-table>
          </div>
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
let coleccionRecetaRef = firebase.database().ref('coleccion_receta')
export default {
  data () {
    return {
      fields: [{ key: 'titulo', sortable: true }, 'descripcion', 'acciones'],
      usuario: [],
      recetas: [],
      tienda: []
    }
  },
  name: 'receta',
  methods: {
    alerta (idreceta) {
      const userId = firebase.auth().currentUser.uid
      this.$swal({
        title: '¿Estás seguro?',
        text: 'La receta se añadirá a tu lista.',
        icon: 'warning',
        buttons: {
          cancel: {
            text: 'Cancelar',
            value: false,
            visible: true,
            className: 'btncancelar',
            closeModal: true
          },
          confirm: {
            text: 'Aceptar',
            value: true,
            visible: true,
            className: 'btnaceptar',
            closeModal: true
          }
        }
      }).then((result) => {
        console.log(result)
        if (result) {
          coleccionRecetaRef.child(userId).child(idreceta).set(true)
          this.$swal('Gracias por tu compra.')
        }
      })
    }
  },
  created () {
    var coleccionRecetas = this.recetas
    var tienda = this.tienda
    const userId = firebase.auth().currentUser.uid
    const usuarioRef = firebase.database().ref('usuario').child(userId)
    usuarioRef.on('value', snapshot => {
      this.usuario = snapshot.val()
    }, errorObject => {
      console.log('Error: ' + errorObject.code)
    })
    coleccionRecetaRef.child(userId).once('value', snaps => {
      snaps.forEach(function (childSnap) {
        var estado = childSnap.val()
        if (estado) {
          recetasRef.child(childSnap.key).once('value', function (snap) {
            var receta = snap.val()
            receta.key = snap.key
            coleccionRecetas.push(receta)
          })
        }
      })
    }, errorObject => {
      console.log('Error: ' + errorObject.code)
    })
    coleccionRecetaRef.child(userId).once('value', snaps => {
      snaps.forEach(function (childSnap) {
        var estado = childSnap.val()
        if (!estado) {
          recetasRef.child(childSnap.key).once('value', function (snap) {
            var receta = snap.val()
            receta.key = snap.key
            tienda.push(receta)
          })
        }
      })
    }, errorObject => {
      console.log('Error: ' + errorObject.code)
    })
  }
}
</script>
<style lang="scss" scoped>
  .table {
  .thead-dark {
    th {
      background-color: #FF9800;
      border-color: #FF9800;
    }
  }
}
p {
  text-align:center;
  font-size:3em;
  margin:20px 0 20px 0;
  color:#FF9900;
  font-family:Pacifico;
}

p#verde {
  text-align:center;
  font-size:3em;
  margin:20px 0 20px 0;
  color:#83bf21;
  font-family:Pacifico;
}
</style>
