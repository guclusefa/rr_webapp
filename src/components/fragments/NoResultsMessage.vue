<template>
  <div class="alert alert-info" role="alert" v-if="noResults">
    {{ $t("app.no_results") }}
  </div>
</template>

<script>
export default {
  name: "NoResultsMessage",
  props: {
    noResults: {
      type: Boolean,
      required: true,
    },
  },
};
</script>