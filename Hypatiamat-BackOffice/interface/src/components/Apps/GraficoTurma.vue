<template>
<div>
   <v-card class="pa-3">
       <v-card-title class="justify-center green--text">
           <span :style="styleP">Gráfico</span>
       </v-card-title>
       <v-row v-if="intervalos && intervalos.intervalos.length > 0" class="justify-center align-center no-gutters">
            <v-col cols="12" md="6" xl="4" class="justify-center" v-for="(intervalo, index) in intervalos.intervalos" v-bind:key="index">
                <v-card class="pa-2 ma-2 elevation-2" outlined>
                    <v-row class="justify-center pa-3" >
                        <center><span class="green--text"> Momento {{index+1}}</span></center>
                        <v-spacer v-if="intervalos.intervalos.length > 1"></v-spacer>
                        <v-icon v-if="intervalos.intervalos.length > 1" @click="removeIntervalo(index)">mdi-close-octagon-outline</v-icon>
                    </v-row>
                    <v-list-item-content>
                        <v-row class="justify-center">
                            <v-col cols="12" sm="6" >
                                <v-text-field label="Data Início" v-model="intervalo.dataInicio" @change="onDataInicioChange($event, index)" type="date">
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-text-field label="Data Fim" v-model="intervalo.dataFim" @change="onDataFimChange($event, index)" type="date">
                                </v-text-field>
                            </v-col>
                            <v-col cols="12">
                                   <center> <h4>NTR: {{intervalo.freq}}</h4></center>
                            </v-col>
                        </v-row>
                    </v-list-item-content>
                </v-card>
            </v-col>
            <v-col v-if="intervalos.intervalos.length < 3" cols="12" md="6">
                <center>
                <v-btn class="white--text" color="#009263" @click="adicionaIntervalo()">
                    <v-icon>mdi-plus</v-icon>
                    <span>Intervalo</span>
                </v-btn>
                </center>
            </v-col>
            <br>
            <br>
            <v-col cols="12">
                <center>
                    <v-btn class="white--text" style="background-color: #009263;" @click="exportChart()"><v-icon>mdi-pdf-box</v-icon>Exportar</v-btn>
                </center>
            </v-col>
            <v-col cols="12">
                <Grafico id="grafico" v-if="showChart" :labels="props.numerosTurma" :chartData="chartData" :height="180"/>
                <v-container v-else>
                    <center><v-img :src="require('@/assets/loading.gif')" width="150px" heigth="150px"> </v-img></center>
                </v-container>
            </v-col>
        </v-row>
        <v-container v-else>
            <center><v-img :src="require('@/assets/loading.gif')" width="150px" heigth="150px"> </v-img></center>
        </v-container>
            
   </v-card> 
</div> 
</template>

