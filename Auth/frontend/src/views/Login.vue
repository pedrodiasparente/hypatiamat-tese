<template>
    <div class="background">
        <div class="logo-header">
            <v-expand-x-transition>
                <v-card class="logo" v-show="logoShow">
                    <v-img
                        :src="require('../assets/hypatiamat-logo.png')"
                        contain
                        height="8vw"
                    />
                </v-card>
            </v-expand-x-transition>
        </div>
        <div class="logins">
            <input class="loginBox" v-model="user" placeholder="Username">
        </div>
        <div class="logins">
            <input class="loginBox" v-model="password" type="password" placeholder="Password" color="white">
        </div>
        <div class="buttons">

            <router-link to="/" style="text-decoration: none; color: inherit;">
                <v-btn color="white">
                    <v-icon left color="black">mdi-home</v-icon>
                    <span>Voltar ao Início</span>
                </v-btn>
            </router-link>
            <v-btn v-on:click="getTokenAluno" color="white">
                <v-icon left color="black">mdi-login</v-icon>
                <span>Login como aluno visitante</span>
            </v-btn>
            <v-btn v-on:click="getTokenProf" color="white">
                <v-icon left color="black">mdi-login</v-icon>
                <span>Login como professor visitante</span>
            </v-btn>
            <v-btn v-on:click="login" color="white">
                <v-icon left color="black">mdi-login</v-icon>
                <span>Login</span>
            </v-btn>
            
        </div>
        
    </div>
</template>

<script>
    import Vue from 'vue'
    var axios = require('axios')
    export default {
        name: 'Login',
        data () {
            return {
                user: "",
                password: "",
                logoShow: false
            } 
        },
        methods: {
            login: async function () {
                try {

                    if(this.user != "" && this.password != ""){
                        let response = await axios.post('http://localhost:9000/aplicacoes/login', {user: this.user, password: this.password});
                        if(!response.data.authentication){
                            this.password = ""
                            let message = 'Credenciais erradas'
                            if(!response.data.valido) message = 'As suas credenciais não são válidas.\nPor favor contacte: associacaohypatiamat@gmail.com'
                            alert(message)
                            return;
                        } 
                        let token = response.data.token;
                        Vue.$cookies.set("token", token, "1d")
                        if (token == null) {
                            Vue.$cookies.remove("token")
                            this.$router.push('/')
                        }
                        axios({
                                method: 'get',
                                url: 'http://localhost:8000/backoffice-api/aplicacoes/login/interface',
                                //url: '/kong/backoffice-api/aplicacoes/login/interface',
                                headers:{'Authorization':'Bearer '+ token}
                                })
                                .then(() => {
                                    window.location.href = 'http://localhost:8080'
                                })
                                .catch(err => {
                                    console.log(err)
                                    Vue.$cookies.remove("token")
                                    this.$router.push('/')
                                })
                    }
                    else {
                        alert('Não preencheu os dois campos')
                    }
                
                } 
                catch (err) {
                    this.password = ""
                    alert(err)
                    }
            }
            ,getToken: function () {
                
                axios({
                    method: 'post',
                    url: 'http://localhost:9000/aplicacoes/login',
                    //url: '/kong/auth/users/login',
                    data: {
                        user: this.user,
                        password: this.password
                    }
                    })
                    .then(data => {
                        console.log(data.data)
                        console.log(data.data.authentication)
                        if (!data.data.authentication) alert('LOGIN FAILED')
                        if (data.data) {
                            axios
                                //.get('http://localhost:8101/consumers/user1/key-auth')
                                .get('/kong-auth/consumers/user1/key-auth')
                                .then(response => {
                                    Vue.$cookies.set("key", response.data.data[0].key, "1d")
                                    this.$router.push('/')
                                    })
                        }
                        //else something
                    })
                    .catch(err => {
                        console.log(err)
                        alert('LOGIN FAILED')
                    })
            },
            getTokenAluno: function () {
                axios({
                    method: 'get',
                    url: 'http://localhost:9000/aplicacoes/login/aluno/visitante',
                    //url: '/auth/aplicacoes/login/aluno/visitante',
                    })
                    .then(data => {
                        console.log(data.data)
                        if (data.data) {
                            let token = data.data.token
                            Vue.$cookies.set("token", token, "1d")
                            if (token == null) {
                                Vue.$cookies.remove("token")
                                this.$router.push('/home')
                            }
                            axios({
                                    method: 'get',
                                    url: 'http://localhost:8000/backoffice-api/aplicacoes/login/interface',
                                    //url: '/kong/backoffice-api/aplicacoes/login/interface',
                                    headers:{'Authorization':'Bearer '+ token}
                                    })
                                    .then(() => {
                                        window.location.href = 'http://localhost:8080'
                                    })
                                    .catch(err => {
                                        console.log(err)
                                        Vue.$cookies.remove("token")
                                        this.$router.push('/home')
                                    })
                            //this.$router.push('/')
                        }
                        //else something
                    })
                    .catch(err => console.log(err))
            },
            getTokenProf: function () {
                axios({
                    method: 'get',
                    url: 'http://localhost:9000/aplicacoes/login/professor/visitante',
                    //url: '/auth/aplicacoes/login/professor/visitante',
                    })
                    .then(data => {
                        console.log(data.data)
                        if (data.data) {
                            let token = data.data.token
                            Vue.$cookies.set("token", token, "1d")
                            if (token == null) {
                                Vue.$cookies.remove("token")
                                this.$router.push('/home')
                            }
                            axios({
                                    method: 'get',
                                    url: 'http://localhost:8000/backoffice-api/aplicacoes/login/interface',
                                    //url: '/kong/backoffice-api/aplicacoes/login/interface',
                                    headers:{'Authorization':'Bearer '+ token}
                                    })
                                    .then(() => {
                                        window.location.href = 'http://localhost:8080'
                                    })
                                    .catch(err => {
                                        console.log(err)
                                        Vue.$cookies.remove("token")
                                        this.$router.push('/home')
                                    })
                            //this.$router.push('/')
                        }
                        //else something
                    })
                    .catch(err => console.log(err))
            }
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
    .logo {
        width: 40vw;
        height: 20vw;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: inset 5px 5px 15px 3px rgba(0,0,0,0.65) !important;
    }

    .logo-header {
        width: 100vw;
        height: 70vh;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: -5vh;
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
        width: 13vw;
        background: white;
        border: 2px solid rgb(16, 125, 34) ;
        border-radius: 10px;
        text-align: center;
        
    }

    .buttons {
        width: 60vw;
        margin: 0vw 20vw;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        align-self: center;
    }

</style>
