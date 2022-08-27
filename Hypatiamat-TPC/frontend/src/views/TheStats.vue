<template>
  <div class="grey lighten-3">
    <component :is="stats"></component>
  </div>
</template>

<script>
import ProfStats from "../components/ProfStats.vue";
import AlunoStats from "../components/AlunoStats.vue";

export default {
  components: {
    ProfStats,
    AlunoStats,
  },
  data() {
    return {};
  },
  computed: {
    stats() {
      const type = this.$store.getters.getUserType;
      if (type === "aluno") {
        return "AlunoStats";
      }
      return "ProfStats";
    },
  },
};
</script>

<style></style>
