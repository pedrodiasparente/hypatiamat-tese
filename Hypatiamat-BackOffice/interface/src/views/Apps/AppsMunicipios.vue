<template>
  <v-app id="inspire">
    <v-main class="grey lighten-3">
        <v-container>
            <v-card class="pa-5">
                <v-container>
                    <v-card-title primary-title class="justify-center green--text">
                        Monitorização de Apps por Municípios
                    </v-card-title>
                        <center><v-btn v-if="items.length>0" class="white--text" style="background-color: #009263;" @click="exportPDF()"> <v-icon> mdi-pdf-box </v-icon> Exportar </v-btn></center>
                        <br v-if="items.length>0">
                        <center>
                        <v-container style="width:80%">
                        <v-card class="pa-5">
                            <v-combobox
                                id="apps"
                                v-model="app"
                                label="App"
                                color="green"
                                :items="apps"
                                @change="onAppChange"
                            ></v-combobox>
                            <v-combobox
                                id="comunidades"
                                v-model="comunidade"
                                label="Comunidade"
                                color="green"
                                :items="comunidades"
                                @change="onComunidadeChange"
                            ></v-combobox>
                            <v-combobox
                                id="anos"
                                v-model="anoLetivo"
                                label="Ano Letivo"
                                color="green"
                                :items="anosLetivos"
                                @change="onAnoChange"
                            ></v-combobox>
                            <v-layout row class="text-xs-center" justify-center align-center>
                                <v-col cols="12" xs="12" sm="12" md="12" lg="6" xl="6">
                                <v-text-field @change="onDataInChange" prepend-icon="mdi-calendar" v-model="dataInicio" label="Data Inicio" type="date" :format="format" required></v-text-field>
                                </v-col>
                                <v-col cols="12" xs="12" sm="12" md="12" lg="6" xl="6">
                                    <v-text-field @change="onDataFimChange" prepend-icon="mdi-calendar" v-model="dataFim" label="Data Fim" type="date" :format="format" required></v-text-field>
                                </v-col>
                            </v-layout>
                            <v-row class="justify-center align-center">
                                <v-btn class="white--text" color="#009263" @click="atualizaConteudo()">
                                    <v-icon>mdi-refresh</v-icon>
                                    Atualizar
                                </v-btn>
                            </v-row>
                        </v-card>
                        </v-container>
                        </center>
                        <br>
                <v-container v-if="loading">
                    <center><v-img :src="require('@/assets/loading.gif')" width="150px" heigth="150px"> </v-img></center>
                </v-container>
                <v-container v-else>
                <TotalApps v-if="!loading && totalEstatisticas" :estatisticasGerais="totalEstatisticas"/>
                <v-text-field
                    v-model="filtrar"
                    label="Filtrar"
                    prepend-icon="mdi-magnify"
                    color="#009263"
                    single-line
                ></v-text-field>
                <v-data-table
                    class="elevation-4"
                    :headers="headers"
                    :items="items"
                    :footer-props="footer_props"
                    :search="filtrar"
                    @click:row="goToEscolas"
                >
                    
                </v-data-table>
                </v-container>
                </v-container>
            </v-card>
        </v-container>
    </v-main>
  </v-app> 
</template>



