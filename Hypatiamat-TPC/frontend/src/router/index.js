import Vue from "vue";
import VueRouter from "vue-router";
import TheDashboard from "@/views/TheDashboard.vue";
import CreateTpc from "@/views/CreateTpc.vue";
import TheHistoric from "@/views/TheHistoric.vue";
import TheStats from "@/views/TheStats.vue";
import DoTpc from "@/views/DoTpc.vue";
import TheResults from "@/views/TheResults.vue";
import SeeTPC from "@/views/SeeTPC.vue";

import store from "@/store";

Vue.use(VueRouter);

const routes = [
  { path: "/", redirect: "/dashboard" },
  {
    path: "/dashboard",
    name: "TheDashboard",
    component: TheDashboard,
  },
  {
    path: "/historic",
    name: "TheHistoric",
    component: TheHistoric,
  },
  {
    path: "/stats",
    name: "TheStats",
    component: TheStats,
  },
  {
    path: "/create",
    name: "CreateTpc",
    component: CreateTpc,
    props: true,
    beforeEnter: (to, from, next) => {
      const userType = localStorage.getItem("userType");
      if (userType === "professor") {
        next();
      } else {
        next({ name: "TheDashboard" });
      }
    },
  },
  {
    path: "/tpc/:id",
    name: "DoTpc",
    component: DoTpc,
    props: true,
    beforeEnter: (to, from, next) => {
      const userType = localStorage.getItem("userType");
      // ALUNO
      if (userType === "aluno") {
        const tpcsAtiv = store.getters.getTpcsAtiv;
        const canEnter = tpcsAtiv.find((el) => el == to.params.id);

        if (canEnter) next();
        else next({ name: "TheDashboard" });
        // PROF
      } else {
        next({ name: "TheDashboard" });
      }
    },
  },
  {
    path: "/ver-tpc/:id",
    name: "SeeTPC",
    component: SeeTPC,
    props: true,
    beforeEnter: (to, from, next) => {
      const userType = localStorage.getItem("userType");
      // PROF
      if (userType === "professor") {
        const tpcsAtiv = store.getters.getTpcsAtiv;
        const tpcsExp = store.getters.getTpcsExp;
        const allTpcs = [...tpcsAtiv, ...tpcsExp];

        const canEnter = allTpcs.find((el) => el == to.params.id);
        if (canEnter) next();
        else next({ name: "TheDashboard" });
        // ALUNO
      } else {
        const tpcsExp = store.getters.getTpcsExp;

        const canEnter = tpcsExp.find((el) => el == to.params.id);
        if (canEnter) next();
        else next({ name: "TheDashboard" });
      }
    },
  },
  {
    path: "/results/:id",
    name: "TheResults",
    component: TheResults,
    props: true,
    beforeEnter: (to, from, next) => {
      const userType = localStorage.getItem("userType");
      if (userType === "professor") {
        const tpcsAtiv = store.getters.getTpcsAtiv;
        const tpcsExp = store.getters.getTpcsExp;
        const allTpcs = [...tpcsAtiv, ...tpcsExp];

        const canEnter = allTpcs.find((el) => el == to.params.id);
        if (canEnter) next();
        else next({ name: "TheDashboard" });
      } else {
        next({ name: "TheDashboard" });
      }
    },
  },

  // NOT FOUND
  { path: "*", redirect: "/dashboard" },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

// caso token seja removido pelo backoffice
router.beforeEach((to, from, next) => {
  const auth = store.getters.isAuthenticated;
  const token = localStorage.getItem("tokentpc");
  if (!token && auth) store.dispatch("logout");
  else next();
});

export default router;
