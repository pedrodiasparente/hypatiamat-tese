<template>
  <v-app id="inspire">
    <v-main class="grey lighten-3">
      <v-container>
        <v-card class="pa-5">
          <v-container>
            <v-card-title class="justify-center green--text">
              <h2>
                Criar Novo TPC
              </h2>
            </v-card-title>

            <div class="mb-6">
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
                        1. Esta é a página de criação de um TPC, onde deverá
                        primeiramente fornecer informações como o <b>Título</b>,
                        o n.º permitido de <b>Tentativas</b>, a <b>Data </b> e
                        <b>Hora </b> de expiração e as <b>Turmas</b> e
                        respetivos alunos que devem realizar o TPC.
                      </span>
                    </v-col>
                    <v-col cols="12">
                      <span>
                        2. Para cada turma que selecionou na lista, pode aceder
                        aos respetivos alunos e editar aqueles que pretende que
                        realizem o TPC, clicando no botão da turma (ex:
                        <v-chip dark color="#009263" close>
                          <strong>3A-21-1</strong> </v-chip
                        >). Por defeito, ficarão selecionados todos os alunos
                        dessa turma.
                      </span>
                    </v-col>
                    <v-col cols="12">
                      <span>
                        3. De seguida, deverá escolher as questões que pretende
                        submeter no TPC. Para escolher uma questão selecione um
                        tema da lista de <b>Temas</b> e um subtema, na lista de
                        <b>Subtemas</b>. No <i>dashboard</i>, irão aparecer, uma
                        a uma, as questões do conjunto do tema/subtema
                        escolhidos. Para navegar nesse conjunto de questões,
                        utilize
                        <v-btn icon color="#009263">
                          <v-icon large>
                            mdi-arrow-left-bold-circle
                          </v-icon>
                        </v-btn>
                        e
                        <v-btn icon color="#009263">
                          <v-icon large>
                            mdi-arrow-right-bold-circle
                          </v-icon>
                        </v-btn>
                        e se pretender adicionar ao TPC a questão que está a
                        visualizar, utilize o botão adicionar
                        <v-btn
                          small
                          class="white--text mx-1"
                          rounded
                          color="#009263"
                        >
                          <v-icon>mdi-plus-circle</v-icon></v-btn
                        >. No <i>dashboard</i> também consegue filtrar as
                        questões por <b>Exame</b> (extraídas de provas de
                        avaliação nacionais e estrangeiras) e por
                        <b>Nível</b> (de escolaridade: Nível 1 - 1.º e 2.º anos;
                        Nível 2 - 3.º e 4.º anos; Nível 3 - 5.º e 6.º anos;
                        Nível 4 - 7.º ao 9.º ano).
                      </span>
                    </v-col>
                    <v-col cols="12">
                      <span>
                        4. Poderá também ativar configurações específicas do TPC
                        se aceder ao botão
                        <v-btn small class="white--text" color="#009263">
                          <v-icon class="mr-1"> mdi-cog </v-icon>
                          Configurações </v-btn
                        >.
                      </span>
                    </v-col>
                    <v-col cols="12">
                      <span>
                        5. Pode adicionar qualquer número de questões, e
                        removê-las, uma a uma, sempre que achar necessário.
                        Quando tiver concluído a elaboração do TPC, pode
                        finalmente submetê-lo em
                        <v-btn small class="white--text" color="#009263">
                          Criar TPC </v-btn
                        >.
                      </span>
                    </v-col>
                  </v-row>
                </v-card>
              </v-slide-y-transition>
            </div>

            <v-row>
              <v-col cols="12" sm="12" md="6" lg="6" xl="6">
                <v-text-field
                  color="#009263"
                  outlined
                  type="text"
                  label="Título do TPC"
                  v-model="titulo"
                  :rules="textRules"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="2" lg="3" xl="3">
                <v-text-field
                  color="#009263"
                  outlined
                  v-model="tentativas"
                  type="number"
                  label="Tentativas"
                  prepend-icon="mdi-counter"
                  :rules="tentativasRules"
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
                        <v-list-item>
                          <v-list-item-content>
                            <v-list-item-title>
                              Ordem das Questões Aleatória
                            </v-list-item-title>
                          </v-list-item-content>

                          <v-list-item-action>
                            <v-checkbox
                              v-model="configAleatoria"
                              color="#009263"
                            ></v-checkbox>
                          </v-list-item-action>
                        </v-list-item>
                        <v-list-item>
                          <v-list-item-content>
                            <v-list-item-title>
                              Impedir Retroceder nas Questões
                            </v-list-item-title>
                          </v-list-item-content>

                          <v-list-item-action>
                            <v-checkbox
                              v-model="configRetroceder"
                              color="#009263"
                            ></v-checkbox>
                          </v-list-item-action>
                        </v-list-item>
                        <v-list-item>
                          <v-list-item-content>
                            <v-list-item-title>
                              Impedir Acesso à Resolução
                            </v-list-item-title>
                          </v-list-item-content>

                          <v-list-item-action>
                            <v-checkbox
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
            <v-row class="mb-n6">
              <v-col cols="12" sm="12" md="6" lg="6" xl="6">
                <v-combobox
                  @click:clear="clearTurmas"
                  color="#009263"
                  item-color="#009263"
                  v-model="turmasSelected"
                  :items="Object.keys(turmasProf)"
                  chips
                  clearable
                  multiple
                  outlined
                  full-width
                  prefix="Turmas"
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
                          close
                          @click="editarAlunos(item)"
                          @click:close="removeTurma(item)"
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
                          <v-list>
                            <div
                              class="mr-2"
                              style="display: flex; justify-content: flex-end"
                            >
                              <v-checkbox
                                @change="changeAll(turmaCod)"
                                :input-value="allAlunosFlag[turmaCod]"
                                color="#009263"
                              ></v-checkbox>
                            </div>
                            <v-divider></v-divider>
                            <template v-for="(al, ind) in turmasProf[turmaCod]">
                              <v-list-item
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
                                    @change="changeActive(al)"
                                    :input-value="al.active"
                                    color="#009263"
                                  ></v-checkbox>
                                </v-list-item-action>
                              </v-list-item>
                            </template>
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
                            Guardar
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </template>
                </v-combobox>
              </v-col>
              <v-col cols="12" sm="6" md="3" lg="3" xl="3">
                <v-dialog
                  ref="dialog"
                  v-model="dateModal"
                  :return-value.sync="date"
                  width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      outlined
                      color="#009263"
                      v-model="date"
                      label="Data Limite"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      :rules="textRules"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    color="#009263"
                    v-model="date"
                    scrollable
                    locale="pt-PT"
                    :min="new Date().toISOString().substr(0, 10)"
                  >
                    <v-spacer></v-spacer>
                    <v-btn
                      text
                      color="#009263"
                      @click="$refs.dialog.save(date)"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-col>
              <v-col cols="12" sm="6" md="3" lg="3" xl="3">
                <v-dialog
                  ref="dialog2"
                  v-model="timeModal"
                  :return-value.sync="time"
                  width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      outlined
                      color="#009263"
                      v-model="time"
                      label="Hora Limite"
                      prepend-icon="mdi-clock-time-four-outline"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      :rules="textRules"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    scrollable
                    color="#009263"
                    format="24hr"
                    v-model="time"
                    full-width
                  >
                    <v-spacer></v-spacer>
                    <v-btn
                      text
                      color="#009263"
                      @click="$refs.dialog2.save(time)"
                    >
                      OK
                    </v-btn>
                  </v-time-picker>
                </v-dialog>
              </v-col>
            </v-row>
            <v-row class="mb-6">
              <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                <v-container fluid class="my-n6" v-if="questoes.length === 0">
                  <h3 style="color:#960000;">Adicionar Questões!</h3>
                </v-container>
                <v-sheet class="my-n6" v-else>
                  <v-slide-group mandatory show-arrows center-active>
                    <v-slide-item
                      v-for="(q, index) in questoes"
                      :key="index"
                      v-slot="{ active, toggle }"
                    >
                      <v-chip
                        ref="chips"
                        large
                        close
                        dark
                        color="#009263"
                        class="mx-2"
                        :input-value="active"
                        active-class="black--text"
                        @click="toggle"
                        v-on:click="questaoSelected(q, index)"
                        @click:close="removeQuestao(index)"
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
                <v-combobox
                  color="#009263"
                  item-color="green"
                  outlined
                  flat
                  v-model="temaSelected"
                  :items="temas"
                  label="Temas"
                  @change="changeTema"
                ></v-combobox>
              </v-col>
              <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                <v-combobox
                  color="#009263"
                  item-color="green"
                  v-model="subtemaSelected"
                  outlined
                  flat
                  :items="subtemas"
                  label="Subtemas"
                  @change="changeSubtema()"
                ></v-combobox>
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
                            <span v-if="!addDisabled">Questão</span>
                          </h2>
                          <div v-if="hasQuestao === -1" class="mt-5 ml-5">
                            <h3 style="color:green;">
                              Selecione um Tema e Subtema para visualizar as
                              respetivas Questões!
                            </h3>
                          </div>
                          <div v-else-if="hasQuestao === 0" class="mt-5 ml-5">
                            <h3 style="color:green;">
                              O Tema/Subtema selecionado não possui questões
                              disponíveis.
                            </h3>
                          </div>
                          <div
                            v-else-if="hasQuestaoConfig === 0"
                            class="mt-5 ml-5"
                          >
                            <h3 style="color:green;">
                              Não existem questões disponíveis para as
                              configurações de exame/nível de dificuldade
                              escolhidas.
                            </h3>
                          </div>
                          <div
                            v-else
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
                          <div v-if="hasResolucao" align="center" class="pa-2">
                            <v-dialog
                              v-model="dialog"
                              :max-width="resolWidth()"
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-btn
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
                                    @click="dialog = false"
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
                      <v-container v-if="hasQuestao !== 1"></v-container>
                      <v-container v-else>
                        <v-row no-gutters>
                          <v-col cols="12" sm="6" lg="4">
                            <div class="codquestao">
                              <span>
                                <b> {{ codQuestao }}</b>
                              </span>
                            </div>
                          </v-col>
                          <v-col align="left" cols="12" sm="6" lg="4">
                            <div class="selectExame">
                              <v-checkbox
                                @change="changeNivelExames"
                                v-model="onlyExames"
                                color="#009263"
                                dense
                                label="Exame"
                                ><span slot="label" class="black--text"
                                  >Exame</span
                                ></v-checkbox
                              >
                            </div>
                          </v-col>
                          <v-col align="right" cols="12" sm="12" lg="4">
                            <div class="selectNivel">
                              <v-select
                                @change="changeNivelExames"
                                v-model="nivelSelect"
                                :items="nivelItems"
                                single-line
                                color="#009263"
                                item-color="green"
                                prefix="Nível"
                                dense
                              ></v-select>
                            </div>
                          </v-col>
                        </v-row>
                      </v-container>
                      <v-card class="mt-n4">
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
                </v-col>
                <v-col align="center" cols="12" sm="6" md="4" lg="4" xl="4">
                  <v-btn
                    :disabled="addDisabled"
                    icon
                    color="#009263"
                    @click="proxQuestao(false)"
                  >
                    <v-icon x-large>
                      mdi-arrow-left-bold-circle
                    </v-icon>
                  </v-btn>
                  <v-tooltip top>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        v-bind="attrs"
                        v-on="on"
                        class="white--text mx-1"
                        :disabled="addDisabled"
                        rounded
                        @click="submitQuestao"
                        large
                        color="#009263"
                      >
                        <v-icon>mdi-plus-circle</v-icon>
                        {{ codQuestao }}</v-btn
                      >
                    </template>
                    <span>Adicionar Questão</span>
                  </v-tooltip>
                  <v-btn
                    :disabled="addDisabled"
                    icon
                    color="#009263"
                    @click="proxQuestao(true)"
                  >
                    <v-icon x-large>
                      mdi-arrow-right-bold-circle
                    </v-icon>
                  </v-btn>
                  <p v-if="questoesSelected.length !== 0" class="mt-2">
                    {{ contador }}
                  </p>
                </v-col>

                <v-col align="right" cols="12" sm="3" md="4" lg="4" xl="4">
                  <v-btn
                    large
                    class="white--text"
                    color="#009263"
                    @click="criarTpc"
                    >Criar TPC</v-btn
                  >
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
import { GridLayout, GridItem } from "vue-grid-layout";

