<template>
  <section class="container" v-if="this.profile.id == this.id">
    <!-- User profile -->
    <section class="mb-5">
      <div class="row mb-3">
        <div class="col">
          <div class="d-flex align-items-center border-bottom">
            <div class="me-auto">
              <h1>{{ $t("profile.title", { username: profile.username }) }}</h1>
            </div>
            <span class="ms-2" v-if="canEdit">
              <UserActions :profile="profile" />
            </span>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <UserItem :profile="profile" />
        </div>
      </div>
    </section>

    <!-- Resources -->
    <section class="mb-5">
      <div class="row mb-3">
        <div class="col">
          <div class="d-flex align-items-center border-bottom">
            <div class="me-auto">
              <h1>
                {{
                  $t("profile.resources_title", { username: profile.username })
                }}
              </h1>
            </div>
            <span class="ms-2" v-if="isOwner">
              <AddResourceButton />
            </span>
            <span class="ms-2">
              <FilterResourceButton />
            </span>
          </div>
        </div>
      </div>
      <!-- Resources -->
      <div class="row">
        <div class="col">
          <ResourceList :isProfile="true" :showCreate="isOwner" />
        </div>
      </div>
    </section>
  </section>

  <LoadingSpinner v-else />
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { addErrorToast } from "@/services/toasts";

import UserActions from "@/components/user/UserActions";
import UserItem from "@/components/user/UserItem";

import AddResourceButton from "@/components/resource/AddResourceButton";
import FilterResourceButton from "@/components/resource/FilterResourceButton";
import ResourceList from "@/components/resource/ResourceList";

import LoadingSpinner from "@/components/fragments/LoadingSpinner";

export default {
  name: "ProfileView",
  computed: {
    ...mapGetters(["user", "profile", "resourcesParamsDefault"]),
    id() {
      return this.$route.params.id;
    },
    isOwner() {
      if (!this.user) {
        return false;
      }
      return this.user.id == this.id;
    },
    canEdit() {
      return this.isOwner;
    },
  },
  methods: {
    ...mapActions(["setProfile", "filterResources", "clearResources"]),
    async setProfileUser() {
      const response = await this.setProfile(this.id);
      // Success
      if (response.status >= 200 && response.status < 300) {
        return;
      }
      // Error
      if (response.status === 404) {
        addErrorToast("user.not_found");
      } else {
        addErrorToast(response);
      }
      this.$router.push({ name: "home" });
    },
    async setProfileResources() {
      const params = {
        ...this.resourcesParamsDefault,
        author: [this.id],
      };
      await this.filterResources(params);
    },
    loadProfile() {
      // Clear
      this.clearResources();
      // Set
      this.setProfileUser().then(() => {
        this.setProfileResources();
      });
    },
  },
  mounted() {
    this.loadProfile();
  },
  watch: {
    id() {
      this.loadProfile();
    },
  },
  components: {
    UserActions,
    UserItem,

    AddResourceButton,
    FilterResourceButton,
    ResourceList,

    LoadingSpinner,
  },
};
</script>