<template>
  <button
    type="button"
    class="btn btn-primary"
    @click="showAddResourceModal('addResourceModal')"
    data-bs-toggle="modal"
    data-bs-target="#modalDialog"
  >
    {{ $t("resources.create") }}
  </button>
</template>

<script>
import { showModal } from "@/services/modals";

import ResourceEdit from "@/components/resource/actions/ResourceEdit";

export default {
  name: "AddResource",
  methods: {
    showAddResourceModal() {
      showModal(
        this.$t("resources.create"),
        ResourceEdit,
        { edit: false },
        true
      );
    },
  },
};
</script>