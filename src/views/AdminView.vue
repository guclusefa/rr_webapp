<template>
  <section class="container">
    <section class="mb-5">
      <div class="row mb-3">
        <div class="col">
          <div class="d-flex align-items-center">
            <div class="me-auto">
              <h1>{{ $t("admin.title") }}</h1>
            </div>
          </div>
        </div>
      </div>

      <!-- Tabs -->
      <div class="row mb-3">
        <div class="col">
          <ul class="nav nav-tabs flex-nowrap" id="myTab">
            <li class="nav-item">
              <button
                class="nav-link active"
                data-bs-toggle="tab"
                data-bs-target="#profiles-tab-pane"
                @click="getProfiles"
              >
                {{ $t("admin.profiles_title") }}
              </button>
            </li>
            <li class="nav-item">
              <button
                class="nav-link"
                data-bs-toggle="tab"
                data-bs-target="#resources-tab-pane"
                @click="getResources"
              >
                {{ $t("admin.resources_title") }}
              </button>
            </li>
            <li class="nav-item">
              <button
                class="nav-link"
                data-bs-toggle="tab"
                data-bs-target="#comments-tab-pane"
                @click="getComments"
              >
                {{ $t("admin.comments_title") }}
              </button>
            </li>
            <li class="nav-item">
              <button
                class="nav-link"
                data-bs-toggle="tab"
                data-bs-target="#categories-tab-pane"
                @click="getCategories"
              >
                {{ $t("admin.categories_title") }}
              </button>
            </li>
            <li class="nav-item">
              <button
                class="nav-link"
                data-bs-toggle="tab"
                data-bs-target="#relations-tab-pane"
                @click="getRelations"
              >
                {{ $t("admin.relations_title") }}
              </button>
            </li>
            <li class="nav-item">
              <button
                class="nav-link"
                data-bs-toggle="tab"
                data-bs-target="#bans-tab-pane"
                @click="getBans"
              >
                {{ $t("admin.bans_title") }}
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div class="tab-content" id="myTabContent">
        <div class="tab-pane fade show active" id="profiles-tab-pane">
          <UserList />
        </div>
        <div class="tab-pane fade" id="resources-tab-pane">
          <ResourceList />
        </div>
        <div class="tab-pane fade" id="comments-tab-pane">
          <CommentList />
        </div>
        <div class="tab-pane fade" id="categories-tab-pane">
          <CategoryList />
        </div>
        <div class="tab-pane fade" id="relations-tab-pane">
          <RelationList />
        </div>
        <div class="tab-pane fade" id="bans-tab-pane">
          <BanList />
        </div>
      </div>
    </section>
  </section>
</template>


<script>
import { mapGetters, mapActions } from "vuex";
import { addErrorToast } from "@/services/toasts";

import UserList from "@/components/user/UserList";
import ResourceList from "@/components/resource/ResourceList";
import CommentList from "@/components/comment/CommentList";
import CategoryList from "@/components/admin/category/CategoryList";
import RelationList from "@/components/admin/relation/RelationList";
import BanList from "@/components/admin/ban/BanList";

export default {
  name: "AdminView",
  created() {
    if (!this.isAdmin) {
      addErrorToast(this.$t("app.not_authorized"));
      this.$router.push("/");
    }
  },
  computed: {
    ...mapGetters([
      "isAdmin",
      "isSuperAdmin",
      "profiesParamsDefault",
      "resourcesParamsDefault",
      "commentsParamsDefault",
      "categoriesParamsDefault",
      "relationsParamsDefault",
      "bansParamsDefault",
    ]),
  },
  methods: {
    ...mapActions(["setProfiles", "clearProfiles"]),
    async fetchProfiles() {
      const params = {
        ...this.profilesParamsDefault,
      };
      // Request
      const response = await this.setProfiles(params);
      // Success
      if (response.status >= 200 && response.status < 300) {
        return;
      }
      // Error
      addErrorToast(response);
    },
    getProfiles() {
      this.clearProfiles().then(() => {
        this.fetchProfiles();
      });
    },
    ...mapActions(["setResources", "clearResources"]),
    async fetchResources() {
      const params = {
        ...this.resourcesParamsDefault,
        verified: 0,
      };
      // Request
      const response = await this.setResources(params);
      // Success
      if (response.status >= 200 && response.status < 300) {
        return;
      }
      // Error
      addErrorToast(response);
    },
    getResources() {
      this.clearResources().then(() => {
        this.fetchResources();
      });
    },
    ...mapActions(["setComments", "clearComments"]),
    async fetchComments() {
      const params = {
        ...this.commentsParamsDefault,
      };
      // Request
      const response = await this.setComments(params);
      // Success
      if (response.status >= 200 && response.status < 300) {
        return;
      }
      // Error
      addErrorToast(response);
    },
    getComments() {
      this.clearComments().then(() => {
        this.fetchComments();
      });
    },
    ...mapActions(["setCategories", "clearCategories"]),
    async fetchCategories() {
      const params = {
        ...this.categoriesParamsDefault,
      };
      // Request
      const response = await this.setCategories(params);
      // Success
      if (response.status >= 200 && response.status < 300) {
        return;
      }
      // Error
      addErrorToast(response);
    },
    getCategories() {
      this.clearCategories().then(() => {
        this.fetchCategories();
      });
    },
    ...mapActions(["setRelations", "clearRelations"]),
    async fetchRelations() {
      const params = {
        ...this.relationsParamsDefault,
      };
      // Request
      const response = await this.setRelations(params);
      // Success
      if (response.status >= 200 && response.status < 300) {
        return;
      }
      // Error
      addErrorToast(response);
    },
    getRelations() {
      this.clearRelations().then(() => {
        this.fetchRelations();
      });
    },
    ...mapActions(["setBans", "clearBans"]),
    async fetchBans() {
      const params = {
        ...this.bansParamsDefault,
      };
      // Request
      const response = await this.setBans(params);
      // Success
      if (response.status >= 200 && response.status < 300) {
        return;
      }
      // Error
      addErrorToast(response);
    },
    getBans() {
      this.clearBans().then(() => {
        this.fetchBans();
      });
    },
  },
  mounted() {
    this.getProfiles();
  },
  components: {
    UserList,
    ResourceList,
    CommentList,
    CategoryList,
    RelationList,
    BanList,
  },
};
</script>