<template>
  <button
    class="btn btn-sm"
    :focus-visible="false"
    :focus="false"
    @click="toggleLike"
    :disabled="loading || !isAuthenticated"
  >
    <i class="bi bi-heart-fill text-danger me-1" v-if="isLiked"></i>
    <i class="bi bi-heart me-1" v-else></i>
    {{ likes }}
  </button>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "LikeButton",
  data() {
    return {
      likes: this.resource.likes,
      isLiked: this.resource.isLiked,
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
    ...mapActions(["likeResource"]),
    like() {
      this.likeResource(this.resource.id);
      this.likes++;
      this.isLiked = true;
    },
    unLike() {
      this.likeResource(this.resource.id);
      this.likes--;
      this.isLiked = false;
    },
    toggleLike() {
      if (this.isLiked) {
        this.unLike();
      } else {
        this.like();
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