<template>
  <div class="dropdown">
    <button class="btn btn-primary" data-bs-toggle="dropdown">
      <i class="bi bi-three-dots-vertical"></i>
    </button>
    <ul class="dropdown-menu dropdown-menu-end">
      <li>
        <a
          class="dropdown-item"
          href="#"
          @click="showCommentActionsModal('editCommentModal')"
          data-bs-toggle="modal"
          data-bs-target="#modalDialog"
        >
          {{ $t("comment.edit") }}
        </a>
      </li>
      <li>
        <a
          class="dropdown-item"
          href="#"
          @click="showCommentActionsModal('deleteCommentModal')"
          data-bs-toggle="modal"
          data-bs-target="#modalDialog"
        >
          {{ $t("comment.delete") }}</a
        >
      </li>
    </ul>
  </div>
</template>

<script>
import { showModal } from "@/services/modals";

import CommentEdit from "@/components/comment/actions/CommentEdit";
import CommentDelete from "@/components/comment/actions/CommentDelete";

export default {
  name: "CommentActions",
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  methods: {
    showCommentActionsModal(type) {
      switch (type) {
        case "editCommentModal":
          showModal(
            this.$t("comment.edit_title", { content: this.comment.content }),
            CommentEdit,
            {
              comment: this.comment,
              resource: this.comment.resource,
            }
          );
          break;
        case "deleteCommentModal":
          showModal(
            this.$t("comment.delete_title", { content: this.comment.content }),
            CommentDelete,
            {
              comment: this.comment,
            }
          );
          break;
      }
    },
  },
};
</script>