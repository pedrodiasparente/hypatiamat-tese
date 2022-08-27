<template>
  <v-app id="inspire">
    <v-main class="grey lighten-3">
      <v-container>
        <v-card class="pa-5">
          <v-row>
            <v-col cols="12" sm="12" md="12" lg="12" xl="12">
              <v-card-title class="justify-center green--text">
                <h1>TPC: {{ titulo }}</h1>
              </v-card-title>
            </v-col>
          </v-row>
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
                    1. Esta é a página de resolução de um TPC. Para navegar
                    entre as questões utilize
                    <v-btn small dark rounded color="#009263">
                      <v-icon>
                        mdi-arrow-left-bold-circle
                      </v-icon>
                    </v-btn>
                    e
                    <v-btn small dark rounded color="#009263">
                      <v-icon>
                        mdi-arrow-right-bold-circle
                      </v-icon> </v-btn
                    >, ou clique numa questão para selecioná-la (ex.
                    <v-chip color="#009263" dark>
                      <span>
                        <b>Questão 1</b>
                      </span> </v-chip
                    >).
                  </span>
                </v-col>
                <v-col cols="12">
                  <span>
                    2. A navegação estará condicionada consoante as opções de
                    configuração do TPC. No caso em que não seja possível
                    retroceder nas questões, terá que responder por ordem a cada
                    questão, sendo que após passar para a próxima questão
                    <b
                      >não terá possibilidade de alterar respostas anteriores</b
                    >
                    (apenas o botão
                    <v-btn small dark rounded color="#009263">
                      <v-icon>
                        mdi-arrow-right-bold-circle
                      </v-icon>
                    </v-btn>
                    estará disponível neste cenário).
                  </span>
                </v-col>
                <v-col cols="12">
                  <span>
                    3. No caso de estar perante uma questão de cálculo de uma
                    amplitude (ângulo), irá ter o botão
                    <v-btn dark small rounded color="#009263"
                      >Transferidor</v-btn
                    >
                    que disponibiliza um transferidor, podendo movê-lo e rodá-lo
                    livremente para o cálculo da amplitude.
                  </span>
                </v-col>
                <v-col cols="12">
                  <span>
                    4. É necessário responder a todas as questões do TPC para
                    poder submetê-lo. Assim que esteja satisfeito com as suas
                    respostas, clique no botão
                    <v-btn small class="white--text" color="#009263"
                      >Submeter</v-btn
                    >.
                  </span>
                </v-col>
              </v-row>
            </v-card>
          </v-slide-y-transition>
          <br />
          <v-row>
            <v-col cols="12" sm="6" md="6" lg="6" xl="6">
              <v-container>
                <p><b>Aluno: </b> {{ userName }} <b>Turma:</b> {{ turma }}</p>
              </v-container>
            </v-col>
            <v-col cols="12" sm="6" md="6" lg="6" xl="6">
              <v-container>
                <p><b>Professor: </b> {{ profName }}</p>
              </v-container>
            </v-col>
          </v-row>
          <v-row class="mb-6">
            <v-col cols="12" sm="12" md="12" lg="12" xl="12">
              <v-sheet class="my-n6">
                <v-slide-group mandatory show-arrows center-active>
                  <v-slide-item
                    v-for="(q, index) in catalogoQuestoes"
                    :key="index"
                    v-slot="{ active, toggle }"
                  >
                    <v-chip
                      :disabled="configRetroceder"
                      color="#009263"
                      ref="chips"
                      large
                      dark
                      class="mx-2"
                      :input-value="active"
                      active-class="black--text"
                      @click="toggle"
                      v-on:click="questaoSelected(q, index)"
                    >
                      <span>
                        <b>Questão {{ index + 1 }}</b>
                      </span>
                    </v-chip>
                  </v-slide-item>
                </v-slide-group>
              </v-sheet>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="6" md="6" lg="6" xl="6">
              <v-text-field
                v-model="tema"
                readonly
                label="Tema"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6" lg="6" xl="6">
              <v-text-field
                v-model="subtema"
                readonly
                label="Subtema"
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="12" md="12" lg="12" xl="12">
              <v-card
                class="mt-n12 mx-auto"
                color="white"
                elevation="2"
                outlined
                rounded
                min-height="500px"
              >
                <v-row>
                  <v-col cols="12" sm="8" md="8" lg="8" xl="8">
                    <v-row>
                      <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                        <h2 style="color:#009263" class="text-center my-2">
                          Questão
                        </h2>

                        <div v-html="questaoAtual" class="mt-5 ml-8 mr-2"></div>

                        <div class="mt-5 ml-8">
                          <v-container v-if="tipoQuestao === 2">
                            <v-radio-group v-model="opcoesSelected[codQuestao]">
                              <v-row>
                                <v-col
                                  v-for="(resp, index) in respostas"
                                  :key="index"
                                  cols="6"
                                  sm="3"
                                  md="3"
                                  lg="3"
                                  xl="3"
                                >
                                  <v-radio color="#009263" :value="resp">
                                    <template slot="label">
                                      <span class="black--text"
                                        >{{ index + 1 }})</span
                                      >
                                    </template>
                                  </v-radio>
                                  <v-img
                                    contain
                                    :src="imgRespostas(resp)"
                                  ></v-img>
                                </v-col>
                              </v-row>
                            </v-radio-group>
                          </v-container>
                          <div class="mt-8 mr-2" v-else-if="tipoQuestao === 1">
                            <v-container class="input my-2">
                              <span v-html="opcoesSelected[codQuestao]"> </span>
                              <span class="unidade" v-html="unidade"></span>
                            </v-container>

                            <SimpleKeyboard
                              @onChange="onChange"
                              :input="opcoesSelected[codQuestao]"
                            />
                          </div>

                          <!-- Vertical Grid -->
                          <div
                            v-else-if="tipoQuestao === 7 && tipoGrid === 'v'"
                          >
                            <v-row>
                              <v-col cols="6">
                                <div style="margin-top:10px;">
                                  <grid-layout
                                    :layout.sync="grid.layoutEsq"
                                    :col-num="21"
                                    :row-height="18"
                                    :is-draggable="grid.draggable"
                                    :is-resizable="grid.resizable"
                                    :vertical-compact="true"
                                    :use-css-transforms="true"
                                  >
                                    <grid-item
                                      :style="corGridEsq(item.i)"
                                      v-for="item in grid.layoutEsq"
                                      :x="item.x"
                                      :y="item.y"
                                      :w="item.w"
                                      :h="item.h"
                                      :i="item.i"
                                      :key="item.i"
                                    >
                                      <button
                                        class="btnItem"
                                        :disabled="disableGridEsq"
                                        @click="clickGrid(item.i)"
                                      ></button>
                                    </grid-item>
                                  </grid-layout>
                                </div>
                              </v-col>
                              <v-divider
                                style="border: 5px solid black;"
                                class="mx-n6"
                                vertical
                              ></v-divider>
                              <v-col cols="6">
                                <div style="margin-top:10px;">
                                  <grid-layout
                                    :layout.sync="grid.layoutDir"
                                    :col-num="21"
                                    :row-height="18"
                                    :is-draggable="grid.draggable"
                                    :is-resizable="grid.resizable"
                                    :vertical-compact="true"
                                    :use-css-transforms="true"
                                  >
                                    <grid-item
                                      :style="corGridDir(item.i)"
                                      v-for="item in grid.layoutDir"
                                      :x="item.x"
                                      :y="item.y"
                                      :w="item.w"
                                      :h="item.h"
                                      :i="item.i"
                                      :key="item.i"
                                    >
                                      <button
                                        class="btnItem"
                                        :disabled="disableGridDir"
                                        @click="clickGrid(item.i)"
                                      ></button>
                                    </grid-item>
                                  </grid-layout>
                                </div>
                              </v-col>
                            </v-row>
                            <br />
                          </div>

                          <!-- Horizontal Grid -->
                          <div
                            v-else-if="tipoQuestao === 7 && tipoGrid === 'h'"
                          >
                            <v-row no-gutters justify="center" align="center">
                              <v-col cols="8">
                                <div class="my-n3">
                                  <grid-layout
                                    :layout.sync="grid.layoutTop"
                                    :col-num="26"
                                    :row-height="17"
                                    :is-draggable="grid.draggable"
                                    :is-resizable="grid.resizable"
                                    :vertical-compact="true"
                                    :use-css-transforms="true"
                                  >
                                    <grid-item
                                      :style="corGridTop(item.i)"
                                      v-for="item in grid.layoutTop"
                                      :x="item.x"
                                      :y="item.y"
                                      :w="item.w"
                                      :h="item.h"
                                      :i="item.i"
                                      :key="item.i"
                                    >
                                      <button
                                        class="btnItem"
                                        :disabled="disableGridTop"
                                        @click="clickGrid(item.i)"
                                      ></button>
                                    </grid-item>
                                  </grid-layout>
                                </div>
                              </v-col>

                              <v-col cols="8">
                                <v-divider
                                  style="border: 5px solid black;"
                                ></v-divider>
                              </v-col>
                              <v-col cols="8">
                                <div class="my-n3">
                                  <grid-layout
                                    :layout.sync="grid.layoutBtm"
                                    :col-num="26"
                                    :row-height="17"
                                    :is-draggable="grid.draggable"
                                    :is-resizable="grid.resizable"
                                    :vertical-compact="true"
                                    :use-css-transforms="true"
                                  >
                                    <grid-item
                                      :style="corGridBtm(item.i)"
                                      v-for="item in grid.layoutBtm"
                                      :x="item.x"
                                      :y="item.y"
                                      :w="item.w"
                                      :h="item.h"
                                      :i="item.i"
                                      :key="item.i"
                                    >
                                      <button
                                        class="btnItem"
                                        :disabled="disableGridBtm"
                                        @click="clickGrid(item.i)"
                                      ></button>
                                    </grid-item>
                                  </grid-layout>
                                </div>
                              </v-col>
                            </v-row>
                            <br />
                          </div>

                          <v-container class="mt-n6" v-else fluid>
                            <v-radio-group v-model="opcoesSelected[codQuestao]">
                              <v-radio
                                color="#009263"
                                v-for="(resp, index) in respostas"
                                :key="index"
                                :value="resp"
                              >
                                <template slot="label">
                                  <span
                                    class="black--text"
                                    v-html="resp"
                                  ></span>
                                </template>
                              </v-radio>
                            </v-radio-group>
                          </v-container>
                        </div>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col class="mt-n2" cols="12" sm="4" md="4" lg="4" xl="4">
                    <v-container>
                      <v-row>
                        <v-col align="left" cols="12" sm="12" lg="6">
                          <div class="selectNivel">
                            <span
                              ><b>Nível {{ nivel }}</b></span
                            >
                          </div>
                        </v-col>
                        <v-col cols="12" sm="12" lg="6">
                          <div>
                            <v-btn
                              v-if="showTransfButton"
                              @click="toggleTransf"
                              dark
                              small
                              rounded
                              color="#009263"
                              >Transferidor</v-btn
                            >
                          </div>
                        </v-col>
                      </v-row>
                    </v-container>
                    <v-card>
                      <v-img max-height="400px" contain :src="imagem"></v-img>
                      <Moveable
                        v-if="transferidor"
                        v-bind="moveable"
                        @drag="handleDrag"
                        @rotate="handleRotate"
                      >
                        <v-img src="@/assets/transferidor.png"></v-img>
                      </Moveable>
                    </v-card>
                    <div v-if="temExame" id="exame">
                      <span> <b> Exame: </b> {{ exame }}</span>
                    </div>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
          <v-container>
            <v-row>
              <v-col align="start" cols="6" sm="3" md="4" lg="4" xl="4">
              </v-col>
              <v-col align="center" cols="12" sm="6" md="4" lg="4" xl="4">
                <v-btn
                  @click="proxQuestao(false)"
                  rounded
                  class="mx-4"
                  large
                  :dark="!configRetroceder"
                  color="#009263"
                  :disabled="configRetroceder"
                >
                  <v-icon large>
                    mdi-arrow-left-bold-circle
                  </v-icon>
                </v-btn>

                <v-btn
                  @click="proxQuestao(true)"
                  rounded
                  class="mx-4"
                  large
                  dark
                  color="#009263"
                >
                  <v-icon large>
                    mdi-arrow-right-bold-circle
                  </v-icon>
                </v-btn>
              </v-col>
              <v-col align="right" cols="12" sm="3" md="4" lg="4" xl="4">
                <v-btn
                  @click="submeter"
                  :disabled="podeSubmeter"
                  large
                  class="white--text"
                  color="#009263"
                  >Submeter</v-btn
                >
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
const axios = require("axios");
const Swal = require("sweetalert2");
const host = require("@/config/hosts").hostAPI;
import SimpleKeyboard from "@/components/SimpleKeyboard.vue";
import Moveable from "vue-moveable";
import { GridLayout, GridItem } from "vue-grid-layout";

