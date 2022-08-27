<template>
  <v-app id="inspire">
    <v-main class="grey lighten-3">
      <v-container>
        <v-card class="pa-5">
          <v-card-title class="justify-center green--text">
            <h2>
              TPC Expirados
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
                    1. Aqui, podes visualizar a lista de TPC que já não se
                    encontram ativos, ordenados segundo o prazo de expiração
                    começando pelo que expirou mais recentemente.
                  </span>
                </v-col>
                <v-col cols="12">
                  <span>
                    2. Para cada TPC, estão disponíveis as seguintes
                    informações: o
                    <b>Título do TPC</b>; a classificação que obtiveste na sua
                    resolução (<b style="color:green;">Classificação</b>); assim
                    como a data e hora limite de expiração do TPC (<b
                      style="color:#960000;"
                      >Data Limite</b
                    >).
                  </span>
                </v-col>
                <v-col cols="12">
                  <span>
                    3. Podes aceder à página de informações de cada TPC em
                    <v-btn icon dark color="#009263">
                      <v-icon>
                        mdi-magnify
                      </v-icon></v-btn
                    >, assim como visualizar a tua tentativa de resolução e as
                    respostas que apresentaste, em
                    <v-btn small rounded dark color="#009263">Resolução</v-btn>.
                    Caso não tenhas efetuado qualquer tentativa de resolução,
                    irá aparecer o ícone de TPC não realizado
                    <v-icon color="red">mdi-close-circle</v-icon>.
                  </span>
                </v-col>
              </v-row>
            </v-card>
          </v-slide-y-transition>
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
                    <v-list-item-title
                      ><b>{{ item.tagname }}</b></v-list-item-title
                    >

                    <b>
                      <span style="color:green;">Classificação (%): </span>
                      {{ classificacao(item.id) }}
                    </b>
                    <b
                      ><span style="color:#960000;">Expirou a: </span>
                      {{ dataFormat(item.dataFim) }}</b
                    >
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-tooltip top>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          v-bind="attrs"
                          v-on="on"
                          small
                          @click="checkTPC(item.id)"
                          icon
                          dark
                          color="#009263"
                          ><v-icon x-large> mdi-magnify</v-icon></v-btn
                        >
                      </template>
                      <span>Ver TPC</span>
                    </v-tooltip>
                  </v-list-item-action>
                  <v-list-item-action>
                    <v-dialog
                      v-if="temResol(item.id)"
                      content-class="elevation-0"
                      :retain-focus="false"
                      v-model="dialogResp"
                      max-width="1200px"
                    >
                      <template #activator="{ on: dialog }">
                        <v-btn
                          :disabled="item.configResolucao"
                          small
                          @click="verResolucao(item)"
                          color="#009263"
                          :dark="!item.configResolucao"
                          v-on="{ ...dialog }"
                          rounded
                          >Resolução</v-btn
                        >
                      </template>

                      <v-card>
                        <v-card-title
                          style="background-color: #009263;"
                          class="white--text"
                        >
                          Aluno: {{ nomeAluno }}
                        </v-card-title>

                        <v-card-text>
                          <AlunoResol
                            v-if="dialogResp"
                            :tpcId="tpcAtual.id"
                            :codAluno="userId"
                          />
                        </v-card-text>

                        <v-divider></v-divider>

                        <v-card-actions class="justify-center">
                          <v-btn
                            color="#009263"
                            text
                            @click="dialogResp = false"
                          >
                            OK
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                    <div class="mx-8" v-else>
                      <v-tooltip top>
                        <template v-slot:activator="{ on, attrs }">
                          <v-icon x-large color="red" v-bind="attrs" v-on="on"
                            >mdi-close-circle</v-icon
                          >
                        </template>
                        <span>Não Resolveu</span>
                      </v-tooltip>
                    </div>
                  </v-list-item-action>
                </v-list-item>
                <v-divider :key="`div${item.id}`"></v-divider>
              </template>
            </v-list>
            <v-container v-else>
              <h2 style="text-align: center;">
                {{ noTpcs }}
              </h2>
            </v-container>
          </v-card-text>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
const axios = require("axios");
const host = require("@/config/hosts").hostAPI;

import AlunoResol from "../components/AlunoResol.vue";

export default {
  components: {
    AlunoResol,
  },
  created() {
    this.getUserId();
    this.getTpcs();
  },
  data() {
    return {
      show: false,
      tpcs: [],
      resolucoes: [],
      user: null,
      userId: null,
      dialogResp: false,
      tpcsFlag: "loading",
      tpcAtual: null,
      loading: false,
    };
  },
  computed: {
    noTpcs() {
      if (this.tpcsFlag === "loading") return "";
      return this.tpcsFlag;
    },
    nomeAluno() {
      if (!this.user) return "";
      return this.user.nome;
    },
  },
  methods: {
    checkTPC(id) {
      this.$router.push({ name: "SeeTPC", params: { id } });
    },
    temResol(idTpc) {
      const resol = this.resolucoes.filter((r) => r.idTpc === idTpc);
      if (resol.length === 0) return false;
      return true;
    },
    verResolucao(tpc) {
      this.tpcAtual = tpc;

      this.dialogResp = true;
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
    classificacao(idTpc) {
      const classif = this.resolucoes
        .filter((r) => r.idTpc === idTpc)
        .reduce((a, b) => (a.data > b.data ? a : b), {});
      if (Object.keys(classif).length === 0) return "Não Realizou";
      return classif.classificacao;
    },
    async getTpcs() {
      try {
        this.loading = true;
        const tpcsAluno = await axios.get(
          host + "tpc-alunos/" + this.userId + "/tpcs?time=expired"
        );

        if (tpcsAluno.data !== "Not Found") {
          this.tpcs = tpcsAluno.data;
          const aluno = await axios.get(host + "tpc-alunos/" + this.userId);

          this.resolucoes = aluno.data.resolucoes;
          this.tpcsFlag = "";
        }
        this.loading = false;
        if (this.tpcs.length === 0)
          this.tpcsFlag = "De momento não tem TPC expirados.";
      } catch (err) {
        const error = new Error(err.message || "Failed to fetch TPCs");
        throw error;
      }
    },
    async getUserId() {
      this.userId = this.$store.getters.getUserId;

      const aluno = await axios.get(host + "alunos/" + this.userId);
      this.user = aluno.data;
    },
  },
};
</script>

<style scoped></style>
