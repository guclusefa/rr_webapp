<template>
  <div v-if="likes.length">
    <div
      class="d-flex align-items-center justify-content-between mb-2 pb-2 pt-2 border-bottom border-top"
      v-for="like in likes"
      :key="like.id"
    >
      <div>
        <UserIdentifier :user="like.user" />
      </div>

      <div>{{ formatDateTime(like.createdAt) }}</div>
    </div>
    <div v-if="meta.page < meta.pages">
      <form @submit.prevent="fetchMoreLikes">
        <SubmitButton :label="'resources.load_more_likes'" />
      </form>
    </div>
  </div>
  <div v-else>
    <LoadingSpinner />
  </div>
</template>

<script>
import dateFormatter from "@/mixins/dateFormatter";

import api from "@/services/api";
import UserIdentifier from "@/components/user/UserIdentifier.vue";
import SubmitButton from "@/components/form/SubmitButton.vue";
import LoadingSpinner from "@/components/fragments/LoadingSpinner.vue";

export default {
  name: "ResourceLikesList",
  mixins: [dateFormatter],
  data() {
    return {
      likes: [],
      meta: {},
    };
  },
  props: {
    resource: {
      type: Object,
      required: true,
    },
    uri: {
      type: String,
      required: true,
    },
  },
  methods: {
    async fetchLikes() {
      const response = await api.get(this.uri, {
        params: {
          resource: this.resource.id,
        },
      });
      this.likes = response.data.data;
      this.meta = response.data.meta;
    },
    async fetchMoreLikes() {
      const response = await api.get(this.uri, {
        params: {
          resource: this.resource.id,
          page: this.meta.page + 1,
        },
      });
      this.likes = [...this.likes, ...response.data.data];
      this.meta = response.data.meta;
    },
  },
  mounted() {
    this.fetchLikes();
  },
  components: {
    LoadingSpinner,
    UserIdentifier,
    SubmitButton,
  },
};
</script>