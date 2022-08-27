<template>
    <div class="background">
        <div>
            <div class="logo-header">
                <v-expand-transition>
                    <v-card class="logo" v-show="logoShow">
                        <v-img
                            :src="require('../assets/hypatiamat-logo.png')"
                            contain
                            height="6vw"
                        />
                    </v-card>
                </v-expand-transition>
            </div>
            <div class="form">
                <div>
                    <div class="logins">
                        <input class="loginBox" v-model="user" placeholder="Username">
                    </div>
                    <div class="logins">
                        <input class="loginBox" v-model="password" type="password" placeholder="Password" color="white">
                    </div>
                    <div class="logins">
                        <input class="loginBox" v-model="password2" type="password" placeholder="Confirmação de Password" color="white">
                    </div>
                    <div class="logins">
                        <input class="loginBox" v-model="nome" placeholder="Nome Completo">
                    </div>
                    <div class="logins">
                        <input class="loginBox" v-model="pais" placeholder="País">
                    </div>
                    <div class="logins">

                        <v-menu
                            v-model="menu2"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                        >
                            <template v-slot:activator="{ on, attrs }">
                            <input
                                class=loginBox
                                v-model="datanascimento"
                                placeholder="Data de Nascimento"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                            >
                            </template>
                            <v-date-picker
                                @input="menu2 = false, picked = true"
                                v-model="datanascimento"
                                locale="pt-pt"
                            ></v-date-picker>
                        </v-menu>
                    </div>
                    <div class="logins">
                        <input class="loginBox" v-model="email" placeholder="Email">
                    </div>
                    <div class="logins">
                        <input class="loginBox" v-model="codprofessor" placeholder="Código do seu Professor">
                    </div>
                    <div class="logins">
                        <input class="loginBox" v-model="turma" placeholder="Turma">
                    </div>
                    <div class="logins">
                        <input class="loginBox" v-model="numero" placeholder="Número">
                    </div>
                    
                    <div class="buttons">
                        <router-link to="/" style="text-decoration: none; color: inherit;">
                            <v-btn color="white">
                                <v-icon left color="black">mdi-home</v-icon>
                                <span>Voltar ao Início</span>
                            </v-btn>
                        </router-link>
                        <v-btn v-on:click="registerAluno" color="white">
                            <v-icon left color="black">mdi-magnify</v-icon>
                            <span>Registar Aluno</span>
                        </v-btn>
                    </div>
                </div>
            </div>
            
        </div>
        
        
       
    </div>
</template>

<script>
    var axios = require('axios')
    export default {
        name: 'Register',
        data () {
            return {
                user: "",
                password: "",
                password2: "",
                nome: "",
                pais: "",
                datanascimento: "",
                email: "",
                codprofessor: "",
                turma: "",
                numero: "",
                picked: false,
                menu2: false,
                logoShow: false,
            } 
        },
        methods: {
            registerAluno : async function(){
                if(this.user != "" && this.numero != "" && this.nome != "" && this.datanascimento != "" &&
                    this.turma != "" && this.email != "" && this.password != "" && this.codprofessor != "" 
                    && this.pais != ""){
                    if(this.password2 != this.password){
                        alert('As passwords não são iguais.')             
                    }
                    else{
                    var date = this.datanascimento.split("-")
                    var dataNascimento = date[2] + "/" + date[1] + "/" + date[0]
                    let aluno = {
                        user: this.user,
                        numero: this.numero,
                        nome: this.nome,
                        datanascimento: dataNascimento,
                        turma: this.turma,
                        email: this.email,
                        password: this.password,
                        codprofessor: this.codprofessor,
                        pais: this.pais,
                        confirmacao: 1
                    }
                    axios.post('http://localhost:9000/aplicacoes/alunos', aluno)
                        .then(()=>{
                            alert("Sucesso!")
                            this.$router.push('/')
                            })
                            .catch(erro=> console.log(erro))
                    }
                }
                else{
                    alert('Ainda possuí campos por preencher!')
                }
            },
        },
        mounted () {
            setTimeout(() => this.logoShow = true, 500)
        }
    }

</script>

<style scoped>
    .background {
        background: linear-gradient(to bottom, #43d9ff 20%, #9dd756 100%);
        width: 100vw;
        height: 100vh;
    }
    .form{
        margin-top: -29vw;
        margin-left:20vw;
        
        
    }
    .logo {
        width: 40vw;
        height: 20vw;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: inset 5px 5px 15px 3px rgba(0,0,0,0.65) !important;
    }

    .logo-header {
        width: 30vw;
        height: 70vh;
        display: flex;
        align-items: center;
        margin-left: 10vw;
        margin-bottom: -55vh;
    }
    input:focus::placeholder {
        color: transparent;
    }
    .logins {
        width: 60vw;
        margin: 1vw 20vw;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        align-self: center;
        
    }

    .loginBox {
        height: 5vh;
        width: 17vw;
        background: white;
        border: 2px solid rgb(16, 125, 34) ;
        border-radius: 10px;
        text-align: center;
        
    }

    .buttons {
        margin-left:20vw;
        display: flex;
        justify-content: space-evenly;
    }

</style>
