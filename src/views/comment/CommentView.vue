<template>
  <section class="container" v-if="this.comment.id == this.id">
    <!-- Comment section -->
    <section class="mb-5">
      <div class="row mb-3">
        <div class="col">
          <div class="d-flex align-items-center border-bottom">
            <div class="me-auto">
              <h1>{{ comment.content }}</h1>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <CommentItem :comment="comment" :canEdit="canEdit" />
        </div>
      </div>
    </section>
  </section>

  <LoadingSpinner v-else />
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { addErrorToast } from "@/services/toasts";

import CommentItem from "@/components/comment/CommentItem";

import LoadingSpinner from "@/components/fragments/LoadingSpinner";

export default {
  name: "CommentView",
  computed: {
    ...mapGetters(["user", "comment"]),
    id() {
      return this.$route.params.id;
    },
    isOwner() {
      if (!this.user) {
        return false;
      }
      if(!this.comment.author) {
        return false;
      }
      return this.comment.author.id == this.user.id;
    },
    canEdit() {
      return this.isOwner;
    },
  },
  methods: {
    ...mapActions(["setComment"]),
    async setCommentItem() {
      const response = await this.setComment(this.id);
      // Success
      if (response.status >= 200 && response.status < 300) {
        return;
      }
      // Error
      if (response.status === 404  || !response.status) {
        addErrorToast("comment.not_found");
      } else {
        addErrorToast(response);
      }
      this.$router.push({ name: "home" });
    },
    loadComment() {
      // Set
      this.setCommentItem();
    },
  },
  mounted() {
    this.loadComment();
  },
  watch: {
    id() {
      this.loadComment();
    },
  },
  components: {
    CommentItem,

    LoadingSpinner,
  },
};
</script>