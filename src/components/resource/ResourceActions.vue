<template>
  <div class="dropdown">
    <button class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown">
      {{ $t("resource.actions") }}
    </button>
    <ul class="dropdown-menu dropdown-menu-end">
      <li>
        <a
          class="dropdown-item"
          href="#"
          @click="showModal('editResourceModal')"
        >
          {{ $t("resource.edit") }}
        </a>
      </li>
      <li>
        <a
          class="dropdown-item"
          href="#"
          @click="showModal('editMediaResourceModal')"
        >
          {{ $t("resource.edit_media") }}
        </a>
      </li>
      <li>
        <a
          class="dropdown-item"
          href="#"
          @click="showModal('deleteResourceModal')"
        >
          {{ $t("resource.delete") }}</a
        >
      </li>
    </ul>
  </div>

  <ModalDialog
    :modal-id="'editResourceModal'"
    :modal-title="$t('resource.edit_title', { title: resource.title })"
  >
    <template #body>
      <ResourceEdit @close="closeModal('editResourceModal')" />
    </template>
  </ModalDialog>

  <ModalDialog
    :modal-id="'editMediaResourceModal'"
    :modal-title="$t('resource.edit_media_title', { title: resource.title })"
  >
    <template #body>
      <ResourceEditMedia @close="closeModal('editMediaResourceModal')" />
    </template>
  </ModalDialog>

  <ModalDialog
    :modal-id="'deleteResourceModal'"
    :modal-title="$t('resource.delete_title', { title: resource.title })"
  >
    <template #body>
      <ResourceDelete @close="closeModal('deleteResourceModal')" />
    </template>
  </ModalDialog>
</template>

<script>
import { Modal } from "bootstrap";

import ModalDialog from "@/components/fragments/ModalDialog";
import ResourceEdit from "@/components/resource/actions/ResourceEdit";
import ResourceEditMedia from "@/components/resource/actions/ResourceEditMedia";
import ResourceDelete from "@/components/resource/actions/ResourceDelete";

export default {
  name: "ResourceActions",
  props: {
    resource: {
      type: Object,
      required: true,
    },
  },
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
    ResourceEditMedia,
    ResourceDelete,
  },
};
</script>