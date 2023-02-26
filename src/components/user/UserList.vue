<template>
  <div class="row">
    <div class="col">
      <div class="d-flex justify-content-between mb-3">
        <h1>
          {{ $t("profiles.title") }}
        </h1>
        <OffCanvasButton
          :label="'profiles.filter'"
          :classes="'btn btn-primary float-end'"
        />
      </div>
      <hr />
    </div>
  </div>

  <!-- Filters -->
  <OffCanvas title="profiles.filter">
    <template #body>
      <UserFilters />
    </template>
  </OffCanvas>

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
    <!-- No results -->
    <template v-if="profilesMeta.total === 0">
      <NoResultMessage />
    </template>
    <!-- Loading -->
    <template v-else>
      <LoadingSpinner />
    </template>
  </template>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { addErrorToast } from "@/services/toasts";

import UserFilters from "@/components/user/UserFilters.vue";
import OffCanvasButton from "@/components/fragments/OffCanvasButton.vue";
import OffCanvas from "@/components/fragments/OffCanvas.vue";

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
    OffCanvasButton,
    OffCanvas,
    UserCard,
    SubmitButton,
    NoResultMessage,
    LoadingSpinner,
  },
};
</script>