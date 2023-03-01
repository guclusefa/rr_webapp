<template>
  <div class="card">
    <div class="card-header">
      <UserIdentifier :user="comment.author" v-if="comment.author" />
      <span v-else>{{ $t("comment.anonymous") }}</span>
      <span class="text-muted float-end">
        {{ formatDateTime(comment.createdAt) }}
      </span>
    </div>
    <div class="card-body">
      <p class="card-text pre-line">{{ comment.content }}</p>
    </div>
  </div>
</template>

<script>
import dateFormatter from "@/mixins/dateFormatter";

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
  components: {
    UserIdentifier,
  },
};
</script>