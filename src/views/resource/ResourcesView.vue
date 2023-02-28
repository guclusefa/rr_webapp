<template>
  <!-- Resources -->
  <section class="container">
    <section class="mb-5">
      <div class="row mb-3">
        <div class="col">
          <div class="d-flex align-items-center border-bottom">
            <div class="me-auto">
              <h1>{{ $t("resources.title") }}</h1>
            </div>
            <span class="ms-2" v-if="isAuthenticated">
              <AddResourceButton />
            </span>
            <span class="ms-2">
              <FilterResourceButton />
            </span>
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
import FilterResourceButton from "@/components/resource/FilterResourceButton.vue";
import ResourceList from "@/components/resource/ResourceList";

export default {
  name: "ResourcesView",
  computed: {
    ...mapGetters(["resourcesParamsDefault", "isAuthenticated"]),
  },
  methods: {
    ...mapActions(["setResources", "clearResources"]),
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
    AddResourceButton,
    FilterResourceButton,
    ResourceList,
  },
};
</script>