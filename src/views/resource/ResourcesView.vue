<template>
  <section>
    <div class="container">
      <!-- Title -->
      <div class="row">
        <div class="col">
          <h1>{{ $t("resources.title") }}</h1>
          <hr />
        </div>
      </div>

      <!-- Add resource -->
      <div class="row mb-4" v-if="isAuthenticated">
        <div class="col">
          <AddResource />
        </div>
      </div>

      <!-- Resources -->
      <div class="row mb-4">
        <div class="col">
          <ResourceList />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { addErrorToast } from "@/services/toasts";

import AddResource from "@/components/resource/AddResource";

import ResourceList from "@/components/resource/ResourceList";

export default {
  name: "ResourcesView",
  computed: {
    ...mapGetters(["resourcesParamsDefault", "isAuthenticated"]),
  },
  methods: {
    ...mapActions(["clearResources", "setResources"]),
    async fetchResources() {
      // Clear resources
      this.clearResources();
      // Request
      const response = await this.setResources(this.resourcesParamsDefault);
      // Success
      if (response.status >= 200 && response.status < 300) {
        return;
      }
      // Error
      addErrorToast(response);
    },
  },
  created() {
    this.fetchResources();
  },
  components: {
    AddResource,
    ResourceList,
  },
};
</script>