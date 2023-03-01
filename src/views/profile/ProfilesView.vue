<template>
  <!-- User profiles -->
  <section class="container">
    <section class="mb-5">
      <div class="row mb-3">
        <div class="col">
          <div class="d-flex align-items-center border-bottom">
            <div class="me-auto">
              <h1>{{ $t("profiles.title") }}</h1>
            </div>
            <span class="ms-2">
              <FilterUserButton />
            </span>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <UserList />
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { addErrorToast } from "@/services/toasts";

import FilterUserButton from "@/components/user/FilterUserButton";
import UserList from "@/components/user/UserList";

export default {
  name: "ProfilesView",
  computed: {
    ...mapGetters(["profilesParamsDefault"]),
  },
  methods: {
    ...mapActions(["setProfiles", "clearProfiles"]),
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
  mounted() {
    this.fetchProfiles();
  },
  components: {
    FilterUserButton,
    UserList,
  },
};
</script>