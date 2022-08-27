<template>
  <v-app id="inspire">
    <v-main class="grey lighten-3">
      <v-container>
        <v-card class="pa-5">
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
                    1. Aqui podes visualizar a lista de TPC que estão ativos,
                    ordenados segundo o prazo de expiração começando pelo que
                    expirará primeiro.
                  </span>
                </v-col>
                <v-col cols="12">
                  <span>
                    2. Em cada TPC, estão disponíveis as seguintes informações:
                    o
                    <b>Título do TPC</b>; o nº de tentativas que ainda te restam
                    (<b style="color:green;">Nº Tentativas</b>); assim como a
                    data e hora limite de expiração do TPC (<b
                      style="color:#960000;"
                      >Data Limite</b
                    >).
                  </span>
                </v-col>
                <v-col cols="12">
                  <span>
                    3. Para realizares um TPC, acede ao botão
                    <v-btn rounded small dark color="#009263">Resolver </v-btn>.
                    Este botão estará disponível sempre que ainda houver
                    tentativas de resolução disponíveis. Caso já tenhas
                    utilizado todas as tentativas de resolução permitidas,
                    aparecerá apenas o ícone de TPC resolvido
                    <v-icon color="green"> mdi-checkbox-marked-circle </v-icon>,
                    não sendo possível efetuares mais nenhuma tentativa.
                  </span>
                </v-col>
                <v-col cols="12">
                  <span>
                    4. Nota que sempre que efetuares uma nova tentativa de
                    resolução, estarás a
                    <b>descartar a tentativa anterior.</b>.
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

                    <b
                      ><span style="color:green;">Nº Tentativas: </span>
                      {{ tentativas(item) }}
                    </b>
                    <b
                      ><span style="color:#960000;">Data Limite: </span>
                      {{ dataFormat(item.dataFim) }}</b
                    >
                  </v-list-item-content>
                  <div>
                    <v-list-item-action>
                      <div v-if="podeFazer(item)">
                        <v-tooltip top>
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn
                              @click="fazerTpc(item)"
                              rounded
                              small
                              dark
                              color="#009263"
                              v-bind="attrs"
                              v-on="on"
                              >Resolver
                            </v-btn>
                          </template>
                          <span>Nova Tentativa</span>
                        </v-tooltip>
                      </div>
                      <div v-else>
                        <v-tooltip top>
                          <template v-slot:activator="{ on, attrs }">
                            <v-icon
                              class="mr-6"
                              x-large
                              color="green"
                              v-bind="attrs"
                              v-on="on"
                            >
                              mdi-checkbox-marked-circle
                            </v-icon>
                          </template>
                          <span>TPC Resolvido</span>
                        </v-tooltip>
                      </div>
                    </v-list-item-action>
                  </div>
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
const Swal = require("sweetalert2");
const host = require("@/config/hosts").hostAPI;

export default {
  async created() {
    await this.getUser();
    this.getTpcs();
  },
  computed: {
    noTpcs() {
      if (this.tpcsFlag === "loading") return "";
      return this.tpcsFlag;
    },
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
  methods: {
    podeFazer(tpc) {
      if (tpc.nResol >= tpc.tentativas) return false;
      return true;
    },
    tentativas(tpc) {
      return `${tpc.nResol}/${tpc.tentativas}`;
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
    fazerTpc(tpc) {
      if (tpc.nResol > 0)
        Swal.fire({
          title: "Realizar Nova Tentativa?",
          text:
            "Já submeteu uma tentativa de resolução do TPC, uma nova tentativa irá descartar a anterior.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#009263",
          cancelButtonColor: "#d33",
          confirmButtonText: "Confirmar",
          cancelButtonText: "Cancelar",
        }).then(async (result) => {
          if (result.isConfirmed)
            this.$router.push({ name: "DoTpc", params: { id: tpc.id } });
        });
      else this.$router.push({ name: "DoTpc", params: { id: tpc.id } });
    },
    async getUser() {
      try {
        const userId = this.$store.getters.getUserId;
        const aluno = await axios.get(host + "alunos/" + userId);
        this.user = aluno.data;
      } catch (err) {
        const error = new Error(err.message || "Failed to fetch User");
        throw error;
      }
    },
    async getTpcs() {
      try {
        this.loading = true;
        const tpcsAluno = await axios.get(
          host + "tpc-alunos/" + this.user.user + "/tpcs?time=active"
        );
        if (tpcsAluno.data !== "Not Found") {
          let tpcs = tpcsAluno.data;
          this.tpcs = tpcs;
          this.tpcsFlag = "";
        }
        if (this.tpcs.length === 0)
          this.tpcsFlag = "De momento não tens TPC ativos.";
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
