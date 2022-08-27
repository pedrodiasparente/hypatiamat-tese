<template>
  <v-card>
    <v-container>
      <v-row>
        <v-col cols="12" sm="12" md="12" lg="12" xl="12">
          <v-sheet>
            <v-slide-group mandatory show-arrows center-active>
              <v-slide-item
                v-for="(q, index) in catalogoQuestoes"
                :key="index"
                v-slot="{ active, toggle }"
              >
                <v-chip
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
                    <b> {{ q.cod }}</b>
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
            color="#009263"
            v-model="tema"
            readonly
            label="Tema"
            outlined
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6" md="6" lg="6" xl="6">
          <v-text-field
            color="#009263"
            v-model="subtema"
            readonly
            label="Subtema"
            outlined
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12">
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
                        <v-radio-group v-model="respostaAluno" disabled>
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
                              <v-radio
                                color="#009263"
                                :label="`${index + 1})`"
                                :value="resp"
                              >
                              </v-radio>
                              <v-img
                                height="200px"
                                width="200px"
                                contain
                                :src="imgRespostas(resp)"
                              >
                              </v-img>
                            </v-col>
                          </v-row>
                        </v-radio-group>
                      </v-container>
                      <div class="mt-8 mr-2" v-else-if="tipoQuestao === 1">
                        <v-container class="input my-2">
                          <span v-html="respostaAluno"> </span>
                          <span class="unidade" v-html="unidade"></span>
                        </v-container>
                      </div>

                      <!-- Vertical Grid -->
                      <div v-else-if="tipoQuestao === 7 && tipoGrid === 'v'">
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
                                </grid-item>
                              </grid-layout>
                            </div>
                          </v-col>
                        </v-row>
                      </div>

                      <!-- Horizontal Grid -->
                      <div v-else-if="tipoQuestao === 7 && tipoGrid === 'h'">
                        <v-row no-gutters justify="center" align="center">
                          <v-col cols="8">
                            <div class="my-n3">
                              <grid-layout
                                :layout.sync="grid.layoutTop"
                                :col-num="26"
                                :row-height="18"
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
                                :row-height="18"
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
                                </grid-item>
                              </grid-layout>
                            </div>
                          </v-col>
                        </v-row>
                        <br />
                      </div>

                      <v-container v-else class="mt-n6" fluid>
                        <v-radio-group v-model="respostaAluno" disabled>
                          <v-radio
                            color="#009263"
                            v-for="(resp, index) in respostas"
                            :key="index"
                            :value="resp"
                          >
                            <template slot="label">
                              <span v-html="resp"></span>
                            </template>
                          </v-radio>
                        </v-radio-group>
                      </v-container>
                    </div>
                    <v-container class="text-center mt-n4 bodyText">
                      <span v-if="respCorreta === 1">
                        <b> Correta: </b>
                        <v-icon x-large color="green">
                          mdi-checkbox-marked-circle
                        </v-icon></span
                      >
                      <span v-else-if="respCorreta === 0">
                        <b>Correta: </b>
                        <v-icon x-large color="red">
                          mdi-close-circle
                        </v-icon></span
                      >
                    </v-container>
                  </v-col>
                  <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                    <div class="align-center pa-2">
                      <v-dialog v-model="dialogResol" :max-width="resolWidth()">
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            small
                            :style="{
                              left: '50%',
                              transform: 'translateX(-50%)',
                            }"
                            class="white--text"
                            color="#009263"
                            v-bind="attrs"
                            v-on="on"
                          >
                            Resolução
                          </v-btn>
                        </template>
                        <v-card>
                          <v-img contain :src="resolucao"></v-img>
                          <v-card-actions class="text-center">
                            <v-btn
                              :style="{
                                left: '50%',
                                transform: 'translateX(-50%)',
                              }"
                              color="#009263"
                              text
                              @click="dialogResol = false"
                            >
                              OK
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </div>
                  </v-col>
                </v-row>
              </v-col>
              <v-col class="mt-n2" cols="12" sm="4" md="4" lg="4" xl="4">
                <v-container>
                  <v-row>
                    <v-col cols="6" sm="6" lg="6">
                      <div align="left" class="codquestao">
                        <span>
                          <b> {{ codQuestao }}</b>
                        </span>
                      </div>
                    </v-col>
                    <v-col cols="6" sm="6" lg="6">
                      <div align="right" class="selectNivel">
                        <span
                          ><b>Nível {{ nivel }}</b></span
                        >
                      </div>
                    </v-col>
                  </v-row>
                </v-container>
                <v-card>
                  <v-img max-height="400px" contain :src="imagem"></v-img>
                </v-card>
                <div v-if="temExame" id="exame">
                  <span> <b> Exame: </b> {{ exame }}</span>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
