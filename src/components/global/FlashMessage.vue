<template>
  <div
    class="container"
    v-if="flashMessage.messages && flashMessage.messages.length"
  >
    <div class="row">
      <div class="col">
        <div class="alert alert-danger" role="alert">
          <template v-for="message in flashMessage.messages" :key="message">
            {{ message }}
            <br />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "FlashMessage",
  computed: {
    ...mapGetters(["flashMessage"]),
  },
  watch: {
    $route() {
      this.$store.dispatch("clearFlashMessage");
    },
  },
};
</script>
