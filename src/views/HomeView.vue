<template>
  <section class="container">
    <section class="mb-5">
      <div class="row mb-3">
        <div class="col">
          <div class="d-flex align-items-center">
            <div class="me-auto">
              <h1>{{ $t("home.title") }}</h1>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Hero section -->
    <section class="mb-5">
      <div class="row mb-3 border-top py-3">
        <div class="col-12 col-md-6 d-flex align-items-center">
          <div>
            <h2>{{ $t("app.name") }}</h2>
            <p class="lead">
              {{ $t("home.description") }}
            </p>
            <div class="d-flex gap-2">
              <router-link to="/resources" class="btn btn-primary">
                {{ $t("resources.page") }}
              </router-link>
              <router-link to="/profiles" class="btn btn-outline-primary">
                {{ $t("profiles.page") }}
              </router-link>
            </div>
          </div>
        </div>
        <div class="col-6 d-none d-md-block">
          <img src="@/assets/images/icons/ico-hero.svg" class="img-fluid" />
        </div>
      </div>
    </section>

    <section class="mb-5">
      <div class="row mb-3">
        <div class="col">
          <div class="d-flex align-items-center">
            <div class="me-auto">
              <h1>{{ $t("home.resources") }}</h1>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <ResourceList :showOptions="false" />
        </div>
      </div>
    </section>

    <section class="mb-5">
      <div class="row mb-3">
        <div class="col">
          <div class="d-flex align-items-center">
            <div class="me-auto">
              <h1>{{ $t("home.profiles") }}</h1>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <UserList :showOptions="false" />
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { addErrorToast } from "@/services/toasts";

import ResourceList from "@/components/resource/ResourceList";
import UserList from "@/components/user/UserList";

export default {
  name: "HomeView",
  computed: {
    ...mapGetters(["resourcesParamsDefault", "profilesParamsDefault"]),
  },
  methods: {
    ...mapActions(["setResources", "clearResources"]),
    async fetchResources() {
      const params = {
        ...this.resourcesParamsDefault,
        order: "consults",
        limit: 3,
      };
      // Request
      const response = await this.setResources(params);
      // Success
      if (response.status >= 200 && response.status < 300) {
        return;
      }
      // Error
      addErrorToast(response);
    },
    ...mapActions(["setProfiles", "clearProfiles"]),
    async fetchProfiles() {
      const params = {
        ...this.profilesParamsDefault,
        limit: 4,
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
    // Clear resources and fetch resources
    this.clearResources().then(() => {
      this.fetchResources();
    });
    // Clear profiles and fetch profiles
    this.clearProfiles().then(() => {
      this.fetchProfiles();
    });
  },
  components: {
    ResourceList,
    UserList,
  },
};
</script>
