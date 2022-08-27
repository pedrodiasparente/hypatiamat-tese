<template>
  <v-app id="inspire">
    <v-main class="grey lighten-3">
      <v-container>
        <v-card class="pa-5">
          <v-container>
            <v-card-title class="justify-center green--text">
              <h2>Resultados TPC: {{ this.tpcNome }}</h2>
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
                      1. Esta página contém a tabela com dados sobre os
                      resultados dos alunos que realizaram o TPC selecionado.
                    </span>
                  </v-col>
                  <v-col cols="12">
                    <span>
                      2. Para cada entrada da tabela, pode aceder às respostas
                      do respetivo aluno, clicando em
                      <v-btn icon dark color="#009263">
                        <v-icon>
                          mdi-magnify
                        </v-icon></v-btn
                      >. Estas respostas correspondem
                      <b>
                        à última tentativa de resolução do TPC, por parte do
                        aluno</b
                      >.
                    </span>
                  </v-col>
                  <v-col cols="12">
                    <span>
                      3. Existe também a possibilidade de ordenar as linhas da
                      tabela, por valor de coluna, para uma melhor visualização
                      (ao clicar no nome da coluna).
                    </span>
                  </v-col>
                  <v-col cols="9">
                    <v-card class="mx-auto" color="grey lighten-4">
                      <center>
                        <h3 class="green--text">Legenda da Tabela:</h3>
                      </center>
                      <ul>
                        <li>
                          <span> <b>Nº</b> - Número do aluno; </span>
                        </li>
                        <li>
                          <span> <b>Aluno</b> - Nome do aluno; </span>
                        </li>
                        <li>
                          <span> <b>Turma</b> - Turma do aluno; </span>
                        </li>
                        <li>
                          <span>
                            <b>Tentativa Nº</b> - Número da tentativa à qual
                            corresponde a resolução do aluno;
                          </span>
                        </li>
                        <li>
                          <span>
                            <b>Q. Corretas</b> - Número de questões respondidas
                            corretamente, em razão com o número total de
                            questões do TPC;
                          </span>
                        </li>
                        <li>
                          <span>
                            <b>Classificação (%)</b> - Percentagem calculada
                            através da razão entre questões corretas e questões
                            respondidas;
                          </span>
                        </li>
                        <li>
                          <span>
                            <b>Respostas</b> - Respostas do aluno aquando da
                            resolução do TPC.
                          </span>
                        </li>
                      </ul>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card>
            </v-slide-y-transition>
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
            <v-data-table
              v-else
              no-data-text="Não existem resoluções"
              :footer-props="{
                'items-per-page-text': 'Mostrar',
                'items-per-page-options': [30, 60, -1],
                'items-per-page-all-text': 'Todos',
              }"
              dense
              :headers="headers"
              :items="results"
              class="elevation-1"
            >
              <template v-slot:top>
                <v-dialog
                  content-class="elevation-0"
                  :retain-focus="false"
                  v-model="dialogResp"
                  max-width="1200px"
                >
                  <v-card>
                    <v-card-title
                      style="background-color: #009263;"
                      class="white--text"
                    >
                      Aluno: {{ atualAlunoNome }}
                    </v-card-title>

                    <v-card-text>
                      <AlunoResol
                        v-if="dialogResp"
                        :tpcId="id"
                        :codAluno="atualAlunoCod"
                      />
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions class="justify-center">
                      <v-btn color="#009263" text @click="dialogResp = false">
                        OK
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </template>
              <template v-slot:[`item.action`]="{ item }">
                <v-btn
                  @click="verResolucao(item)"
                  icon
                  class="ml-4"
                  small
                  dark
                  color="#009263"
                >
                  <v-icon large>
                    mdi-magnify
                  </v-icon></v-btn
                >
              </template>
            </v-data-table>
            <v-card-actions>
              <v-row justify="start" class="mt-5 ml-4">
                <v-btn @click="voltar" dark color="#009263" x-large>
                  Voltar
                </v-btn>
              </v-row>
            </v-card-actions>
          </v-container>
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
  props: ["id"],
  components: {
    AlunoResol,
  },
  created() {
    this.getUserId();
    this.getResults();
  },
  data() {
    return {
      loading: false,
      show: false,
      user: null,
      tpcNome: "",
      atualAlunoNome: "",
      atualAlunoCod: null,
      respostas: [],
      dialogResp: false,
      userId: null,
      headers: [
        { text: "Nº", value: "numero", class: "subtitle-2" },
        {
          text: "Aluno",
          align: "start",
          value: "nome",
          class: "subtitle-2",
        },

        { text: "Turma", value: "codTurma", class: "subtitle-2" },
        { text: "Tentativa Nº", value: "tentativa", class: "subtitle-2" },

        {
          text: "Q. Corretas",
          value: "qCertas",
          class: "subtitle-2",
          sortable: false,
        },
        {
          text: "Classificação (%)",
          value: "classificacao",
          class: "subtitle-2",
        },

        {
          text: "Respostas",
          value: "action",
          sortable: false,
          class: "subtitle-2",
        },
      ],
      results: [],
    };
  },
  computed: {},
  methods: {
    voltar() {
      window.history.length > 2
        ? this.$router.go(-1)
        : this.$router.push("/dashboard");
    },
    verResolucao(aluno) {
      this.atualAlunoCod = aluno.codAluno;
      this.atualAlunoNome = aluno.nome;
      this.dialogResp = true;
    },
    async getResults() {
      try {
        this.loading = true;
        const tpcs = await axios.get(host + "tpcs/" + this.id);

        this.tpcNome = tpcs.data.tagname;

        const alunos = tpcs.data["tpc_alunos"];

        let ind = 0;
        for (const al of alunos) {
          const aluno = await axios.get(host + "tpc-alunos/" + al.codAluno);

          // Ultima tentativa de resolucao do aluno
          const resol = aluno.data.resolucoes
            .filter((r) => r.idTpc == this.id)
            .reduce((a, b) => (a.data > b.data ? a : b), {});

          if (Object.keys(resol).length > 0) {
            const result = {
              nome: al.nome,
              numero: al.numero,
              codAluno: al.codAluno,
              codTurma: al.codTurma,
              tentativa: resol.tentativa,
              qCertas: resol.qCertas + "/" + resol.qRespondidas,
              classificacao: resol.classificacao,
            };
            this.$set(this.results, ind, result);
            ind++;
          }
        }
        this.loading = false;
      } catch (err) {
        const error = new Error(err.message || "Failed to fetch TPCs");
        throw error;
      }
    },
    async getUserId() {
      this.userId = this.$store.getters.getUserId;

      const prof = await axios.get(host + "professores/" + this.userId);
      this.user = prof.data;
    },
  },
};
</script>

<style></style>
