<template>
  <v-app id="inspire">
    <v-main class="grey lighten-3">
      <v-container>
        <v-card class="pa-5">
          <v-container>
            <v-card-title class="justify-center green--text">
              <h2>TPC: {{ titulo }}</h2>
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
                <v-row v-if="profView">
                  <v-col cols="12">
                    <span>
                      1. Nesta página pode visualizar todas as configurações e
                      questões selecionadas, aquando da criação do respetivo
                      TPC.
                    </span>
                  </v-col>
                  <v-col cols="12">
                    <span>
                      2. Também tem a possibilidade de eliminar o TPC em
                      <v-btn small rounded class="white--text" color="#cc0000">
                        <v-icon>
                          mdi-delete
                        </v-icon> </v-btn
                      >. Note que ao apagar o TPC, também estará a
                      <b
                        >descartar todas as resoluções que já tenham sido feitas
                        por parte dos alunos</b
                      >.
                    </span>
                  </v-col>
                  <!-- <v-col cols="12">
                    <span>
                      3. No caso de ser sócio do <b>Hypatiamat</b>, tem a
                      possibilidade de exportar o TPC em formato PDF, ao clicar
                      em
                      <v-btn
                        class="white--text"
                        style="background-color: #009263;"
                        small
                        ><v-icon>mdi-file-pdf-box</v-icon>Exportar</v-btn
                      >.
                    </span>
                  </v-col> -->
                </v-row>
                <v-row v-else>
                  <v-col cols="12">
                    <span>
                      1. Nesta página tem a possibilidade de visualizar e
                      navegar as questões do TPC já expirado.
                    </span>
                  </v-col>
                  <v-col cols="12">
                    <span>
                      2. Para cada questão tem acesso à respetiva proposta de
                      resolução em
                      <v-btn small class="white--text" color="#009263">
                        Resolução </v-btn
                      >.
                    </span>
                  </v-col>
                </v-row>
              </v-card>
            </v-slide-y-transition>
            <br />
            <v-row v-if="!profView">
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
            <v-row v-if="profView">
              <v-col cols="12" sm="12" md="6" lg="6" xl="6">
                <v-text-field
                  color="#009263"
                  outlined
                  type="text"
                  label="Título do TPC"
                  class="mb-n6"
                  disabled
                  v-model="titulo"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="2" lg="3" xl="3">
                <v-text-field
                  color="#009263"
                  outlined
                  disabled
                  type="number"
                  label="Tentativas"
                  prepend-icon="mdi-counter"
                  v-model="tentativas"
                ></v-text-field>
              </v-col>
              <v-col align="right" cols="12" sm="12" md="4" lg="3" xl="3">
                <v-dialog
                  v-model="dialogConfig"
                  content-class="elevation-0"
                  :retain-focus="false"
                  scrollable
                  max-width="500px"
                  @click:outside="closeConfig()"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      large
                      class="white--text"
                      color="#009263"
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon class="mr-1"> mdi-cog </v-icon> Configurações
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title
                      style="background-color: #009263;"
                      class="white--text"
                    >
                      <b>Configurações TPC</b>
                    </v-card-title>
                    <v-card-text>
                      <div class="my-2">
                        <center>
                          <v-btn
                            v-if="!showConfig"
                            text
                            @click="showConfig = !showConfig"
                            ><span>Mostrar Ajuda</span
                            ><v-icon color="#009263"> mdi-help-circle </v-icon>
                          </v-btn>
                          <v-btn v-else text @click="showConfig = !showConfig"
                            >Esconder Ajuda</v-btn
                          >
                        </center>
                        <v-slide-y-transition>
                          <v-card
                            v-show="showConfig"
                            class="elevation-6 pa-3"
                            style="border: 2px solid green !important;"
                            color="grey lighten-3"
                          >
                            <v-row>
                              <v-col cols="12">
                                <span>
                                  1. <b>Ordem das Questões Aleatória:</b> Esta
                                  opção faz com que a ordem das questões seja
                                  aleatória para cada aluno.
                                </span>
                              </v-col>
                              <v-col cols="12">
                                <span>
                                  2.
                                  <b>Impedir Retroceder nas Questões:</b> Esta
                                  opção faz com que o aluno ao responder a uma
                                  questão e avançar para a próxima, seja
                                  impedido de retroceder e alterar a resposta a
                                  uma questão anterior.
                                </span>
                              </v-col>
                              <v-col cols="12">
                                <span>
                                  3.
                                  <b>Impedir Acesso à Resolução:</b> Esta opção
                                  impede o aluno de ter acesso à solução do TPC
                                  e à respetiva correção da sua resolução (após
                                  o TPC ficar expirado).
                                </span>
                              </v-col>
                            </v-row>
                          </v-card>
                        </v-slide-y-transition>
                      </div>
                      <v-list>
                        <v-list-item disabled>
                          <v-list-item-content>
                            <v-list-item-title>
                              Ordem das Questões Aleatória
                            </v-list-item-title>
                          </v-list-item-content>

                          <v-list-item-action>
                            <v-checkbox
                              disabled
                              v-model="configAleatoria"
                              color="#009263"
                            ></v-checkbox>
                          </v-list-item-action>
                        </v-list-item>
                        <v-list-item disabled>
                          <v-list-item-content>
                            <v-list-item-title>
                              Impedir Retroceder nas Questões
                            </v-list-item-title>
                          </v-list-item-content>

                          <v-list-item-action>
                            <v-checkbox
                              disabled
                              v-model="configRetroceder"
                              color="#009263"
                            ></v-checkbox>
                          </v-list-item-action>
                        </v-list-item>
                        <v-list-item disabled>
                          <v-list-item-content>
                            <v-list-item-title>
                              Impedir Acesso à Resolução
                            </v-list-item-title>
                          </v-list-item-content>

                          <v-list-item-action>
                            <v-checkbox
                              disabled
                              v-model="configResolucao"
                              color="#009263"
                            ></v-checkbox>
                          </v-list-item-action>
                        </v-list-item>
                      </v-list>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions class="text-center">
                      <v-btn
                        :style="{
                          left: '50%',
                          transform: 'translateX(-50%)',
                        }"
                        color="#009263"
                        text
                        @click="closeConfig()"
                      >
                        OK
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-col>
            </v-row>
            <v-row class="mb-n6" v-if="profView">
              <v-col cols="12" sm="12" md="6" lg="6" xl="6">
                <v-combobox
                  color="#009263"
                  item-color="#009263"
                  v-model="turmasSelected"
                  chips
                  multiple
                  outlined
                  full-width
                  prefix="Turmas"
                  readonly
                >
                  <template v-slot:selection="{ item }">
                    <v-dialog
                      content-class="elevation-0"
                      :retain-focus="false"
                      v-model="turmaDialog"
                      scrollable
                      max-width="500px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-chip
                          dark
                          color="#009263"
                          v-bind="attrs"
                          v-on="on"
                          @click="verTurma(item)"
                        >
                          <strong v-if="allAlunosFlag[item] === false"
                            >{{ item }}*</strong
                          >
                          <strong v-else>{{ item }}</strong>
                        </v-chip>
                      </template>
                      <v-card>
                        <v-card-title
                          style="background-color: #009263;"
                          class="white--text"
                        >
                          <b>Turma {{ turmaCod }}</b>
                        </v-card-title>

                        <v-card-text style="height: 300px;">
                          <v-list shaped>
                            <v-list-item-group multiple>
                              <template v-for="(al, ind) in turmas[turmaCod]">
                                <v-list-item
                                  disabled
                                  :key="ind"
                                  :value="al"
                                  active-class="#009263"
                                >
                                  <v-list-item-content>
                                    <v-list-item-title>
                                      {{ al.nome }}</v-list-item-title
                                    >
                                  </v-list-item-content>

                                  <v-list-item-action>
                                    <v-checkbox
                                      disabled
                                      :input-value="al.active"
                                      color="#009263"
                                    ></v-checkbox>
                                  </v-list-item-action>
                                </v-list-item>
                              </template>
                            </v-list-item-group>
                          </v-list>
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-actions>
                          <v-btn
                            :style="{
                              left: '50%',
                              transform: 'translateX(-50%)',
                            }"
                            color="#009263"
                            text
                            @click="turmaDialog = false"
                          >
                            OK
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </template>
                </v-combobox>
              </v-col>
              <v-col cols="12" sm="6" md="3" lg="3" xl="3">
                <v-text-field
                  outlined
                  color="#009263"
                  label="Data Limite"
                  prepend-icon="mdi-calendar"
                  disabled
                  v-model="date"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="3" lg="3" xl="3">
                <v-text-field
                  outlined
                  color="#009263"
                  v-model="time"
                  label="Hora Limite"
                  prepend-icon="mdi-clock-time-four-outline"
                  disabled
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row v-if="profView" class="my-n4">
              <v-col cols="12">
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
                          <b>{{ q.cod }}</b>
                        </span>
                      </v-chip>
                    </v-slide-item>
                  </v-slide-group>
                </v-sheet>
              </v-col>
              <!-- <v-col
                align="center"
                class="mt-2"
                cols="12"
                sm="12"
                md="3"
                lg="2"
                xl="2"
              >
                <v-btn
                  class="white--text"
                  style="background-color: #009263;"
                  @click="exportarPdf()"
                  ><v-icon>mdi-file-pdf-box</v-icon>Exportar</v-btn
                >
              </v-col> -->
            </v-row>
            <v-row v-else class="my-n4">
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
                          <b>{{ q.cod }}</b>
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
                  label="Tema"
                  outlined
                  readonly
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                <v-text-field
                  color="#009263"
                  v-model="subtema"
                  label="Subtema"
                  outlined
                  readonly
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row ref="questaoAtual">
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

                          <div
                            v-html="questaoAtual"
                            class="mt-5 ml-8 mr-2"
                          ></div>

                          <div class="mt-5 ml-8">
                            <v-container v-if="tipoQuestao === 2">
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
                                  <span
                                    ><b>{{ index + 1 }})</b></span
                                  >
                                  <v-img
                                    contain
                                    :src="imgRespostas(resp)"
                                  ></v-img>
                                </v-col>
                              </v-row>
                            </v-container>
                            <div
                              class="mt-8 mr-2"
                              v-else-if="tipoQuestao === 1"
                            >
                              <v-container class="input">
                                <span> Resposta Aberta </span>
                                <span class="unidade" v-html="unidade"></span>
                              </v-container>
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
                            <div
                              v-else-if="tipoQuestao === 7 && tipoGrid === 'h'"
                            >
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
                            </div>

                            <v-container v-else>
                              <ul>
                                <li
                                  v-for="(resp, index) in respostas"
                                  :key="index"
                                >
                                  <b> {{ index + 1 }}) </b>
                                  <span v-html="resp"></span>
                                </li>
                              </ul>
                            </v-container>
                          </div>
                        </v-col>
                        <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                          <div align="center" class="pa-2">
                            <v-dialog
                              v-model="dialogResol"
                              :max-width="resolWidth()"
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                  :disabled="!profView && configResolucao"
                                  small
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
            <v-container>
              <v-row>
                <v-col align="start" cols="6" sm="3" md="4" lg="4" xl="4">
                  <v-btn
                    @click="voltar"
                    large
                    class="white--text"
                    color="#009263"
                    >Voltar</v-btn
                  >
                </v-col>
                <v-col
                  :order="xsBpoint"
                  align="center"
                  cols="12"
                  sm="6"
                  md="4"
                  lg="4"
                  xl="4"
                >
                  <v-btn
                    @click="proxQuestao(false)"
                    rounded
                    class="mx-4"
                    large
                    dark
                    color="#009263"
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
                <v-col
                  v-if="profView"
                  align="right"
                  cols="6"
                  sm="3"
                  md="4"
                  lg="4"
                  xl="4"
                >
                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        v-bind="attrs"
                        v-on="on"
                        @click="deleteTpc"
                        rounded
                        large
                        class="white--text"
                        color="#cc0000"
                      >
                        <v-icon large>
                          mdi-delete
                        </v-icon>
                      </v-btn>
                    </template>
                    <span>Apagar TPC</span>
                  </v-tooltip>
                </v-col>
              </v-row>
            </v-container>
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
const blank = require("@/assets/blank.svg");
import { GridLayout, GridItem } from "vue-grid-layout";

