<template>
  <div class="row">
    <div class="col">
      <div class="row">
        <div
          class="col-12 col-md-6 col-lg-3"
          v-for="user in users"
          :key="user.id"
        >
          <UserCard :user="user" />
        </div>
        <div
          class="col-12 col-md-6 col-lg-3"
          v-for="skeletonCard in skeletonCards"
          :key="skeletonCard"
        >
          <UserCardSkeleton />
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col">
      <button
        class="btn btn-primary mb-3"
        @click="loadMore"
        :disabled="isLoading"
        v-if="meta.next"
      >
        <span v-if="isLoading"> {{ $t("app.loading") }} </span>
        <span v-else>{{ $t("app.see_more") }}</span>
      </button>
    </div>
  </div>
  <div class="row">
    <div class="col">
      <p v-if="users.length > 0">
        {{ $t("app.showing", { end: meta.end, total: meta.total }) }}
      </p>
      <p v-else-if="!isLoading">{{ $t("app.no_results") }}</p>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import UserCard from "@/components/user/UserCard.vue";
import UserCardSkeleton from "@/components/user/UserCardSkeleton.vue";

const api = axios.create({
  baseURL: "http://localhost:8000/api"
});

export default {
  data() {
    return {
      users: [],
      meta: {},
      page: 1,
      limit: 10,
      isLoading: false,
      skeletonCards: [],
    };
  },
  methods: {
    async fetchUsers() {
      try {
        this.isLoading = true;
        this.skeletonCards = Array.from({ length: this.limit }, (_, i) => i);
        const response = await api.get(`/users`, {
          params: {
            limit: this.limit,
            page: this.page
          }
        });
        this.meta = response.data.meta;
        this.users.push(...response.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
        this.skeletonCards = [];
      }
    },
    loadMore() {
      this.page++;
      this.fetchUsers();
    }
  },
  mounted() {
    this.fetchUsers();
  },
  components: {
    UserCard,
    UserCardSkeleton
  }
};
</script>