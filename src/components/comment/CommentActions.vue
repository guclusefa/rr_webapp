<template>
  <div class="dropdown">
    <button class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown">
      {{ $t("comment.actions") }}
    </button>
    <ul class="dropdown-menu dropdown-menu-end">
      <li>
        <a
          class="dropdown-item"
          href="#"
          @click="showModal('editCommentModal')"
        >
          {{ $t("comment.edit") }}
        </a>
      </li>
      <li>
        <a
          class="dropdown-item"
          href="#"
          @click="showModal('deleteCommentModal')"
        >
          {{ $t("comment.delete") }}</a
        >
      </li>
    </ul>
  </div>

  <ModalDialog
    :modal-id="'editCommentModal'"
    :modal-title="$t('comment.edit_title', { content: comment.content })"
  >
    <template #body>
      <CommentEdit :resource="comment.resource" @close="closeModal('editCommentModal')" />
    </template>
  </ModalDialog>

  <ModalDialog
    :modal-id="'deleteCommentModal'"
    :modal-title="$t('comment.delete_title', { content: comment.content })"
  >
    <template #body>
      <CommentDelete @close="closeModal('deleteCommentModal')" />
    </template>
  </ModalDialog>
</template>

<script>
import { Modal } from "bootstrap";

import ModalDialog from "@/components/fragments/ModalDialog";
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
    showModal(id) {
      const modal = new Modal(document.getElementById(id));
      modal.show();
    },
    closeModal(id) {
      document.getElementById(id).querySelector(".btn-close").click();
    },
  },
  components: {
    ModalDialog,
    CommentEdit,
    CommentDelete,
  },
};
</script>