export default {
  components: {
    GridLayout,
    GridItem,
  },
  props: ["id"],
  created() {
    this.getUser();
    this.getTpc();
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
      show: false,
      showConfig: false,
      dialogResol: false,
      dialogConfig: false,
      userId: null,
      user: null,
      tpc: null,
      turmas: {},
      turmasSelected: [],
      turmaCod: "",
      turmaDialog: false,
      allAlunosFlag: {},
      catalogoQuestoes: [],
      catalogoRespostas: {},
      catalogoTemas: [],
      respostas: [],
      counter: 0,
      tema: "",
      subtema: "",
      profName: "",
      configAleatoria: false,
      configRetroceder: false,
      configResolucao: false,
      resolCard: "900px",
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
    turma() {
      if (!this.user) return "";
      return this.user.turma;
    },
    userName() {
      if (!this.user) return "";
      return this.user.nome;
    },
    profView() {
      const type = this.$store.getters.getUserType;
      if (type === "aluno") {
        return false;
      }
      return true;
    },
    xsBpoint() {
      if (this.$vuetify.breakpoint.xs) return "first";
      return "";
    },
    time() {
      if (!this.tpc) return "";

      const datetime = new Date(this.tpc.dataFim);
      const hours = (datetime.getHours() < 10 ? "0" : "") + datetime.getHours();
      const minutes =
        (datetime.getMinutes() < 10 ? "0" : "") + datetime.getMinutes();
      return `${hours}:${minutes}`;
    },
    date() {
      if (!this.tpc) return "";

      const datetime = new Date(this.tpc.dataFim);
      const month =
        (datetime.getMonth() + 1 < 10 ? "0" : "") + (datetime.getMonth() + 1);
      const day = (datetime.getDate() < 10 ? "0" : "") + datetime.getDate();
      return `${datetime.getFullYear()}-${month}-${day}`;
    },
    tentativas() {
      if (!this.tpc) return "";
      return this.tpc.tentativas;
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
      if (!this.catalogoQuestoes[this.counter]) return blank;
      let img = this.catalogoQuestoes[this.counter].figura;
      img = img
        ? `https://www.hypatiamat.com/imagens/${img.replace(".swf", "")}.png`
        : "";
      return img;
    },
  },
  methods: {
    async exportarPdf() {},
    // Grid Horizontal
    corGridTop(index) {
      const layout = this.catalogoQuestoes[this.counter].resposta1;
      let idxList = layout.split("-");
      const lado = idxList[1];

      idxList = idxList.splice(2);

      if (lado === "c")
        return idxList.includes(index)
          ? { background: "#ff6600" }
          : { background: "#eee" };

      return { background: "#eee" };
    },
    corGridBtm(index) {
      const layout = this.catalogoQuestoes[this.counter].resposta1;
      let idxList = layout.split("-");
      const lado = idxList[1];

      idxList = idxList.splice(2);

      if (lado === "b")
        return idxList.includes(index)
          ? { background: "#ff6600" }
          : { background: "#eee" };

      return { background: "#eee" };
    },
    // Grid Vertical
    corGridEsq(index) {
      const layout = this.catalogoQuestoes[this.counter].resposta1;
      let idxList = layout.split("-");
      const lado = idxList[1];

      idxList = idxList.splice(2);

      if (lado === "e")
        return idxList.includes(index)
          ? { background: "#ff6600" }
          : { background: "#eee" };

      return { background: "#eee" };
    },
    corGridDir(index) {
      const layout = this.catalogoQuestoes[this.counter].resposta1;
      let idxList = layout.split("-");
      const lado = idxList[1];

      idxList = idxList.splice(2);

      if (lado === "d")
        return idxList.includes(index)
          ? { background: "#ff6600" }
          : { background: "#eee" };

      return { background: "#eee" };
    },
    closeConfig() {
      this.dialogConfig = false;
      this.showConfig = false;
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
    verTurma(turma) {
      this.turmaCod = turma;
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
        this.$forceUpdate();
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

    // Eliminar TPC
    async deleteTpc() {
      try {
        // Confirmar eliminacao
        Swal.fire({
          title: "Eliminar TPC?",
          text: "Todas as resoluções relativas ao TPC serão apagadas!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#009263",
          cancelButtonColor: "#d33",
          confirmButtonText: "Confirmar",
          cancelButtonText: "Cancelar",
        }).then(async (result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: "A eliminar TPC...",
              showConfirmButton: false,
              allowOutsideClick: false,
              willOpen: () => {
                Swal.showLoading();
              },
            });

            // eliminar tpc
            const tpc = await axios.delete(host + "tpcs/" + this.id);

            // eliminar resolucoes de alunos
            for (const al of tpc.data["tpc_alunos"]) {
              const tpcAluno = await axios.get(
                host + "tpc-alunos/" + al.codAluno
              );

              // eliminar tpc e resol. de aluno
              let allTpcIds = tpcAluno.data.tpcs
                .filter((el) => {
                  return el.id !== this.id;
                })
                .map((el) => el.id);

              let allResolIds = tpcAluno.data.resolucoes
                .filter((el) => {
                  return el.idTpc !== this.id;
                })
                .map((el) => el.id);

              await axios.put(host + "tpc-alunos/" + al.codAluno, {
                tpcs: allTpcIds,
                resolucoes: allResolIds,
              });

              //eliminar resolucoes
              let resolToDel = tpcAluno.data.resolucoes
                .filter((el) => {
                  return el.idTpc === this.id;
                })
                .map((el) => el.id);

              for (const resolId of resolToDel) {
                const resol = await axios.delete(
                  host + "resolucoes/" + resolId
                );

                //eliminar respostas
                for (const resp of resol.data.respostas) {
                  await axios.delete(host + "respostas/" + resp.id);
                }
              }
            }

            // Atualizar store
            this.$store.dispatch("getTpcs");

            Swal.close();
            Swal.fire({
              icon: "success",
              title: "TPC eliminado com sucesso!",
              confirmButtonColor: "#009263",
            });
            this.$router.replace("/dashboard");
          }
        });
      } catch (err) {
        const error = new Error(err.message || "Failed to delete TPC");
        throw error;
      }
    },
    proxQuestao(flag) {
      const nQuestoes = this.catalogoQuestoes.length;
      if (flag) {
        if (this.counter + 1 < nQuestoes) this.counter++;
      } else {
        if (this.counter - 1 >= 0) this.counter--;
      }
      this.$refs.chips[this.counter].click();
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

    questaoSelected(q, ind) {
      this.counter = ind;
      this.showRespostas();
      this.getTema();
    },
    async getUser() {
      try {
        const user = this.$store.getters.getUserId;
        const type = this.$store.getters.getUserType;
        this.userId = user;

        if (type === "aluno") {
          const aluno = await axios.get(host + "alunos/" + user);
          this.user = aluno.data;
          const prof = await axios.get(
            host + "professores/" + this.user.codprofessor
          );

          this.profName = prof.data.nome;
        } else if (type === "professor") {
          const prof = await axios.get(host + "professores/" + user);

          this.profName = prof.data.nome;
        }
      } catch (err) {
        const error = new Error(err.message || "Failed to query user");
        throw error;
      }
    },
    async getTpc() {
      try {
        const tpcData = await axios.get(host + "tpcs/" + this.id);

        this.tpc = tpcData.data;

        // questoes
        const questoesCod = tpcData.data["tpc_questoes"];
        for (const q of questoesCod) {
          const questao = await axios.get(host + "exercicios/" + q.codQuestao);

          this.catalogoQuestoes.push(questao.data);
          this.getRespostas(questao.data);
        }
        this.showRespostas();
        this.getTema();

        // configs
        this.configAleatoria = tpcData.data.configAleatoria;
        this.configRetroceder = tpcData.data.configRetroceder;
        this.configResolucao = tpcData.data.configResolucao;

        // alunos
        const alunos = tpcData.data["tpc_alunos"];

        let turmasTpc = alunos.reduce(function(list, al) {
          list[al.codTurma] = list[al.codTurma] || [];
          list[al.codTurma].push({
            ...al,
          });
          return list;
        }, Object.create(null));

        let turmasProf = await axios.get(
          host + "turmas/prof/" + tpcData.data.codProf
        );

        turmasProf = turmasProf.data;

        let filterTurmas = Object.keys(turmasProf)
          .filter((turma) => Object.keys(turmasTpc).includes(turma))
          .reduce((obj, turma) => {
            obj[turma] = turmasProf[turma];
            return obj;
          }, {});

        for (const [turma, alunos] of Object.entries(filterTurmas)) {
          const als = [];
          alunos.map((al) => {
            const verify = turmasTpc[turma].find(
              (aluno) => aluno.codAluno === al.user
            );
            al.active = verify ? true : false;

            als.push({ codAluno: al.user, nome: al.nome, active: al.active });
          });
          filterTurmas[turma] = als;

          this.allAlunosFlag[turma] = als.find((al) => al.active === false)
            ? false
            : true;
        }

        this.turmas = filterTurmas;
        this.turmasSelected = Object.keys(filterTurmas);
      } catch (err) {
        const error = new Error(err.message || "Failed to query TPC");
        throw error;
      }
    },
    voltar() {
      window.history.length > 2
        ? this.$router.go(-1)
        : this.$router.push("/dashboard");
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
  font-size: 12px;
}
</style>
