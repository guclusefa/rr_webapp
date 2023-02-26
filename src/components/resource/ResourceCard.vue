<template>
  <div class="card">
    <template v-if="resource.media">
      <img :src="resource.media" class="card-img-top" />
    </template>
    <template v-else>
      <img src="@/assets/images/resource/default.png" class="card-img-top" />
    </template>
    <div class="card-body">
      <h5 class="card-title" v-if="resource.title">
        {{ resource.title }}
      </h5>
      <p class="card-text" v-if="resource.content">
        {{ resource.content }}
      </p>
      <p class="card-text" v-if="resource.createdAt && resource.author">
        <span class="text-muted pb-1">
          {{
            $t(`resources.created_at_by`, {
              createdAt: formatDate(resource.createdAt),
              days: getDays(resource.createdAt),
              author: resource.author.username,
            })
          }}
        </span>
      </p>
    </div>
  </div>
</template>

<script>
import dateFormatter from "@/mixins/dateFormatter";

export default {
  name: "ResourceCard",
  mixins: [dateFormatter],
  props: {
    resource: {
      type: Object,
      required: true,
    },
  },
};
</script>