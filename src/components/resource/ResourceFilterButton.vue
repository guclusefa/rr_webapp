<template>
  <button
    class="btn btn-primary"
    type="button"
    data-bs-toggle="offcanvas"
    data-bs-target="#offcanvasScrolling"
    @click="showResourceFilterOffCanvas"
  >
    <i class="bi bi-funnel"></i>
    {{ $t("resources.filter") }}
  </button>
</template>

<script>
import { showOffCanvas } from "@/services/offcanvas.js";

import ResourceFilters from "@/components/resource/ResourceFilters.vue";

export default {
  name: "ResourceFilterButton",
  methods: {
    showResourceFilterOffCanvas() {
      showOffCanvas(this.$t("resources.filter"), ResourceFilters);
    },
  },
};
</script>