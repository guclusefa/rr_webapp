<template>
  <p v-if="items.length > 0">
    {{ $t("app.showing", { end: meta.end, total: meta.total }) }}
  </p>
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
  },
};
</script>