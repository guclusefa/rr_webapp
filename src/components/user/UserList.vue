<template>
  <template v-if="profiles.length > 0 && profilesMeta.total > 0">
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
        <form @submit.prevent="fetchMoreProfiles">
          <SubmitButton :label="'profiles.load_more'" />
        </form>
      </div>
    </div>
  </template>

  <template v-else>
    <NoResultMessage v-if="profilesMeta.total === 0" />
    <LoadingSpinner v-else />
  </template>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { addErrorToast } from "@/services/toasts.js";

import UserCard from "@/components/user/UserCard.vue";
import SubmitButton from "@/components/form/SubmitButton.vue";

import LoadingSpinner from "@/components/fragments/LoadingSpinner.vue";
import NoResultMessage from "@/components/fragments/NoResultMessage.vue";

export default {
  name: "UserList",
  computed: {
    ...mapGetters(["profiles", "profilesParams", "profilesMeta"]),
  },
  methods: {
    ...mapActions(["setProfiles"]),
    async fetchMoreProfiles() {
      // Request
      const response = await this.setProfiles({
        ...this.profilesParams,
        page: this.profilesMeta.page + 1,
      });
      // Success
      if (response.status >= 200 && response.status < 300) {
        return;
      }
      // Error
      addErrorToast(response);
    },
  },
  components: {
    UserCard,
    SubmitButton,
    
    NoResultMessage,
    LoadingSpinner,
  },
};
</script>