<template>
  <button
    class="btn btn-primary"
    type="button"
    data-bs-toggle="offcanvas"
    data-bs-target="#offcanvasScrolling"
    @click="showUserFilterOffCanvas"
  >
    {{ $t("profiles.filter") }}
  </button>
</template>

<script>
import { showOffCanvas } from "@/services/offcanvas.js";

import UserFilters from "@/components/user/UserFilters.vue";

export default {
  name: "UserFilterButton",
  methods: {
    showUserFilterOffCanvas() {
      showOffCanvas(this.$t("profiles.filter"), UserFilters);
    },
  },
};
</script>