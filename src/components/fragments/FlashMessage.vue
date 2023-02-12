<template>
  <div class="container" v-if="flashMessage.message">
    <div :class="flashMessage.type == 'success' ? 'alert alert-success' : 'alert alert-danger'" role="alert">
      {{ flashMessage.message }}
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "FlashMessage",
  computed: {
    ...mapGetters(["flashMessage"]),
  },
  watch: {
    $route() {
      if (!this.flashMessage.redirect) {
        mapActions(["clearFlashMessage"]);
      } else {
        this.flashMessage.redirect = false;
      }
    },
  },
};
</script>