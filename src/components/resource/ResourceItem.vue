<template>
  <!-- Side -->
  <div class="col-12 border position-relative">
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
            {{ $t("resource.verified") }}
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
</template>

<script>
import dateFormatter from "@/mixins/dateFormatter";

import UserIdentifier from "@/components/user/UserIdentifier";

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
  },
};
</script>