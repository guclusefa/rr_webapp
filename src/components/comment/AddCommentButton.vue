<template>
  <button
    type="button"
    class="btn btn-primary"
    @click="showAddCommentModal('addCommentModal')"
    data-bs-toggle="modal"
    data-bs-target="#modalDialog"
  >
    <i class="bi bi-send-plus"></i>
    {{ $t("comment.create") }}
  </button>
</template>

<script>
import { showModal } from "@/services/modals";

import CommentEdit from "@/components/comment/actions/CommentEdit";

export default {
  name: "AddComment",
  props: {
    resource: {
      type: Object,
      required: true,
    },
  },
  methods: {
    showAddCommentModal() {
      showModal(this.$t("comment.create"), CommentEdit, { edit: false, resource: this.resource });
    },
  },
};
</script>