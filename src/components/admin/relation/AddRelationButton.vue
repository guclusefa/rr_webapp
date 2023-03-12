<template>
  <button
    type="button"
    class="btn btn-primary"
    @click="showAddRelationModal('addRelationModal')"
    data-bs-toggle="modal"
    data-bs-target="#modalDialog"
  >
    <i class="bi bi-file-earmark-plus"></i>
    {{ $t("relations.create") }}
  </button>
</template>

<script>
import { showModal } from "@/services/modals";

import RelationEdit from "@/components/admin/relation/actions/RelationEdit";

export default {
  name: "AddRelation",
  methods: {
    showAddRelationModal() {
      showModal(this.$t("relations.create"), RelationEdit, { edit: false });
    },
  },
};
</script>