<template>
  <!-- Resources -->
  <section class="container">
    <section class="mb-5">
      <div class="row mb-3">
        <div class="col">
          <div class="d-flex flex-wrap align-items-center">
            <div class="me-auto">
              <h1 class="mb-0">{{ $t("resources.title") }}</h1>
            </div>
            <div class="order-last order-sm-0">
              <span v-if="isAuthenticated">
                <AddResourceButton />
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <ResourceList />
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { addErrorToast } from "@/services/toasts";

import AddResourceButton from "@/components/resource/AddResourceButton.vue";
import ResourceList from "@/components/resource/ResourceList";

export default {
  name: "ResourcesView",
  computed: {
    ...mapGetters(["resourcesParamsDefault", "isAuthenticated"]),
    searchQuery() {
      return this.$route.query.search;
    },
  },
  methods: {
    ...mapActions(["setResources", "clearResources"]),
    async fetchResources() {
      const params = {
        ...this.resourcesParamsDefault,
        search: this.searchQuery,
        verified: 1,
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
  },
  mounted() {
    // Clear resources and fetch resources
    this.clearResources().then(() => {
      this.fetchResources();
    });
  },
  watch: {
    searchQuery() {
      // Clear resources and fetch resources
      this.clearResources().then(() => {
        this.fetchResources();
      });
    },
  },
  components: {
    AddResourceButton,
    ResourceList,
  },
};
</script>