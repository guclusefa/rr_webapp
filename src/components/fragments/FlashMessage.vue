<template>
  <div class="container" v-if="flashMessage.message">
    <div :class="flashMessage.type == 'success' ? 'alert alert-success' : 'alert alert-danger'" role="alert">
      {{ flashMessage.message }}
    </div>
  </div>
</template>

<script>
export default {
  name: "FlashMessage",
  computed: {
    flashMessage() {
      return this.$store.getters.flashMessage;
    },
  },
  // clear on route change
  created() {
    this.$router.afterEach(() => {
      this.$store.commit("clearFlashMessage");
    });
  },
};
</script>