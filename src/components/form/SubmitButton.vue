<template>
  <button type="submit" class="btn btn-primary" :disabled="loading">
    <template v-if="loading">
      <span class="spinner-border spinner-border-sm"></span>
      {{ $t("app.loading") }}
    </template>
    <template v-else>
      {{ label }}
    </template>
  </button>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "SubmitButton",
  computed: {
    ...mapGetters(["loading"]),
  },
  props: {
    label: {
      type: String,
      required: true,
    },
  },
};
</script>