export default {
  name: "CreateTpc",
  components: {
    GridLayout,
    GridItem,
  },
  props: ["id"],
  created() {
    this.getUserId();
    this.getTurmas();
    this.getTemas();
    this.getQuestoes();

    if (this.id) {
      this.getTpc(this.id);
    }
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
      nivelSelect: "*",
      nivelItems: ["*", 1, 2, 3, 4],
      onlyExames: false,
      userId: null,
      titulo: null,
      dialog: false,
      dialogConfig: false,
      turmaCod: "",
      turmaDialog: false,
      turmasProf: [],
      turmasSelected: [],
      allAlunosFlag: {},
      tentativas: 1,
      date: null,
      time: null,
      dateModal: false,
      timeModal: false,
      questoes: [],
      addChipIdx: 0,
      temas: [],
      subtemas: [],
      temaSelected: null,
      subtemaSelected: null,
      catalogoTemas: [],
      catalogoQuestoes: [],
      questoesSelected: [],
      codTemaSelected: null,
      counter: 0,
      respostas: [],
      hasQuestao: -1,
      hasQuestaoConfig: -1,
      tentativasRules: [(v) => v && v > 0],
      textRules: [(v) => !!v],
      resolCard: "900px",
      show: false,
      showConfig: false,
      configAleatoria: false,
      configRetroceder: false,
      configResolucao: false,
    };
  },
  computed: {
    tipoGrid() {
      if (!this.questoesSelected[this.counter]) return 0;
      const layout = this.questoesSelected[this.counter].resposta1;
      let idxList = layout.split("-");
      const tipoGrid = idxList[0];
      // h ou v
      return tipoGrid;
    },
    addDisabled() {
      if (
        this.hasQuestao === -1 ||
        this.hasQuestao === 0 ||
        this.hasQuestaoConfig === 0
      )
        return true;
      return false;
    },
    exame() {
      if (!this.questoesSelected[this.counter]) return "";
      return this.questoesSelected[this.counter].idexame;
    },
    temExame() {
      if (
        this.questoesSelected[this.counter] &&
        this.questoesSelected[this.counter].idexame
      )
        return 1;
      return 0;
    },
    nivel() {
      if (!this.questoesSelected[this.counter]) return "";
      return this.questoesSelected[this.counter].niveldificuldade;
    },
    codQuestao() {
      if (!this.questoesSelected[this.counter]) return "";
      return this.questoesSelected[this.counter].cod;
    },
    unidade() {
      if (!this.questoesSelected[this.counter]) return "";
      return this.questoesSelected[this.counter].unidade;
    },
    hasResolucao() {
      if (!this.questoesSelected[this.counter]) return false;
      return true;
    },
    resolucao() {
      if (!this.questoesSelected[this.counter]) return "";
      let img = this.questoesSelected[this.counter].resolucao;
      img = img
        ? `https://www.hypatiamat.com/imagens/propresolucao/${img.replace(
            ".swf",
            ""
          )}.png`
        : "";
      return img;
    },
    imagem() {
      if (!this.questoesSelected[this.counter]) return "";
      let img = this.questoesSelected[this.counter].figura;
      img = img
        ? `https://www.hypatiamat.com/imagens/${img.replace(".swf", "")}.png`
        : "";
      return img;
    },
    contador() {
      return `${this.counter + 1}/${this.questoesSelected.length}`;
    },
    questaoAtual() {
      if (!this.questoesSelected[this.counter]) return "";

      return this.questoesSelected[this.counter].questao;
    },
    tipoQuestao() {
      if (!this.questoesSelected[this.counter]) return 0;

      return this.questoesSelected[this.counter].tipo;
    },
  },
  methods: {
    async getTpc() {
      try {
        const tpcData = await axios.get(host + "tpcs/" + this.id);

        //info
        this.titulo = tpcData.data.tagname;
        this.tentativas = tpcData.data.tentativas;

        // questoes
        const questoesCod = tpcData.data["tpc_questoes"];
        for (const q of questoesCod) {
          const questao = await axios.get(host + "exercicios/" + q.codQuestao);

          this.questoes.push(questao.data);
        }

        this.questaoSelected(this.questoes[0]);
        this.addChipIdx = this.questoes.length;

        // turmas
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
            als.push({
              active: al.active,
              nome: al.nome,
              numero: al.numero,
              user: al.user,
            });
          });
          filterTurmas[turma] = als;

          this.allAlunosFlag[turma] = als.find((al) => al.active === false)
            ? false
            : true;
        }

        this.turmasProf = Object.assign(this.turmasProf, filterTurmas);
        this.turmasSelected = Object.keys(turmasTpc);
      } catch (err) {
        const error = new Error(err.message || "Failed to query TPC");
        throw error;
      }
    },

    // Grid Horizontal
    corGridTop(index) {
      const layout = this.questoesSelected[this.counter].resposta1;
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
      const layout = this.questoesSelected[this.counter].resposta1;
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
      const layout = this.questoesSelected[this.counter].resposta1;
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
      const layout = this.questoesSelected[this.counter].resposta1;
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
      if (!this.questoesSelected[this.counter]) return "";
      let img = this.questoesSelected[this.counter].resolucao;
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
    changeNivelExames() {
      let listSubtemas = this.catalogoTemas.filter((el) => {
        return el.codtema === this.codTemaSelected;
      })[0].subtemas;

      let codSubtema = listSubtemas.filter((el) => {
        return el.subtema === this.subtemaSelected;
      })[0].codsubtema;

      this.questoesSelected = this.catalogoQuestoes[codSubtema] || [];

      // Só exames
      if (this.onlyExames)
        this.questoesSelected = this.questoesSelected.filter(
          (el) => el.idexame !== ""
        );

      // Só nivel x
      switch (this.nivelSelect) {
        case "*":
          break;
        default:
          this.questoesSelected = this.questoesSelected.filter(
            (el) => el.niveldificuldade === this.nivelSelect
          );
          break;
      }

      if (this.questoesSelected.length === 0) {
        this.hasQuestaoConfig = 0;
      } else this.hasQuestaoConfig = 1;

      this.counter = 0;
      this.getRespostas();
    },
    clearTurmas() {
      this.turmasSelected.forEach((el) => this.resetAllTrue(el));
      this.turmasSelected = [];
    },
    resetAllTrue(turma) {
      this.allAlunosFlag[turma] = true;
      this.turmasProf[turma].map((el) => (el.active = true));
    },
    changeAll(turma) {
      this.allAlunosFlag[turma] = !this.allAlunosFlag[turma];
      this.turmasProf[turma].map(
        (el) => (el.active = this.allAlunosFlag[turma])
      );
    },
    changeActive(aluno) {
      aluno.active = !aluno.active;

      if (
        this.turmasProf[this.turmaCod].filter((e) => e.active === false)
          .length === 0
      ) {
        this.allAlunosFlag[this.turmaCod] = true;
      } else {
        this.allAlunosFlag[this.turmaCod] = false;
      }
    },

    editarAlunos(turma) {
      this.turmaCod = turma;
    },
    async criarTpc() {
      try {
        // Verificar inputs
        if (
          !this.titulo ||
          this.tentativas < 1 ||
          !this.date ||
          !this.time ||
          this.turmasSelected.length == 0
        ) {
          return Swal.fire({
            icon: "error",
            title: "Existem campos por preencher!",
            confirmButtonColor: "#009263",
          });
        }

        if (this.questoes.length === 0) {
          return Swal.fire({
            icon: "error",
            title: "Não adicionou qualquer questão à lista do TPC!",
            confirmButtonColor: "#009263",
          });
        }

        Swal.fire({
          title: "Criar TPC?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#009263",
          cancelButtonColor: "#d33",
          confirmButtonText: "Confirmar",
          cancelButtonText: "Cancelar",
        }).then(async (result) => {
          if (result.isConfirmed) {
            // Loading modal
            Swal.fire({
              title: "A criar TPC...",
              showConfirmButton: false,
              allowOutsideClick: false,
              willOpen: () => {
                Swal.showLoading();
              },
            });

            const questoesCod = this.questoes.map((el) => el.cod);
            const questoesId = [];
            for (const codQuestao of questoesCod) {
              const response = await axios.post(host + "tpc-questoes", {
                codQuestao,
              });
              questoesId.push(response.data.id);
            }

            const alunosId = [];
            for (const turma of this.turmasSelected) {
              const alunos = this.turmasProf[turma];
              for (const al of alunos) {
                if (al.active) {
                  const response = await axios.post(host + "tpc-alunos", {
                    codAluno: al.user,
                    nome: al.nome,
                    numero: al.numero,
                    codTurma: turma,
                  });
                  alunosId.push(response.data.id);
                }
              }
            }

            let body = {
              tagname: this.titulo,
              codProf: this.userId,
              tentativas: this.tentativas,
              dataInicio: new Date(),
              dataFim: new Date(`${this.date} ${this.time}`),
              tpc_questoes: questoesId,
              tpc_alunos: alunosId,
              configAleatoria: this.configAleatoria,
              configRetroceder: this.configRetroceder,
              configResolucao: this.configResolucao,
            };

            const response = await axios.post(host + "tpcs", body);

            // Atualizar store
            let tpcsAtivos = this.$store.getters.getTpcsAtiv;
            tpcsAtivos.push(response.data.id);

            this.$store.commit("setTpcsAtiv", {
              tpcsAtiv: tpcsAtivos,
            });

            Swal.close();
            Swal.fire({
              icon: "success",
              title: "TPC criado com sucesso!",
              confirmButtonColor: "#009263",
            });
            this.$router.replace("/dashboard");
          }
        });
      } catch (err) {
        const error = new Error(err.message || "Failed to post TPC");
        throw error;
      }
    },
    imgRespostas(img) {
      img = img
        ? `https://www.hypatiamat.com/imagens/${img.replace(".swf", "")}.png`
        : "";
      return img;
    },

    async submitQuestao() {
      if (!this.questoesSelected[this.counter]) return;
      if (
        this.questoes.find(
          (x) => x.cod === this.questoesSelected[this.counter].cod
        )
      )
        return Swal.fire({
          title: "Já selecionou esta questão!",
          icon: "warning",
          confirmButtonColor: "#009263",
        });

      const chipIndex = this.addChipIdx;
      const questao = this.questoesSelected[this.counter];
      await this.$set(this.questoes, chipIndex, questao);
      this.$refs.chips[chipIndex].click();
      this.addChipIdx++;
    },
    questaoSelected(q) {
      this.nivelSelect = "*";
      this.onlyExames = false;
      this.hasQuestaoConfig = -1;
      if (!q.cod) return;

      this.codTemaSelected = q.tema;

      const temaEntry = this.catalogoTemas.filter((el) => {
        return el.codtema === this.codTemaSelected;
      })[0];

      this.temaSelected = temaEntry.tema;

      this.changeTema();
      this.subtemaSelected = temaEntry.subtemas.filter((el) => {
        return el.codsubtema === q.subtema;
      })[0].subtema;
      this.changeSubtema(q);
    },
    changeTema() {
      this.nivelSelect = "*";
      this.onlyExames = false;
      this.hasQuestaoConfig = -1;
      this.hasQuestao = -1;
      this.respostas = [];
      this.questoesSelected = [];
      this.subtemaSelected = null;
      const codTema = this.catalogoTemas.filter((el) =>
        el.tema.includes(this.temaSelected)
      )[0].codtema;
      this.codTemaSelected = codTema;
      let subtemas = this.catalogoTemas.filter((el) => {
        return el.codtema === codTema;
      })[0].subtemas;

      this.subtemas = [];
      subtemas.forEach((el) => {
        this.subtemas.push(el.subtema);
      });
    },
    changeSubtema(questao) {
      this.nivelSelect = "*";
      this.onlyExames = false;
      this.hasQuestaoConfig = -1;
      this.hasQuestao = -1;
      if (this.subtemaSelected) {
        let listSubtemas = this.catalogoTemas.filter((el) => {
          return el.codtema === this.codTemaSelected;
        })[0].subtemas;

        let codSubtema = listSubtemas.filter((el) => {
          return el.subtema === this.subtemaSelected;
        })[0].codsubtema;

        this.questoesSelected = this.catalogoQuestoes[codSubtema] || [];

        if (this.questoesSelected.length === 0) this.hasQuestao = 0;
        else this.hasQuestao = 1;

        if (questao)
          this.counter = this.questoesSelected.findIndex(
            (el) => el.cod === questao.cod
          );
        else this.counter = 0;

        this.getRespostas();
      }
    },
    async removeQuestao(ind) {
      this.addChipIdx--;
      this.questoes.splice(ind, 1);
      this.questoes = [...this.questoes];
    },

    getRespostas() {
      this.respostas = [];
      let questao = this.questoesSelected[this.counter];
      if (!questao) return "";
      switch (questao.tipo) {
        case 0:
          this.respostas.push(questao.resposta1);
          this.respostas.push(questao.resposta2);
          this.respostas.push(questao.resposta3);
          this.respostas.push(questao.resposta4);
          break;
        case 1:
          this.respostas.push(questao.unidade);
          break;
        case 2:
          this.respostas.push(questao.resposta1);
          this.respostas.push(questao.resposta2);
          this.respostas.push(questao.resposta3);
          this.respostas.push(questao.resposta4);
          break;
        case 3:
          this.respostas.push(questao.resposta1);
          this.respostas.push(questao.resposta2);
          break;
        case 4:
          this.respostas.push(questao.resposta1);
          this.respostas.push(questao.resposta2);
          this.respostas.push(questao.resposta3);
          break;
        case 5:
          this.respostas.push(questao.resposta1);
          this.respostas.push(questao.resposta2);
          this.respostas.push(questao.resposta3);
          this.respostas.push(questao.resposta4);
          this.respostas.push(questao.resposta5);
          break;
        case 6:
          this.respostas.push(questao.resposta1);
          this.respostas.push(questao.resposta2);
          this.respostas.push(questao.resposta3);
          this.respostas.push(questao.resposta4);
          this.respostas.push(questao.resposta5);
          this.respostas.push(questao.resposta6);
          break;
      }
    },
    proxQuestao(flag) {
      const nQuestoes = this.questoesSelected.length;
      if (flag) {
        if (this.counter + 1 < nQuestoes) this.counter++;
      } else {
        if (this.counter - 1 >= 0) this.counter--;
      }
      this.getRespostas();
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

          this.temas.push(tema);
        });
        this.temas.sort(function(a, b) {
          return a.localeCompare(b);
        });
      } catch (err) {
        const error = new Error(err.message || "Failed to query Temas");
        throw error;
      }
    },
    removeTurma(item) {
      this.turmasSelected.splice(this.turmasSelected.indexOf(item), 1);
      this.turmasSelected = [...this.turmasSelected];
      this.resetAllTrue(item);
    },
    getUserId() {
      this.userId = this.$store.getters.getUserId;
    },
    async getTurmas() {
      try {
        const response = await axios.get(
          host + "turmas/prof/" + this.userId + "?ano=last"
        );

        let turmas = {};
        Object.entries(response.data).forEach(([turma, alunos]) => {
          const al = alunos.map(({ user, nome, numero }) => ({
            user,
            numero,
            nome,
            active: true,
          }));
          turmas[turma] = al;
          this.allAlunosFlag[turma] = true;
        });

        this.turmasProf = turmas;
      } catch (err) {
        const error = new Error(err.message || "Failed to query Turmas");
        throw error;
      }
    },
    async getQuestoes() {
      try {
        const response = await axios.get(host + "exercicios?_limit=-1");
        this.catalogoQuestoes = response.data;
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

/* 
.vue-grid-layout {
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

.codquestao {
  margin-top: 5px;
}

.selectExame {
  margin-top: -16px;
}

.selectNivel {
  margin-top: -2px;
}

#exame {
  padding: 5px 10px;
  font-size: 12px;
}
</style>
