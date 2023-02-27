<template>
  <section>
    <div class="container">
      <!-- Title -->
      <div class="row">
        <div class="col">
          <h1>{{ $t("profiles.title") }}</h1>
          <hr />
        </div>
      </div>
      <!-- Users -->
      <div class="row mb-4">
        <div class="col">
          <UserList />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { addErrorToast } from "@/services/toasts";

import UserList from "@/components/user/UserList";

export default {
  name: "ProfilesView",
  computed: {
    ...mapGetters(["profilesParamsDefault"]),
  },
  methods: {
    ...mapActions(["clearProfiles", "setProfiles"]),
    async fetchProfiles() {
      // Clear profiles
      this.clearProfiles();
      // Request
      const response = await this.setProfiles(this.profilesParamsDefault);
      // Success
      if (response.status >= 200 && response.status < 300) {
        return;
      }
      // Error
      addErrorToast(response);
    },
  },
  created() {
    this.fetchProfiles();
  },
  components: {
    UserList,
  },
};
</script>