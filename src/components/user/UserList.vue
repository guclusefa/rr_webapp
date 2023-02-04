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
  <LoadMoreButton :meta="meta" :isLoading="isLoading" :page="params.page" :fetchData="fetchData" />
  <MetaInformation :meta="meta" :items="users" :isLoading="isLoading" />
</template>
<script>
import { fetchData } from "@/services/api.js";

import UserCard from "@/components/user/UserCard.vue";
import UserCardSkeleton from "@/components/user/UserCardSkeleton.vue";
import LoadMoreButton from "@/components/fragments/LoadMoreButton.vue";
import MetaInformation from "@/components/fragments/MetaInformation.vue";

export default {
  data() {
    return {
      url : "/users",
      users: [],
      skeletonCards: [],
      meta: {},
      params : {
        limit: 1,
        page: 1,
      },
      isLoading: false,
    };
  },
  methods: {
    async fetchData(page) {
      try {
        // show skeleton cards on load
        this.isLoading = true;
        this.skeletonCards = Array.from({ length: this.params.limit }, (_, i) => i);
        // get current page
        this.params.page = page || this.params.page;
        // fetch data and set data and meta
        const response = await fetchData(this.url, this.params);
        this.meta = response.meta;
        this.users.push(...response.data);
      } catch (error) {
        // handle error
        console.error(error);
      } finally {
        // hide skeleton cards and reset params
        this.isLoading = false;
        this.skeletonCards = [];
      }
    },
  },
  mounted() {
    this.fetchData();
  },
  components: {
    UserCard,
    UserCardSkeleton,
    LoadMoreButton,
    MetaInformation,
  },
};
</script>