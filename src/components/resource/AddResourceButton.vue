<template>
  <button
    type="button"
    class="btn btn-primary"
    @click="showModal('addResourceModal')"
  >
    {{ $t("resources.create") }}
  </button>

  <ModalDialog
    :modal-id="'addResourceModal'"
    :modal-title="$t('resources.create')"
  >
    <template #body>
      <ResourceEdit :edit="false" @close="closeModal('addResourceModal')" />
    </template>
  </ModalDialog>
</template>

<script>
import { Modal } from "bootstrap";

import ModalDialog from "@/components/fragments/ModalDialog";
import ResourceEdit from "@/components/resource/actions/ResourceEdit";

export default {
  name: "AddResource",
  methods: {
    showModal(id) {
      const modal = new Modal(document.getElementById(id));
      modal.show();
    },
    closeModal(id) {
      document.getElementById(id).querySelector(".btn-close").click();
    },
  },
  components: {
    ModalDialog,
    ResourceEdit,
  },
};
</script>