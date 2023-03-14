<template>
  <div class="row">
    <div class="col-12 col-xl-4">
      <div class="row">
        <div class="col">
          <div class="mb-3">
            <template v-if="resource.media">
              <img
                :src="resource.media"
                class="img-fluid w-100 rounded"
                v-if="!resource.media.includes('.mp4')"
              />
              <video
                :src="resource.media"
                class="img-fluid w-100 rounded"
                v-else
                controls
              />
            </template>
            <template v-else>
              <img
                src="@/assets/images/resource/default.png"
                class="img-fluid w-100 rounded"
              />
            </template>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="mb-3">
            <div class="float-end">
              <ResourceActionsButton :resource="resource" />
            </div>
            <div class="mb-2">
              <span class="badge bg-danger me-1" v-if="!resource.isPublished">
                {{ $t(`resource.draft`) }}
              </span>
              <span class="badge bg-success me-1" v-if="resource.isVerified">
                {{ $t("resource.verified") }}
              </span>
              <span class="badge bg-warning me-1" v-else>
                {{ $t("resource.unverified") }}
              </span>
              <span class="badge bg-secondary me-1" v-if="resource.visibility">
                {{ $t(`resources.visibilities.${resource.visibility}`) }}
              </span>
            </div>
            <div class="mb-2">
              <span class="badge bg-primary me-1" v-if="resource.relation">
                {{ resource.relation.name }}
              </span>
            </div>
            <div class="mb-2" v-if="resource.categories">
              <span
                class="badge bg-gray me-1"
                v-for="category in resource.categories"
                :key="category.id"
              >
                {{ category.name }}
              </span>
            </div>
            <div class="mb-2" v-if="resource.author">
              <UserIdentifier :user="resource.author" />
            </div>
            <div class="text-muted mb-2">
              {{
                $t(`resources.published_days_ago`, {
                  days: getDays(resource.createdAt),
                })
              }}
            </div>
            <div class="mb-2">
              <div class="d-flex justify-content-between mt-2 mb-2">
                <CommentResourceButton :resource="resource" />
                <ShareResourceButton :resource="resource" />
                <LikeResourceButton :resource="resource" />
                <ExploitResourceButton :resource="resource" />
                <ConsultResourceButton :resource="resource" />
                <SaveResourceButton
                  :resource="resource"
                  v-if="isAuthenticated"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-12 col-xl-8 mt-3 mt-xl-0 border-start">
      <div class="row">
        <div class="col">
          <div class="wysiwyg">
            <div ref="wysiwyg"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import dateFormatter from "@/mixins/dateFormatter";

import ResourceActionsButton from "@/components/resource/ResourceActionsButton.vue";
import UserIdentifier from "@/components/user/UserIdentifier";

import CommentResourceButton from "@/components/resource/CommentResourceButton.vue";
import ShareResourceButton from "@/components/resource/ShareResourceButton.vue";
import LikeResourceButton from "@/components/resource/LikeResourceButton.vue";
import ExploitResourceButton from "@/components/resource/ExploitResourceButton.vue";
import SaveResourceButton from "@/components/resource/SaveResourceButton.vue";
import ConsultResourceButton from "@/components/resource/ConsultResourceButton.vue";

import Quill from "quill";
import "quill/dist/quill.snow.css";

export default {
  name: "ResourceItem",
  mixins: [dateFormatter],
  props: {
    resource: {
      type: Object,
      required: true,
    },
    canEdit: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    ...mapGetters(["isAuthenticated"]),
  },
  methods: {
    setContent(content) {
      this.wysiwyg = new Quill(this.$refs.wysiwyg, {
        readOnly: true,
        theme: "snow",
        modules: {
          toolbar: false,
        },
      });
      this.wysiwyg.setContents(this.wysiwyg.clipboard.convert(content));
    },
  },
  mounted() {
    this.setContent(this.resource.content);
  },
  // watch for changes in the resource content
  watch: {
    resource: {
      handler() {
        this.setContent(this.resource.content);
      },
      deep: true,
    },
  },
  components: {
    ResourceActionsButton,
    UserIdentifier,

    CommentResourceButton,
    ShareResourceButton,
    LikeResourceButton,
    ExploitResourceButton,
    SaveResourceButton,
    ConsultResourceButton,
  },
};
</script>

<style lang="scss">
.wysiwyg {
  .ql-container {
    border: none !important;
  }
  .ql-editor {
    padding: 0 !important;
  }
}
</style>