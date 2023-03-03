<template>
  <div class="dropdown">
    <button class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown">
      {{ $t("profile.actions") }}
    </button>
    <ul class="dropdown-menu dropdown-menu-end">
      <li>
        <a
          class="dropdown-item"
          href="#"
          @click="showUserActionModal('editUserModal')"
          data-bs-toggle="modal"
          data-bs-target="#modalDialog"
        >
          {{ $t("profile.edit") }}
        </a>
      </li>
      <li>
        <a
          class="dropdown-item"
          href="#"
          @click="showUserActionModal('editUserPhotoModal')"
          data-bs-toggle="modal"
          data-bs-target="#modalDialog"
        >
          {{ $t("profile.edit_photo") }}
        </a>
      </li>
      <li>
        <a
          class="dropdown-item"
          href="#"
          @click="showUserActionModal('editUserPasswordModal')"
          data-bs-toggle="modal"
          data-bs-target="#modalDialog"
        >
          {{ $t("profile.edit_password") }}</a
        >
      </li>
      <li>
        <a
          class="dropdown-item"
          href="#"
          @click="showUserActionModal('editUserEmailModal')"
          data-bs-toggle="modal"
          data-bs-target="#modalDialog"
        >
          {{ $t("profile.edit_email") }}</a
        >
      </li>
      <li v-if="!profile.isVerified">
        <a
          class="dropdown-item"
          href="#"
          @click="showUserActionModal('confirmUserModal')"
          data-bs-toggle="modal"
          data-bs-target="#modalDialog"
        >
          {{ $t("profile.verify_email") }}</a
        >
      </li>
      <li>
        <a
          class="dropdown-item"
          href="#"
          @click="showUserActionModal('deleteUserModal')"
          data-bs-toggle="modal"
          data-bs-target="#modalDialog"
        >
          {{ $t("profile.delete") }}</a
        >
      </li>
    </ul>
  </div>
</template>

<script>
import { showModal } from "@/services/modals";

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
    showUserActionModal(type) {
      switch (type) {
        case "editUserModal":
          showModal(
            this.$t("profile.edit_title", { username: this.profile.username }),
            UserEdit
          );
          break;
        case "editUserPhotoModal":
          showModal(
            this.$t("profile.edit_photo_title", {
              username: this.profile.username,
            }),
            UserEditPhoto
          );
          break;
        case "editUserPasswordModal":
          showModal(
            this.$t("profile.edit_password_title", {
              username: this.profile.username,
            }),
            UserEditPassword
          );
          break;
        case "editUserEmailModal":
          showModal(
            this.$t("profile.edit_email_title", {
              username: this.profile.username,
            }),
            UserEditEmail
          );
          break;
        case "confirmUserModal":
          showModal(
            this.$t("profile.verify_email_title", {
              username: this.profile.username,
            }),
            UserConfirm
          );
          break;
        case "deleteUserModal":
          showModal(
            this.$t("profile.delete_title", {
              username: this.profile.username,
            }),
            UserDelete
          );
          break;
        default:
          break;
      }
    },
  },
};
</script>