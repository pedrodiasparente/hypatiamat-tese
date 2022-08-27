import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import createPersistedState from "vuex-persistedstate";

const axios = require("axios");
const host = require("@/config/hosts").hostAPI;

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    }),
  ],
  state() {
    return {
      tpcsAtiv: [],
      tpcsExp: [],
      isEditing: false,
    };
  },
  mutations: {
    setTpcsAtiv(state, payload) {
      state.tpcsAtiv = payload.tpcsAtiv;
    },
    setTpcsExp(state, payload) {
      state.tpcsExp = payload.tpcsExp;
    },
    setTpcs(state, payload) {
      state.tpcsAtiv = payload.tpcsAtiv;
      state.tpcsExp = payload.tpcsExp;
    },
    setEditFlag(state, payload) {
      state.isEditing = payload.isEditing;
    },
  },
  actions: {
    async getTpcs(context) {
      try {
        const type = context.getters.getUserType;
        const userId = context.getters.getUserId;
        if (type === "professor") {
          const resp1 = await axios.get(
            host + "tpcs/prof/" + userId + "?time=active"
          );
          const tpcsAtiv = resp1.data.map((el) => el.id);

          const resp2 = await axios.get(
            host + "tpcs/prof/" + userId + "?time=expired"
          );
          const tpcsExp = resp2.data.map((el) => el.id);

          // Store Storage
          context.commit("setTpcs", {
            tpcsAtiv,
            tpcsExp,
          });
        } else if (type === "aluno") {
          let tpcsAtiv = [];
          let tpcsExp = [];

          const resp1 = await axios.get(
            host + "tpc-alunos/" + userId + "/tpcs?time=active"
          );

          if (resp1.data !== "Not Found") {
            tpcsAtiv = resp1.data
              .filter((el) => el.nResol < el.tentativas)
              .map((el) => el.id);
          }

          const resp2 = await axios.get(
            host + "tpc-alunos/" + userId + "/tpcs?time=expired"
          );

          if (resp2.data !== "Not Found") {
            tpcsExp = resp2.data.map((el) => el.id);
          }
          // Store Storage
          context.commit("setTpcs", {
            tpcsAtiv,
            tpcsExp,
          });
        }
      } catch (err) {
        const error = new Error(err.message);
        throw error;
      }
    },
  },
  getters: {
    getTpcsAtiv(state) {
      return state.tpcsAtiv;
    },
    getTpcsExp(state) {
      return state.tpcsExp;
    },
    getEditFlag(state) {
      return state.isEditing;
    },
  },
  modules: {
    auth,
  },
});
