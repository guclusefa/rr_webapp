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
      {{ tokenExpiration }}
      {{ user.roles[0] }}
      <img :src="user.photo" class="ms-1" width="25" height="25" alt="avatar" />
    </a>

    <ul class="dropdown-menu">
      <li>
        <a class="dropdown-item" href="#" @click="logout">
          {{ $t("logout.page") }}
        </a>
      </li>
    </ul>
  </li>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { fetchData } from "@/services/api";
import { constants, handleMessage } from "@/services/messages";

export default {
  name: "ProfileItem",
  created() {
    this.getUser();
  },
  computed: {
    ...mapGetters(["user"]),
    ...mapGetters(["token"]),
    ...mapGetters(["tokenExpiration"]),
  },
  methods: {
    ...mapActions(["setToken"]),
    ...mapActions(["setTokenExpiration"]),
    ...mapActions(["setUser"]),
    ...mapActions(["clearAuthData"]),
    async getUser() {
      if (!this.token) return;
      // Login and set token
      fetchData("/users/me").then((response) => {
        // No response or error
        if (response == null) return;
        if (response.status !== 200) {
          handleMessage(constants.TYPE_ERROR, response.data.errors.message);
          return;
        }
        // Set user
        this.setUser(response.data.data);
      });
    },
    logout() {
      // Remove token
      this.clearAuthData();
      // redirect to login
      handleMessage(constants.TYPE_SUCCESS, "logout.success", false);
      this.$router.push({ name: "home" });
    },
  },
};
</script>