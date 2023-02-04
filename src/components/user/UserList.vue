<template>
  <div class="div">
    <div class="col">
      <form @submit.prevent="fetchData({ page: 1 })">
        <div class="form-group">
          <label for="search">{{ $t("app.search") }}</label>
          <input
            type="text"
            class="form-control"
            id="search"
            v-model="params.search"
          />
        </div>

        <div class="form-group">
          <label for="certified">{{ $t("users.certified") }}</label>
          <select
            class="form-control"
            id="certified"
            v-model="params.certified"
          >
            <option value=""></option>
            <option value="1">{{ $t("app.yes") }}</option>
            <option value="0">{{ $t("app.no") }}</option>
          </select>
        </div>

        <div class="form-group">
          <label for="gender">{{ $t("users.gender") }}</label>
          <select
            class="form-select"
            multiple
            v-model="params.gender"
          >
            <option value=""></option>
            <option value="M">{{ $t("users.gender.male") }}</option>
            <option value="F">{{ $t("users.gender.female") }}</option>
            <option value="O">{{ $t("users.gender.other") }}</option>
          </select>
        </div>

        <button class="btn btn-primary" type="submit">
          {{ $t("app.filter") }}
        </button>
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
    <MetaInformation v-if="meta.total > 0" :items="users" :meta="meta" />
    <NoResults v-if="meta.count === 0 && !isLoading" />
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
        certified: "",
        gender: [],
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
        console.log(this.params);
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