<template>
  <div class="row">
    <div class="col text-center">
      <p v-if="items.length > 0">
        {{ $t("app.showing", { end: meta.end, total: meta.total }) }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "MetaInformation",
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