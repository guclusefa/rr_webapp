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

import UserList from "@/components/user/UserList";

export default {
  name: "ProfilesView",
  computed: {
    ...mapGetters(["profilesParamsDefault"]),
    // search params ?search=...
    searchQuery() {
      return this.$route.query.search;
    },
  },
  methods: {
    ...mapActions(["setProfiles", "clearProfiles"]),
    async fetchProfiles() {
      const params = {
        ...this.profilesParamsDefault,
        search: this.searchQuery,
      };
      // Request
      const response = await this.setProfiles(params);
      // Success
      if (response.status >= 200 && response.status < 300) {
        return;
      }
      // Error
      addErrorToast(response);
    },
  },
  mounted() {
    this.clearProfiles().then(() => {
      this.fetchProfiles();
    });
  },
  watch: {
    searchQuery() {
      this.clearProfiles().then(() => {
        this.fetchProfiles();
      });
    },
  },
  components: {
    UserList,
  },
};
</script>