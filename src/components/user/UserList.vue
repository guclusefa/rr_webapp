<template>
  <NoResponseMessage :noResponse="noResponse" />
  <NoResultsMessage :noResults="noResults" />

  <div class="row mb-3" v-if="!noResponse && !noResults">
    <div class="col">
      <form @submit.prevent="filterUsers">
        <div class="form-group mb-3">
          <label for="search">{{ $t("app.search") }}</label>
          <input
            type="text"
            class="form-control"
            id="search"
            v-model="params.search"
          />
        </div>

        <div class="form-group mb-3">
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

        <div class="form-group mb-3">
          <label for="role">{{ $t("users.role") }}</label>
          <select class="form-control" id="role" multiple v-model="params.role">
            <option value="ROLE_USER">{{ $t("users.roles.user") }}</option>
            <option value="ROLE_MODERATOR">
              {{ $t("users.roles.moderator") }}
            </option>
            <option value="ROLE_ADMIN">{{ $t("users.roles.admin") }}</option>
            <option value="ROLE_SUPER_ADMIN">
              {{ $t("users.roles.super_admin") }}
            </option>
          </select>
        </div>

        <div class="form-group mb-3">
          <label for="gender">{{ $t("users.gender") }}</label>
          <select class="form-select" multiple v-model="params.gender">
            <option value="M">{{ $t("users.genders.male") }}</option>
            <option value="F">{{ $t("users.genders.female") }}</option>
            <option value="O">{{ $t("users.genders.other") }}</option>
          </select>
        </div>

        <div class="form-group mb-3">
          <label for="limit">{{ $t("app.limit") }}</label>
          <select class="form-control" id="limit" v-model="params.limit">
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="12">12</option>
            <option value="16">16</option>
            <option value="20">20</option>
          </select>
        </div>

        <div class="form-group mb-3">
          <label for="sort">{{ $t("app.sort") }}</label>
          <select class="form-control" id="sort" v-model="params.order">
            <option value="id">{{ $t("app.sorts.id") }}</option>
            <option value="username">{{ $t("users.sorts.username") }}</option>
            <option value="firstName">
              {{ $t("users.sorts.first_name") }}
            </option>
            <option value="lastName">{{ $t("users.sorts.last_name") }}</option>
            <option value="createdAt">{{ $t("app.sorts.created_at") }}</option>
            <option value="updatedAt">{{ $t("app.sorts.updated_at") }}</option>
          </select>
        </div>

        <div class="form-group mb-3">
          <label for="direction">{{ $t("app.direction") }}</label>
          <select
            class="form-control"
            id="direction"
            v-model="params.direction"
          >
            <option value="asc">{{ $t("app.directions.asc") }}</option>
            <option value="desc">{{ $t("app.directions.desc") }}</option>
          </select>
        </div>

        <button class="btn btn-primary" type="submit" :disabled="isLoading">
          <span v-if="isLoading"> {{ $t("app.loading") }} </span>
          <span v-else> {{ $t("app.filter") }} </span>
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
      :fetch="getUsers"
    />
    <MetaInformation v-if="meta.total > 0" :items="users" :meta="meta" />
  </template>
</template>

<script>
import { fetchData } from "@/services/api.js";

import UserCards from "@/components/user/UserCards.vue";

import LoadMoreButton from "@/components/fragments/LoadMoreButton.vue";
import MetaInformation from "@/components/fragments/MetaInformation.vue";

export default {
  data() {
    return {
      url: "/users",
      users: [],
      skeletons: [],
      meta: {},
      params: {
        page: 1,
        limit: 4,
        search: "",
        certified: "",
        role: [],
        // state TODO
        state: [],
        gender: [],
        order: "id",
        direction: "asc",
      },
      noResults: false,
      noResponse: false,
      isLoading: false,
    };
  },
  methods: {
    async getUsers(params = {}) {
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
        !response ? (this.noResponse = true) : null;
        // set data and meta
        this.meta = response.meta;
        this.users.push(...response.data);
        // check if no results
        this.users.length === 0 ? (this.noResults = true) : null;
      } catch (error) {
        // set noResponse to true if error
        this.noResponse = true;
      } finally {
        // reset skeletons and remove loading
        this.skeletons = [];
        this.isLoading = false;
      }
    },
    async filterUsers() {
      this.getUsers({ page: 1 });
    },
  },
  mounted() {
    this.getUsers();
  },
  components: {
    UserCards,
    LoadMoreButton,
    MetaInformation,
  },
};
</script>