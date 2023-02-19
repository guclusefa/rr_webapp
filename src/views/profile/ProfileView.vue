<template>
  <section>
    <div class="container" v-if="this.profile.id">
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
    <!-- Loading -->
    <div class="container" v-else>
      <div class="row">
        <div class="col">
          <div class="d-flex justify-content-center">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">{{ $t("app.loading") }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- End loading -->
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { addErrorToast } from "@/services/toasts";

import UserProfile from "@/components/user/UserProfile";

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
  },
};
</script>