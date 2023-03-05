<template>
  <button class="btn btn-sm" @click="redirect">
    <i
      class="bi bi-chat-fill text-primary me-1"
      v-if="resource.isCommented"
    ></i>
    <i class="bi bi-chat me-1" v-else></i>
    {{ resource.comments }}
  </button>
</template>

<script>
export default {
  name: "CommentResourceButton",
  props: {
    resource: {
      type: Object,
      required: true,
    },
  },
  methods: {
    redirect() {
      this.$router.push({
        name: "resource",
        params: { id: this.resource.id },
      });
    },
  },
};
</script>