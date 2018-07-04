<template>
  <div class="usuranking">
    <template>
      <card>
      <b-container>
       <p id="tituloverde">Ranking</p><br>
       <div slot="raw-content" class="table-responsive">
       <b-table bordered hover :items="usuarios" :fields="fields" :sort-desc="false" head-variant="dark" class="text-center" id="verde">
         <template slot="puesto" slot-scope="data">
          <b-row align-h="center">
          <p id="tituloverde" style="font-size: 1.5em">{{data.index + 1}}</p><div v-if="data.index + 1 === 1 || data.index + 1 === 2 || data.index + 1 === 3">
            <img src="https://firebasestorage.googleapis.com/v0/b/nutriplayapp.appspot.com/o/componentes%2Fcrown.png?alt=media&token=01c9ec85-85f7-45db-8610-faa804aa099f" class="crownimg">
          </div>
          </b-row>
        </template>
       </b-table>
     </div>
    </b-container>
    </card>
    </template>
  </div>
</template>

<script>
import firebase from 'firebase'
const usuariosRef = firebase.database().ref('usuario')
export default {
  data () {
    return {
      orden: true,
      usuarios: [],
      fields: ['puesto', {key: 'nombre', label: 'Nombre'}, {key: 'exp', label: 'Experiencia'}]
    }
  },
  name: 'usuranking',
  methods: {
  },
  computed: {
  },
  created () {
    var context = this
    usuariosRef.orderByChild('exp').limitToLast(4).on('value', snapshot => {
      context.usuarios = snapshotToArray(snapshot).reverse()
    })
    function snapshotToArray (snapshot) {
      var array = []
      var cont = 0
      snapshot.forEach(function (childSnapshot) {
        var item = childSnapshot.val()
        item.key = childSnapshot.key
        array.push(item)
        if (item.rol === 'admin') {
          array.splice(cont, 1)
        }
        cont++
      })
      return array
    }
  }
}
</script>
<style scoped>
  img {
    width: 70px;
    height: 70px;
    padding: 5px;
  }
  .crownimg {
    width: 70%;
    height: 100%;
  }
.sub{
  font-size:2em;
}
</style>
