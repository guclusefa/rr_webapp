<template>
  <button type="submit" class="btn btn-primary" :disabled="isLoading">
    <template v-if="isLoading">
      <span class="spinner-border spinner-border-sm"></span>
      {{ $t("app.loading") }}
    </template>
    <template v-else>
      {{ label }}
    </template>
  </button>
</template>

<script>
export default {
  name: "SubmitButton",
  props: {
    label: {
      type: String,
      required: true,
    },
  },
  computed: {
    isLoading() {
      return this.$store.getters["isLoading"];
    },
  },
};
</script>