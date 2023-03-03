<template>
  <button
    class="btn btn-primary"
    type="button"
    data-bs-toggle="offcanvas"
    data-bs-target="#offcanvasScrolling"
    @click="showCommentFilterOffCanvas"
  >
    {{ $t("comments.filter") }}
  </button>
</template>

<script>
import { showOffCanvas } from "@/services/offcanvas.js";

import CommentFilters from "@/components/comment/CommentFilters.vue";

export default {
  name: "CommentFilterButton",
  methods: {
    showCommentFilterOffCanvas() {
      showOffCanvas(this.$t("comments.filter"), CommentFilters);
    },
  },
};
</script>