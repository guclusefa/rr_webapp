<template>
  <!-- User comments -->
  <section class="container">
    <section class="mb-5">
      <div class="row mb-3">
        <div class="col">
          <div class="d-flex align-items-center border-bottom">
            <div class="me-auto">
              <h1>{{ $t("comments.title") }}</h1>
            </div>
            <span class="ms-2">
              <FilterCommentButton />
            </span>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <CommentList />
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { addErrorToast } from "@/services/toasts";

import FilterCommentButton from "@/components/comment/FilterCommentButton";
import CommentList from "@/components/comment/CommentList";

export default {
  name: "CommentsView",
  computed: {
    ...mapGetters(["commentsParamsDefault"]),
  },
  methods: {
    ...mapActions(["setComments", "clearComments"]),
    async fetchComments() {
      // Request
      const response = await this.setComments(this.commentsParamsDefault);
      // Success
      if (response.status >= 200 && response.status < 300) {
        return;
      }
      // Error
      addErrorToast(response);
    },
  },
  mounted() {
    // Clear comments and fetch comments
    this.clearComments().then(() => {
      this.fetchComments();
    });
  },
  components: {
    FilterCommentButton,
    CommentList,
  },
};
</script>