const axios = require("axios");
const host = require("@/config/hosts").hostAPI;
import { GridLayout, GridItem } from "vue-grid-layout";

export default {
  components: {
    GridLayout,
    GridItem,
  },
  props: ["codAluno", "tpcId"],
  created() {
    this.getTemas();
    this.getResol();
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
      dialogResol: false,
      tpc: null,
      catalogoQuestoes: [],
      catalogoRespostas: {},
      catalogoTemas: [],
      respostas: [],
      opcoesSelected: {},
      counter: 0,
      tema: "",
      subtema: "",
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
    respCorreta() {
      if (
        !this.catalogoQuestoes[this.counter] ||
        Object.keys(this.opcoesSelected).length === 0
      )
        return "";

      const codQuestao = this.catalogoQuestoes[this.counter].cod;
      return this.opcoesSelected[codQuestao].correta;
    },
    respostaAluno() {
      if (
        !this.catalogoQuestoes[this.counter] ||
        Object.keys(this.opcoesSelected).length === 0
      )
        return "";

      const codQuestao = this.catalogoQuestoes[this.counter].cod;
      return this.opcoesSelected[codQuestao].resposta;
    },

    codQuestao() {
      if (!this.catalogoQuestoes[this.counter]) return "";
      return this.catalogoQuestoes[this.counter].cod;
    },
    unidade() {
      if (!this.catalogoQuestoes[this.counter]) return "";
      return this.catalogoQuestoes[this.counter].unidade;
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
    tipoQuestao() {
      if (!this.catalogoQuestoes[this.counter]) return 0;

      return this.catalogoQuestoes[this.counter].tipo;
    },
    questaoAtual() {
      if (!this.catalogoQuestoes[this.counter]) return "";

      return this.catalogoQuestoes[this.counter].questao;
    },
    resolucao() {
      if (!this.catalogoQuestoes[this.counter]) return "";
      let img = this.catalogoQuestoes[this.counter].resolucao;
      img = img
        ? `https://www.hypatiamat.com/imagens/propresolucao/${img.replace(
            ".swf",
            ""
          )}.png`
        : "";
      return img;
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
      // solucao
      const layout = this.catalogoQuestoes[this.counter].resposta1;
      let idxList = layout.split("-");
      const lado = idxList[1];
      idxList = idxList.splice(2);

      // resposta
      const codQuestao = this.catalogoQuestoes[this.counter].cod;
      let resposta = [];
      if (this.opcoesSelected[codQuestao])
        resposta = this.opcoesSelected[codQuestao].resposta.split("-");

      if (lado === "c")
        return idxList.includes(index)
          ? { background: "#ff6600" }
          : { background: "#eee" };

      return resposta.includes(index)
        ? { background: "#ff6600" }
        : { background: "#eee" };
    },
    corGridBtm(index) {
      // solucao
      const layout = this.catalogoQuestoes[this.counter].resposta1;
      let idxList = layout.split("-");
      const lado = idxList[1];
      idxList = idxList.splice(2);

      // resposta
      const codQuestao = this.catalogoQuestoes[this.counter].cod;
      let resposta = [];
      if (this.opcoesSelected[codQuestao])
        resposta = this.opcoesSelected[codQuestao].resposta.split("-");

      if (lado === "b")
        return idxList.includes(index)
          ? { background: "#ff6600" }
          : { background: "#eee" };

      return resposta.includes(index)
        ? { background: "#ff6600" }
        : { background: "#eee" };
    },
    // Grid Vertical
    corGridEsq(index) {
      // solucao
      const layout = this.catalogoQuestoes[this.counter].resposta1;
      let idxList = layout.split("-");
      const lado = idxList[1];
      idxList = idxList.splice(2);

      // resposta
      const codQuestao = this.catalogoQuestoes[this.counter].cod;
      let resposta = [];
      if (this.opcoesSelected[codQuestao])
        resposta = this.opcoesSelected[codQuestao].resposta.split("-");

      if (lado === "e")
        return idxList.includes(index)
          ? { background: "#ff6600" }
          : { background: "#eee" };

      return resposta.includes(index)
        ? { background: "#ff6600" }
        : { background: "#eee" };
    },
    corGridDir(index) {
      // solucao
      const layout = this.catalogoQuestoes[this.counter].resposta1;
      let idxList = layout.split("-");
      const lado = idxList[1];
      idxList = idxList.splice(2);

      // resposta
      const codQuestao = this.catalogoQuestoes[this.counter].cod;
      let resposta = [];
      if (this.opcoesSelected[codQuestao])
        resposta = this.opcoesSelected[codQuestao].resposta.split("-");

      if (lado === "d")
        return idxList.includes(index)
          ? { background: "#ff6600" }
          : { background: "#eee" };

      return resposta.includes(index)
        ? { background: "#ff6600" }
        : { background: "#eee" };
    },
    resolWidth() {
      if (!this.catalogoQuestoes[this.counter]) return "";
      let img = this.catalogoQuestoes[this.counter].resolucao;
      img = img
        ? `https://www.hypatiamat.com/imagens/propresolucao/${img.replace(
            ".swf",
            ""
          )}.png`
        : "";

      this.imgSize(img, (w) => {
        this.resolCard = `${w}px`;
      });
      return this.resolCard;
    },
    imgSize(url, callback) {
      var img = new Image();
      img.onload = function() {
        callback(img.width);
      };
      img.src = url;
    },
    questaoSelected(q, ind) {
      this.counter = ind;
      this.showRespostas();
      this.getTema();
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
    async getResol() {
      try {
        const tpcData = await axios.get(host + "tpcs/" + this.tpcId);

        this.tpc = tpcData.data;
        const questoesCod = tpcData.data["tpc_questoes"];
        for (const q of questoesCod) {
          const questao = await axios.get(host + "exercicios/" + q.codQuestao);

          this.catalogoQuestoes.push(questao.data);
          this.getRespostas(questao.data);
        }
        this.showRespostas();
        this.getTema();

        // getResolucao Aluno
        const aluno = await axios.get(host + "tpc-alunos/" + this.codAluno);

        // Ultima tentativa de resolucao
        const resolucao = aluno.data.resolucoes
          .filter((r) => r.idTpc == this.tpcId)
          .reduce((a, b) => (a.data > b.data ? a : b), {});

        if (Object.keys(resolucao).length > 0) {
          const resol = await axios.get(host + "resolucoes/" + resolucao.id);

          resol.data.respostas.forEach((resp) => {
            this.$set(this.opcoesSelected, resp.codQuestao, resp);
          });
        }
      } catch (err) {
        const error = new Error(err.message || "Failed to fetch Resolucao");
        throw error;
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
      this.catalogoRespostas[questao.cod] = respostas;
    },
  },
};
</script>

<style scoped>
/* Vue-grid-layout */

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
  font-size: 16px;
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