<script>
import axios from "axios"
const h = require("@/config/hosts").hostAPI
const hostApps = require("@/config/hosts").hostApps
const anosletivos2 = require("@/config/confs").anosletivos2
const anoletivoAtual = require("@/config/confs").anoletivo2
import Grafico from '@/components/Apps/Grafico'
import Exporter from "vue-chartjs-exporter";
const hypatiaImg = require("@/assets/hypatiamat.png")


  export default {
    components:{
        Grafico
    },
    data(){
      return {
        verTotal: false,
        token: "",
        utilizador : {},
        alunos:[],
        header_resultados: [
            {text: "Pontuação Obtida", value: 'pontuacao', class: 'subtitle-1'},
            {text: "Turma", value: 'turma', class: 'subtitle-1'},
            {text: "Data", value: 'data', class: 'subtitle-1'},
            {text: "Horário", value: 'horario', class: 'subtitle-1'},
        ],
        footer_props: {
            "items-per-page-text": "Mostrar",
            "items-per-page-options": [50, 100, 200, -1],
            "items-per-page-all-text": "Todos"
        },
        filtrar : "",
        intervalos: undefined,
        styleP: 'font-size:20px',
        styleF: 'font-size:15px',
        widthParams: 'width:70%',
        color1:"#009263",
        color2:"#3ab040",
        showChart:false,
        chartData: []
      }
    },
    props:["props"],
    created: async function(){
        this.resize()
        this.token = localStorage.getItem("token")
        this.utilizador = JSON.parse(localStorage.getItem("utilizador"))
        this.atualizaDados()
    },
    mounted: function(){
        window.onresize = () => {
            this.resize()
        }
    },
    computed:{
        size(){
            if (this.$vuetify.breakpoint.xs) return 'x-small'
            else if(this.$vuetify.breakpoint.sm) return 'small'
            
            return 'medium'
        },
        xs(){
            if (this.$vuetify.breakpoint.xs) return true
            return false
        }
    },
    methods: {
      resize(){
          if (this.$vuetify.breakpoint.xs) {this.styleP='font-size:15px'; this.widthParams = 'width:100%';}
          else if(this.$vuetify.breakpoint.sm) {this.styleP= 'font-size:17px'; this.widthParams = 'width:100%';}
          else this.styleP ='font-size:20px'
      },
      
      format(value, event) {
        return moment(value).format('YYYY-MM-DD')
      },

      onDataInicioChange: function(event, index){
          var intervalo = this.intervalos.intervalos[index]
          if(intervalo.dataInicio && intervalo.dataInicio != ""){
              this.atualizaIntervalo(index)
          }
      },
      onDataFimChange: function(event, index){
          var intervalo = this.intervalos.intervalos[index]
          if(intervalo.dataFim && intervalo.dataFim != ""){
              this.atualizaIntervalo(index)
          }
      },
      atualizaDados: async function(){
          var response
          this.showChart = false
          if(this.props.codtema && this.props.codsubtema){
              response = await axios.get(hostApps + "turmas/" + this.props.turmaSel + "/grafico?codProf="
                         + this.props.codProf + "&codtema=" + this.props.codtema +
                         "&codsubtema=" + this.props.codsubtema + "&token=" + this.token)
          }
          else if(this.props.codtema){
              response = await axios.get(hostApps + "turmas/" + this.props.turmaSel + "/grafico?codProf="
                         + this.props.codProf + "&codtema=" + this.props.codtema + "&token=" + this.token)
          }
          else{
             response = await axios.get(hostApps + "turmas/" + this.props.turmaSel + "/grafico?codProf="
                         + this.props.codProf + "&token=" + this.token)
          }
          this.intervalos = response.data
          await this.atualizaChartData()
          this.showChart = true
      },
      atualizaIntervalo: async function(index){
          var intervalo = this.intervalos.intervalos[index]
          if(intervalo.dataInicio && intervalo.dataInicio != "" && intervalo.dataFim && intervalo.dataFim != ""){
              this.showChart = false
              console.log("A atualizar intervalo...")
              var response
              var auxFreq = 0
              if(this.props.codtema && this.props.codsubtema){
                  response = await axios.get(hostApps + "turmas/" + this.props.turmaSel
                                            + "/?dataInicio=" + intervalo.dataInicio + "&dataFim=" + intervalo.dataFim
                                            + "&codProf=" + this.props.codProf + "&codtema=" + this.props.codtema
                                            + "&horaInicio=00:00&horaFim=23:59"
                                            + "&codsubtema=" + this.props.codsubtema + "&token=" + this.token)
              }
              else if(this.props.codtema){
                  response = await axios.get(hostApps + "turmas/" + this.props.turmaSel
                                            + "/?dataInicio=" + intervalo.dataInicio + "&dataFim=" + intervalo.dataFim
                                            + "&codProf=" + this.props.codProf + "&codtema=" + this.props.codtema
                                            + "&horaInicio=00:00&horaFim=23:59&token=" + this.token)
              }
              else{
                  response = await axios.get(hostApps + "turmas/" + this.props.turmaSel
                                            + "/?dataInicio=" + intervalo.dataInicio + "&dataFim=" + intervalo.dataFim
                                            + "&codProf=" + this.props.codProf + "&horaInicio=00:00&horaFim=23:59&token=" 
                                            + this.token)
              }

              for(var i = 0; i < response.data.length; i++){
                  auxFreq += response.data[i].ntotal
              }
              intervalo.freq = auxFreq
              intervalo.data = response.data
              await this.atualizaChartData()
              this.showChart = true
          }
      },
      atualizaChartData: function(){
          var datasets = []
          
              var colors = ['#9ff459', '#420563', 'red', '#a19c06', 'orange', '#009263']
              for(var i = 0; i < this.intervalos.intervalos.length && i < 3; i++){
                if(this.intervalos.intervalos[i].data.length > 0){
                    datasets.push({
                        label: 'Período ' + (i+1),
                        backgroundColor: colors[i],
                        pointRadius: 5,
                        data: this.intervalos.intervalos[i].data,
                        showLine: false
                    })
                }
            }  
            /*
            var objTurma = {
                label: 'Média da Turma',
                borderColor: colors[3],
                data: [],
                pointRadius: 0, 
                fill: false
            }
            var objEscola = {
                label: 'Média do Agrupamento',
                borderColor: colors[4],
                data: [],
                pointRadius: 0, 
                fill: false
            }
            var objHypatia = {
                label: 'Média do Hypatiamat',
                borderColor: colors[5],
                data: [],
                pointRadius: 0, 
                fill: false
            }
              for(var i = 0; i < this.numerosTurma.length; i++){
                  objHypatia.data.push(this.estatisticas.hypatia.media)
                  objEscola.data.push(this.estatisticas.escola.media)
                  objTurma.data.push(this.estatisticas.turma.media)
              } 
              datasets.push(objTurma)
              datasets.push(objEscola)
              datasets.push(objHypatia)*/
              this.chartData = {labels: this.props.numerosTurma, datasets: datasets} 
              return true
      },
      removeIntervalo: function(index){
          this.intervalos.intervalos.splice(index, index)
          this.atualizaChartData()
      },
      adicionaIntervalo: async function(){
          var newIndex = this.intervalos.intervalos.length
          if(this.intervalos.intervalos[newIndex-1].dataFim != '2021-09-01') 
            var dataInicio = new Date((new Date(this.intervalos.intervalos[newIndex-1].dataFim)).getTime() + 86400000)
          else var dataInicio = new Date('2021-09-01')
          this.intervalos.intervalos.push({
              dataInicio: dataInicio.toISOString().split('T')[0],
              dataFim: '2021-09-01',
              data:[],
              freq:0
          })
          this.atualizaIntervalo(newIndex)
      },
      exportChart: async function(){
          let grafico = document.getElementById("grafico");
          const exp = new Exporter([grafico]);
            exp.export_pdf().then((doc) => {
                var pdfName = this.props.app + "-" + this.props.turmaSel + "-grafico.pdf"
                var xImage = doc.internal.pageSize.getWidth() / 3
                doc.addImage(hypatiaImg, 'PNG', xImage, 4);
                doc.setFontSize(11)
                doc.text("Professor: " + this.props.nomeProf, 25, doc.internal.pageSize.getHeight()-90)
                doc.text("Turma: " + this.props.turmaSel, 25, doc.internal.pageSize.getHeight()-80)
                doc.text("App: " + this.props.app, 25, doc.internal.pageSize.getHeight()-70)
                doc.text("Momentos:", 350, doc.internal.pageSize.getHeight() - 90)
                var ytotal1 = doc.internal.pageSize.getHeight() - 80
                var xtotal = 350
                for(var i = 0; i < this.intervalos.intervalos.length; i++){
                    var periodo = "- Momento " + (i+1) +" ("
                    doc.text(periodo + this.intervalos.intervalos[i].dataInicio + " até " + this.intervalos.intervalos[i].dataFim + ") NTR: " + 
                    this.intervalos.intervalos[i].freq, xtotal, ytotal1)
                    ytotal1 +=10
                }
                doc.save(pdfName);
            });
      }
    }
  }
</script>