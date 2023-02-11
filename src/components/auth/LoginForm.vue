<template>
  <div class="row mb-3">
    <div class="col">
      <form @submit.prevent="login">
        <div class="mb-3">
          <label for="username" class="form-label">{{
            $t("login.username")
          }}</label>
          <input
            type="text"
            class="form-control form-control"
            id="username"
            v-model="body.username"
            required
          />
        </div>
        <div class="mb-3">
          <label for="password">{{ $t("login.password") }}</label>
          <input
            type="password"
            class="form-control"
            id="password"
            v-model="body.password"
            required
          />
        </div>
        <div class="mb-3 form-check">
          <input
            type="checkbox"
            class="form-check-input"
            id="remember_me"
            v-model="body.remember_me"
          />
          <label class="form-check-label" for="remember_me">{{
            $t("login.remember_me")
          }}</label>
        </div>
        <div class="mb-3">
          <router-link to="/forgot-password">{{
            $t("login.forgot_password")
          }}</router-link>
        </div>
        <div class="mb-3">
          <router-link to="/register">{{ $t("login.register") }}</router-link>
        </div>
        <button type="submit" class="btn btn-primary" :disabled="isLoading">
          <template v-if="isLoading">
            <span
              v-if="isLoading"
              class="spinner-border spinner-border-sm"
            ></span>
            {{ $t("app.loading") }}
          </template>
          <span v-else>
            {{ $t("login.submit") }}
          </span>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { login } from "@/services/auth";
 
export default {
  name: "LoginForm",
  data() {
    return {
      url: "/login",
      body: {
        username: "",
        password: "",
        remember_me: false,
      },
      noResponse: false,
      isLoading: false,
    };
  },
  methods: {
    login() {
      this.isLoading = true;
      login(
        this.url,
        this.body,
        () => {
          this.$router.push({ name: "home" });
        },
        (error) => {
          this.$store.dispatch("setFlashMessage", {
            type: "error",
            message: error,
          });
        },
        () => {
          this.isLoading = false;
        }
      );
    },
  },
};
</script>