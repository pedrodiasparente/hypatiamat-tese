<template>
  <v-main class="grey lighten-3">
    <center>
      <h1 style="color:#008a5d" class="my-4">
        Hypatiamat - Gestor de TPCs
      </h1>
    </center>
    <v-card width="50%" class="mx-auto mb-12">
      <v-card-title class="justify-center">
        <h3 class="green--text">Autenticação</h3>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field
            v-on:keyup.enter="submitForm"
            color="#009263"
            label="Utilizador"
            prepend-icon="mdi-account-circle"
            v-model="username"
            :rules="rule"
          />
          <v-text-field
            v-on:keyup.enter="submitForm"
            color="#009263"
            :type="showPassword ? 'text' : 'password'"
            label="Password"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append="showPassword = !showPassword"
            v-model="password"
            :rules="rule"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn block dark large color="#009263" @click="submitForm"
          >Login</v-btn
        >
      </v-card-actions>
    </v-card>
    <Footer class="grey lighten-3" />
  </v-main>
</template>

<script>
const Swal = require("sweetalert2");
import Footer from "@/components/Footer.vue";

export default {
  components: { Footer },
  data() {
    return {
      username: "",
      password: "",
      showPassword: false,
      error: null,
      rule: [(val) => (val || "").length > 0 || "Campo obrigatório!"],
    };
  },
  methods: {
    async submitForm() {
      try {
        if (!this.username || !this.password) {
          Swal.fire({
            icon: "error",
            confirmButtonColor: "#009263",
            title: "Não preencheu os dois campos!",
            width: 450,
          });
          return;
        }
        await this.$store.dispatch("auth", {
          username: this.username,
          password: this.password,
        });

        if (this.$route.path != "/dashboard") {
          this.$router.push({ name: "TheDashboard" });
        }
      } catch (err) {
        const error = new Error(err.message || "Failed to authenticate.");
        throw error;
      }
    },
  },
};
</script>

<style></style>
