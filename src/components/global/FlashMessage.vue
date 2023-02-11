<template>
  <div class="container" v-if="flashMessage.message">
    <div class="row">
      <div class="col">
        <div
          class="alert alert-danger"
          role="alert"
          v-if="flashMessage.type === 'error'"
        >
          {{ flashMessage.message }}
        </div>
        <div
          class="alert alert-success"
          role="alert"
          v-if="flashMessage.type === 'success'"
        >
          {{ flashMessage.message }}
        </div>
      </div>
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
};
 
</script>