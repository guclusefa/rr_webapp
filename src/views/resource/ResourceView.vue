<template>
  <section class="container" v-if="this.resource.id == this.id">
    <!-- Resource section -->
    <section class="mb-5">
      <div class="row mb-3">
        <div class="col">
          <div class="d-flex align-items-center border-bottom">
            <div class="me-auto">
              <h1>{{ resource.title }}</h1>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <ResourceItem :resource="resource" :canEdit="canEdit" />
        </div>
      </div>
    </section>

    <!-- Comments section -->
    <section class="mb-5">
      <div class="row mb-3">
        <div class="col">
          <div class="d-flex align-items-center border-bottom">
            <div class="me-auto">
              <h1>{{ $t("resource.comments") }}</h1>
            </div>
            <span class="ms-2">
              <AddCommentButton :resource="resource" />
            </span>
          </div>
        </div>
      </div>
      <!-- Comments -->
      <div class="row">
        <div class="col">
          <CommentList />
        </div>
      </div>
    </section>

    <!-- Resource Stats section -->
    <section class="mb-5" v-if="canEdit">
      <div class="row mb-3">
        <div class="col">
          <div class="d-flex align-items-center border-bottom">
            <div class="me-auto">
              <h1>{{ $t("resource.stats_title") }}</h1>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <ResourceStats :resource="resource" />
        </div>
      </div>
    </section>
  </section>

  <LoadingSpinner v-else />
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { addErrorToast } from "@/services/toasts";

import ResourceItem from "@/components/resource/ResourceItem";

import AddCommentButton from "@/components/comment/AddCommentButton.vue";
import CommentList from "@/components/comment/CommentList";

import ResourceStats from "@/components/resource/ResourceStats";

import LoadingSpinner from "@/components/fragments/LoadingSpinner";

export default {
  name: "ResourceView",
  computed: {
    ...mapGetters(["user", "resource", "commentsParamsDefault"]),
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
    ...mapActions(["setResource", "filterComments", "clearComments"]),
    async setResourceItem() {
      const response = await this.setResource(this.id);
      // Success
      if (response.status >= 200 && response.status < 300) {
        return;
      }
      // Error
      if (response.status === 404 || !response.status) {
        addErrorToast("resource.not_found");
      } else {
        addErrorToast(response);
      }
      this.$router.push({ name: "home" });
    },
    async setResourceComments() {
      const params = {
        ...this.commentsParamsDefault,
        resource: [this.id],
        isnotreply: true,
      };
      await this.filterComments(params);
    },
    loadResource() {
      // Clear
      this.clearComments();
      // Set
      this.setResourceItem().then(() => {
        this.setResourceComments();
      });
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
    ResourceItem,

    AddCommentButton,
    CommentList,

    ResourceStats,

    LoadingSpinner,
  },
};
</script>