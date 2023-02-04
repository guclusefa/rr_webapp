<template>
  <div class="div">
    <div class="col">
      <form @submit.prevent="fetchData({ page: 1 })">
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            placeholder="Search"
            v-model="params.search"
          />
          <button class="btn btn-primary" type="submit">
            {{ $t("app.search") }}
          </button>
        </div>
      </form>
    </div>
  </div>

  <UserCards :users="users" :skeletons="skeletons" />

  <template v-if="Object.keys(meta).length">
    <LoadMoreButton
      v-if="meta.next"
      :isLoading="isLoading"
      :page="params.page"
      :fetchData="fetchData"
    />
    <MetaInformation
      v-if="meta.total > 0"
      :items="users"
      :meta="meta"
    />
    <NoResults v-if="meta.count === 0" />
  </template>

  <NoResponse v-if="isDown" />
</template>
<script>
import { fetchData } from "@/services/api.js";

import UserCards from "@/components/user/UserCards.vue";

import LoadMoreButton from "@/components/fragments/LoadMoreButton.vue";
import MetaInformation from "@/components/fragments/MetaInformation.vue";
import NoResults from "@/components/fragments/NoResults.vue";
import NoResponse from "@/components/fragments/NoResponse.vue";

export default {
  data() {
    return {
      url: "/users",
      users: [],
      skeletons: [],
      meta: {},
      params: {
        limit: 4,
        page: 1,
        search: "",
      },
      isLoading: false,
      isDown: false,
    };
  },
  methods: {
    async fetchData(params = {}) {
      try {
        // if filterd reset users
        if (params.page) {
          params.page === 1 ? (this.users = []) : null;
        }
        // show skeleton cards on load
        this.isLoading = true;
        this.skeletons = Array.from({ length: this.params.limit });
        // merge params with current params
        this.params = { ...this.params, ...params };
        // fetch data and set data and meta and check if response
        const response = await fetchData(this.url, this.params);
        !response ? (this.isDown = true) : null;
        // set data and meta
        this.meta = response.meta;
        this.users.push(...response.data);
      } catch (error) {
        // set isDown to true if error
        this.isDown = true;
      } finally {
        // reset skeletons
        this.skeletons = [];
        // no longer loading
        this.isLoading = false;
      }
    },
  },
  mounted() {
    this.fetchData();
  },
  components: {
    UserCards,
    LoadMoreButton,
    MetaInformation,
    NoResults,
    NoResponse,
  },
};
</script>