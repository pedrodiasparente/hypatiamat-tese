<template>
  <v-app id="inspire">
    <v-main class="grey lighten-3">
      <v-container>
        <v-card class="pa-2">
            <v-container>
                <v-card-title primary-title class="justify-center green--text">
                    Mensagens
                </v-card-title>

                <v-container>
                    <v-card class="pa-3 elevation-5" outlined>
                        <v-row no-gutters>
                        <v-col cols="12">
                            <v-combobox
                                v-if="!mobile"
                                v-model="turmaSel"
                                :items="turmas"
                                item-text="turma"
                                prepend-icon="mdi-book-account"
                                label="Turmas"
                                color="#009263"
                                @change="changeTurma"
                            >
                            </v-combobox>
                            <v-combobox
                                v-else
                                v-model="turmaSel"
                                :items="turmas"
                                item-text="turma"
                                label="Turmas"
                                color="#009263"
                                @change="changeTurma"
                            >
                            </v-combobox>
                        </v-col>

                        <v-col v-if="alunos.length > 0" class="d-flex" cols="12">
                            <v-combobox
                                v-if="!mobile"
                                v-model="novaMensagem.alunos"
                                @change="checkAllAlunosSel"
                                :items="alunos"
                                item-text="nome"
                                prepend-icon="mdi-account-group"
                                label="Alunos"
                                color="#009263"
                                multiple
                                chips
                            >
                            </v-combobox>
                            <v-combobox
                                v-else
                                v-model="novaMensagem.alunos"
                                @change="checkAllAlunosSel"
                                :items="alunos"
                                item-text="nome"
                                label="Alunos"
                                color="#009263"
                                multiple
                                chips
                            >
                            </v-combobox>
                            <v-tooltip top>
                            <template v-slot:activator="{ on, attrs }">
                            <v-simple-checkbox
                                v-model="todosAlunosSel"
                                color="#009263"
                                v-bind="attrs" 
                                v-on="on"
                                :ripple="false"
                                @input="atualizaAlunosSel()"
                            ></v-simple-checkbox>
                            </template>
                            <span>Para selecionar todos os alunos da turma.</span>
                          </v-tooltip>
                        </v-col>
                        </v-row>
                        <v-textarea v-if="!mobile" class="pa-0" prepend-icon="mdi-message" color="#009263" outlined rounded
                                v-model="novaMensagem.text" name="Mensagem" label="Mensagem"
                        ></v-textarea>
                        <v-textarea v-else class="pa-0" color="#009263" outlined rounded
                                v-model="novaMensagem.text" name="Mensagem" label="Mensagem"
                        ></v-textarea>
                        <v-checkbox
                            class="mt-0"
                            v-model="enviarEmail"
                            color="#009263"
                            label="Enviar Email"
                            :ripple="false"
                        ></v-checkbox>
                        <center><v-btn :disabled="novaMensagem.alunos.length <= 0 || novaMensagem.text.length == 0 || utilizador.type == 5" 
                            class="pa-0 white--text" block color="#009263" @click="enviaMensagem">Enviar</v-btn>
                        </center>
                    </v-card>
                </v-container>

                <v-list  class="py-0" nav > 
                    <v-row>        
                    <v-col cols="12">    
                        <v-card v-if="mensagens.length == 0" class="elevation-6 pa-3" 
                            style="border: 2px solid green !important;" color="grey lighten-3" width="100%">   
                            <span> Ainda n??o enviou uma mensagem. </span>
                        </v-card>       
                        <v-list-item
                            v-for="mensagem in mensagensShow"
                            :key="mensagem.id"
                        >
                            <v-list-item-avatar v-if="!mobile">
                                <v-icon color="#009263">mdi-account</v-icon>
                            </v-list-item-avatar>

                            <v-card class="elevation-6 pa-3" style="border: 2px solid green !important;" color="grey lighten-3" width="100%">
                                <v-subheader class="pa-0"><span v-if="!mobile">{{mensagem.data.split(" ")[0]}} </span>
                                (<span v-if="mensagem.dias > 1 || mensagem.horas > 24"> h?? {{mensagem.dias}} dias </span> 
                                 <span v-else-if="mensagem.minutos < 60"> h?? {{mensagem.minutos}} minutos </span>
                                 <span v-else> h?? {{mensagem.horas}} horas </span>)
                            </v-subheader>
                                <v-list-item-content style="white-space:pre-wrap;">
                                        <span>{{ mensagem.mensagem }}</span>
                                </v-list-item-content>
                                <v-card-actions >
                                    <v-row justify="end">
                                    <v-list-item-action-text class="pr-2" @click="showVistos(mensagem.idMensagem)">
                                        Vista por {{mensagem.vistos}}/{{mensagem.numberUsers}}
                                    </v-list-item-action-text>
                                    </v-row>
                                </v-card-actions>
                            </v-card>
                        </v-list-item>
                    </v-col>
                    </v-row>
                    <v-pagination
                        v-model="pagination.page"
                        :length="pagination.total"
                        color="#009263"
                        @input="this.parseMessages"
                    ></v-pagination>
                </v-list>
                <v-dialog v-model="dialogVistos" :width="small ? '80%' : '50%'">
                    <v-card class="pa-3">
                        <center>
                        <v-list class="py-0" nav >
                            <v-list-item v-for="visto in vistos" :key="visto.user">
                                <v-card outlined rounded width="100%" >
                                <v-row>
                                    <v-list-item-content class="d-flex">
                                        <v-col v-if="!mobile" cols="1">
                                            <v-list-item-avatar >
                                                <v-icon color="#009263">mdi-account</v-icon>
                                            </v-list-item-avatar>
                                        </v-col>
                                        <v-col cols="10" sm="9">
                                            <span> {{visto.nome}} </span>
                                        </v-col>
                                        <v-col cols="2">
                                            <v-icon v-if="visto.visto" color="#009263">mdi-eye-check</v-icon>
                                            <v-icon v-else color="red">mdi-eye-remove</v-icon>
                                        </v-col>
                                    </v-list-item-content>
                                </v-row>
                                </v-card>
                                <br>
                                <v-divider></v-divider>
                            </v-list-item>
                            
                        </v-list>
                        </center>
                    </v-card>
                </v-dialog>
            </v-container>
        </v-card>
      </v-container>
    </v-main>
  </v-app> 
