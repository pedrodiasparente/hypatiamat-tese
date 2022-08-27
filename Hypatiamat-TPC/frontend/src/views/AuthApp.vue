<template>
  <div class="grey lighten-3">
    <Navbar
      @refreshLogout="refreshLogout"
      @miniEvent="
        (value) => {
          this.mini = value;
        }
      "
    />
    <router-view :key="$route.fullPath" v-if="mobile" />
    <v-main v-else class="grey lighten-3">
      <p :style="styleP">
        Dado que se encontra no telemóvel ou num dispositivo pequeno, para
        visualizar os dados de forma clara,
        <b> minimize a barra de navegação </b> através do botão
        <span :style="styleP">&#8918;</span> .
      </p>
    </v-main>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
  components: {
    Navbar,
  },
  data() {
    return {
      color: "#FF0000",
      mini: true,
      miniVariant: false,
      windowWidth: 0,
      styleP: "font-size:20px",
      mensagensLer: 0,
      oldNovasMensagensLer: 0,
      token: "",
      utilizador: {},
    };
  },
  computed: {
    mobile() {
      if (this.$vuetify.breakpoint.xs) return this.mini;
      return true;
    },
  },
  watch: {},
  created: async function() {
    this.windowWidth = window.innerWidth;
    this.size();
  },
  mounted: function() {
    window.onresize = () => {
      this.size();
    };
  },
  methods: {
    refreshLogout: function() {
      this.$emit("refreshLogout");
    },
    size() {
      if (window.innerWidth > 500) {
        this.styleP = "font-size:20px";
      } else if (window.innerWidth > 400) {
        this.styleP = "font-size:16px";
      } else {
        this.styleP = "font-size:9px";
      }
    },
  },
};
</script>
