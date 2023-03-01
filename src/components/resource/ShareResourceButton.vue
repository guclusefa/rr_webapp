<template>
  <button
    class="btn btn-sm"
    :focus-visible="false"
    :focus="false"
    @click="toggleLike"
    :disabled="loading || !isAuthenticated"
  >
    <i class="bi bi-repeat text-success me-1" v-if="isShared"></i>
    <i class="bi bi-repeat me-1" v-else></i>
    {{ shares }}
  </button>
</template>

<script>
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
  },
};
</script>

<style scoped>
.btn:disabled {
  outline: none;
  border-color: transparent !important;
}
</style>