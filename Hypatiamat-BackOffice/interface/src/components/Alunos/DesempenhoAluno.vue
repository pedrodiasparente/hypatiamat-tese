<template>
    <v-card class="elevation-5 pa-5" background-color="gray" rounded>
      <v-container>
            <!-- Aluno !-->
            
          <v-row class="align-center justify-center" >
            <v-col cols="12">
              <center>
                <v-btn v-if="!showAjuda" text @click="showAjuda=!showAjuda"><span>Mostrar Ajuda</span><v-icon color="#009263"> mdi-help-circle </v-icon> </v-btn>
                <v-btn v-else text @click="showAjuda=!showAjuda">Esconder Ajuda</v-btn> 
              </center>
              <v-slide-y-transition>
                  <v-card v-show="showAjuda" class="elevation-6 pa-3" style="border: 2px solid green !important;" color="grey lighten-3">
                    <v-row class="justify-center">
                      <v-col cols="12">
                        <span> 1. Encontram-se disponíveis a quantidade de troféus que o aluno já conquistou. Além disso, pode visualizar 
                          a sua percentagem de acerto nas aplicações de conteúdo e quantas vezes já realizou jogos do Hypatiamat no ano letivo atual.
                        </span>
                      </v-col>
                      <v-col cols="12">
                        <span> 2. Também é possível visualizar a sua prestação no <b>último</b> campeonato em que participou.
                        </span>
                      </v-col>
                      <v-col cols="12">
                        <span> 3. As últimas 10 aplicações de conteúdo que realizou encontram-se também disponíveis, assim como as estatísticas 
                          gerais de cada aplicação. Além disso, pode clicar numa das aplicações (respetiva linha) e visualizar o desempenho
                          por dia.
                        </span>
                      </v-col>
                      <v-col cols="9">
                        <v-card class="mx-auto" color="grey lighten-4">
                            <center> <h3 class="green--text"> Legenda da Tabela Útilmas 10 Apps: </h3> </center>
                            <ul> 
                                <li> <span> <b>NTRC</b> - Número de tarefas resolvidas corretamente; </span> </li>
                                <li> <span> <b>NTR</b> - Número de tarefas resolvidas; </span> </li>
                                <li> <span> <b>Acerto (%)</b> - Percentagem de acerto (NTRC/NTR); </span> </li>
                                <li> <span> <b>#</b> - Frequência. </span> </li>
                                <li> <div class="d-flex align-center"><hr color="#f26755" width="20px" heigth="15px" > <span> Acerto menor que 50%; </span> </div></li>
                                <li> <div class="d-flex align-center"><hr color="#10de16" width="20px" heigth="15px" > <span> Acerto maior ou igual a 50%; </span> </div></li>
                            </ul>
                        </v-card>
                      </v-col>
                      <v-col cols="12">
                        <span> 4. Também pode visualizar os últimos 10 jogos que o aluno jogou, assim como as estatísticas 
                          gerais de cada jogo. Além disso, pode clicar num dos jogos (respetiva linha) e visualizar o seu desempenho no jogo
                          por dia. Apenas para o jogo CalcRapid não é possível.
                        </span>
                      </v-col>
                      <v-col cols="9">
                        <v-card class="mx-auto" color="grey lighten-4">
                            <center> <h3 class="green--text"> Legenda da Tabela Útilmos 10 Jogos: </h3> </center>
                            <ul> 
                                <li> <span> <b>Min</b> - Mínimo de pontuação obtida no jogo; </span> </li>
                                <li> <span> <b>Max</b> - Máximo de pontuação obtida no jogo; </span> </li>
                                <li> <span> <b>Média</b> - Pontuação média obtida no jogo; </span> </li>
                                <li> <span> <b>#</b> - Frequência. </span> </li>
                            </ul>
                        </v-card>
                      </v-col>
                      <v-col cols="12">
                        <span>
                          5. Por último, pode visualizar a caderneta de cromos do aluno e quais os cromos que já conquistou e abriu.
                        </span>
                      </v-col>
                    </v-row>
                  </v-card>
              </v-slide-y-transition>
              </v-col>
            <v-card style="border: 2px solid green !important;">
            <v-row class="align-center justify-center" no-gutters>
              
              <v-col cols="12">
              <v-card-title class="justify-center green--text"> Troféus: </v-card-title>
              </v-col>
              <v-col cols="12" xs="12" sm="12" md="4" lg="4" xl="4">
                <center>
                  <v-container class="d-flex align-center justify-center">
                    <div class="pr-3"><v-img :src="require('@/assets/diamante.png')" width="50px" heigth="50px"> </v-img></div>
                    <div><span>{{trofeus.trophy3}}</span></div>
                  </v-container>
                </center>
              </v-col>
              <v-col cols="12" xs="12" sm="12" md="4" lg="4" xl="4">
                <center>
                  <v-container class="d-flex align-center justify-center">
                    <div class="pr-3"><v-img :src="require('@/assets/star.png')" width="50px" heigth="50px"> </v-img></div>
                    <div><span>{{trofeus.trophy5}}</span></div>
                  </v-container>
                </center>
              </v-col>
              <v-col cols="12" xs="12" sm="12" md="4" lg="4" xl="4">
                <center>
                  <v-container class="d-flex align-center justify-center">
                    <div class="pr-3"><v-img :src="require('@/assets/relampago.png')" width="50px" heigth="50px"> </v-img></div>
                    <div><span>{{trofeus.trophy10}}</span></div>
                  </v-container>
                </center>
              </v-col>
              <v-col cols="12" xs="12" sm="12" md="4" lg="4" xl="4">
                <center>
                  <v-container class="d-flex align-center justify-center">
                    <div class="pr-3"><v-img :src="require('@/assets/apps.png')" width="40px" heigth="40px"> </v-img></div>
                    <div>
                      <span v-if="acertoApps">{{acertoApps}}%</span>
                      <span v-else>--%</span>
                    </div>
                  </v-container>
                </center>
              </v-col>
              <v-col cols="12" xs="12" sm="12" md="4" lg="4" xl="4">
                <center>
                  <v-container class="d-flex align-center justify-center">
                    <div class="pr-3"><v-icon size="50" color="blue">mdi-gamepad-variant</v-icon></div>
                    <div><span>{{frequenciaJogos}}</span></div>
                  </v-container>
                </center>
              </v-col>
            </v-row>
            </v-card>

            <v-col cols="12">
            </v-col>
            <v-col cols="8">
              <ClassificacaoAluno v-if="desempenhoUltimo" :posicoes="desempenhoUltimo"/>
            </v-col>
            <v-col cols="12">
            </v-col>
            <v-col cols="12">
              <center>
                <v-btn v-if="!showApps" text @click="showApps=!showApps"><span><v-icon color="#FFD000">mdi-apps</v-icon>Últimas 10 Apps</span><v-icon color="#009263"> mdi-arrow-down </v-icon> </v-btn>
                <v-btn v-else text @click="showApps=!showApps"><v-icon color="#FFD000">mdi-apps</v-icon><span>Últimas 10 Apps</span><v-icon color="#009263"> mdi-arrow-up </v-icon></v-btn>
              </center> 
            </v-col>
            <v-col cols="12" xs="12" sm="12" md="10" lg="10" xl="10">
            <v-slide-y-transition>
                <v-card v-show="showApps" class="elevation-6 pa-3" style="border: 2px solid green !important;" color="grey lighten-3">
                  <v-text-field
                    v-model="filtrarApps"
                    label="Filtrar"
                    prepend-icon="mdi-magnify"
                    color="#009263"
                    single-line
                  ></v-text-field>
                  <v-data-table
                    class="elevation-3"
                    style="background-color:#EEEEEE"
                    :headers="header_apps"
                    :items="lastApps"
                    :footer-props="footer_props"
                    :search="filtrarApps"
                  >
                    <template v-slot:item="row">
                      <tr :class="row.item.acerto>50 ? 'style-positivo' : 'style-negativo'" @click="showAppPorDia(row.item)">
                        <td>{{row.item.nome}}</td>
                        <td>{{row.item.ncertas}}</td>
                        <td>{{row.item.ntotal}}</td>
                        <td>{{row.item.acerto}}</td>
                        <td>{{row.item.frequencia}}</td>
                        <td>{{row.item.lastdate}}</td>
                        <td>{{row.item.horario}}</td>
                      </tr>
                    </template>
                  </v-data-table>
                </v-card>
            </v-slide-y-transition>
            </v-col>
            <v-col cols="12">
              <center>
                <v-btn v-if="!showJogos" text @click="showJogos=!showJogos"><v-icon color="#009263">mdi-gamepad-variant</v-icon><span>Últimos 10 Jogos</span><v-icon color="#009263"> mdi-arrow-down </v-icon> </v-btn>
                <v-btn v-else text @click="showJogos=!showJogos"><v-icon color="#009263">mdi-gamepad-variant</v-icon><span>Últimos 10 Jogos</span><v-icon color="#009263"> mdi-arrow-up </v-icon></v-btn>
              </center> 
            </v-col>
            <v-col cols="12" xs="12" sm="12" md="10" lg="10" xl="10">
            <v-slide-y-transition>
                <v-card v-show="showJogos" class="elevation-6 pa-3" style="border: 2px solid green !important;" color="grey lighten-3">
                  <v-text-field
                    v-model="filtrarJogos"
                    label="Filtrar"
                    prepend-icon="mdi-magnify"
                    color="#009263"
                    single-line
                  ></v-text-field>
                  <v-data-table
                    class="elevation-3"
                    style="background-color:#EEEEEE"
                    :headers="header_jogos"
                    :items="lastJogos"
                    :footer-props="footer_props"
                    :search="filtrarJogos"
                  >
                  <template v-slot:item="row">
                    <tr @click="showJogoPorDia(row.item)">
                        <td>{{row.item.nome}}</td>
                        <td>{{row.item.min}}</td>
                        <td>{{row.item.max}}</td>
                        <td>{{row.item.media}}</td>
                        <td>{{row.item.frequencia}}</td>
                        <td>{{row.item.lastdate}}</td>
                        <td>{{row.item.horario}}</td>
                      </tr>
                      
                    </template>
                  </v-data-table>
                </v-card>
            </v-slide-y-transition>
            </v-col>
            <v-col cols="12">
              <center>
                <v-btn v-if="!showCromos" text @click="showCromos=!showCromos"><v-icon color="#009263">mdi-book-open-page-variant-outline</v-icon><span>Caderneta de Cromos</span><v-icon color="#009263"> mdi-arrow-down </v-icon> </v-btn>
                <v-btn v-else text @click="showCromos=!showCromos"><v-icon color="#009263">mdi-book-open-page-variant-outline</v-icon><span>Caderneta de Cromos</span><v-icon color="#009263"> mdi-arrow-up </v-icon></v-btn>
              </center> 
            </v-col>
            <v-col cols="12" xs="12" sm="12" md="10" lg="10" xl="10">
            <v-slide-y-transition>
                <Cromos v-show="showCromos" v-if="aluno.user" :userAluno="aluno.user"/>
            </v-slide-y-transition>
            </v-col>
        </v-row>
      </v-container>
          <v-dialog
            v-model="dialogPassword"
            width="60%"
            >
                <v-card class="pa-5">
                  <v-card-title primary-title class="justify-center green--text">
                  Alterar Password
                  </v-card-title>
                  <v-text-field label="Password Nova" placeholder="Password nova" v-model="password1" color="#900000" type="password" required />
                  <v-text-field label="Confirmação Password" placeholder="Confirmação Password" v-model="password2" color="#900000" type="password" required />
                  <v-btn class="white--text" primary large block style="background-color: #009263;" @click="editarPassword()">Confirmar alteração</v-btn>
                </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDia">
            <AppDiaAluno v-if="dialogDia" :resultados="appPorDia" :app="appAtual" />
          </v-dialog>
          <v-dialog v-model="dialogJogoDia">
            <JogoDiaAluno v-if="dialogJogoDia && jogoAtual != 'Calculus'" :resultados="jogoPorDia" :jogo="jogoAtual"/>
            <CalculusDiaAluno v-else-if="dialogJogoDia" :resultados="jogoPorDia" :jogo="jogoAtual"/>
          </v-dialog>
    </v-card>
