<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-header">
          <UserIdentifier :user="comment.author" v-if="comment.author" />
          <span v-else>{{ $t("comment.anonymous") }}</span>
          <span class="text-muted float-end">
            {{ formatDateTime(comment.createdAt) }}
          </span>
        </div>
        <div class="card-body">
          <p class="card-text pre-line">
            <router-link :to="`/comment/${comment.id}`">
              {{ comment.content }}
            </router-link>
          </p>
        </div>
        <div class="card-footer">
          <router-link :to="`/resource/${comment.resource.id}`">
            {{ comment.resource.title }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dateFormatter from "@/mixins/dateFormatter";

import UserIdentifier from "../user/UserIdentifier.vue";

export default {
  name: "CommentItem",
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