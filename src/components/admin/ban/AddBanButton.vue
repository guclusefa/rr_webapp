<template>
  <button
    type="button"
    class="btn btn-primary"
    @click="showAddBanModal('addBanModal')"
    data-bs-toggle="modal"
    data-bs-target="#modalDialog"
  >
    <i class="bi bi-hammer"></i>
    {{ $t("bans.create") }}
  </button>
</template>

<script>
import { showModal } from "@/services/modals";

import BanEdit from "@/components/admin/ban/actions/BanEdit";

export default {
  name: "AddBan",
  methods: {
    showAddBanModal() {
      showModal(this.$t("bans.create"), BanEdit, { edit: false });
    },
  },
};
</script>