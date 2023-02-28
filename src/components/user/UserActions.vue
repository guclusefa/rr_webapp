<template>
  <div class="dropdown">
    <button class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown">
      {{ $t("profile.actions") }}
    </button>
    <ul class="dropdown-menu dropdown-menu-end">
      <li>
        <a class="dropdown-item" href="#" @click="showModal('editUserModal')">
          {{ $t("profile.edit") }}
        </a>
      </li>
      <li>
        <a class="dropdown-item" href="#" @click="showModal('editUserPhotoModal')">
          {{ $t("profile.edit_photo") }}
        </a>
      </li>
      <li>
        <a class="dropdown-item" href="#" @click="showModal('editUserPasswordModal')">
          {{ $t("profile.edit_password") }}</a
        >
      </li>
      <li>
        <a class="dropdown-item" href="#" @click="showModal('editUserEmailModal')">
          {{ $t("profile.edit_email") }}</a
        >
      </li>
      <li v-if="!profile.isVerified">
        <a class="dropdown-item" href="#" @click="showModal('confirmUserModal')">
          {{ $t("profile.verify_email") }}</a
        >
      </li>
      <li>
        <a class="dropdown-item" href="#" @click="showModal('deleteUserModal')">
          {{ $t("profile.delete") }}</a
        >
      </li>
    </ul>
  </div>

  <!-- Modals -->
  <ModalDialog
    :modal-id="'editUserModal'"
    :modal-title="$t('profile.edit_title', { username: profile.username })"
  >
    <template #body>
      <UserEdit @close="closeModal('editUserModal')" />
    </template>
  </ModalDialog>

  <ModalDialog
    :modal-id="'editUserPhotoModal'"
    :modal-title="
      $t('profile.edit_photo_title', { username: profile.username })
    "
  >
    <template #body>
      <UserEditPhoto @close="closeModal('editUserPhotoModal')" />
    </template>
  </ModalDialog>

  <ModalDialog
    :modal-id="'editUserPasswordModal'"
    :modal-title="
      $t('profile.edit_password_title', { username: profile.username })
    "
  >
    <template #body>
      <UserEditPassword @close="closeModal('editUserPasswordModal')" />
    </template>
  </ModalDialog>

  <ModalDialog
    :modal-id="'editUserEmailModal'"
    :modal-title="
      $t('profile.edit_email_title', { username: profile.username })
    "
  >
    <template #body>
      <UserEditEmail @close="closeModal('editUserEmailModal')" />
    </template>
  </ModalDialog>

  <ModalDialog
    :modal-id="'confirmUserModal'"
    :modal-title="
      $t('profile.verify_email_title', { username: profile.username })
    "
  >
    <template #body>
      <UserConfirm @close="closeModal('confirmUserModal')" />
    </template>
  </ModalDialog>

  <ModalDialog
    :modal-id="'deleteUserModal'"
    :modal-title="$t('profile.delete_title', { username: profile.username })"
  >
    <template #body>
      <UserDelete @close="closeModal('deleteUserModal')" />
    </template>
  </ModalDialog>
</template>

<script>
import { Modal } from "bootstrap";

import ModalDialog from "@/components/fragments/ModalDialog";
import UserEdit from "@/components/user/actions/UserEdit";
import UserEditPhoto from "@/components/user/actions/UserEditPhoto";
import UserEditPassword from "@/components/user/actions/UserEditPassword";
import UserEditEmail from "@/components/user/actions/UserEditEmail";
import UserConfirm from "@/components/user/actions/UserConfirm";
import UserDelete from "@/components/user/actions/UserDelete";

export default {
  name: "UserActions",
  props: {
    profile: {
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
    UserEdit,
    UserEditPhoto,
    UserEditPassword,
    UserEditEmail,
    UserConfirm,
    UserDelete,
  },
};
</script>