<template>
  <section class="container" v-if="this.resource.id == this.id">
    <!-- Resource -->
    <section class="mb-5">
      <div class="row mb-3">
        <div class="col">
          <div class="d-flex align-items-center border-bottom">
            <div class="me-auto">
              <h1>{{ $t("resource.title", { title: resource.title }) }}</h1>
            </div>
            <span class="ms-2" v-if="canEdit">
              <ResourceActions :resource="resource" />
            </span>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <ResourceItem :resource="resource" />
        </div>
      </div>
    </section>
  </section>
  <LoadingSpinner v-else />
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { addErrorToast } from "@/services/toasts";

import ResourceActions from "@/components/resource/ResourceActions";
import ResourceItem from "@/components/resource/ResourceItem";

import LoadingSpinner from "@/components/fragments/LoadingSpinner";

export default {
  name: "ResourceView",
  computed: {
    ...mapGetters(["user", "resource", "resourceParamsDefault"]),
    id() {
      return this.$route.params.id;
    },
    isOwner() {
      if (!this.user) {
        return false;
      }
      return this.resource.author.id == this.user.id;
    },
    canEdit() {
      return this.isOwner;
    },
  },
  methods: {
    ...mapActions(["setResource"]),
    async setResourceItem() {
      const response = await this.setResource(this.id);
      // Success
      if (response.status >= 200 && response.status < 300) {
        return;
      }
      // Error
      if (response.status === 404) {
        addErrorToast("resource.not_found");
      } else {
        addErrorToast(response);
      }
      this.$router.push({ name: "home" });
    },
    loadResource() {
      this.setResourceItem();
    },
  },
  mounted() {
    this.loadResource();
  },
  watch: {
    id() {
      this.loadResource();
    },
  },
  components: {
    ResourceActions,
    ResourceItem,

    LoadingSpinner,
  },
};
</script>