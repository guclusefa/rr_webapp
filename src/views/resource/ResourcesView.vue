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

      <template v-if="isAuthenticated">
        <!-- Add resource -->
        <div class="row mb-4">
          <div class="col">
            <button
              type="button"
              class="btn btn-primary"
              @click="$refs.addModal.show()"
            >
              {{ $t("resources.create") }}
            </button>
          </div>
        </div>
        <ModalDialog ref="addModal" :title="'ressources.create'">
          <template #body>
            <ResourceEdit :edit="false" @close="$refs.addModal.close()" />
          </template>
        </ModalDialog>
      </template>

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

import ModalDialog from "@/components/fragments/ModalDialog";
import ResourceEdit from "@/components/resource/ResourceEdit";

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
    ModalDialog,
    ResourceEdit,

    ResourceList,
  },
};
</script>