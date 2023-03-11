<template>
  <div class="row mb-3">
    <div class="col-12">
      <CommentCard :comment="comment">
        <template
          #seeReplies
          v-if="comment.replies > 0 && replies.length === 0"
        >
          <div @click="fetchReplies" class="text-primary link cursor-pointer">
            <span
              class="spinner-border spinner-border-sm"
              v-if="loading"
            ></span>
            <span v-else>{{ $t("comment.replies_load") }}</span>
          </div>
        </template>
      </CommentCard>
    </div>
  </div>
  <div class="row" v-if="comment.replies > 0 && replies.length > 0">
    <div class="col offset-1">
      <div v-for="reply in replies" :key="reply.id" class="mb-3">
        <CommentItem :comment="reply" />
      </div>
    </div>
  </div>
  <!-- Load more -->
  <div class="row" v-if="repliesMeta.next">
    <div class="col">
      <form @submit.prevent="fetchMoreReplies">
        <SubmitButton :label="'comment.replies_load_more'" />
      </form>
    </div>
  </div>
</template>

<script>
import api from "@/services/api";
import { mapGetters } from "vuex";

import CommentCard from "@/components/comment/CommentCard.vue";
import SubmitButton from "@/components/form/SubmitButton.vue";

export default {
  name: "CommentItem",
  data() {
    return {
      replies: [],
      repliesMeta: {},
    };
  },
  props: {
    comment: {
      type: Object,
      required: true,
    },
    canEdit: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    ...mapGetters(["loading"]),
  },
  methods: {
    // get replies
    async fetchReplies() {
      try {
        const response = await api.get(
          `/comments?replyto[]=${this.comment.id}`
        );
        this.replies = response.data.data;
        this.repliesMeta = response.data.meta;
      } catch (error) {
        console.log(error);
      }
    },
    // load more replies
    async fetchMoreReplies() {
      try {
        const response = await api.get(
          `/comments?replyto[]=${this.comment.id}&page=${
            this.repliesMeta.page + 1
          }`
        );
        // console log url
        this.replies = [...this.replies, ...response.data.data];
        this.repliesMeta = response.data.meta;
      } catch (error) {
        console.log(error);
      }
    },
  },
  components: {
    CommentCard,
    SubmitButton,
  },
};
</script>