<template>
  <section>
    <div class="container" v-if="this.profile.id == this.id">
      <div class="row">
        <div class="col">
          <h1>{{ $t("profile.title", { username: profile.username }) }}</h1>
          <hr />
        </div>
      </div>
      <div class="row">
        <div class="col">
          <UserProfile />
        </div>
      </div>
    </div>
    <LoadingSpinner v-else />
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { addErrorToast } from "@/services/toasts";

import UserProfile from "@/components/user/UserProfile";
import LoadingSpinner from "@/components/fragments/LoadingSpinner";

export default {
  name: "ProfileView",
  computed: {
    ...mapGetters(["user", "profile"]),
    id() {
      return this.$route.params.id;
    },
  },
  methods: {
    ...mapActions(["setProfile"]),
    async setProfileUser() {
      const response = await this.setProfile(this.id);
      // Success
      if (response.status >= 200 && response.status < 300) {
        return;
      }
      // Error
      addErrorToast("user.not_found");
      this.$router.push({ name: "home" });
    },
  },
  beforeMount() {
    this.setProfileUser();
  },
  watch: {
    id() {
      this.setProfileUser();
    },
  },
  components: {
    UserProfile,
    LoadingSpinner,
  },
};
</script>