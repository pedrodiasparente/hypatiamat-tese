<template>
  <v-app id="inspire">
    <v-main class="grey lighten-3">
      <v-container>
        <v-card class="pa-5">
          <v-card-title class="justify-center green--text">
            <h2>Estatísticas Aluno</h2>
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
              <v-row class="justify-center">
                <v-col cols="12">
                  <span>
                    1. Esta página disponibiliza estatísticas em tabela, sobre
                    os TPC que realizaste e cujos prazos já se encontram
                    expirados.
                  </span>
                </v-col>
                <v-col cols="12">
                  <span>
                    2. Para visualizar as estatísticas, seleciona no campo
                    <b>TPC</b>
                    um TPC específico ou, se pretenderes estatísticas sobre
                    todos os teus TPC, seleciona a opção "Todos". Caso este
                    campo se encontre vazio, significa que não tens TPC
                    disponíveis.
                  </span>
                </v-col>
                <v-col cols="12">
                  <span>
                    3. Se selecionares um TPC específico e não existirem dados
                    disponíveis na tabela, significa que não realizaste esse
                    TPC.
                  </span>
                </v-col>
                <v-col cols="9">
                  <v-card class="mx-auto" color="grey lighten-4">
                    <center>
                      <h3 class="green--text">Legenda da Tabela:</h3>
                    </center>
                    <ul>
                      <li>
                        <span>
                          <b>Professor</b> - Professor que criou o TPC (apenas
                          quando selecionares um TPC específico);
                        </span>
                      </li>
                      <li>
                        <span>
                          <b>Tentativa N.º</b> - Número da tentativa a que
                          corresponde a resolução (apenas quando selecionares um
                          TPC específico);
                        </span>
                      </li>
                      <li>
                        <span>
                          <b>N.º TPC</b> - Número de TPC realizados (apenas
                          quando selecionares a opção "Todos");
                        </span>
                      </li>
                      <li>
                        <span>
                          <b>Q. Corretas</b> - Razão entre o número de questões
                          respondidas corretamente e o número total de questões
                          de um TPC ou de todos os TPC;
                        </span>
                      </li>
                      <li>
                        <span>
                          <b>Classificação (%)</b> - Razão entre o número de
                          questões respondidas corretamente e o número total de
                          questões de um TPC ou de todos os TPC (em
                          percentagem).
                        </span>
                      </li>
                    </ul>
                  </v-card>
                </v-col>
              </v-row>
            </v-card>
          </v-slide-y-transition>
          <br />
          <center>
            <v-container style="width:80%">
              <v-card class="pa-5">
                <v-container>
                  <p><b>Aluno: </b> {{ nome }}</p>
                  <p><b>Turma:</b> {{ turma }}</p>
                </v-container>
                <v-combobox
                  v-model="tpcSel"
                  label="TPC"
                  color="#009263"
                  item-color="green"
                  :items="tpcs"
                  @change="changeTpc"
                ></v-combobox>
              </v-card>
            </v-container>
          </center>
          <br />
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
          <v-container v-else>
            <v-data-table
              no-data-text="Não existem Dados"
              :footer-props="{
                'items-per-page-text': 'Mostrar',
                'items-per-page-options': [30, 60, -1],
                'items-per-page-all-text': 'Todos',
              }"
              dense
              :headers="headers"
              :items="results"
              class="elevation-1"
              color="#009263"
            >
            </v-data-table>
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
  created() {
    this.getUser();
    this.getTpcs();
  },
  data() {
    return {
      nome: null,
      turma: null,
      userId: null,
      tpcs: [],
      tpcSel: null,
      loading: false,
      show: false,
      results: [],
      headers: [
        { text: "Professor", value: "prof", class: "subtitle-1" },
        { text: "Tentativa N.º", value: "tentativa", class: "subtitle-1" },
        { text: "N.º TPC", value: "tpcs", class: "subtitle-1" },
        {
          text: "Q. Corretas",
          value: "corretas",
          class: "subtitle-1",
          sortable: false,
        },
        { text: "Classificação (%)", value: "classif", class: "subtitle-1" },
      ],
    };
  },
  computed: {},
  methods: {
    async getUser() {
      try {
        this.userId = this.$store.getters.getUserId;

        const response = await axios.get(host + "alunos/" + this.userId);

        this.nome = response.data.nome;
        this.turma = response.data.turma;
      } catch (err) {
        const error = new Error(err.message || "Failed to query User");
        throw error;
      }
    },
    async getTpcs() {
      try {
        const response = await axios.get(
          host + "tpc-alunos/" + this.userId + "/tpcs?time=expired"
        );

        if (response.data !== "Not Found" && response.data.length > 0) {
          this.tpcs = [
            "Todos",
            ...response.data.map((el) => el.id + " - " + el.tagname),
          ];
        }
      } catch (err) {
        const error = new Error(err.message || "Failed to query TPCs");
        throw error;
      }
    },
    async changeTpc() {
      try {
        this.loading = true;
        this.results = [];
        if (this.tpcSel === "Todos") {
          const aluno = await axios.get(
            host + "tpc-alunos/" + this.userId + "/stats"
          );

          if (Object.keys(aluno.data.stats).length > 0) {
            const result = {
              prof: "-",
              tentativa: "-",
              tpcs: aluno.data.stats.tpcs,
              corretas:
                aluno.data.stats.qCorretas +
                "/" +
                aluno.data.stats.qRespondidas,
              classif: aluno.data.stats.classif.toFixed(2),
            };

            this.results.push(result);
          }
        } else {
          const tpcId = this.tpcSel.split(" - ")[0];
          const tpc = await axios.get(
            host + "tpc-alunos/" + this.userId + "/tpcs/" + tpcId + "/stats"
          );

          const prof = await axios.get(
            host + "professores/" + tpc.data.codProf
          );

          if (Object.keys(tpc.data.stats).length > 0) {
            const result = {
              prof: prof.data.nome,
              tentativa: tpc.data.stats.tentativa,
              tpcs: "-",
              corretas:
                tpc.data.stats.qCorretas + "/" + tpc.data.stats.qRespondidas,
              classif: tpc.data.stats.classif,
            };

            this.results.push(result);
          }
        }
        this.loading = false;
      } catch (err) {
        const error = new Error(err.message || "Failed to query Stats");
        throw error;
      }
    },
  },
};
</script>

<style></style>
