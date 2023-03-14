<template>
  <template v-if="resources.length > 0 && resourcesMeta.total > 0">
    <!-- Meta -->
    <div class="row mb-4" v-if="showOptions">
      <div class="d-flex flex-wrap align-items-center">
        <div class="me-auto">
          <h5 v-html="$t('resources.meta', resourcesMeta)" />
        </div>
        <div class="order-last order-sm-0">
          <ResourceFilterButton />
        </div>
      </div>
    </div>
    <!-- Cards -->
    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mb-4">
      <div class="col" v-for="resource in resources" :key="resource.id">
        <ResourceCard :resource="resource" />
      </div>
    </div>
    <!-- Load more -->
    <div class="row" v-if="resourcesMeta.next && showOptions">
      <div class="col">
        <form @submit.prevent="fetchMoreResources">
          <SubmitButton :label="'resources.load_more'" />
        </form>
      </div>
    </div>
  </template>

  <template v-else>
    <!-- Meta -->
    <div class="row mb-4" v-if="resourcesMeta.total === 0 && showOptions">
      <div class="col col-sm col-md col-lg col-xl">
        <NoResultMessage />
      </div>
      <div class="col col-sm col-md col-lg col-xl">
        <div class="float-end">
          <ResourceFilterButton />
        </div>
      </div>
    </div>
    <!-- Loading -->
    <LoadingSpinner v-else />
  </template>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { addErrorToast } from "@/services/toasts";

import ResourceFilterButton from "@/components/resource/ResourceFilterButton.vue";
import ResourceCard from "@/components/resource/ResourceCard.vue";
import SubmitButton from "@/components/form/SubmitButton.vue";

import NoResultMessage from "@/components/fragments/NoResultMessage.vue";
import LoadingSpinner from "@/components/fragments/LoadingSpinner.vue";

export default {
  name: "ResourceList",
  props: {
    showOptions: {
      type: Boolean,
      default: true,
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
    ResourceFilterButton,
    ResourceCard,
    SubmitButton,

    NoResultMessage,
    LoadingSpinner,
  },
};
</script>