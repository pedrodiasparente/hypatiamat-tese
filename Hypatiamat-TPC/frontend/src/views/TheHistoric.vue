<template>
  <div class="grey lighten-3">
    <component :is="historic"></component>
  </div>
</template>

<script>
import ProfHist from "../components/ProfHist.vue";
import AlunoHist from "../components/AlunoHist.vue";

export default {
  components: {
    ProfHist,
    AlunoHist,
  },
  data() {
    return {};
  },
  computed: {
    historic() {
      const type = this.$store.getters.getUserType;
      if (type === "aluno") {
        return "AlunoHist";
      }
      return "ProfHist";
    },
  },
};
</script>

<style></style>
