<template>
  <v-container v-if="isLogged()" v-model="reatividade">
    <nav>
      <v-navigation-drawer
        v-model="drawer"
        dark
        app
        :mini-variant.sync="mini"
        permanent
        floating
        height="100%"
        color="#009263"
        mobile-breakpoint="991"
      >
        <v-list dense nav class="py-0">
          <v-list-item two-line :class="miniVariant && 'px-0'">
            <v-list-item-icon>
              <v-icon style="color:#F5F5F5">mdi-account</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ this.userId }}</v-list-item-title>
              <v-list-item-subtitle>Autenticado</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon @click.stop="mini = !mini">
                <v-icon>mdi-chevron-left</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item v-for="item in items" :key="item.title" :to="item.href">
            <v-list-item-icon>
              <v-icon
                v-if="item.title == 'Terminar Sessão'"
                @click="logout()"
                style="cursor: pointer;"
                >{{ item.icon }}</v-icon
              >
              <v-icon
                v-else-if="item.title == 'Backoffice Hypatiamat'"
                @click="backoffice()"
                style="cursor: pointer;"
                >{{ item.icon }}</v-icon
              >
              <v-icon v-else>
                {{ item.icon }}
              </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title
                v-if="item.title == 'Terminar Sessão'"
                @click="logout()"
                style="cursor: pointer;"
                >{{ item.title }}
              </v-list-item-title>
              <v-list-item-title
                v-else-if="item.title == 'Backoffice Hypatiamat'"
                @click="backoffice()"
                style="cursor: pointer;"
                >{{ item.title }}
              </v-list-item-title>
              <v-list-item-title v-else>
                {{ item.title }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <template v-slot:append>
          <div class="pa-2">
            <span v-if="mini" class="white--text" style="font-size:12px">
              <b> TPC </b>
            </span>
            <span v-else class="white--text" style="font-size:12px">
              <b> TPC - Versão 3.1 </b>
            </span>
          </div>
        </template>
      </v-navigation-drawer>
    </nav>
  </v-container>
</template>

<script>
const axios = require("axios");
const host = require("@/config/hosts").hostAPI;
import Swal from "sweetalert2";

export default {
  props: ["logged"],
  data() {
    return {
      reatividade: "#900000",
      drawer: true,
      mini: false,
      items: [],
      color: "#900000",
      colors: ["primary", "blue", "success", "red", "teal"],
      right: false,
      miniVariant: false,
      expandOnHover: false,
      background: false,
      userId: null,
    };
  },
  watch: {
    mini: function() {
      this.$emit("miniEvent", this.mini);
    },
  },
  created: async function() {
    const userId = this.$store.getters.getUserId;
    const userType = this.$store.getters.getUserType;

    if (userType === "professor") {
      const utilizador = await axios.get(host + "professores/" + userId);
      this.userId = utilizador.data.codigo;
    } else if (userType === "aluno") {
      const utilizador = await axios.get(host + "alunos/" + userId);
      this.userId = utilizador.data.user;
    }

    this.$emit("miniEvent", this.mini);
    if (userType == "professor") {
      // Professor
      this.items = [
        {
          title: "TPC Ativos",
          icon: "mdi-format-list-bulleted",
          href: "/dashboard",
        },

        {
          title: "Criar TPC",
          icon: "mdi-clipboard-text",
          href: "/create",
        },
        {
          title: "TPC Expirados",
          icon: "mdi-pillar",
          href: "/historic",
        },
        {
          title: "Estatísticas",
          icon: "mdi-chart-bar",
          href: "/stats",
        },
        {
          title: "Backoffice Hypatiamat",
          icon: "mdi-web",
        },
        { title: "Terminar Sessão", icon: "mdi-logout" },
      ];
    } else if (userType == "aluno") {
      // Aluno
      this.items = [
        {
          title: "TPC Ativos",
          icon: "mdi-format-list-bulleted",
          href: "/dashboard",
        },
        {
          title: "TPC Expirados",
          icon: "mdi-pillar",
          href: "/historic",
        },
        {
          title: "Estatísticas",
          icon: "mdi-chart-bar",
          href: "/stats",
        },
        {
          title: "Backoffice Hypatiamat",
          icon: "mdi-web",
        },
        { title: "Terminar Sessão", icon: "mdi-logout" },
      ];
    }
  },
  computed: {
    bg() {
      return this.background
        ? "https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
        : undefined;
    },
  },
  methods: {
    backoffice: function() {
      const editFlag = this.$store.getters.getEditFlag;
      if (editFlag) {
        Swal.fire({
          title: "Navegação Impedida",
          text: "Tem que acabar o TPC antes de poder navegar.",
          icon: "error",
          confirmButtonColor: "#009263",
        });
        return;
      }
      window.location.href = "http://localhost:8080/";
    },
    logout: function() {
      const editFlag = this.$store.getters.getEditFlag;
      if (editFlag) {
        Swal.fire({
          title: "Navegação Impedida",
          text: "Tem que acabar o TPC antes de poder navegar.",
          icon: "error",
          confirmButtonColor: "#009263",
        });
      } else
        Swal.fire({
          title: "De certeza que pretende terminar sessão?",
          showDenyButton: true,
          confirmButtonColor: "#009263",
          confirmButtonText: `Sim`,
          denyButtonText: `Não`,
        }).then(async (result) => {
          if (result.isConfirmed) {
            this.$store.dispatch("logout");
            this.$emit("refreshLogout");
            //if (this.$route.path != "/dashboard")
            //  this.$router.push({ name: "TheDashboard" });
            window.location.href = "http://localhost:12090/";
          }
        });
    },
    isLogged: function() {
      if (localStorage.getItem("tokentpc") == null) {
        return false;
      } else {
        return true;
      }
    },
    navBarAberta: function() {},
  },
};
</script>

<style lang="scss">
#app-drawer {
  .v-list__tile {
    border-radius: 4px;

    &--buy {
      margin-top: auto;
      margin-bottom: 17px;
    }
  }
}
</style>