export default {
  name: "DoTpc",
  components: {
    Moveable,
    SimpleKeyboard,
    GridLayout,
    GridItem,
  },
  props: ["id"],
  beforeMount() {
    window.addEventListener("beforeunload", this.preventNav);
  },

  beforeDestroy() {
    window.removeEventListener("beforeunload", this.preventNav);
  },
  beforeRouteLeave(to, from, next) {
    const editFlag = this.$store.getters.getEditFlag;
    if (editFlag) {
      Swal.fire({
        title: "Navegação Impedida",
        text: "Tem que acabar o TPC antes de poder navegar.",
        icon: "error",
        confirmButtonColor: "#009263",
      });
      next(false);
    } else next();
  },

  created() {
    this.$store.commit("setEditFlag", {
      isEditing: true,
    });
    this.getUser();
    this.getQuestoes();
    this.getTemas();
  },
  data() {
    return {
      grid: {
        layoutTop: [
          { x: 0, y: 0, w: 5, h: 2, i: "5", static: true },
          { x: 4, y: 0, w: 5, h: 2, i: "10", static: true },
          { x: 8, y: 0, w: 5, h: 2, i: "15", static: true },
          { x: 12, y: 0, w: 5, h: 2, i: "20", static: true },
          { x: 16, y: 0, w: 5, h: 2, i: "25", static: true },
          { x: 20, y: 0, w: 5, h: 2, i: "30", static: true },

          { x: 0, y: 1.4, w: 5, h: 2, i: "4", static: true },
          { x: 4, y: 1.4, w: 5, h: 2, i: "9", static: true },
          { x: 8, y: 1.4, w: 5, h: 2, i: "14", static: true },
          { x: 12, y: 1.4, w: 5, h: 2, i: "19", static: true },
          { x: 16, y: 1.4, w: 5, h: 2, i: "24", static: true },
          { x: 20, y: 1.4, w: 5, h: 2, i: "29", static: true },

          { x: 0, y: 2.8, w: 5, h: 2, i: "3", static: true },
          { x: 4, y: 2.8, w: 5, h: 2, i: "8", static: true },
          { x: 8, y: 2.8, w: 5, h: 2, i: "13", static: true },
          { x: 12, y: 2.8, w: 5, h: 2, i: "18", static: true },
          { x: 16, y: 2.8, w: 5, h: 2, i: "23", static: true },
          { x: 20, y: 2.8, w: 5, h: 2, i: "28", static: true },

          { x: 0, y: 4.2, w: 5, h: 2, i: "2", static: true },
          { x: 4, y: 4.2, w: 5, h: 2, i: "7", static: true },
          { x: 8, y: 4.2, w: 5, h: 2, i: "12", static: true },
          { x: 12, y: 4.2, w: 5, h: 2, i: "17", static: true },
          { x: 16, y: 4.2, w: 5, h: 2, i: "22", static: true },
          { x: 20, y: 4.2, w: 5, h: 2, i: "27", static: true },

          { x: 0, y: 5.6, w: 5, h: 2, i: "1", static: true },
          { x: 4, y: 5.6, w: 5, h: 2, i: "6", static: true },
          { x: 8, y: 5.6, w: 5, h: 2, i: "11", static: true },
          { x: 12, y: 5.6, w: 5, h: 2, i: "16", static: true },
          { x: 16, y: 5.6, w: 5, h: 2, i: "21", static: true },
          { x: 20, y: 5.6, w: 5, h: 2, i: "26", static: true },
        ],
        layoutBtm: [
          { x: 0, y: 0, w: 5, h: 2, i: "1", static: true },
          { x: 4, y: 0, w: 5, h: 2, i: "6", static: true },
          { x: 8, y: 0, w: 5, h: 2, i: "11", static: true },
          { x: 12, y: 0, w: 5, h: 2, i: "16", static: true },
          { x: 16, y: 0, w: 5, h: 2, i: "21", static: true },
          { x: 20, y: 0, w: 5, h: 2, i: "26", static: true },

          { x: 0, y: 1.4, w: 5, h: 2, i: "2", static: true },
          { x: 4, y: 1.4, w: 5, h: 2, i: "7", static: true },
          { x: 8, y: 1.4, w: 5, h: 2, i: "12", static: true },
          { x: 12, y: 1.4, w: 5, h: 2, i: "17", static: true },
          { x: 16, y: 1.4, w: 5, h: 2, i: "22", static: true },
          { x: 20, y: 1.4, w: 5, h: 2, i: "27", static: true },

          { x: 0, y: 2.8, w: 5, h: 2, i: "3", static: true },
          { x: 4, y: 2.8, w: 5, h: 2, i: "8", static: true },
          { x: 8, y: 2.8, w: 5, h: 2, i: "13", static: true },
          { x: 12, y: 2.8, w: 5, h: 2, i: "18", static: true },
          { x: 16, y: 2.8, w: 5, h: 2, i: "23", static: true },
          { x: 20, y: 2.8, w: 5, h: 2, i: "28", static: true },

          { x: 0, y: 4.2, w: 5, h: 2, i: "4", static: true },
          { x: 4, y: 4.2, w: 5, h: 2, i: "9", static: true },
          { x: 8, y: 4.2, w: 5, h: 2, i: "14", static: true },
          { x: 12, y: 4.2, w: 5, h: 2, i: "19", static: true },
          { x: 16, y: 4.2, w: 5, h: 2, i: "24", static: true },
          { x: 20, y: 4.2, w: 5, h: 2, i: "29", static: true },

          { x: 0, y: 5.6, w: 5, h: 2, i: "5", static: true },
          { x: 4, y: 5.6, w: 5, h: 2, i: "10", static: true },
          { x: 8, y: 5.6, w: 5, h: 2, i: "15", static: true },
          { x: 12, y: 5.6, w: 5, h: 2, i: "20", static: true },
          { x: 16, y: 5.6, w: 5, h: 2, i: "25", static: true },
          { x: 20, y: 5.6, w: 5, h: 2, i: "30", static: true },
        ],
        layoutEsq: [
          { x: 0, y: 0, w: 5, h: 2, i: "5", static: true },
          { x: 4, y: 0, w: 5, h: 2, i: "4", static: true },
          { x: 8, y: 0, w: 5, h: 2, i: "3", static: true },
          { x: 12, y: 0, w: 5, h: 2, i: "2", static: true },
          { x: 16, y: 0, w: 5, h: 2, i: "1", static: true },
          { x: 0, y: 1.6, w: 5, h: 2, i: "10", static: true },
          { x: 4, y: 1.6, w: 5, h: 2, i: "9", static: true },
          { x: 8, y: 1.6, w: 5, h: 2, i: "8", static: true },
          { x: 12, y: 1.6, w: 5, h: 2, i: "7", static: true },
          { x: 16, y: 1.6, w: 5, h: 2, i: "6", static: true },
          { x: 0, y: 3.2, w: 5, h: 2, i: "15", static: true },
          { x: 4, y: 3.2, w: 5, h: 2, i: "14", static: true },
          { x: 8, y: 3.2, w: 5, h: 2, i: "13", static: true },
          { x: 12, y: 3.2, w: 5, h: 2, i: "12", static: true },
          { x: 16, y: 3.2, w: 5, h: 2, i: "11", static: true },
          { x: 0, y: 4.8, w: 5, h: 2, i: "20", static: true },
          { x: 4, y: 4.8, w: 5, h: 2, i: "19", static: true },
          { x: 8, y: 4.8, w: 5, h: 2, i: "18", static: true },
          { x: 12, y: 4.8, w: 5, h: 2, i: "17", static: true },
          { x: 16, y: 4.8, w: 5, h: 2, i: "16", static: true },
          { x: 0, y: 6.4, w: 5, h: 2, i: "25", static: true },
          { x: 4, y: 6.4, w: 5, h: 2, i: "24", static: true },
          { x: 8, y: 6.4, w: 5, h: 2, i: "23", static: true },
          { x: 12, y: 6.4, w: 5, h: 2, i: "22", static: true },
          { x: 16, y: 6.4, w: 5, h: 2, i: "21", static: true },
          { x: 0, y: 8, w: 5, h: 2, i: "30", static: true },
          { x: 4, y: 8, w: 5, h: 2, i: "29", static: true },
          { x: 8, y: 8, w: 5, h: 2, i: "28", static: true },
          { x: 12, y: 8, w: 5, h: 2, i: "27", static: true },
          { x: 16, y: 8, w: 5, h: 2, i: "26", static: true },
        ],
        layoutDir: [
          { x: 0, y: 0, w: 5, h: 2, i: "1", static: true },
          { x: 4, y: 0, w: 5, h: 2, i: "2", static: true },
          { x: 8, y: 0, w: 5, h: 2, i: "3", static: true },
          { x: 12, y: 0, w: 5, h: 2, i: "4", static: true },
          { x: 16, y: 0, w: 5, h: 2, i: "5", static: true },
          { x: 0, y: 1.6, w: 5, h: 2, i: "6", static: true },
          { x: 4, y: 1.6, w: 5, h: 2, i: "7", static: true },
          { x: 8, y: 1.6, w: 5, h: 2, i: "8", static: true },
          { x: 12, y: 1.6, w: 5, h: 2, i: "9", static: true },
          { x: 16, y: 1.6, w: 5, h: 2, i: "10", static: true },
          { x: 0, y: 3.2, w: 5, h: 2, i: "11", static: true },
          { x: 4, y: 3.2, w: 5, h: 2, i: "12", static: true },
          { x: 8, y: 3.2, w: 5, h: 2, i: "13", static: true },
          { x: 12, y: 3.2, w: 5, h: 2, i: "14", static: true },
          { x: 16, y: 3.2, w: 5, h: 2, i: "15", static: true },
          { x: 0, y: 4.8, w: 5, h: 2, i: "16", static: true },
          { x: 4, y: 4.8, w: 5, h: 2, i: "17", static: true },
          { x: 8, y: 4.8, w: 5, h: 2, i: "18", static: true },
          { x: 12, y: 4.8, w: 5, h: 2, i: "19", static: true },
          { x: 16, y: 4.8, w: 5, h: 2, i: "20", static: true },
          { x: 0, y: 6.4, w: 5, h: 2, i: "21", static: true },
          { x: 4, y: 6.4, w: 5, h: 2, i: "22", static: true },
          { x: 8, y: 6.4, w: 5, h: 2, i: "23", static: true },
          { x: 12, y: 6.4, w: 5, h: 2, i: "24", static: true },
          { x: 16, y: 6.4, w: 5, h: 2, i: "25", static: true },
          { x: 0, y: 8, w: 5, h: 2, i: "26", static: true },
          { x: 4, y: 8, w: 5, h: 2, i: "27", static: true },
          { x: 8, y: 8, w: 5, h: 2, i: "28", static: true },
          { x: 12, y: 8, w: 5, h: 2, i: "29", static: true },
          { x: 16, y: 8, w: 5, h: 2, i: "30", static: true },
        ],
        draggable: false,
        resizable: false,
      },
      moveable: {
        draggable: true,
        throttleDrag: 1,
        resizable: false,
        throttleResize: 1,
        keepRatio: true,
        scalable: false,
        throttleScale: 0.01,
        rotatable: true,
        throttleRotate: 0.2,
        pinchable: false,
        origin: false,
      },
      states: {
        scalable: "Scalable",
        resizable: "Resizable",
        warpable: "Warpable",
      },
      transferidor: false,
      show: false,
      isEditing: true,
      userId: null,
      tpc: null,
      tentativa: null,
      catalogoQuestoes: [],
      catalogoRespostas: {},
      catalogoTemas: [],
      respostas: [],
      opcoesSelected: {},
      counter: 0,
      tema: "",
      subtema: "",
      user: null,
      profName: "",
      configAleatoria: false,
      configRetroceder: false,
      configResolucao: false,
    };
  },
  computed: {
    tipoGrid() {
      if (!this.catalogoQuestoes[this.counter]) return 0;
      const layout = this.catalogoQuestoes[this.counter].resposta1;
      let idxList = layout.split("-");
      const tipoGrid = idxList[0];
      // h ou v
      return tipoGrid;
    },
    disableGridTop() {
      if (!this.catalogoQuestoes[this.counter]) return "";
      const layout = this.catalogoQuestoes[this.counter].resposta1;
      let idxList = layout.split("-");
      const lado = idxList[1];
      return lado === "c";
    },
    disableGridBtm() {
      if (!this.catalogoQuestoes[this.counter]) return "";
      const layout = this.catalogoQuestoes[this.counter].resposta1;
      let idxList = layout.split("-");
      const lado = idxList[1];
      return lado === "b";
    },
    disableGridEsq() {
      if (!this.catalogoQuestoes[this.counter]) return "";
      const layout = this.catalogoQuestoes[this.counter].resposta1;
      let idxList = layout.split("-");
      const lado = idxList[1];
      return lado === "e";
    },
    disableGridDir() {
      if (!this.catalogoQuestoes[this.counter]) return "";
      const layout = this.catalogoQuestoes[this.counter].resposta1;
      let idxList = layout.split("-");
      const lado = idxList[1];
      return lado === "d";
    },
    showTransfButton() {
      const questao = this.catalogoQuestoes[this.counter];
      if (!questao) return false;
      if (questao.tipo === 1 && questao.auxiliar === 10) return true;
      return false;
    },
    turma() {
      if (!this.user) return "";
      return this.user.turma;
    },
    userName() {
      if (!this.user) return "";
      return this.user.nome;
    },
    podeSubmeter() {
      const nQuestoes = this.catalogoQuestoes.length;
      const qRespondidas = Object.keys(this.opcoesSelected).length;

      if (qRespondidas !== nQuestoes) return true;
      return false;
    },
    exame() {
      if (!this.catalogoQuestoes[this.counter]) return "";
      return this.catalogoQuestoes[this.counter].idexame;
    },
    temExame() {
      if (
        this.catalogoQuestoes[this.counter] &&
        this.catalogoQuestoes[this.counter].idexame
      )
        return 1;
      return 0;
    },
    nivel() {
      if (!this.catalogoQuestoes[this.counter]) return "";
      return this.catalogoQuestoes[this.counter].niveldificuldade;
    },
    titulo() {
      if (!this.tpc) return "";
      return this.tpc.tagname;
    },
    codQuestao() {
      if (!this.catalogoQuestoes[this.counter]) return "";
      return this.catalogoQuestoes[this.counter].cod;
    },
    unidade() {
      if (!this.catalogoQuestoes[this.counter]) return "";
      return this.catalogoQuestoes[this.counter].unidade;
    },
    tipoQuestao() {
      if (!this.catalogoQuestoes[this.counter]) return 0;

      return this.catalogoQuestoes[this.counter].tipo;
    },
    questaoAtual() {
      if (!this.catalogoQuestoes[this.counter]) return "";

      return this.catalogoQuestoes[this.counter].questao;
    },
    imagem() {
      if (!this.catalogoQuestoes[this.counter]) return "";
      let img = this.catalogoQuestoes[this.counter].figura;
      img = img
        ? `https://www.hypatiamat.com/imagens/${img.replace(".swf", "")}.png`
        : "";
      return img;
    },
  },
  methods: {
    // Grid Horizontal
    corGridTop(index) {
      const codQuestao = this.catalogoQuestoes[this.counter].cod;
      if (!this.opcoesSelected[codQuestao]) {
        this.$set(this.opcoesSelected, codQuestao, []);
      }
      const layout = this.catalogoQuestoes[this.counter].resposta1;
      let idxList = layout.split("-");
      const lado = idxList[1];

      idxList = idxList.splice(2);

      if (lado === "c")
        return idxList.includes(index)
          ? { background: "#ff6600" }
          : { background: "#eee" };

      return this.opcoesSelected[codQuestao].includes(index)
        ? { background: "#ff6600" }
        : { background: "#eee" };
    },
    corGridBtm(index) {
      const codQuestao = this.catalogoQuestoes[this.counter].cod;
      if (!this.opcoesSelected[codQuestao]) {
        this.$set(this.opcoesSelected, codQuestao, []);
      }
      const layout = this.catalogoQuestoes[this.counter].resposta1;
      let idxList = layout.split("-");
      const lado = idxList[1];

      idxList = idxList.splice(2);

      if (lado === "b")
        return idxList.includes(index)
          ? { background: "#ff6600" }
          : { background: "#eee" };

      return this.opcoesSelected[codQuestao].includes(index)
        ? { background: "#ff6600" }
        : { background: "#eee" };
    },
    // Grid Vertical
    corGridEsq(index) {
      const codQuestao = this.catalogoQuestoes[this.counter].cod;
      if (!this.opcoesSelected[codQuestao]) {
        this.$set(this.opcoesSelected, codQuestao, []);
      }
      const layout = this.catalogoQuestoes[this.counter].resposta1;
      let idxList = layout.split("-");
      const lado = idxList[1];

      idxList = idxList.splice(2);

      if (lado === "e")
        return idxList.includes(index)
          ? { background: "#ff6600" }
          : { background: "#eee" };

      return this.opcoesSelected[codQuestao].includes(index)
        ? { background: "#ff6600" }
        : { background: "#eee" };
    },
    corGridDir(index) {
      const codQuestao = this.catalogoQuestoes[this.counter].cod;
      if (!this.opcoesSelected[codQuestao]) {
        this.$set(this.opcoesSelected, codQuestao, []);
      }
      const layout = this.catalogoQuestoes[this.counter].resposta1;
      let idxList = layout.split("-");
      const lado = idxList[1];

      idxList = idxList.splice(2);

      if (lado === "d")
        return idxList.includes(index)
          ? { background: "#ff6600" }
          : { background: "#eee" };

      return this.opcoesSelected[codQuestao].includes(index)
        ? { background: "#ff6600" }
        : { background: "#eee" };
    },
    clickGrid(item) {
      const codQuestao = this.catalogoQuestoes[this.counter].cod;
      let resp = this.opcoesSelected[codQuestao];

      if (resp.includes(item)) {
        const index = resp.indexOf(item);
        resp.splice(index, 1);
        this.$set(this.opcoesSelected, codQuestao, resp);
      } else {
        resp.push(item);
        this.$set(this.opcoesSelected, codQuestao, resp);
      }
    },
    toggleTransf() {
      this.transferidor = !this.transferidor;
    },
    handleDrag({ target, transform }) {
      target.style.transform = transform;
    },
    handleRotate({ target, transform }) {
      target.style.transform = transform;
    },
    clearAllStates() {
      Object.keys(this.states).forEach((key) => {
        this.moveable[key] = false;
      });
    },
    preventNav(event) {
      if (!this.isEditing) return;
      event.preventDefault();
      event.returnValue = "";
    },
    async getTemas() {
      try {
        const response = await axios.get(host + "temas");

        Object.keys(response.data).forEach((el) => {
          let tema = response.data[el][0].tema;
          let subtemas = [];
          response.data[el].forEach((item) => {
            subtemas.push({
              codsubtema: item.codsubtema,
              subtema: item.subtema,
            });
          });

          this.catalogoTemas.push({ codtema: el, tema: tema, subtemas });
        });
      } catch (err) {
        const error = new Error(err.message || "Failed to query Temas");
        throw error;
      }
    },
    getTema() {
      const questao = this.catalogoQuestoes[this.counter];

      const temaEntry = this.catalogoTemas.filter((el) => {
        return el.codtema === questao.tema;
      })[0];

      this.tema = temaEntry.tema;

      const subtemaEntry = temaEntry.subtemas.filter((el) => {
        return el.codsubtema === questao.subtema;
      })[0];

      this.subtema = subtemaEntry.subtema;
    },
    // Keyboard method
    onChange(input) {
      const cod = this.catalogoQuestoes[this.counter].cod;
      this.$set(this.opcoesSelected, cod, input);
    },

    // Submeter Resol. TPC
    async submeter() {
      try {
        Swal.fire({
          title: "Submeter TPC?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#009263",
          cancelButtonColor: "#d33",
          confirmButtonText: "Confirmar",
          cancelButtonText: "Cancelar",
        }).then(async (result) => {
          if (result.isConfirmed) {
            this.$store.commit("setEditFlag", {
              isEditing: false,
            });
            // Loading modal
            Swal.fire({
              title: "A submeter TPC...",
              showConfirmButton: false,
              allowOutsideClick: false,
              willOpen: () => {
                Swal.showLoading();
              },
            });

            const resps = [];
            for (let [cod, resp] of Object.entries(this.opcoesSelected)) {
              const questao = this.catalogoQuestoes.filter(
                (el) => el.cod === cod
              )[0];

              //Verificar se resposta é igual a soluçao
              let correta = 0;
              //Resp Aberta
              if (questao.tipo === 1) {
                switch (questao.auxiliar) {
                  case 2:
                    correta =
                      resp === `${questao.resposta1}/${questao.resposta2}`
                        ? 1
                        : 0;
                    break;
                  //transferidor
                  case 10:
                    correta =
                      resp >= questao.resposta1 && resp <= questao.resposta2
                        ? 1
                        : 0;
                    break;
                  case 22:
                    correta =
                      resp === `${questao.resposta1}/${questao.resposta2}`
                        ? 1
                        : 0;
                    break;
                  case 1000:
                    if (
                      questao.resposta1 === resp ||
                      questao.resposta2 === resp
                    )
                      correta = 1;
                    break;
                  // auxiliar 0 e 1 (...)
                  default:
                    for (let i = 1; i < 7; i++) {
                      if (
                        questao[`resposta${i}`] !== "" &&
                        questao[`resposta${i}`] === resp
                      ) {
                        correta = 1;
                        break;
                      }
                    }
                    break;
                }
                // Simetrias grid
              } else if (questao.tipo === 7) {
                let layout = questao.resposta1;
                layout = layout.split("-").splice(2);

                resp = resp.sort((a, b) => parseInt(a) - parseInt(b));

                // comparar arrays ordenados
                correta = layout.toString() === resp.toString() ? 1 : 0;
                resp = resp.join("-");
              }
              // Escolha Multipla
              else {
                correta = questao.resposta1 === resp ? 1 : 0;
              }

              //----------- Criar resposta
              let bodyResp = {
                codQuestao: questao.cod,
                resposta: resp,
                correta,
              };

              const resposta = await axios.post(host + "respostas", bodyResp);

              resps.push(resposta.data);

              // ------------- Criar entrada em tabelas da appstabletpc, appsinfo e appsinfoall
              const appsTable = await axios.get(
                host + "appstabletpcs?subtmp=" + questao.subtema
              );

              // Inserir na tabela se existir
              if (appsTable.data.length > 0) {
                const table = appsTable.data[0].tabela;
                const tema = appsTable.data[0].codtema;
                const subtema = appsTable.data[0].codsubtema;

                const datetime = new Date().toISOString().split("T");
                const data = datetime[0];
                const tempo = datetime[1].replace("Z", "");

                const body = {
                  table,
                  user: this.userId,
                  turma: this.user.turma,
                  codprof: this.user.codprofessor,
                  escola: this.user.escola,
                  tema,
                  subtema,
                  frame: `T[${questao.cod}]`,
                  data,
                  certas: correta,
                  total: 1,
                  tempo,
                };

                await axios.post(host + "appstabletpcs", body);
              }
            }

            // ------------- Criar resolucao
            const qRespondidas = this.catalogoQuestoes.length;
            const qCertas = resps.filter((r) => r.correta === 1).length;
            const classificacao = (qCertas / qRespondidas) * 100;
            const respostas = resps.map((r) => r.id);

            let bodyResol = {
              idTpc: this.id,
              tentativa: this.tentativa,
              qRespondidas,
              qCertas,
              classificacao: classificacao.toFixed(2),
              respostas,
              data: new Date(),
            };

            const resolucao = await axios.post(host + "resolucoes", bodyResol);

            const resolsAluno = await axios.get(
              host + "tpc-alunos/" + this.userId
            );

            let allResol = resolsAluno.data.resolucoes.map((resol) => resol.id);

            allResol.push(resolucao.data.id);

            await axios.put(host + "tpc-alunos/" + this.userId, {
              resolucoes: allResol,
            });

            // Atualizar store
            this.$store.dispatch("getTpcs");

            Swal.close();
            Swal.fire({
              icon: "success",
              title: "TPC submetido com sucesso!",
              confirmButtonColor: "#009263",
            });
            this.$router.replace("/dashboard");
          }
        });
      } catch (err) {
        const error = new Error(err.message || "Failed to post Resolucao");
        throw error;
      }
    },
    proxQuestao(flag) {
      const questao = this.catalogoQuestoes[this.counter];
      const nQuestoes = this.catalogoQuestoes.length;
      if (this.configRetroceder && this.counter + 1 < nQuestoes) {
        if (!this.opcoesSelected[questao.cod])
          return Swal.fire({
            title: "Responda à questão antes de avançar!",
            icon: "warning",
            confirmButtonColor: "#009263",
          });

        Swal.fire({
          title: "Avançar para Próxima Questão?",
          text:
            "Se avançar, não poderá alterar a resposta a questões anteriores.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#009263",
          cancelButtonColor: "#d33",
          confirmButtonText: "Confirmar",
          cancelButtonText: "Cancelar",
        }).then((result) => {
          if (result.isConfirmed) {
            const nQuestoes = this.catalogoQuestoes.length;
            if (flag) {
              if (this.counter + 1 < nQuestoes) this.counter++;
            } else {
              if (this.counter - 1 >= 0) this.counter--;
            }
            this.$refs.chips[this.counter].click();
          }
        });
      } else {
        const nQuestoes = this.catalogoQuestoes.length;
        if (flag) {
          if (this.counter + 1 < nQuestoes) this.counter++;
        } else {
          if (this.counter - 1 >= 0) this.counter--;
        }
        this.$refs.chips[this.counter].click();
      }
    },
    imgRespostas(img) {
      img = img
        ? `https://www.hypatiamat.com/imagens/${img.replace(".swf", "")}.png`
        : "";
      return img;
    },
    showRespostas() {
      this.respostas = [];

      const questao = this.catalogoQuestoes[this.counter];
      if (!questao) return;
      this.catalogoRespostas[questao.cod].forEach((el) => {
        this.respostas.push(el);
      });
    },
    getRespostas(questao) {
      let respostas = [];
      if (!questao) return;
      switch (questao.tipo) {
        case 0:
          respostas.push(questao.resposta1);
          respostas.push(questao.resposta2);
          respostas.push(questao.resposta3);
          respostas.push(questao.resposta4);
          break;
        // Resp. aberta
        case 1:
          respostas.push(questao.resposta1);
          respostas.push(questao.resposta2);
          respostas.push(questao.resposta3);
          respostas.push(questao.resposta4);
          respostas.push(questao.resposta5);
          respostas.push(questao.resposta6);
          break;
        case 2:
          respostas.push(questao.resposta1);
          respostas.push(questao.resposta2);
          respostas.push(questao.resposta3);
          respostas.push(questao.resposta4);
          break;
        case 3:
          respostas.push(questao.resposta1);
          respostas.push(questao.resposta2);
          break;
        case 4:
          respostas.push(questao.resposta1);
          respostas.push(questao.resposta2);
          respostas.push(questao.resposta3);
          break;
        case 5:
          respostas.push(questao.resposta1);
          respostas.push(questao.resposta2);
          respostas.push(questao.resposta3);
          respostas.push(questao.resposta4);
          respostas.push(questao.resposta5);
          break;
        case 6:
          respostas.push(questao.resposta1);
          respostas.push(questao.resposta2);
          respostas.push(questao.resposta3);
          respostas.push(questao.resposta4);
          respostas.push(questao.resposta5);
          respostas.push(questao.resposta6);
          break;
      }
      if (questao.tipo !== 1) respostas = this.shuffle(respostas);
      this.catalogoRespostas[questao.cod] = respostas;
    },
    // Durstenfeld shuffle array
    shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    },
    questaoSelected(q, ind) {
      this.counter = ind;
      this.showRespostas();
      this.getTema();
      this.transferidor = false;
    },
    async getUser() {
      try {
        const user = this.$store.getters.getUserId;
        this.userId = user;
        const aluno = await axios.get(host + "alunos/" + user);
        this.user = aluno.data;
        const prof = await axios.get(
          host + "professores/" + this.user.codprofessor
        );

        this.profName = prof.data.nome;
      } catch (err) {
        const error = new Error(err.message || "Failed to query user");
        throw error;
      }
    },
    async getQuestoes() {
      try {
        const tpcData = await axios.get(host + "tpcs/" + this.id);
        const questoesCod = tpcData.data["tpc_questoes"];
        this.tpc = tpcData.data;
        for (const q of questoesCod) {
          const questao = await axios.get(host + "exercicios/" + q.codQuestao);

          this.catalogoQuestoes.push(questao.data);
          this.getRespostas(questao.data);
        }

        //Configs
        this.configAleatoria = tpcData.data.configAleatoria;
        this.configRetroceder = tpcData.data.configRetroceder;
        this.configResolucao = tpcData.data.configResolucao;

        //Shuffle confiAleatoria
        if (this.configAleatoria)
          this.catalogoQuestoes = this.shuffle(this.catalogoQuestoes);

        this.showRespostas();
        this.getTema();

        // Tentativa nº
        let tpcsAluno = await axios.get(
          host + "tpc-alunos/" + this.userId + "/tpcs?time=active"
        );

        tpcsAluno = tpcsAluno.data.filter((el) => el.id == this.id);
        this.tentativa = tpcsAluno[0].nResol + 1;
      } catch (err) {
        const error = new Error(err.message || "Failed to query Questoes");
        throw error;
      }
    },
    voltar() {
      this.$router.push("/dashboard");
    },
  },
};
</script>

<style scoped>
/* Vue-grid-layout */

.btnItem {
  width: 100%;
  height: 100%;
  display: block;
}

/* .vue-grid-layout {
  background: #eee;
} */

.vue-grid-item:not(.vue-grid-placeholder) {
  border: 1px solid black;
}

.input {
  background-color: white;
  border: 2px solid #009263;
  box-shadow: 1px 1px 1px 0 lightgray inset;
  padding: 2px 8px;
  height: 55px;
  line-height: 45px;
  display: inline-block;
  vertical-align: middle;
  white-space: nowrap;
  overflow: auto;
}

.unidade {
  float: right;
}
.selectExame {
  font-size: 14px;
  padding: 5px 6px;
  margin-top: -16px;
}
.selectNivel {
  color: #009263;
}
#exame {
  padding: 5px 10px;
  font-size: 14px;
  margin-bottom: 5px;
}
</style>