<script>
import axios from "axios"
import jsPDF from 'jspdf' 
import domtoimage from "dom-to-image";
import 'jspdf-autotable'
import html2canvas from "html2canvas";
const h = require("@/config/hosts").hostAPI
const hostApps = require("@/config/hosts").hostApps
const hypatiaImg = require("@/assets/hypatiamat.png")
const anosletivos2 = require("@/config/confs").anosletivos2
const anoletivoAtual = require("@/config/confs").anoletivo2
import TotalApps from '@/components/Apps/TotalApps.vue'

  export default {
    name: 'AppsMunicipios',
    data(){
      return {
        token: "",
        loading: false,
        app:"",
        filtrar:"",
        dataInicio: "2020-09-01",
        dataFim: "2021-09-01",
        utilizador : {},
        alunos:[],
        footer_props: {
            "items-per-page-text": "Mostrar",
            "items-per-page-options": [50, 100, 200, -1],
            "items-per-page-all-text": "Todos"
        },
        filtrar : "",
        anosLetivos: anosletivos2,
        anoLetivo: anoletivoAtual,
        apps:[],
        appsInfo:[],
        headers:[
            {text: "Municipio", value: 'localidade', class: 'subtitle-1'},
            {text: "NTRC", value: 'ncertas', class: 'subtitle-1'},
            {text: "NTR", value: 'ntotal', class: 'subtitle-1'},
            {text: "Acerto(%)", value: 'acerto', class: 'subtitle-1'},
            {text: "DP", value: 'onpeak', class: 'subtitle-1'},
            {text: "FP", value: 'offpeak', class: 'subtitle-1'},
            {text: "Frequência", value:'frequencia', class:"subtitle-1"}
        ],
        items:[],
        comunidade: "Nenhuma",
        comunidades:[],
        comunidadesId:[],
        totalEstatisticas:undefined
      }
    },
    components:{
        TotalApps
    },
    created: async function(){
        this.token = localStorage.getItem("token")
        this.utilizador = JSON.parse(localStorage.getItem("utilizador"))
        var response = await axios.get(hostApps + "temas/?token=" + this.token)
        this.appsInfo = response.data
        this.parseApps()
        this.parseComunidades()
        this.onAnoChange()
        
    },
    methods: {
      format(value, event) {
        return moment(value).format('YYYY-MM-DD')
      },
      parseComunidades: async function(){
        var response = await axios.get(h + "comunidades?token=" + this.token)
        this.comunidadesId = response.data
        var aux = ["Nenhuma"]
        for(var i = 0; i < this.comunidadesId.length; i++){
          aux.push(this.comunidadesId[i].nome)
        }
        this.comunidades = aux
      },
      parseApps: async function(){
          var aux = []
          for(var i = 0; i < this.appsInfo.length; i++){
              if(i == 0) aux.push(this.appsInfo[i])
              else if(this.appsInfo[i].codsubtema) aux.push(this.appsInfo[i].subtema)
              else aux.push(this.appsInfo[i].tema)
          }
          this.apps = aux
      },
      onAnoChange: async function(item){
          if(this.anoLetivo != ""){
             var aux = this.anoLetivo.split("/")
             this.dataInicio = aux[0] + "-09-01"
             this.dataFim = aux[1] + "-09-01"
             this.atualizaConteudo()
          }
      },
      onAppChange: async function(item){
          if(this.app != ""){
              this.atualizaConteudo()
          }
      },
      onDataInChange: async function(item){
          if(this.dataInicio){
              this.atualizaConteudo()
          }
      },
      onDataFimChange: async function(item){
          if(this.dataFim){
              this.atualizaConteudo()
          }
      },
      onComunidadeChange: async function(item){
          if(this.comunidades.find(e => e == this.comunidade)){
              this.atualizaConteudo()
          }
      },
      calculaTotais: async function(){
          this.totalEstatisticas = {ncertas:0, ntotal:0, acerto:0, onpeak: 0, offpeak: 0, frequencia:0}
          for(var i = 0; i < this.items.length; i++){
              this.totalEstatisticas.ncertas += this.items[i].ncertas
              this.totalEstatisticas.ntotal += this.items[i].ntotal
              this.totalEstatisticas.onpeak += this.items[i].onpeak
              this.totalEstatisticas.offpeak += this.items[i].offpeak
          }
          if(this.totalEstatisticas.ntotal !=0 ) this.totalEstatisticas.acerto = ((this.totalEstatisticas.ncertas)/(this.totalEstatisticas.ntotal) * 100).toFixed(0)
          this.totalEstatisticas.frequencia = this.totalEstatisticas.onpeak + this.totalEstatisticas.offpeak;
          return true
      },
      atualizaConteudoComunidade: async function(){
          var com = this.comunidadesId.find(e => e.nome == this.comunidade)
          if(this.app != "" && this.dataFim != "" && this.dataInicio != "" && com){
                this.loading = true
                if(this.app == "Todas"){
                    var response = await axios.get(hostApps + "comunidades/" + com.codigo
                                            + "?dataInicio=" + this.dataInicio + "&dataFim=" + this.dataFim
                                            + "&token=" + this.token)
            
                    this.items = response.data
                    await this.calculaTotais()
                }
                else{
                    // Fazer para uma app em particular
                    var appInfo = this.appsInfo.find(element => element.tema == this.app)
                    if(appInfo){
                        // é um dos temas
                        var response = await axios.get(hostApps + "comunidades/" + com.codigo
                                            + "?dataInicio=" + this.dataInicio + "&dataFim=" + this.dataFim + "&codtema=" + appInfo.codtema
                                            + "&token=" + this.token)
                        
                        this.items = response.data
                        await this.calculaTotais()
                    }
                    else{
                        // é um subtema
                        appInfo = this.appsInfo.find(element => element.subtema == this.app)
                        if(appInfo){
                            var response = await axios.get(hostApps + "comunidades/" + com.codigo
                                            + "?dataInicio=" + this.dataInicio + "&dataFim=" + this.dataFim + "&codtema=" + appInfo.codtema
                                            + "&codsubtema=" + appInfo.codsubtema + "&token=" + this.token)
                        
                            this.items = response.data
                            await this.calculaTotais()
                        }
                    }
                }
                this.loading = false
          } 
      },
      atualizaConteudo: async function(){
            if(this.comunidade != "Nenhuma") {this.atualizaConteudoComunidade(); return;}
            if(this.app != "" && this.dataFim != "" && this.dataInicio != ""){
                this.loading = true
                if(this.app == "Todas"){
                    var response = await axios.get(hostApps + "municipios/"
                                            + "?dataInicio=" + this.dataInicio + "&dataFim=" + this.dataFim
                                            + "&token=" + this.token)
            
                    this.items = response.data
                    await this.calculaTotais()
                }
                else{
                    // Fazer para uma app em particular
                    var appInfo = this.appsInfo.find(element => element.tema == this.app)
                    if(appInfo){
                        // é um dos temas
                        var response = await axios.get(hostApps + "municipios/"
                                            + "?dataInicio=" + this.dataInicio + "&dataFim=" + this.dataFim + "&codtema=" + appInfo.codtema
                                            + "&token=" + this.token)
                        
                        this.items = response.data
                        await this.calculaTotais()
                    }
                    else{
                        // é um subtema
                        appInfo = this.appsInfo.find(element => element.subtema == this.app)
                        if(appInfo){
                            var response = await axios.get(hostApps + "municipios/"
                                            + "?dataInicio=" + this.dataInicio + "&dataFim=" + this.dataFim + "&codtema=" + appInfo.codtema
                                            + "&codsubtema=" + appInfo.codsubtema + "&token=" + this.token)
                        
                            this.items = response.data
                            await this.calculaTotais()
                        }
                    }
                }
                this.loading = false
          } 
      },
      goToEscolas: function(item){
        this.$router.push({name: 'Apps Escolas', params:{municipio: item.localidade},
                                                query:{appAtual: this.app, 
                                                anoLetivo: this.anoLetivo, dataInicio: this.dataInicio, dataFim: this.dataFim}})

      },
      exportPDF: async function(){
        var doc = new jsPDF({
        })

        var xImage = doc.internal.pageSize.getWidth() / 4
        var ytotal = 0
        var pdfName = "Apps-" + this.app + "-Municípios.pdf"
        doc.addImage(hypatiaImg, 'PNG', xImage, 4);
        //doc.text("Jogo:")
        //doc.text("Estatisticas dos alunos sobre o jogo " + this.jogo + "da turma " + this.turmaSel, doc.internal.pageSize.getWidth() / 2, 8, null, null, 'center')
        doc.setFontSize(11)
        doc.text("App de Conteúdos: " + this.app, 15, 50)
        doc.text("Período: " + this.dataInicio + " a " + this.dataFim, 130, 50)
        var listaRes = []
        var total = ["Todos", 0, 0, 0, 0, 0, 0]
        for(var i = 0; i<this.items.length; i++){
            var aux = [];
            aux.push(this.items[i].localidade)
            aux.push(this.items[i].ncertas)
            total[1] += this.items[i].ncertas
            aux.push(this.items[i].ntotal)
            total[2] += this.items[i].ntotal
            aux.push(this.items[i].acerto)
            aux.push(this.items[i].onpeak)
            total[4] += this.items[i].onpeak
            aux.push(this.items[i].offpeak)
            total[5] += this.items[i].offpeak
            aux.push(this.items[i].frequencia)
            total[6] += this.items[i].frequencia

            listaRes.push(aux)
        }
        total[3] = ((total[1]/total[2])*100).toFixed(0)
        listaRes.push(total)
        doc.autoTable({
            head: [['Município', 'NTRC', "NTR", "Acerto(%)", "DP", "FP", "#"]],
            body: listaRes,
            headStyles: { fillColor: [0, 146, 99] },
            margin:{top: 65, bottom:30},
            didDrawPage: function (data) {
                    // Reseting top margin. The change will be reflected only after print the first page.
                    data.settings.margin.top = 10;
                    ytotal = doc.internal.pageSize.getHeight()
                    doc.setFontSize(8)
                    //doc.setFontType('bold'
                    doc.text("Legenda:" , 10, ytotal -30)
                    doc.text("NTRC - N.º de tarefas realizadas corretamente", 10, ytotal -26)
                    doc.text("NTR- N.º de tarefas realizadas", 10, ytotal -22)
                    doc.text("Acerto (%) - (NTRC/NTR)*100", 10, ytotal - 18)
                    doc.text("DP - Dentro do período escolar", 10, ytotal -14)
                    doc.text("FP - Fora do período escolar", 10, ytotal-10)
                    doc.text("# - Frequência", 10, ytotal-6)
                },
            willDrawCell: function (data) {
                var rows = data.table.body;
                if (data.row.index === rows.length - 1) {
                    doc.setFillColor(5, 179, 123);
                    doc.setTextColor(255, 255, 255)
                }
            },
        })
        
        

        doc.save(pdfName)
       
      },
      
    }
  }
</script>