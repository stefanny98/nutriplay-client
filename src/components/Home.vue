<template>
  <div class="home">
    <template>
      <card>
        <p id="tituloverde">Usuarios</p><br>
      <b-container>
      <b-table fixed bordered hover :items="usuarios" :fields="fields" head-variant="dark" class="text-center" id="verde">
        <template slot="top" slot-scope="data">
          <p id="tituloverde" style="font-size: 1.5em">{{ data.index + 1 }}</p>
        </template>
      </b-table>
    </b-container>
      </card>
      <div class="row">
        <b-container>
        <b-row align-h="center">
      <div class="col-9">
        <chart-card title="Ranking de Usuarios"
                    sub-title="Top 4"
                    :chart-data="usersChart.data"
                    :chart-options="usersChart.options">
          <div slot="legend">
            <i class="fa fa-circle text-info"></i> Experiencia
            <i class="fa fa-circle text-warning"></i> Monedas
          </div>
        </chart-card>
      </div>
    </b-row>
      </b-container>
    </div>
    </template>
  </div>
</template>

<script>
import firebase from 'firebase'
import { ChartCard } from '@/utils/index'
var usuariosRef = firebase.database().ref('usuario')
export default {
  components: {
    ChartCard
  },
  data () {
    return {
      usuarios: [],
      fields: ['top', 'nombre', 'monedas', {key: 'exp', label: 'Experiencia'}],
      usersChart: {
        data: {
          labels: [
            'Top 4',
            'Top 3',
            'Top 2',
            'Top 1'
          ],
          series: [
            []
          ]
        },
        options: {
          low: 0,
          high: 1000,
          showArea: true,
          height: '245px',
          axisX: {
            showGrid: false
          },
          showLine: true,
          showPoint: false
        }
      }
    }
  },
  created () {
    const context = this
    usuariosRef.orderByChild('exp').limitToLast(4).on('value', snapshot => {
      context.usuarios = snapshotToArray(snapshot).reverse()
      var mayor = context.usuarios[0].monedas
      for (var i = 1; i < context.usuarios.length; i++) {
        if (mayor < context.usuarios[i].monedas) {
          mayor = context.usuarios[i].monedas
        }
      }
      context.usersChart.options.high = context.usuarios[0].exp > mayor ? context.usuarios[0].exp : mayor
    })
    function snapshotToArray (snapshot) {
      var array = []
      var topXp = []
      var topMon = []
      var cont = 0
      snapshot.forEach(function (childSnapshot) {
        var item = childSnapshot.val()
        item.key = childSnapshot.key
        array.push(item)
        topXp.push(item.exp)
        topMon.push(item.monedas)
        if (item.rol === 'admin') {
          array.splice(cont, 1)
        }
        cont++
      })
      context.usersChart.data.series = [topXp, topMon]
      return array
    }
  },
  name: 'home',
  methods: {}
}
</script>
