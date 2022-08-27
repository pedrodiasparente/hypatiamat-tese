<template>
  <v-app id="inspire">
    <v-main class="grey lighten-3">
      <v-container>
        <v-card class="pa-5">
          <v-card-title class="justify-center green--text">
            <h2>Estatísticas Professor</h2>
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
                    os TPC resolvidos pelos alunos, organizados por ano letivo e
                    turma.
                  </span>
                </v-col>
                <v-col cols="12">
                  <span>
                    2. Primeiramente, selecione o ano letivo que pretende e caso
                    existam turmas, selecione a turma desejada através da
                    seleção nos respetivos campos.
                  </span>
                </v-col>
                <v-col cols="12">
                  <span>
                    3. Após seleção do ano e turma, selecione no campo "TPC" um
                    TPC específico, ou se pretender estatísticas sobre todos os
                    TPC daquela turma, selecione a opção "Todos". No caso do
                    campo "TPC" estar vazio, significa que não tem TPC criados
                    para a turma selecionada.
                  </span>
                </v-col>
                <v-col cols="12">
                  <span>
                    4. Existe também a possibilidade de ordenar as linhas da
                    tabela, por valor de coluna, para uma melhor visualização
                    (ao clicar no nome da coluna).
                  </span>
                </v-col>
                <v-col cols="9">
                  <v-card class="mx-auto" color="grey lighten-4">
                    <center>
                      <h3 class="green--text">Legenda da Tabela</h3>
                    </center>
                    <ul>
                      <li>
                        <span> <b>N.º</b> - Número do aluno; </span>
                      </li>
                      <li>
                        <span> <b>Aluno</b> - Nome do aluno; </span>
                      </li>
                      <li>
                        <span>
                          <b>N.º TPC</b> - Número de TPC realizados por cada
                          aluno (apenas quando selecionar a opção "Todos");
                        </span>
                      </li>
                      <li>
                        <span>
                          <b>Q. Corretas</b> - Razão entre o número de questões
                          respondidas corretamente, e o número total de questões
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
                <v-combobox
                  v-model="anoSel"
                  label="Ano Letivo"
                  color="#009263"
                  item-color="green"
                  :items="anos"
                  @change="changeAno"
                ></v-combobox>
                <v-combobox
                  v-model="turmaSel"
                  label="Turma"
                  color="#009263"
                  item-color="green"
                  :items="turmas"
                  @change="changeTurma"
                ></v-combobox>
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
const anoletivoAtual = require("@/config/confs").anoletivo;
const anosletivos = require("@/config/confs").anosletivos;

export default {
  created() {
    this.getUserId();
    this.getTurmas();
  },
  data() {
    return {
      catalogoAnos: {},
      catalogoTurmas: {},
      userId: null,
      results: [],
      anos: anosletivos,
      turmas: [],
      tpcs: [],
      anoSel: anoletivoAtual,
      turmaSel: null,
      tpcSel: null,
      loading: false,
      show: false,
      headers: [
        { text: "N.º", value: "numero", class: "subtitle-1" },
        { text: "Aluno", value: "nome", class: "subtitle-1" },
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
    getUserId() {
      this.userId = this.$store.getters.getUserId;
    },
    async getTurmas() {
      try {
        const response = await axios.get(
          host + "turmas/prof/" + this.userId + "/ano"
        );

        this.catalogoAnos = response.data;

        this.turmas = this.catalogoAnos[anoletivoAtual];

        const response2 = await axios.get(
          host + "tpcs/prof/" + this.userId + "/turmas"
        );

        this.catalogoTurmas = response2.data;
      } catch (err) {
        const error = new Error(err.message || "Failed to query Turmas");
        throw error;
      }
    },
    changeAno() {
      this.turmaSel = null;
      this.tpcSel = null;
      this.tpcs = [];
      this.results = [];

      this.turmas = this.catalogoAnos[this.anoSel];
    },
    changeTurma() {
      this.tpcSel = null;
      this.tpcs = [];
      this.results = [];
      if (this.turmaSel in this.catalogoTurmas)
        this.tpcs = [
          "Todos",
          ...this.catalogoTurmas[this.turmaSel].map(
            (el) => el.tpcId + " - " + el.tpcName
          ),
        ];
    },
    async changeTpc() {
      try {
        this.loading = true;
        this.results = [];
        if (this.tpcSel === "Todos") {
          const alunos = await axios.get(
            host + "tpcs/prof/" + this.userId + "/stats?turma=" + this.turmaSel
          );

          for (const al of Object.values(alunos.data)) {
            // filtrar alunos da turma
            if (al.codTurma === this.turmaSel) {
              const result = {
                nome: al.nome,
                numero: al.numero,
                tpcs: al.stats.tpcs,
                corretas: al.stats.qCorretas + "/" + al.stats.qRespondidas,
                classif: al.stats.classif.toFixed(2),
              };

              this.results.push(result);
            }
          }
        } else {
          const tpcId = this.tpcSel.split(" - ")[0];
          const alunos = await axios.get(host + "tpcs/" + tpcId + "/stats");

          for (const al of alunos.data) {
            // filtrar alunos da turma
            if (al.codTurma === this.turmaSel) {
              const result = {
                nome: al.nome,
                numero: al.numero,

                tpcs: "-",
                corretas: al.stats.qCorretas + "/" + al.stats.qRespondidas,
                classif: al.stats.classif.toFixed(2),
              };

              this.results.push(result);
            }
          }
        }
        this.loading = false;
      } catch (err) {
        const error = new Error(err.message || "Failed to query TPC");
        throw error;
      }
    },
  },
};
</script>

<style></style>
