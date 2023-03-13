<template>
  <div class="card">
    <template v-if="resource.media">
      <video
        :src="resource.media"
        controls
        v-if="resource.media.includes('.mp4')"
      />
      <router-link
        :to="{ name: 'resource', params: { id: resource.id } }"
        v-else
      >
        <img :src="resource.media" class="card-img-top" />
      </router-link>
    </template>
    <template v-else>
      <router-link :to="{ name: 'resource', params: { id: resource.id } }">
        <img src="@/assets/images/resource/default.png" class="card-img-top" />
      </router-link>
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
      <!--       <p class="card-text" v-if="resource.content">
        {{ resource.content }}
      </p> -->
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
        <CommentResourceButton :resource="resource" />
        <ShareResourceButton :resource="resource" />
        <LikeResourceButton :resource="resource" />
        <ExploitResourceButton :resource="resource" />
        <ConsultResourceButton :resource="resource" />
        <SaveResourceButton :resource="resource" v-if="isAuthenticated" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import dateFormatter from "@/mixins/dateFormatter";

import UserIdentifier from "../user/UserIdentifier.vue";

import ResourceActionsButton from "@/components/resource/ResourceActionsButton.vue";
import CommentResourceButton from "@/components/resource/CommentResourceButton.vue";
import ShareResourceButton from "@/components/resource/ShareResourceButton.vue";
import LikeResourceButton from "@/components/resource/LikeResourceButton.vue";
import ExploitResourceButton from "@/components/resource/ExploitResourceButton.vue";
import SaveResourceButton from "@/components/resource/SaveResourceButton.vue";
import ConsultResourceButton from "@/components/resource/ConsultResourceButton.vue";

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
    ...mapGetters(["user", "isAuthenticated", "isModerator"]),
  },
  methods: {
    isOwner() {
      if (!this.user) {
        return false;
      }
      return this.resource.author.id === this.user.id;
    },
    canEdit() {
      return this.isOwner() || this.isModerator;
    },
  },
  components: {
    UserIdentifier,

    ResourceActionsButton,

    CommentResourceButton,
    ShareResourceButton,
    LikeResourceButton,
    ExploitResourceButton,
    SaveResourceButton,
    ConsultResourceButton,
  },
};
</script>