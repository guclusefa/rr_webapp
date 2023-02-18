<template>
  <li class="nav-item dropdown">
    <a
      class="nav-link dropdown-toggle"
      href="#"
      role="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      {{ user.username }}
    </a>
    <ul class="dropdown-menu">
      <li class="nav-item">
        <router-link
          :to="{ name: 'profile', params: { id: user.id } }"
          class="dropdown-item"
        >
          {{ $t("profile.page") }}
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="/logout" class="dropdown-item">{{
          $t("logout.page")
        }}</router-link>
      </li>
    </ul>
  </li>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import api from "@/services/api";
import { addErrorToast } from "@/services/toasts";

export default {
  name: "ProfileItem",
  computed: {
    ...mapGetters([
      "isAuthenticated",
      "token",
      "tokenExpiration",
      "user",
      "rememberMe",
    ]),
  },
  methods: {
    ...mapActions(["updateUser", "updateToken", "logout"]),
    refreshUser() {
      return new Promise((resolve, reject) => {
        api
          .get("/users/me")
          .then((response) => {
            if (this.isAuthenticated) {
              this.updateUser(response.data);
            }
            resolve();
          })
          .catch((error) => {
            addErrorToast(error);
            this.logout();
            reject();
          });
      });
    },
    refreshToken() {
      return new Promise((resolve, reject) => {
        api
          // post with remember_me in body
          .post("/refresh-token", { remember_me: this.rememberMe })
          .then((response) => {
            if (this.isAuthenticated) {
              this.updateToken(response.data);
            }
            resolve();
          })
          .catch((error) => {
            addErrorToast(error);
            this.logout();
            reject();
          });
      });
    },
    refreshTokenAndUser() {
      return new Promise((resolve, reject) => {
        this.refreshToken()
          .then(() => {
            this.refreshUser()
              .then(() => {
                resolve();
              })
              .catch(() => {
                reject();
              });
          })
          .catch(() => {
            reject();
          });
      });
    },
  },
  created() {
    if (this.isAuthenticated) {
      this.refreshTokenAndUser();
    }
  },
};
</script>