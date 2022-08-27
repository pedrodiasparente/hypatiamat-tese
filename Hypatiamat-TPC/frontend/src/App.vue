<template>
  <v-app id="app" :key="viewKey">
    <AuthApp @refreshLogout="refreshLogout" v-if="isLoggedIn" />
    <UserAuth v-else />
  </v-app>
</template>

<script>
import UserAuth from "@/views/UserAuth.vue";
import AuthApp from "@/views/AuthApp.vue";
//const CrossStorageHub = require("cross-storage").CrossStorageHub;
//const CrossStorageClient = require("cross-storage").CrossStorageClient;
//const hostOffice = require("@/config/hosts").hostOffice;
//const storageHosts = require("@/config/hosts").storageHosts;
const Swal = require("sweetalert2");
import Vue from 'vue'


export default {
  name: "App",
  components: { UserAuth, AuthApp },

  async created() {
    try {
      Swal.fire({
        title: "A carregar...",
        showConfirmButton: false,
        allowOutsideClick: false,
        willOpen: () => {
          Swal.showLoading();
        },
      });
      // Iniciar Hub
      //CrossStorageHub.init(storageHosts);

      //let token = localStorage.getItem("tokentpc");
      //if(!token) token = Vue.$cookies.get("token")
      let token = Vue.$cookies.get("token")

      if (token) {
        localStorage.setItem("tokentpc", token);
        this.$store.dispatch("tryLogin");
      } else {
        // Iniciar Client
        /*var storage = new CrossStorageClient(hostOffice, {
          timeout: 2000,
        });

        await storage.onConnect().catch(() => {
          Swal.close();
        });*/

        /*storage
          .get("tokentpc")
          .then((tok) => {
            if (tok) this.$store.dispatch("tryLogin", { token: tok });
          })
          .catch((err) => {
            console.error(err);
          })
          .then(() => {
            storage.close();
            Swal.close();
          });*/
          console.error('no token??');
          localStorage.removeItem("tokentpc");
          localStorage.removeItem("tokenExpiration");
          localStorage.removeItem("userId");
          localStorage.removeItem("userType");
          Swal.close()
          window.location.href = "http://localhost:12090/";
      }
    } catch (e) {
      const error = new Error(e.message);
      throw error;
    }
  },
  data() {
    return {
      viewKey: 0,
      loading: true,
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
    didAutoLogout() {
      return this.$store.getters.didAutoLogout;
    },
  },
  methods: {
    refreshLogout: function() {
      this.viewKey++;
    },
  },
  watch: {},
};
</script>

<style></style>
