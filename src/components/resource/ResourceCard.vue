<template>
  <div class="card">
    <template v-if="resource.media">
      <video
        :src="resource.media"
        controls
        v-if="resource.media.includes('.mp4')"
      />
      <img :src="resource.media" class="card-img-top" v-else />
    </template>
    <template v-else>
      <img src="@/assets/images/resource/default.png" class="card-img-top" />
    </template>
    <div class="card-body">
      <div class="row">
        <div class="col">
          <h5 class="card-title" v-if="resource.title">
            <router-link :to="{ name: 'resource', params: { id: resource.id } }"
              >{{ resource.title }}
            </router-link>
          </h5>
        </div>
        <div class="col" v-if="canEdit()">
          <div class="float-end">
            <ResourceActionsButton :resource="resource" />
          </div>
        </div>
      </div>
      <p class="card-text" v-if="resource.isVerified">
        <span class="badge bg-success">
          {{ $t("resource.verified") }}
        </span>
      </p>
      <p class="card-text" v-if="resource.visibility">
        <span class="badge bg-danger me-2" v-if="!resource.isPublished">
          {{ $t(`resource.draft`) }}
        </span>
        <span class="badge bg-secondary me-2">
          {{ $t(`resources.visibilities.${resource.visibility}`) }}
        </span>
        <span class="badge bg-success me-1" v-if="resource.isVerified">
          {{ $t("resource.verified") }}
        </span>
        <span class="badge bg-warning me-1" v-else>
          {{ $t("resource.unverified") }}
        </span>
      </p>
      <p class="card-text" v-if="resource.relation">
        <span class="badge bg-primary">
          {{ resource.relation.name }}
        </span>
      </p>
      <p class="card-text" v-if="resource.categories">
        <span
          class="badge bg-secondary me-2"
          v-for="category in resource.categories"
          :key="category.id"
        >
          {{ category.name }}
        </span>
      </p>
      <p class="card-text" v-if="resource.content">
        {{ resource.content }}
      </p>
      <p class="card-text" v-if="resource.author">
        <UserIdentifier :user="resource.author" />
      </p>
      <p class="card-text" v-if="resource.createdAt">
        <span class="text-muted pb-1">
          {{
            $t(`resources.published_days_ago`, {
              days: getDays(resource.createdAt),
            })
          }}
        </span>
      </p>
    </div>
    <div class="card-footer">
      <div class="d-flex justify-content-between">
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
          <i class="bi bi-bar-chart-fill me-1" v-if="resource.isConsulted"></i>
          <i class="bi bi-bar-chart me-1" v-else></i>
          {{ resource.consults }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import dateFormatter from "@/mixins/dateFormatter";

import UserIdentifier from "../user/UserIdentifier.vue";

import ResourceActionsButton from "@/components/resource/ResourceActionsButton.vue";
import ShareResourceButton from "@/components/resource/ShareResourceButton.vue";
import LikeResourceButton from "@/components/resource/LikeResourceButton.vue";
import ExploitResourceButton from "@/components/resource/ExploitResourceButton.vue";
import SaveResourceButton from "@/components/resource/SaveResourceButton.vue";

export default {
  name: "ResourceCard",
  mixins: [dateFormatter],
  props: {
    resource: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters(["user"]),
  },
  methods: {
    isOwner() {
      return this.resource.author.id === this.user.id;
    },
    canEdit() {
      return this.isOwner();
    },
  },
  components: {
    UserIdentifier,

    ResourceActionsButton,
    ShareResourceButton,
    LikeResourceButton,
    ExploitResourceButton,
    SaveResourceButton,
  },
};
</script>