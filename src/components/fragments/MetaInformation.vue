<template>
  <div class="row">
    <div class="col">
      <p v-if="items.length > 0">
        {{ $t("app.showing", { end: meta.end, total: meta.total }) }}
      </p>
      <p v-else-if="!isLoading">{{ $t("app.no_results") }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
    meta: {
      type: Object,
      required: true,
    },
    isLoading: {
      type: Boolean,
      required: true,
    },
  },
};
</script>