</template>

<script>
import axios from "axios"
import Swal from 'sweetalert2'
const h = require("@/config/hosts").hostAPI
const hostApps =  require("@/config/hosts").hostApps
const hostJogos =  require("@/config/hosts").hostJogos
const hostTrofeus =  require("@/config/hosts").hostTrofeus
const hostCampeonatos = require("@/config/hosts").hostCampeonatos
import AppDiaAluno from "@/components/Apps/AppDiaAluno.vue"
import JogoDiaAluno from "@/components/Jogos/JogoDiaAluno.vue"
import CalculusDiaAluno from "@/components/Jogos/CalculusDiaAluno.vue"
import ClassificacaoAluno from '@/components/Campeonatos/ClassificacaoAluno.vue'
import Cromos from '@/components/Alunos/CromosVisualizacao.vue'

  export default {
    components:{
      AppDiaAluno,
      JogoDiaAluno,
      CalculusDiaAluno,
      ClassificacaoAluno,
      Cromos
    },
    props:["idAluno"],
    data(){
      return {
        dialogPassword: false,
        dialogDia: false,
        dialogJogoDia: false,
        aluno: {},
        password1: "",
        password2: "",
        showApps: false,
        showJogos: false,
        showCromos:false,
        lastApps:[],
        lastJogos:[],
        trofeus:{trophy3:0, trophy5:0, trophy10:0},
        filtrarApps:"",
        filtrarJogos:"",
        header_apps: [
            {text: "App", sortable: true, value: 'nome', class: 'subtitle-1'},
            {text: "NTRC", value: 'ncertas', class: 'subtitle-1'},
            {text: "NTR", value: 'ntotal', class: 'subtitle-1'},
            {text: "Acerto (%)", value: 'acerto', class: 'subtitle-1'},
            {text: "#", value: 'frequencia', class: 'subtitle-1'},
            {text: "Data", value: 'lastdate', class: 'subtitle-1'},
            {text: "Hora", value: 'horario', class: 'subtitle-1'},
        ],
        header_jogos: [
            {text: "Jogo", sortable: true, value: 'nome', class: 'subtitle-1'},
            {text: "Min", value: 'min', class: 'subtitle-1'},
            {text: "Max", value: 'max', class: 'subtitle-1'},
            {text: "Média", value: 'media', class: 'subtitle-1'},
            {text: "#", value: 'frequencia', class: 'subtitle-1'},
            {text: "Data", value: 'lastdate', class: 'subtitle-1'},
            {text: "Hora", value: 'horario', class: 'subtitle-1'},
        ],
        footer_props: {
            "items-per-page-text": "Mostrar",
            "items-per-page-options": [5, 10, 20, -1],
            "items-per-page-all-text": "Todos"
        },
        token: "",
        id : 0,
        type: 0,
        filtrar:"",
        appPorDia:[],
        appAtual:"",
        jogoPorDia:[],
        jogoAtual:"",
        showAjuda:false,
        frequenciaJogos:0,
        ultimoCampeonato:{},
        acertoApps:0,
        desempenhoUltimo:{posTurma: "-", posEscola: "-", posHypatia: "-", pontuacao: 0},
        number0or1: v  => {
          if (!v.trim()) return true;
          if (!isNaN(parseInt(v)) && (v == 0 || v == 1)) return true;
          return 'Tem que ser 0 ou 1';
        },
        number: v  => {
          if (!v.trim()) return true;
          if (!isNaN(parseInt(v))) return true;
          return 'Tem que ser um inteiro';
        } 

      }
    },
    created: async function(){
        this.token = localStorage.getItem("token")
        if(!this.idAluno){
          var aluno = JSON.parse(localStorage.getItem("utilizador"))
          var response = await axios.get(h + "alunos/" + aluno.id + "?token=" + this.token)
          this.aluno = response.data
          this.aluno.id = aluno.id
          this.aluno.nomeType = "Aluno"
        }
        else{
          var response = await axios.get(h + "alunos/" + this.idAluno + "?token=" + this.token)
          this.aluno = response.data
          this.aluno.id = this.idAluno
          this.aluno.nomeType = "Aluno"
        }
        this.getTrofeus()
        this.getLastApps()
        this.getLastJogos()
        this.getAcertoApps()
        this.getFrequenciaJogos()
        this.calculaUltimoCampeonato()
    },
    computed: {
      xl() {
        if (this.$vuetify.breakpoint.xl) return true
        return false
      },
      small(){
        if (this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm) return true
        return false
      }
    },
    methods: {
      atualizaInfo: async function(){
          var id = this.aluno.id
          var response = await axios.get(h + "alunos/" + id + "?token=" + this.token)
          this.aluno = response.data
          this.aluno.id = id
          this.aluno.nomeType = "Aluno"
          this.editarAluno = false
      },
      getFrequenciaJogos: async function(){
        var response = await axios.get(hostJogos + "alunos/" + this.aluno.user + "/frequencia?token=" + this.token)
        this.frequenciaJogos = response.data
      },
      getAcertoApps: async function(){
        var response = await axios.get(hostApps + "alunos/" + this.aluno.user + "/acerto?token=" + this.token)
        if(response.data) this.acertoApps = response.data.acerto
      },
      getTrofeus: async function(){
        var response = await axios.get(hostTrofeus + "alunos/" + this.aluno.user + "/?token=" + this.token)
        if(response.data) this.trofeus = response.data
      },
      calculaUltimoCampeonato: async function(){
        var ultimo = await axios.get(hostCampeonatos + "alunos/" + this.aluno.user + "/ultimocampeonato?token=" + this.token)
        this.ultimoCampeonato = ultimo.data
        if(this.ultimoCampeonato){
            var response = await axios.get(hostCampeonatos + this.ultimoCampeonato.campeonatoID + "/alunos/" + this.aluno.user
                                        + "?jogo=" + this.ultimoCampeonato.jogo + "&codprofessor=" + this.ultimoCampeonato.codprofessor
                                        + "&turma=" + this.ultimoCampeonato.turma + "&escola=" + this.aluno.escola + "&token=" + this.token)
            if(response.data) {
                this.desempenhoUltimo = response.data
            }
        } 
      },
      getLastApps : async function(){
        var response2 = await axios.get(hostApps + "alunos/" + this.aluno.user + "/last10/?token=" + this.token)
        this.lastApps = response2.data
      },
      getLastJogos: async function(){
        var response3 = await axios.get(hostJogos + "alunos/" + this.aluno.user + "/last10/?token=" + this.token)
        this.lastJogos = response3.data 
      },
      editarAlunoF : function(){
          //this.$router.push({name: "Editar Aluno", params: {id : this.professor.id}})
          this.editarAluno = true
      },
      showAppPorDia : async function(app){
        var response = await axios.get(hostApps + "alunos/" + this.aluno.user + "/dias?codtema=" + app.grupo
                                        + "&codsubtema=" + app.appid + "&token=" + this.token)
        this.appPorDia = response.data
        this.appAtual = app.nome
        this.dialogDia = true
      },
      showJogoPorDia: async function(jogo){
        if(jogo.nome != 'CalcRapid'){
          if(jogo.nome == 'Calculus'){
            var response = await axios.get(hostJogos + "minutenew/alunos/" + this.aluno.user + "/dias?tipo="
                                          + jogo.tipo + "&token=" + this.token)
          }
          else{
            var response = await axios.get(hostJogos + jogo.jogotable + "/alunos/" + this.aluno.user + "/dias?tipo="
                                          + jogo.tipo + "&token=" + this.token)
          }
          this.jogoAtual = jogo.nome
          this.jogoPorDia = response.data
          this.dialogJogoDia = true
        }
      },
      editarPassword : async function(){
          if(this.password1 != "" && this.password2 != ""){
            if(this.password1 == this.password2){
              Swal.fire({
                title: "Tem a certeza que pretende alterar a sua password?",
                showDenyButton: true,
                confirmButtonColor: '#009263',
                confirmButtonText: `Sim`,
                denyButtonText: `Não`,
              }).then(async (result) => {
                if(result.isConfirmed){
                  axios.put(h + "alunos/" + this.aluno.id + "/password?token=" + this.token, {password: this.password1})
                      .then(() => {
                        Swal.fire({
                            icon: 'success',
                            text: "Palavra passe alterada com sucesso.",
                            confirmButtonColor: '#009263'
                          })
                          this.dialogPassword = false
                      })
                      .catch(erro => console.log(erro))
                }
              })
            }
            else{
              this.password2 = ""
              Swal.fire({
                  icon: 'error',
                  text: "As palavra passe de confirmação não coincide com a palavra passe primeiramente definida!",
                  confirmButtonColor: '#009263'
                })
            }
          }
          else Swal.fire({
                  icon: 'error',
                  text: "Tem de preencher os dois campos!",
                  confirmButtonColor: '#009263'
                })
      },
      verJogos: function(){
        this.$router.push({name: "Jogos Alunos"})
      },
      verApps: function(){
        this.$router.push({name: "Apps Alunos"})
      }

    }
  }
</script>

<style>
.style-negativo {
  background-color: #f26755
}
.style-positivo {
  background-color: #10de16
}
</style>