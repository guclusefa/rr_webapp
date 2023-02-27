<template>
  <div class="row">
    <div class="col">
      <div class="d-flex justify-content-between mb-3">
        <h1>
          {{ $t("resources.title") }}
        </h1>
        <div class="d-flex justify-content-end">
          <button class="btn btn-outline-primary me-3" @click="showCreateModal" v-if="user">
            {{ $t("resources.create") }}
          </button>
          <OffCanvasButton
            :label="'resources.filter'"
            :classes="'btn btn-primary'"
          />
        </div>
      </div>
      <hr />
    </div>
    <!-- Edit -->
    <ModalDialog ref="createModal" :title="$t('resources.create')">
      <template #body>
        <ResourceEdit :edit="false" @close="closeEditModal"/>
      </template>
    </ModalDialog>
  </div>

  <!-- Filters -->
  <OffCanvas title="resources.filter">
    <template #body>
      <ResourceFilters />
    </template>
  </OffCanvas>

  <template v-if="resourcesMeta.total > 0">
    <!-- Meta -->
    <div class="row mb-4">
      <div class="col">
        <h5>
          {{ $t("resources.meta", resourcesMeta) }}
        </h5>
      </div>
    </div>
    <!-- Cards -->
    <div
      class="row row-cols-1 row-cols-sm-1 row-cols-md-3 row-cols-lg-5 g-4 mb-4"
    >
      <div class="col" v-for="resource in resources" :key="resource.id">
        <ResourceCard :resource="resource" />
      </div>
    </div>
    <!-- Load more -->
    <div class="row" v-if="resourcesMeta.next">
      <div class="col">
        <form @submit.prevent="fetchResources">
          <SubmitButton :label="'resources.load_more'" />
        </form>
      </div>
    </div>
  </template>

  <template v-else>
    <!-- No results -->
    <template v-if="resourcesMeta.total === 0">
      <NoResultMessage />
    </template>
    <!-- Loading -->
    <template v-else>
      <LoadingSpinner />
    </template>
  </template>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { addErrorToast } from "@/services/toasts";

import ModalDialog from "@/components/fragments/ModalDialog.vue";
import ResourceEdit from "@/components/resource/ResourceEdit.vue";

import ResourceFilters from "@/components/resource/ResourceFilters.vue";
import OffCanvasButton from "@/components/fragments/OffCanvasButton.vue";
import OffCanvas from "@/components/fragments/OffCanvas.vue";

import ResourceCard from "@/components/resource/ResourceCard.vue";
import SubmitButton from "@/components/form/SubmitButton.vue";
import NoResultMessage from "@/components/fragments/NoResultMessage.vue";
import LoadingSpinner from "@/components/fragments/LoadingSpinner.vue";

export default {
  name: "ResourceList",
  computed: {
    ...mapGetters([
      "user",
      "resources",
      "resourcesParams",
      "resourcesMeta",
      "loading",
    ]),
  },
  methods: {
    showCreateModal() {
      this.$refs.createModal.show();
    },
    closeEditModal() {
      this.$refs.createModal.close();
    },
    ...mapActions(["setResources"]),
    async fetchResources() {
      const response = await this.setResources(this.resourcesParams);
      // Success
      if (response.status >= 200 && response.status < 300) {
        return;
      }
      // Error
      addErrorToast(response);
    },
  },
  created() {
    if (this.resources.length > 0) {
      return;
    }
    this.fetchResources();
  },
  components: {
    ModalDialog,
    ResourceEdit,
    ResourceFilters,
    OffCanvasButton,
    OffCanvas,
    ResourceCard,
    SubmitButton,
    NoResultMessage,
    LoadingSpinner,
  },
};
</script>