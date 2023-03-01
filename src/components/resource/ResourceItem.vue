<template>
  <div class="row">
    <div class="col-12 col-md-4 col-lg-3">
      <template v-if="resource.media">
        <img
          :src="resource.media"
          class="img-fluid rounded"
          v-if="!resource.media.includes('.mp4')"
        />
        <video
          :src="resource.media"
          class="img-fluid rounded"
          v-else
          controls
        />
      </template>
      <template v-else>
        <img
          src="@/assets/images/resource/default.png"
          class="img-fluid rounded"
        />
      </template>
    </div>
    <div class="col-12 col-md-8 col-lg-9">
      <div class="row pt-3 pt-md-0">
        <div class="col">
          <div class="text-strong pb-1" v-if="resource.title">
            {{ resource.title }}
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
            <span class="badge bg-primary me-1" v-if="resource.relation">
              {{ resource.relation.name }}
            </span>
          </div>
          <div class="text-muted pb-1" v-if="resource.categories">
            <span
              class="badge bg-secondary me-1"
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
      <div class="row mt-auto">
        <div class="text-muted">
          <div class="d-flex">
            <button class="btn btn-sm">
              <i
                class="bi bi-chat-fill text-primary me-1"
                v-if="resource.isCommented"
              ></i>
              <i class="bi bi-chat me-1" v-else></i>
              {{ resource.comments }}
            </button>
            <ShareResourceButton :resource="resource" />
            <LikeResourceButton :resource="resource" />
            <ExploitResourceButton :resource="resource" />
            <SaveResourceButton :resource="resource" />
            <button class="btn btn-sm">
              <i
                class="bi bi-bar-chart-fill me-1"
                v-if="resource.isConsulted"
              ></i>
              <i class="bi bi-bar-chart me-1" v-else></i>
              {{ resource.consults }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dateFormatter from "@/mixins/dateFormatter";

import UserIdentifier from "@/components/user/UserIdentifier";

import ShareResourceButton from "@/components/resource/ShareResourceButton.vue";
import LikeResourceButton from "@/components/resource/LikeResourceButton.vue";
import ExploitResourceButton from "@/components/resource/ExploitResourceButton.vue";
import SaveResourceButton from "@/components/resource/SaveResourceButton.vue";

export default {
  name: "ResourceItem",
  mixins: [dateFormatter],
  props: {
    resource: {
      type: Object,
      required: true,
    },
  },
  components: {
    UserIdentifier,

    ShareResourceButton,
    LikeResourceButton,
    ExploitResourceButton,
    SaveResourceButton,
  },
};
</script>