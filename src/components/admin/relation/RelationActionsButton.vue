<template>
  <div class="dropdown">
    <button class="btn btn-primary" data-bs-toggle="dropdown">
      <i class="bi bi-three-dots-vertical"></i>
    </button>
    <ul class="dropdown-menu dropdown-menu-end">
      <li>
        <a
          class="dropdown-item"
          href="#"
          @click="showRelationActionsModal('editRelationModal')"
          data-bs-toggle="modal"
          data-bs-target="#modalDialog"
        >
          {{ $t("relation.edit") }}
        </a>
      </li>
      <li>
        <a
          class="dropdown-item"
          href="#"
          @click="showRelationActionsModal('deleteRelationModal')"
          data-bs-toggle="modal"
          data-bs-target="#modalDialog"
        >
          {{ $t("relation.delete") }}</a
        >
      </li>
    </ul>
  </div>
</template>

<script>
import { showModal } from "@/services/modals";

import RelationEdit from "@/components/admin/relation/actions/RelationEdit";
import RelationDelete from "@/components/admin/relation/actions/RelationDelete";

export default {
  name: "RelationActions",
  props: {
    relation: {
      type: Object,
      required: true,
    },
  },
  methods: {
    showRelationActionsModal(type) {
      switch (type) {
        case "editRelationModal":
          showModal(
            this.$t("relation.edit_title", { name: this.relation.name }),
            RelationEdit,
            {
              relation: this.relation,
            }
          );
          break;
        case "deleteRelationModal":
          showModal(
            this.$t("relation.delete_title", {
              name: this.relation.name,
            }),
            RelationDelete,
            {
              relation: this.relation,
            }
          );
          break;
      }
    },
  },
};
</script>