<template>
  <button
    type="button"
    class="btn btn-primary"
    @click="showAddCategoryModal('addCategoryModal')"
    data-bs-toggle="modal"
    data-bs-target="#modalDialog"
  >
    <i class="bi bi-file-earmark-plus"></i>
    {{ $t("categories.create") }}
  </button>
</template>

<script>
import { showModal } from "@/services/modals";

import CategoryEdit from "@/components/admin/category/actions/CategoryEdit";

export default {
  name: "AddCategory",
  methods: {
    showAddCategoryModal() {
      showModal(this.$t("categories.create"), CategoryEdit, { edit: false });
    },
  },
};
</script>