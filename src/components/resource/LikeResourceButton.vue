<template>
  <div>
    <button
      class="btn btn-sm"
      :focus-visible="false"
      :focus="false"
      :disabled="loading || !isAuthenticated"
    >
      <i
        class="bi bi-heart-fill text-danger me-1"
        @click="toggleLike"
        v-if="isLiked"
      ></i>
      <i class="bi bi-heart me-1" @click="toggleLike" v-else></i>
    </button>
    <a
      v-if="likes > 0"
      href="#"
      @click="showResourceLikes()"
      data-bs-toggle="modal"
      data-bs-target="#modalDialog"
    >
      {{ likes }}
    </a>
    <span v-else>{{ likes }}</span>
  </div>
</template>

<script>
import { showModal } from "@/services/modals";
import ResourceLikesList from "@/components/resource/ResourceLikesList";

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
    showResourceLikes() {
      showModal(
        this.$t("resource.likes_title", { title: this.resource.title }),
        ResourceLikesList,
        { resource: this.resource, uri: "/likes" }
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