<template>
  <div class="dropdown">
    <i
      class="bi bi-three-dots-vertical cursor-pointer"
      data-bs-toggle="dropdown"
    ></i>
    <ul class="dropdown-menu dropdown-menu-end">
      <li>
        <a
          class="dropdown-item"
          href="#"
          @click="showCategoryActionsModal('editCategoryModal')"
          data-bs-toggle="modal"
          data-bs-target="#modalDialog"
        >
          {{ $t("category.edit") }}
        </a>
      </li>
      <li>
        <a
          class="dropdown-item"
          href="#"
          @click="showCategoryActionsModal('deleteCategoryModal')"
          data-bs-toggle="modal"
          data-bs-target="#modalDialog"
        >
          {{ $t("category.delete") }}</a
        >
      </li>
    </ul>
  </div>
</template>

<script>
import { showModal } from "@/services/modals";

import CategoryEdit from "@/components/admin/category/actions/CategoryEdit";
import CategoryDelete from "@/components/admin/category/actions/CategoryDelete";

export default {
  name: "CategoryActions",
  props: {
    category: {
      type: Object,
      required: true,
    },
  },
  methods: {
    showCategoryActionsModal(type) {
      switch (type) {
        case "editCategoryModal":
          showModal(
            this.$t("category.edit_title", { name: this.category.name }),
            CategoryEdit,
            {
              category: this.category,
            }
          );
          break;
        case "deleteCategoryModal":
          showModal(
            this.$t("category.delete_title", {
              name: this.category.name,
            }),
            CategoryDelete,
            {
              category: this.category,
            }
          );
          break;
      }
    },
  },
};
</script>