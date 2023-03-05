<template>
  <section class="container" v-if="this.profile.id == this.id">
    <!-- User profile -->
    <section class="mb-5">
      <!-- Title -->
      <div class="row mb-3">
        <div class="col">
          <div class="d-flex align-items-center border-bottom">
            <div class="me-auto">
              <h1>{{ $t("profile.title", { username: profile.username }) }}</h1>
            </div>
          </div>
        </div>
      </div>
      <!-- User -->
      <div class="row">
        <div class="col">
          <UserItem :profile="profile" :canEdit="canEdit" />
        </div>
      </div>
    </section>

    <!-- User Resources -->
    <section class="mb-5">
      <!-- Title -->
      <div class="row mb-3">
        <div class="col">
          <div class="d-flex align-items-center border-bottom">
            <div class="me-auto">
              <h1>
                {{
                  $t("profile.resources_of_title", {
                    username: profile.username,
                  })
                }}
              </h1>
            </div>
            <span class="ms-2" v-if="isOwner">
              <AddResourceButton />
            </span>
          </div>
        </div>
      </div>
      <!-- Resources Tabs -->
      <div class="row mb-3">
        <div class="col">
          <ul class="nav nav-tabs" id="myTab">
            <li class="nav-item">
              <button
                class="nav-link active"
                data-bs-toggle="tab"
                @click="setProfileResources"
              >
                {{ $t("profile.resources_title") }}
              </button>
            </li>
            <li class="nav-item">
              <button
                class="nav-link"
                data-bs-toggle="tab"
                @click="setProfileSharedByResources"
              >
                {{ $t("profile.resources_sharedby_title") }}
              </button>
            </li>
            <li class="nav-item">
              <button
                class="nav-link"
                data-bs-toggle="tab"
                @click="setProfileLikedByResources"
              >
                {{ $t("profile.resources_likeby_title") }}
              </button>
            </li>
            <li class="nav-item">
              <button
                class="nav-link"
                data-bs-toggle="tab"
                @click="setProfileExploitedByResources"
              >
                {{ $t("profile.resources_exploitedby_title") }}
              </button>
            </li>
            <li class="nav-item" v-if="isOwner">
              <button
                class="nav-link"
                data-bs-toggle="tab"
                @click="setProfileSharedToResources"
              >
                {{ $t("profile.resources_sharedto_title") }}
              </button>
            </li>
            <li class="nav-item" v-if="isOwner">
              <button
                class="nav-link"
                data-bs-toggle="tab"
                @click="setProfileSavedByResources"
              >
                {{ $t("profile.resources_savedby_title") }}
              </button>
            </li>
            <li class="nav-item" v-if="isOwner">
              <button
                class="nav-link"
                data-bs-toggle="tab"
                @click="setProfileDraftedByResources"
              >
                {{ $t("profile.resources_draftedby_title") }}
              </button>
            </li>
          </ul>
        </div>
      </div>
      <!-- Resources List -->
      <div class="row mb-3">
        <div class="col">
          <ResourceList />
        </div>
      </div>
    </section>

    <!-- User comments -->
    <section class="mb-5">
      <!-- Title -->
      <div class="row mb-3">
        <div class="col">
          <div class="d-flex align-items-center border-bottom">
            <div class="me-auto">
              <h1>
                {{
                  $t("profile.comments_of_title", {
                    username: profile.username,
                  })
                }}
              </h1>
            </div>
          </div>
        </div>
      </div>
      <!-- Comments List -->
      <div class="row mb-3">
        <div class="col">
          <CommentList />
        </div>
      </div>
    </section>
  </section>

  <LoadingSpinner v-else />
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { addErrorToast } from "@/services/toasts";

import UserItem from "@/components/user/UserItem";

import AddResourceButton from "@/components/resource/AddResourceButton";
import ResourceList from "@/components/resource/ResourceList";

import CommentList from "@/components/comment/CommentList";

import LoadingSpinner from "@/components/fragments/LoadingSpinner";

export default {
  name: "ProfileView",
  computed: {
    ...mapGetters([
      "user",
      "profile",
      "resourcesParamsDefault",
      "commentsParamsDefault",
    ]),
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
    ...mapActions([
      "setProfile",
      "filterResources",
      "clearResources",
      "filterComments",
      "clearComments",
    ]),
    async setProfileUser() {
      const response = await this.setProfile(this.id);
      // Success
      if (response.status >= 200 && response.status < 300) {
        return;
      }
      // Error
      if (response.status === 404 || !response.status) {
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
    async setProfileSharedByResources() {
      const params = {
        ...this.resourcesParamsDefault,
        sharedBy: this.id,
      };
      await this.filterResources(params);
    },
    async setProfileLikedByResources() {
      const params = {
        ...this.resourcesParamsDefault,
        likedBy: this.id,
      };
      await this.filterResources(params);
    },
    async setProfileExploitedByResources() {
      const params = {
        ...this.resourcesParamsDefault,
        exploitedBy: this.id,
      };
      await this.filterResources(params);
    },
    async setProfileSharedToResources() {
      const params = {
        ...this.resourcesParamsDefault,
        sharedTo: this.id,
      };
      await this.filterResources(params);
    },
    async setProfileSavedByResources() {
      const params = {
        ...this.resourcesParamsDefault,
        savedBy: this.id,
      };
      await this.filterResources(params);
    },
    async setProfileDraftedByResources() {
      const params = {
        ...this.resourcesParamsDefault,
        author: [this.id],
        isPublished: false,
      };
      await this.filterResources(params);
    },
    async setProfileComments() {
      const params = {
        ...this.commentsParamsDefault,
        author: [this.id],
      };
      await this.filterComments(params);
    },
    loadProfile() {
      // Clear
      this.clearResources();
      this.clearComments();
      // Set
      this.setProfileUser().then(() => {
        this.setProfileResources();
        this.setProfileComments();
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
    UserItem,

    AddResourceButton,
    ResourceList,

    CommentList,

    LoadingSpinner,
  },
};
</script>