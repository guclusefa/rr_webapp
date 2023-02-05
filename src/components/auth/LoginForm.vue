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
            class="form-control"
            id="username"
            v-model="username"
          />
        </div>
        <div class="mb-3">
          <label for="password">{{ $t("login.password") }}</label>
          <input
            type="password"
            class="form-control"
            id="password"
            v-model="password"
          />
        </div>
        <div class="mb-3 form-check">
          <input
            type="checkbox"
            class="form-check-input"
            id="remember_me"
            v-model="remember_me"
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
        <button type="submit" class="btn btn-primary">
          <span v-if="isLoading">
            {{ $t("app.loading") }}
          </span>
          <span v-else>
            {{ $t("login.submit") }}
          </span>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { postData } from "@/services/api";

export default {
  name: "LoginForm",
  data() {
    return {
      url: "/login",
      username: "",
      password: "",
      remember_me: false,
      isLoading: false,
      isDown: false,
    };
  },
  methods: {
    login() {
      this.isLoading = true;
      this.isDown = false;

      postData(this.url, {
        username: this.username,
        password: this.password,
      })
        .then((response) => {
          console.log(response.token);
          this.$store.commit("setToken", response.data.token);
          this.$router.push({ name: "Home" });
        })
        .catch((error) => {
          if (error.response) {
            this.$store.commit("setErrors", error.response.data);
          } else {
            this.isDown = true;
          }
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>