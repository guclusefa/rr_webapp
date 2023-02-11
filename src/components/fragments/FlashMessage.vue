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
  watch: {
    $route() {
      if (!this.flashMessage.redirect) {
        this.$store.commit("clearFlashMessage");
      } else {
        this.flashMessage.redirect = false;
      }
    },
  },
};
</script>