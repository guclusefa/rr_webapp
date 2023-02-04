<template>
  <div class="row">
    <div class="col-12 col-md-6 col-lg-3" v-for="user in users" :key="user.id">
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

  <template v-if="Object.keys(meta).length">
    <LoadMoreButton
      v-if="meta.next"
      :meta="meta"
      :isLoading="isLoading"
      :page="params.page"
      :fetchData="fetchData"
    />
    <MetaInformation
      v-if="meta.total > 0"
      :meta="meta"
      :items="users"
      :isLoading="isLoading"
    />
    <NoResults v-if="meta.count === 0" />
  </template>

  <NoResponse v-if="isDown" />
</template>
<script>
import { fetchData } from "@/services/api.js";

import UserCard from "@/components/user/UserCard.vue";
import UserCardSkeleton from "@/components/user/UserCardSkeleton.vue";

import LoadMoreButton from "@/components/fragments/LoadMoreButton.vue";
import MetaInformation from "@/components/fragments/MetaInformation.vue";
import NoResults from "@/components/fragments/NoResults.vue";
import NoResponse from "@/components/fragments/NoResponse.vue";

export default {
  data() {
    return {
      url: "/users",
      users: [],
      skeletonCards: [],
      meta: {},
      params: {
        limit: 1,
        page: 1,
      },
      isLoading: false,
      isDown: false,
    };
  },
  methods: {
    async fetchData(params = {}) {
      try {
        // show skeleton cards on load
        this.isLoading = true;
        this.skeletonCards = Array.from(
          { length: this.params.limit },
          (_, i) => i
        );
        // merge params with current params
        this.params = { ...this.params, ...params };
        // fetch data and set data and meta
        const response = await fetchData(this.url, this.params);
        // check if response is not null and has data
        if (!response || !response.data) {
          this.isDown = true;
          return;
        }
        // set data and meta
        this.meta = response.meta;
        this.users.push(...response.data);
      } catch (error) {
        // set isDown to true if error
        this.isDown = true;
      } finally {
        // hide skeleton cards
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
    NoResults,
    NoResponse,
  },
};
</script>