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
          @click="showBanActionsModal('editBanModal')"
          data-bs-toggle="modal"
          data-bs-target="#modalDialog"
        >
          {{ $t("ban.edit") }}
        </a>
      </li>
      <li>
        <a
          class="dropdown-item"
          href="#"
          @click="showBanActionsModal('deleteBanModal')"
          data-bs-toggle="modal"
          data-bs-target="#modalDialog"
        >
          {{ $t("ban.delete") }}</a
        >
      </li>
    </ul>
  </div>
</template>

<script>
import { showModal } from "@/services/modals";

import BanEdit from "@/components/admin/ban/actions/BanEdit";
import BanDelete from "@/components/admin/ban/actions/BanDelete";

export default {
  name: "BanActions",
  props: {
    ban: {
      type: Object,
      required: true,
    },
  },
  methods: {
    showBanActionsModal(type) {
      switch (type) {
        case "editBanModal":
          showModal(
            this.$t("ban.edit_title", { reason: this.ban.reason }),
            BanEdit,
            {
              ban: this.ban,
            }
          );
          break;
        case "deleteBanModal":
          showModal(
            this.$t("ban.delete_title", {
              reason: this.ban.reason,
            }),
            BanDelete,
            {
              ban: this.ban,
            }
          );
          break;
      }
    },
  },
};
</script>