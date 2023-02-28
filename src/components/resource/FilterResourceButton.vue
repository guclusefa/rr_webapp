<template>
  <OffCanvasButton :label="'resources.filter'" :classes="'btn btn-primary'" />
  <OffCanvas title="resources.filter">
    <template #body>
      <ResourceFilters :isProfile="isProfile" />
    </template>
  </OffCanvas>
</template>

<script>
import OffCanvasButton from "@/components/fragments/OffCanvasButton.vue";
import OffCanvas from "@/components/fragments/OffCanvas.vue";
import ResourceFilters from "@/components/resource/ResourceFilters.vue";

export default {
  name: "FilterResourceButton",
  props: {
    isProfile: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    OffCanvasButton,
    OffCanvas,
    ResourceFilters,
  },
};
</script>