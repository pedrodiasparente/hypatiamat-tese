<template>
  <v-app id="inspire">
    <v-main class="grey lighten-3">
      <v-container>
        <v-card class="pa-5">
          <v-container>
            <v-card-title class="justify-center green--text">
              <h2>
                TPC Ativos
              </h2>
            </v-card-title>
            <center>
              <v-btn v-if="!show" text @click="show = !show"
                ><span>Mostrar Ajuda</span
                ><v-icon color="#009263"> mdi-help-circle </v-icon>
              </v-btn>
              <v-btn v-else text @click="show = !show">Esconder Ajuda</v-btn>
            </center>
            <v-slide-y-transition>
              <v-card
                v-show="show"
                class="elevation-6 pa-3"
                style="border: 2px solid green !important;"
                color="grey lighten-3"
              >
                <v-row>
                  <v-col cols="12">
                    <span>
                      1. Aqui pode visualizar a lista de TPC que estão ativos,
                      ordenados segundo o prazo de expiração começando pelo que
                      expirará primeiro.
                    </span>
                  </v-col>
                  <v-col cols="12">
                    <span>
                      2. Para cada TPC, estão disponíveis as seguintes
                      informações: o
                      <b>Título do TPC</b>; o número dos alunos que já
                      realizaram pelo menos uma tentativa de resolução (<b
                        style="color:green;"
                        >N.º Respostas</b
                      >); assim como a data e hora limite de expiração do TPC
                      (<b style="color:#960000;">Data Limite</b>).
                    </span>
                  </v-col>
                  <v-col cols="12">
                    <span>
                      3. Pode aceder à página de informações de cada TPC em
                      <v-btn icon dark color="#009263">
                        <v-icon>
                          mdi-magnify
                        </v-icon></v-btn
                      >, assim como à página de resultados dos alunos que já
                      realizaram o TPC em
                      <v-btn small rounded dark color="#009263"
                        >Resultados</v-btn
                      >.
                    </span>
                  </v-col>
                </v-row>
              </v-card>
            </v-slide-y-transition>
            <br v-if="show" />
            <v-card-text>
              <v-container v-if="loading">
                <center>
                  <v-img
                    :src="require('@/assets/loading.gif')"
                    width="150px"
                    heigth="150px"
                  >
                  </v-img>
                </center>
              </v-container>
              <v-list v-else-if="tpcs.length > 0">
                <template v-for="item in tpcs">
                  <v-list-item :key="item.id">
                    <v-list-item-content>
                      <v-list-item-title>
                        <b
                          ><span>{{ item.tagname }}</span></b
                        >
                        <span>
                          <v-tooltip top>
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn
                                v-bind="attrs"
                                v-on="on"
                                icon
                                @click="copyTPC(item.id)"
                                color="#009263"
                              >
                                <v-icon small>
                                  mdi-content-copy
                                </v-icon>
                              </v-btn>
                            </template>
                            <span>Copiar TPC</span>
                          </v-tooltip>
                        </span>
                      </v-list-item-title>
                      <b
                        ><span style="color:green;">N.º Respostas: </span>
                        {{ respFormat(item) }}
                      </b>
                      <b
                        ><span style="color:#960000;">Data Limite: </span>
                        {{ dataFormat(item.dataFim) }}</b
                      >
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-tooltip top>
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            v-bind="attrs"
                            v-on="on"
                            icon
                            @click="checkTPC(item.id)"
                            dark
                            color="#009263"
                          >
                            <v-icon large>
                              mdi-magnify
                            </v-icon></v-btn
                          >
                        </template>
                        <span>Ver TPC</span>
                      </v-tooltip>
                    </v-list-item-action>
                    <v-list-item-action>
                      <v-btn
                        small
                        @click="results(item.id)"
                        rounded
                        dark
                        color="#009263"
                        >Resultados</v-btn
                      >
                    </v-list-item-action>
                  </v-list-item>
                  <v-divider :key="`div${item.id}`"></v-divider>
                </template>
              </v-list>
              <v-container v-else>
                <h2 style="text-align: center; color:#666666;">
                  {{ noTpcs }}
                </h2>
              </v-container>
            </v-card-text>
          </v-container>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
const axios = require("axios");
const host = require("@/config/hosts").hostAPI;

export default {
  async created() {
    await this.getUser();
    this.getTpcs();
  },
  data() {
    return {
      show: false,
      tpcs: [],
      user: null,
      tpcsFlag: "loading",
      loading: false,
    };
  },
  computed: {
    noTpcs() {
      if (this.tpcsFlag === "loading") return "";
      return this.tpcsFlag;
    },
  },
  methods: {
    copyTPC(id) {
      this.$router.push({
        name: "CreateTpc",
        params: { id },
      });
    },
    respFormat(tpc) {
      return `${tpc.totalResp}/${tpc.totalAlunos}`;
    },
    dataFormat(date) {
      const datetime = new Date(date);
      // data
      const month =
        (datetime.getMonth() + 1 < 10 ? "0" : "") + (datetime.getMonth() + 1);
      const day = (datetime.getDate() < 10 ? "0" : "") + datetime.getDate();

      const data = `${day}-${month}-${datetime.getFullYear()}`;

      // tempo
      const hours = (datetime.getHours() < 10 ? "0" : "") + datetime.getHours();
      const minutes =
        (datetime.getMinutes() < 10 ? "0" : "") + datetime.getMinutes();

      const tempo = `${hours}:${minutes}`;
      return `${data} ● ${tempo}`;
    },
    checkTPC(id) {
      this.$router.push({ name: "SeeTPC", params: { id } });
    },
    results(id) {
      this.$router.push({ name: "TheResults", params: { id } });
    },
    async getUser() {
      try {
        const userId = this.$store.getters.getUserId;
        const prof = await axios.get(host + "professores/" + userId);
        this.user = prof.data;
      } catch (err) {
        const error = new Error(err.message || "Failed to fetch User");
        throw error;
      }
    },
    async getTpcs() {
      try {
        this.loading = true;
        const response = await axios.get(
          host + "tpcs/prof/" + this.user.codigo + "?time=active"
        );
        this.tpcs = response.data;

        if (this.tpcs.length === 0)
          this.tpcsFlag = "De momento não tem TPC ativos.";
        this.loading = false;
      } catch (err) {
        const error = new Error(err.message || "Failed to fetch TPCs");
        throw error;
      }
    },
  },
};
</script>

<style></style>
