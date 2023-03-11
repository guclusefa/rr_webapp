<template>
  <div class="card">
    <div class="card-header">
      <div class="row">
        <div class="col d-flex align-items-center">
          <div>
            <UserIdentifier :user="comment.author" v-if="comment.author" />
            <span v-else>{{ $t("comment.anonymous") }}</span>
          </div>
          <div class="text-muted ms-2">
            {{ formatDateTime(comment.createdAt) }}
          </div>
          <div class="ms-2">
            <a
              href="#"
              @click="showCommentReplyModal()"
              data-bs-toggle="modal"
              data-bs-target="#modalDialog"
            >
              <i class="bi bi-reply"></i>
              {{ $t("comment.reply") }}
            </a>
          </div>
        </div>
        <div class="col" v-if="canEdit()">
          <div class="float-end">
            <CommentActionsButton :comment="comment" />
          </div>
        </div>
      </div>
    </div>
    <div class="card-body">
      <p class="card-text pre-line">
        {{ comment.content }}
      </p>
    </div>
    <div class="card-footer d-flex justify-content-between align-items-center">
      <router-link :to="`/resource/${comment.resource.id}`">
        {{ comment.resource.title }}
      </router-link>
      <div class="d-flex align-items-center">
        <div class="ms-1">
          <router-link :to="`/comment/${comment.id}`">
            {{ $t("comment.replies", { count: comment.replies }) }}
          </router-link>
        </div>
        <div class="ms-1" v-if="$slots.seeReplies">
          <slot name="seeReplies"></slot>
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
    ...mapGetters(["user"]),
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
      return this.isOwner();
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