<template>
  <!-- Side -->
  <div class="col-12 border position-relative">
    <div class="dropdown position-absolute top-0 end-0 m-2" v-if="canEdit">
      <button class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown">
        {{ $t("resource.actions") }}
      </button>
      <ul class="dropdown-menu dropdown-menu-end">
        <li>
          <a class="dropdown-item" href="#" @click="showEditModal('edit')">
            {{ $t("resource.edit") }}
          </a>
        </li>
        <li>
          <a class="dropdown-item" href="#" @click="showEditModal('media')">
            {{ $t("resource.edit_media") }}
          </a>
        </li>
        <li>
          <a class="dropdown-item" href="#" @click="showEditModal('delete')">
            {{ $t("resource.delete") }}</a
          >
        </li>
      </ul>
    </div>

    <div class="row">
      <div class="col-sm-6 col-12">
        <template v-if="resource.media">
          <div
            class="embed-responsive embed-responsive-16by9"
            v-if="resource.media.includes('.mp4')"
          >
            <video controls>
              <source :src="resource.media" type="video/mp4" />
            </video>
          </div>
          <img :src="resource.media" class="img-fluid rounded" v-else />
        </template>
        <template v-else>
          <img
            src="@/assets/images/resource/default.png"
            class="img-fluid rounded"
          />
        </template>
      </div>
      <div class="col-sm-6 col-12 pt-3">
        <div class="text-strong" v-if="resource.title">
          {{ resource.title }}
          <span class="badge bg-success ms-1" v-if="resource.isVerified">
            {{ $t("resources.verified") }}
          </span>
          <span class="badge bg-secondary ms-1" v-if="resource.visibility">
            {{ $t(`resources.visibilities.${resource.visibility}`) }}
          </span>
        </div>
        <div class="text-muted pb-1" v-if="resource.relation">
          <span class="badge bg-primary">
            {{ resource.relation.name }}
          </span>
        </div>
        <div class="text-muted pb-1" v-if="resource.categories">
          <span
            class="badge bg-secondary me-2"
            v-for="category in resource.categories"
            :key="category.id"
          >
            {{ category.name }}
          </span>
        </div>
        <div class="text-muted pb-1 pre-line" v-if="resource.content">
          {{ resource.content }}
        </div>
        <div class="text-muted pb-1" v-if="resource.link">
          <a :href="resource.link" target="_blank">
            {{ resource.link }}
          </a>
        </div>
        <div class="text-muted pb-1" v-if="resource.author">
          <UserIdentifier :user="resource.author" />
        </div>
        <div class="text-muted pb-1" v-if="resource.createdAt">
          <span class="text-muted pb-1">
            {{
              $t(`resources.published_days_ago`, {
                days: getDays(resource.createdAt),
              })
            }}
          </span>
        </div>
      </div>
    </div>
  </div>
  <!-- Edit -->
  <ModalDialog ref="editModal" :title="modalTitle">
    <template #body>
      <component :is="modalComponent" @close="closeEditModal" />
    </template>
  </ModalDialog>
</template>

<script>
import { mapGetters } from "vuex";
import dateFormatter from "@/mixins/dateFormatter";

import ModalDialog from "@/components/fragments/ModalDialog";
import ResourceEdit from "@/components/resource/ResourceEdit";
import ResourceEditMedia from "@/components/resource/ResourceEditMedia";
import ResourceDelete from "@/components/resource/ResourceDelete";

import UserIdentifier from "@/components/user/UserIdentifier";

export default {
  name: "ResourceItem",
  mixins: [dateFormatter],
  data() {
    return {
      modalType: null,
    };
  },
  computed: {
    // get resource
    ...mapGetters(["resource", "user"]),
    canEdit() {
      if (this.user && this.resource) {
        return this.user.id === this.resource.author.id;
      }
      return false;
    },
    // modal title
    modalTitle() {
      switch (this.modalType) {
        case "edit":
          return this.$t("resource.edit_title", {
            title: this.resource.title,
          });
        case "media":
          return this.$t("resource.edit_media_title", {
            title: this.resource.title,
          });
        case "delete":
          return this.$t("resource.delete_title", {
            title: this.resource.title,
          });
        default:
          return "";
      }
    },
    // modal component
    modalComponent() {
      switch (this.modalType) {
        case "edit":
          return ResourceEdit;
        case "media":
          return ResourceEditMedia;
        case "delete":
          return ResourceDelete;
        default:
          return null;
      }
    },
  },
  methods: {
    showEditModal(type) {
      this.modalType = type;
      this.$refs.editModal.show();
    },
    closeEditModal() {
      this.$refs.editModal.close();
    },
  },
  components: {
    ModalDialog,
    ResourceEdit,
    ResourceEditMedia,
    ResourceDelete,
    UserIdentifier,
  },
};
</script>