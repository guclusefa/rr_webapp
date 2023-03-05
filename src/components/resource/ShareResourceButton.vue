<template>
  <div>
    <button
      class="btn btn-sm"
      :focus-visible="false"
      :focus="false"
      :disabled="loading || !isAuthenticated"
    >
      <i
        class="bi bi-repeat text-success me-1"
        @click="toggleLike"
        v-if="isShared"
      ></i>
      <i class="bi bi-repeat" @click="toggleLike" v-else></i>
    </button>
    <a
      v-if="shares > 0"
      href="#"
      @click="showResourceShares()"
      data-bs-toggle="modal"
      data-bs-target="#modalDialog"
    >
      {{ shares }}
    </a>
    <span v-else>{{ shares }}</span>
  </div>
</template>

<script>
import { showModal } from "@/services/modals";
import ResourceLikesList from "@/components/resource/ResourceLikesList";

import { mapGetters, mapActions } from "vuex";

export default {
  name: "ShareButton",
  data() {
    return {
      shares: this.resource.shares,
      isShared: this.resource.isShared,
    };
  },
  props: {
    resource: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters(["isAuthenticated", "loading"]),
  },
  methods: {
    ...mapActions(["shareResource"]),
    share() {
      this.shareResource(this.resource.id);
      this.shares++;
      this.isShared = true;
    },
    unLike() {
      this.shareResource(this.resource.id);
      this.shares--;
      this.isShared = false;
    },
    toggleLike() {
      if (this.isShared) {
        this.unLike();
      } else {
        this.share();
      }
    },
    showResourceShares() {
      showModal(
        this.$t("resource.shares_title", { title: this.resource.title }),
        ResourceLikesList,
        { resource: this.resource, uri: "/shares" }
      );
    },
  },
};
</script>

<style scoped>
.btn:disabled {
  outline: none;
  border-color: transparent !important;
}
</style>