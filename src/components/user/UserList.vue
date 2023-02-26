<template>
  <template v-if="profiles.length > 0">
    <div class="row mb-4">
      <div class="col">
        <h5>
          {{ $t("profiles.meta", profilesMeta) }}
        </h5>
      </div>
    </div>
    <div
      class="row row-cols-1 row-cols-sm-1 row-cols-md-3 row-cols-lg-5 g-4 mb-4"
    >
      <div class="col" v-for="profile in profiles" :key="profile.id">
        <UserCard :profile="profile" />
      </div>
    </div>
    <div class="row" v-if="profilesMeta.next">
      <div class="col">
  
          <form @submit.prevent="fetchProfiles">
            <SubmitButton :label="'profiles.load_more'" />
          </form>
     
      </div>
    </div>
  </template>
  <template v-else>
    <LoadingSpinner />
  </template>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { addErrorToast } from "@/services/toasts";

import UserCard from "@/components/user/UserCard.vue";
import SubmitButton from "@/components/form/SubmitButton.vue";
import LoadingSpinner from "@/components/fragments/LoadingSpinner.vue";

export default {
  name: "UserList",
  data() {
    return {
      params: {
        page: 1,
        limit: 20,
      },
    };
  },
  computed: {
    ...mapGetters(["profiles", "profilesMeta"]),
  },
  methods: {
    ...mapActions(["setProfiles"]),
    async fetchProfiles() {
      const response = await this.setProfiles(this.params);
      // Success
      if (response.status >= 200 && response.status < 300) {
        // Update params
        this.params.page++;
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
    UserCard,
    SubmitButton,
    LoadingSpinner,
  },
};
</script>