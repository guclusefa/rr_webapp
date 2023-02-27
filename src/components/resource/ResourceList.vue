<template>
  <!-- Filters -->
  <div class="row mb-4" v-if="canFilter">
    <div class="col">
      <OffCanvasButton
        :label="'resources.filter'"
        :classes="'btn btn-primary'"
      />
      <OffCanvas title="resources.filter">
        <template #body>
          <ResourceFilters :isProfile="isProfile" />
        </template>
      </OffCanvas>
    </div>
  </div>

  <template v-if="resources.length > 0 && resourcesMeta.total > 0">
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
        <form @submit.prevent="fetchMoreResources">
          <SubmitButton :label="'resources.load_more'" />
        </form>
      </div>
    </div>
  </template>

  <template v-else>
    <NoResultMessage v-if="resourcesMeta.total === 0" />
    <LoadingSpinner v-else />
  </template>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { addErrorToast } from "@/services/toasts";

import OffCanvasButton from "@/components/fragments/OffCanvasButton.vue";
import OffCanvas from "@/components/fragments/OffCanvas.vue";
import ResourceFilters from "@/components/resource/ResourceFilters.vue";

import ResourceCard from "@/components/resource/ResourceCard.vue";
import SubmitButton from "@/components/form/SubmitButton.vue";

import NoResultMessage from "@/components/fragments/NoResultMessage.vue";
import LoadingSpinner from "@/components/fragments/LoadingSpinner.vue";

export default {
  name: "ResourceList",
  props: {
    canFilter: {
      type: Boolean,
      required: false,
      default: true,
    },
    isProfile: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    ...mapGetters(["resources", "resourcesParams", "resourcesMeta"]),
  },
  methods: {
    ...mapActions(["setResources"]),
    async fetchMoreResources() {
      // Request
      const response = await this.setResources({
        ...this.resourcesParams,
        page: this.resourcesMeta.page + 1,
      });
      // Success
      if (response.status >= 200 && response.status < 300) {
        return;
      }
      // Error
      addErrorToast(response);
    },
  },
  components: {
    OffCanvasButton,
    OffCanvas,
    ResourceFilters,
    ResourceCard,
    SubmitButton,
    NoResultMessage,
    LoadingSpinner,
  },
};
</script>