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
      <template v-if="user.photo">
        <img :src="user.photo" class="img-fluid rounded ms-1 avatar" />
      </template>
      <template v-else>
        <img
          src="@/assets/images/user/default.jpg"
          class="img-fluid rounded ms-1 avatar"
        />
      </template>
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
import { addErrorToast } from "@/services/toasts";

export default {
  name: "ProfileItem",
  computed: {
    ...mapGetters(["user"]),
  },
  methods: {
    ...mapActions(["updateUser", "updateToken"]),
    async refreshUser() {
      const response = await this.updateUser();
      // Success
      if (response.status >= 200 && response.status < 300) {
        return;
      }
      // Error
      addErrorToast(response);
    },
    async refreshToken() {
      const response = await this.updateToken();
      // Success
      if (response.status >= 200 && response.status < 300) {
        return;
      }
      // Error
      addErrorToast(response);
    },
  },
  created() {
    this.refreshToken().then(() => {
      if (this.user) {
        this.refreshUser();
      }
    });
  },
};
</script>

<style scoped>
.avatar {
  width: 25px;
  height: 25px;
  object-fit: cover;
}
</style>