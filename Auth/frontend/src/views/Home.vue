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
        <div class="buttons">
            <router-link to="/register" style="text-decoration: none; color: inherit;">
                <v-btn color="white">
                    <v-icon left color="black">mdi-account-plus</v-icon>
                    <span>Registar</span>
                </v-btn>
            </router-link>
            <router-link to="/login" style="text-decoration: none; color: inherit;">
                <v-btn color="white">
                    <v-icon left color="black">mdi-database</v-icon>
                    <span>Backoffice</span>
                </v-btn>
            </router-link>
            <router-link to="/logintpc" style="text-decoration: none; color: inherit;">
                <v-btn color="white">
                    <v-icon left color="black">mdi-book-open-variant</v-icon>
                    <span>Gestor de TPC</span>
                </v-btn>
            </router-link>
        </div>
    </div>
</template>

<script>
    //import Vue from 'vue'
    //import axios from 'axios'
    export default {
        name: 'Home',
        data () {
            return {
                logoShow: false
            } 
        },
        methods: {
        },
        mounted () {
            setTimeout(() => this.logoShow = true, 500)
            /*let token = Vue.$cookies.get("token")
            if (token == null) {
                Vue.$cookies.remove("token")
                this.$router.push('/login')
            }
            axios({
                    method: 'get',
                    url: 'http://localhost:8000/backoffice-api/aplicacoes/login/interface',
                    //url: '/kong/backoffice-api/aplicacoes/login/interface',
                    headers:{'Authorization':'Bearer '+ token}
                    })
                    .then(() => {
                    })
                    .catch(err => {
                        console.log(err)
                        Vue.$cookies.remove("token")
                        this.$router.push('/login')
                    })*/
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
    .auth-logo {
        font-size:32.0pt;
        font-weight: bold;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
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
