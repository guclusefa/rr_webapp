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
import { mapGetters } from "vuex";

export default {
  name: "SubmitButton",
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
  computed: {
    ...mapGetters(["loading"]),
    disabledButton() {
      return this.disabled || this.loading;
    },
  },
};
</script>