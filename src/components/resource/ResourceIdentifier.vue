<template>
  <div>
    <img
      :src="resource.media"
      class="img-fluid rounded me-2"
      width="30"
      height="30"
      v-if="resource.media && !resource.media.endsWith('mp4') && !resource.media.endsWith('mp3')"
    />
    <img
      src="@/assets/images/resource/default.png"
      class="img-fluid rounded me-2"
      width="30"
      height="30"
      v-else
    />
    <router-link :to="{ name: 'resource', params: { id: resource.id } }"
      >{{ resource.title }}
    </router-link>
    <span v-if="resource.isVerified">
      <i class="bi bi-patch-check-fill ms-1"></i>
    </span>
  </div>
</template>

<script>
export default {
  name: "ResourceIdentifier",
  props: {
    resource: {
      type: Object,
      required: true,
    },
  },
};
</script>