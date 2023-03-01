<template>
  <div class="card">
    <template v-if="resource.media">
      <div
        class="embed-responsive embed-responsive-1by1"
        v-if="resource.media.includes('.mp4')"
      >
        <iframe
          class="embed-responsive-item img-fluid"
          :src="resource.media"
          allowfullscreen
        ></iframe>
      </div>
      <img :src="resource.media" class="card-img-top" v-else />
    </template>
    <template v-else>
      <img src="@/assets/images/resource/default.png" class="card-img-top" />
    </template>
    <div class="card-body">
      <h5 class="card-title" v-if="resource.title">
        <router-link :to="{ name: 'resource', params: { id: resource.id } }"
          >{{ resource.title }}
        </router-link>
      </h5>
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
        <div><i class="bi bi-chat me-1"></i>{{ resource.comments }}</div>
        <div><i class="bi bi-repeat me-1"></i>{{ resource.shares }}</div>
        <div><i class="bi bi-heart me-1"></i>{{ resource.likes }}</div>
        <div><i class="bi bi-bar-chart me-1"></i>{{ resource.consults }}</div>
      </div>
    </div>
    <div class="card-footer">
      <div class="d-flex justify-content-end gap-2">
        <div><i class="bi bi-award me-1"></i>{{ resource.exploits }}</div>
        <div><i class="bi bi-bookmark me-1"></i>{{ resource.saves }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import dateFormatter from "@/mixins/dateFormatter";

import UserIdentifier from "../user/UserIdentifier.vue";

export default {
  name: "ResourceCard",
  mixins: [dateFormatter],
  props: {
    resource: {
      type: Object,
      required: true,
    },
  },
  components: {
    UserIdentifier,
  },
};
</script>