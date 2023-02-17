<template>
  <button type="submit" class="btn btn-primary" :disabled="disabledButton">
    <template v-if="loading">
      <span class="spinner-border spinner-border-sm"></span>
      {{ $t("app.loading") }}
    </template>
    <template v-else>
      {{ $t(label) }}
    </template>
  </button>
</template>

<script>
export default {
  name: "SubmitButton",
  computed: {
    disabledButton() {
      return this.disabled || this.loading;
    },
    loading() {
      return this.$store.getters["loading"];
    },
  },
  props: {
    label: {
      type: String,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>