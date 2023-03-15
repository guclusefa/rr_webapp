<template>
  <div class="card">
    <div class="card-body">
      <div
        class="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-3"
      >
        <div class="d-flex align-items-center mb-2 mb-md-0 me-3">
          <div class="me-3">
            <UserIdentifier :user="comment.author" v-if="comment.author" />
            <span v-else>{{ $t("comment.anonymous") }}</span>
          </div>
          <div class="text-muted ms-auto d-none d-md-block">
            {{ formatDateTime(comment.createdAt) }}
          </div>
        </div>
        <div class="d-flex align-items-center justify-content-between">
          <div class="text-muted d-md-none me-3">
            {{ formatDateTime(comment.createdAt) }}
          </div>
          <div class="d-flex align-items-center">
            <a href="#" @click="showCommentReplyModal()" data-bs-toggle="modal" data-bs-target="#modalDialog">
              <i class="bi bi-reply"></i>
              {{ $t("comment.reply") }}
            </a>
            <div v-if="canEdit()" class="ms-3">
              <CommentActionsButton :comment="comment" />
            </div>
          </div>
        </div>
      </div>
      <p class="card-text pre-line">
        {{ comment.content }}
      </p>
    </div>

    <div class="card-footer">
      <div
        class="d-flex flex-column flex-md-row justify-content-between align-items-md-center"
      >
        <div class="mb-2 mb-md-0">
          <router-link :to="`/resource/${comment.resource.id}`">
            {{ comment.resource.title }}
          </router-link>
        </div>
        <div class="d-flex align-items-center">
          <div>
            <router-link :to="`/comment/${comment.id}`">
              {{ $t("comment.replies", { count: comment.replies }) }}
            </router-link>
          </div>
          <div v-if="$slots.seeReplies" class="ms-3">
            <slot name="seeReplies"></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { showModal } from "@/services/modals";

import { mapGetters } from "vuex";

import dateFormatter from "@/mixins/dateFormatter";

import CommentActionsButton from "@/components/comment/CommentActionsButton.vue";
import CommentEdit from "@/components/comment/actions/CommentEdit";

import UserIdentifier from "../user/UserIdentifier.vue";

export default {
  name: "CommentCard",
  mixins: [dateFormatter],
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters(["user", "isModerator"]),
  },
  methods: {
    isOwner() {
      if (!this.user) {
        return false;
      }
      if (!this.comment.author) {
        return false;
      }
      return this.comment.author.id === this.user.id;
    },
    canEdit() {
      return this.isOwner() || this.isModerator;
    },
    showCommentReplyModal() {
      showModal(
        this.$t("comment.reply_title", { content: this.comment.content }),
        CommentEdit,
        {
          replyTo: this.comment,
          resource: this.comment.resource,
          edit: false,
        }
      );
    },
  },
  components: {
    CommentActionsButton,
    UserIdentifier,
  },
};
</script>