<template>
  <div class="row mb-3">
    <div class="col-12">
      <div class="form-group">
        <input
          type="search"
          class="form-control"
          id="searchInput"
          :placeholder="$t('app.search_placeholder')"
          v-model="search"
        />
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col">
      <div v-if="search.length >= 2">
        <p
          v-html="$t('app.search_results', { query: '<b>' + search + '</b>' })"
        ></p>
      </div>
      <div v-else>
        <p
          v-html="
            $t('app.search_results_min_length', { min: '<b>' + 2 + '</b>' })
          "
        ></p>
      </div>
    </div>
  </div>
  <div class="row" v-if="search.length >= 2">
    <div class="col-12 col-md-6 border-end">
      <div class="mb-3">
        <h5>{{ $t("profiles.page") }}</h5>
        <hr />
      </div>
      <div v-if="profiles.length > 0 && !profileLoading">
        <div
          class="mb-3"
          v-html="
            $t('app.total_results', {
              total: '<b>' + profilesMetaInfo.total + '</b>',
            })
          "
        ></div>
        <div v-for="profile in profiles" :key="profile.id" class="mb-3">
          <UserIdentifier :user="profile" />
        </div>
        <div>
          <button
            type="button"
            class="btn btn-primary"
            @click="seeMoreProfiles"
          >
            {{ $t("app.see_more") }}
          </button>
        </div>
      </div>
      <div v-else-if="profileLoading">
        <LoadingSpinner />
      </div>
      <div v-else>
        <p>{{ $t("app.no_results") }}</p>
      </div>
    </div>
    <div class="col-12 col-md-6">
      <div>
        <h5>{{ $t("resources.page") }}</h5>
        <hr />
      </div>
      <div v-if="resources.length > 0 && !resourceLoading">
        <div
          class="mb-3"
          v-html="
            $t('app.total_results', {
              total: '<b>' + resourcesMetaInfo.total + '</b>',
            })
          "
        ></div>
        <div v-for="resource in resources" :key="resource.id" class="mb-3">
          <ResourceIdentifier :resource="resource" />
        </div>
        <div>
          <button
            type="button"
            class="btn btn-primary"
            @click="seeMoreResources"
          >
            {{ $t("app.see_more") }}
          </button>
        </div>
      </div>
      <div v-else-if="resourceLoading">
        <LoadingSpinner />
      </div>
      <div v-else>
        <p>{{ $t("app.no_results") }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/services/api";
import axios from "axios";

import UserIdentifier from "../user/UserIdentifier.vue";
import ResourceIdentifier from "../resource/ResourceIdentifier.vue";

import LoadingSpinner from "../fragments/LoadingSpinner.vue";

export default {
  name: "SearchModal",
  emits: ["input", "close"],
  data() {
    return {
      search: "",
      profiles: [],
      resources: [],

      profilesMetaInfo: {},
      resourcesMetaInfo: {},

      profileLoading: false,
      resourceLoading: false,

      // Add CancelTokens for each API request
      profileCancelToken: null,
      resourceCancelToken: null,
    };
  },
  methods: {
    async searchProfiles() {
      // Cancel previous request if it exists
      if (this.profileCancelToken) {
        this.profileCancelToken.cancel();
      }

      this.profileLoading = true;

      // Create new CancelToken
      this.profileCancelToken = axios.CancelToken.source();

      api
        .get("/users", {
          params: {
            search: this.search,
          },
          cancelToken: this.profileCancelToken.token, // Set the cancel token for this request
        })
        .then((response) => {
          this.profiles = response.data.data;
          this.profilesMetaInfo = response.data.meta;
          this.profileLoading = false;
        })
        .catch((error) => {
          if (!axios.isCancel(error)) {
            console.error(error);
          }
        });
    },
    async searchResources() {
      // Cancel previous request if it exists
      if (this.resourceCancelToken) {
        this.resourceCancelToken.cancel();
      }

      this.resourceLoading = true;

      // Create new CancelToken
      this.resourceCancelToken = axios.CancelToken.source();

      api
        .get("/resources", {
          params: {
            search: this.search,
          },
          cancelToken: this.resourceCancelToken.token, // Set the cancel token for this request
        })
        .then((response) => {
          this.resources = response.data.data;
          this.resourcesMetaInfo = response.data.meta;
          this.resourceLoading = false;
        })
        .catch((error) => {
          if (!axios.isCancel(error)) {
            console.error(error);
          }
        });
    },
    seeMoreProfiles() {
      // redirect to profiles page
      this.$router.push({ name: "profiles", query: { search: this.search } });
    },
    seeMoreResources() {
      // redirect to resources page
      this.$router.push({ name: "resources", query: { search: this.search } });
    },
  },
  watch: {
    search() {
      if (this.search.length >= 2) {
        this.searchProfiles();
        this.searchResources();
      } else {
        this.profiles = [];
        this.profilesMetaInfo = {};

        this.resources = [];
        this.resourcesMetaInfo = {};
      }
    },
  },
  components: {
    UserIdentifier,
    ResourceIdentifier,
    LoadingSpinner,
  },
};
</script>