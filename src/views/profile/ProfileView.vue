<template>
  <section>
    <div class="container" v-if="this.profile.id == this.id">
      <div class="row">
        <div class="col">
          <h1>{{ $t("profile.title", { username: profile.username }) }}</h1>
          <hr />
        </div>
      </div>
      <div class="row mb-5">
        <div class="col">
          <UserProfile />
        </div>
      </div>
      <div class="row">
        <div class="col">
          <h1>
            {{ $t("profile.resources_title", { username: profile.username }) }}
          </h1>
          <hr />
        </div>
      </div>
      <div class="row mb-5">
        <div class="col">
          <ResourceList :isProfile="true" />
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
import ResourceList from "@/components/resource/ResourceList";

import LoadingSpinner from "@/components/fragments/LoadingSpinner";

export default {
  name: "ProfileView",
  computed: {
    ...mapGetters(["user", "profile"]),
    id() {
      return this.$route.params.id;
    },
  },
  watch: {
    id() {
      this.setProfileUser();
    },
  },
  methods: {
    ...mapActions(["setProfile", "filterResources", "clearResources"]),
    async setProfileUser() {
      const response = await this.setProfile(this.id);
      // Success
      if (response.status >= 200 && response.status < 300) {
        return;
      }
      // Error
      if (response.status === 404) {
        addErrorToast("user.not_found");
      } else {
        addErrorToast(response);
      }
      this.$router.push({ name: "home" });
    },
    async setProfileResources() {
      const params = {
        author: [this.id],
      };
      await this.filterResources(params);
    },
  },
  mounted() {
    // Clear
    this.clearResources();
    // Set
    this.setProfileUser().then(() => {
      this.setProfileResources();
    });
  },
  components: {
    UserProfile,
    ResourceList,
    LoadingSpinner,
  },
};
</script>