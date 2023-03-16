<template>
  <div class="d-flex align-items-center gap-1">
    <div>
      <button class="btn btn-sm" @click="redirect">
        <i
          class="bi bi-chat-fill text-primary me-1"
          v-if="resource.isCommented"
        ></i>
        <i class="bi bi-chat me-1 dark-txt-white" v-else></i>
      </button>
    </div>
    <div :class="resource.isCommented ? 'text-primary' : ''">
      {{ resource.comments }}
    </div>
  </div>
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

<style scoped>
.btn:disabled {
  outline: none;
  border-color: transparent !important;
}
.btn {
  padding: 0;
}
</style>