</template>



<script>
import axios from "axios"
import Swal from 'sweetalert2'
import EditarProfessor from '@/components/Professores/EditarProfessor.vue'
const h = require("@/config/hosts").hostAPI
const anoletivo = require("@/config/confs").anoletivo
//const Email = require("@/config/email")

  export default {
    components:{
         EditarProfessor
    },
    data(){
      return {
        token: "",
        nomeProf:"",
        dialogVistos: false,
        pagination: {
            page: 1,
            total: 0,
            perPage: 5,
            visible: 5
        },
        filtrar : "",
        turmaSel: undefined,
        novaMensagem:{
            text: '',
            alunos : []
        },
        mensagens: [{id: 0, mensagem:'Boa tarde! Tudo a jogar o Calcrapid.', numberUsers:20, vistos:4, data:'2020-01-01 18:48:30'},
                    {id: 1, mensagem:'Boa tarde! Tudo a jogar o jogo dos ??ngulos.', numberUsers:10, vistos:8, data:'2020-01-01 17:48:30'}],
        turmas:["8B-20-1", "7A-20-2"],
        anoletivo: anoletivo,
        alunos: [], 
        mensagensShow: [],
        vistos:[],
        todosAlunosSel: false,
        enviarEmail: false
      }
    },
    computed:{
        mobile() {
            if (this.$vuetify.breakpoint.xs) return true
            return false
        },
        small(){
            if (this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm) return true
            return false
        }
    },
    created: async function(){
        this.token = localStorage.getItem("token")
        this.utilizador = JSON.parse(localStorage.getItem("utilizador"))
        var anoAux = this.anoletivo.split("/")
        var ano = anoAux[0]
        var response = await axios.get(h + "professores/" + this.utilizador.codigo + "/turmas?token=" + this.token + "&ano=" + ano)
        this.turmas = response.data
        var responseM = await axios.get(h + "mensagens/professores/" + this.utilizador.codigo + "?token=" + this.token)
        this.mensagens = responseM.data
        this.pagination.total = Math.ceil(this.mensagens.length/5)
        this.parseMessages()
        this.getNomeProf()
    },
    methods: {
      getNomeProf: async function(){
          var response = await axios.get(h + "professores/codigos/" + this.utilizador.codigo + "?token=" + this.token)
          this.nomeProf = response.data.nome
      },
      parseMessages: function(){
          this.mensagensShow = []
          for(var i = (this.pagination.page-1)*this.pagination.perPage; i < this.mensagens.length && i < this.pagination.page*this.pagination.perPage; i++){
              this.mensagensShow.push(this.mensagens[i])
          }
      },
      changeTurma : async function(item){
          if(this.turmaSel && this.turmas.find(e => e.turma == this.turmaSel.turma)){
                this.alunos = []
                var response = await axios.get(h + "turmas/" + this.turmaSel.turma + "/alunos?codprofessor="+ 
                                                this.utilizador.codigo + "&atuais=true" + "&token=" + this.token)
                this.alunos = response.data
                this.checkAllAlunosSel()
          }
      },
      checkAllAlunosSel : function(){
          var teste = true
          for(var i = 0; i < this.alunos.length && teste; i++){
              if(!this.novaMensagem.alunos.find(e => e.user == this.alunos[i].user)) teste = false
          }
          this.todosAlunosSel = teste
      },
      sendEmail: async function(mensagem){
          var destinatarios = []
          for(var i = 0; i < mensagem.alunos.length ; i++){
              destinatarios.push(mensagem.alunos[i].email)
          }
          axios.post(h + "emails/enviar?token="+this.token, {destinatarios: destinatarios, texto: mensagem.text, nome:this.nomeProf})
      },
      enviaMensagem: async function(){
          this.novaMensagem.codprofessor = this.utilizador.codigo
          await axios.post(h + "mensagens?token=" + this.token, this.novaMensagem)
          if(this.enviarEmail) this.sendEmail(this.novaMensagem)
          Swal.fire({
            icon: 'success',
            text: 'Mensagem enviada com sucesso.',
            confirmButtonColor: '#009263'
          })
          this.novaMensagem = {text: '', alunos : []}
          this.enviarEmail = false
          var responseM = await axios.get(h + "mensagens/professores/" + this.utilizador.codigo + "?token=" + this.token)
          this.mensagens = responseM.data
          this.pagination.total = Math.ceil(this.mensagens.length/5)
          this.parseMessages()
          this.atualizaAlunosSel()
      },
      showVistos: async function(idMensagem){
          var response = await axios.get(h + "mensagens/" + idMensagem + "/vistos?token=" + this.token)
          this.vistos = response.data
          this.dialogVistos = true
      },
      atualizaAlunosSel: function(){
          if(!this.todosAlunosSel){
              for(var i = 0; i < this.alunos.length; i++){
                  var al = this.novaMensagem.alunos.find(e => e.user == this.alunos[i].user) 
                  if(al){
                      var index = this.novaMensagem.alunos.indexOf(al)
                      this.novaMensagem.alunos.splice(index, 1)
                  }
              }
          }
          else{
            for(var i = 0; i < this.alunos.length; i++){  
                  if(!this.novaMensagem.alunos.find(e => e.user == this.alunos[i].user))   
                        this.novaMensagem.alunos.push(this.alunos[i])
              }
          }
          
      }
    }
  }
</script>