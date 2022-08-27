<template>
  <div class="grey lighten-3">
    <component :is="dashboard"></component>
  </div>
</template>

<script>
import ProfDash from "@/components/ProfDash.vue";
import AlunoDash from "@/components/AlunoDash.vue";

export default {
  created() {},
  components: {
    ProfDash,
    AlunoDash,
  },
  data() {
    return {};
  },
  methods: {},
  computed: {
    dashboard() {
      const usertype = this.$store.getters.getUserType;
      if (usertype === "professor") {
        return "ProfDash";
      } else return "AlunoDash";
    },
  },
};
</script>

<style></style>
