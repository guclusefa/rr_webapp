<template>
  <div class="row">
    <div class="col">
      <div class="d-flex justify-content-between mb-3">
        <h1>
          {{ $t("profiles.title") }}
        </h1>
        <button
          class="btn btn-primary float-end"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasScrolling"
        >
          {{ $t("profiles.filter") }}
        </button>
      </div>
      <hr />
    </div>
  </div>

  <aside
    class="offcanvas offcanvas-start"
    data-bs-scroll="true"
    data-bs-backdrop="false"
    tabindex="-1"
    id="offcanvasScrolling"
  >
    <div class="offcanvas-header border-bottom">
      <h5 class="offcanvas-title">
        {{ $t("profiles.filter") }}
      </h5>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="offcanvas"
      ></button>
    </div>
    <div class="offcanvas-body">
      <!-- Filters -->
      <UserFilters />
    </div>
  </aside>

  <template v-if="profilesMeta.total > 0">
    <!-- Meta -->
    <div class="row mb-4">
      <div class="col">
        <h5>
          {{ $t("profiles.meta", profilesMeta) }}
        </h5>
      </div>
    </div>
    <!-- Cards -->
    <div
      class="row row-cols-1 row-cols-sm-1 row-cols-md-3 row-cols-lg-5 g-4 mb-4"
    >
      <div class="col" v-for="profile in profiles" :key="profile.id">
        <UserCard :profile="profile" />
      </div>
    </div>
    <!-- Load more -->
    <div class="row" v-if="profilesMeta.next">
      <div class="col">
        <form @submit.prevent="fetchProfiles">
          <SubmitButton :label="'profiles.load_more'" />
        </form>
      </div>
    </div>
  </template>

  <template v-else>
    <template v-if="profilesMeta.total === 0">
      <NoResultMessage />
    </template>
    <template v-else>
      <LoadingSpinner />
    </template>
  </template>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { addErrorToast } from "@/services/toasts";

import UserFilters from "@/components/user/UserFilters.vue";
import UserCard from "@/components/user/UserCard.vue";
import SubmitButton from "@/components/form/SubmitButton.vue";
import NoResultMessage from "@/components/fragments/NoResultMessage.vue";
import LoadingSpinner from "@/components/fragments/LoadingSpinner.vue";

export default {
  name: "UserList",
  computed: {
    ...mapGetters(["profiles", "profilesParams", "profilesMeta", "loading"]),
  },
  methods: {
    ...mapActions(["setProfiles"]),
    async fetchProfiles() {
      const response = await this.setProfiles(this.profilesParams);
      // Success
      if (response.status >= 200 && response.status < 300) {
        return;
      }
      // Error
      addErrorToast(response);
    },
  },
  created() {
    if (this.profiles.length > 0) {
      return;
    }
    this.fetchProfiles();
  },
  components: {
    UserFilters,
    UserCard,
    SubmitButton,
    NoResultMessage,
    LoadingSpinner,
  },
};
</script>