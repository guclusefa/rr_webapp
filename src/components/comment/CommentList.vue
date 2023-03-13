<template>
  <template v-if="comments.length > 0 && commentsMeta.total > 0">
    <!-- Meta -->
    <div class="row mb-4">
      <div class="d-flex flex-wrap align-items-center">
        <div class="me-auto">
          <h5 v-html="$t('comments.meta', commentsMeta)" />
        </div>
        <div class="order-last order-sm-0">
          <CommentFilterButton />
        </div>
      </div>
    </div>
    <!-- Cards -->
    <div class="row mb-3" v-for="comment in comments" :key="comment.id">
      <div class="col">
        <CommentItem :comment="comment" />
      </div>
    </div>
    <!-- Load more -->
    <div class="row" v-if="commentsMeta.next">
      <div class="col">
        <form @submit.prevent="fetchMoreComments">
          <SubmitButton :label="'comments.load_more'" />
        </form>
      </div>
    </div>
  </template>

  <template v-else>
    <!-- Meta -->
    <div class="row mb-4" v-if="commentsMeta.total === 0">
      <div class="d-flex flex-wrap align-items-center">
        <div class="me-auto">
          <NoResultMessage />
        </div>
        <div class="order-last order-sm-0">
          <CommentFilterButton />
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

import CommentFilterButton from "@/components/comment/CommentFilterButton.vue";
import CommentItem from "@/components/comment/CommentItem";
import SubmitButton from "@/components/form/SubmitButton.vue";

import NoResultMessage from "@/components/fragments/NoResultMessage.vue";
import LoadingSpinner from "@/components/fragments/LoadingSpinner.vue";

export default {
  name: "CommentList",
  computed: {
    ...mapGetters(["comments", "commentsParams", "commentsMeta"]),
  },
  methods: {
    ...mapActions(["setComments"]),
    async fetchMoreComments() {
      // Request
      const response = await this.setComments({
        ...this.commentsParams,
        page: this.commentsMeta.page + 1,
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
    CommentFilterButton,
    CommentItem,
    SubmitButton,

    NoResultMessage,
    LoadingSpinner,
  },
};
</script>