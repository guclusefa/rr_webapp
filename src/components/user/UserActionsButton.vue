<template>
  <div class="dropdown">

      <i class="bi bi-three-dots-vertical cursor-pointer" data-bs-toggle="dropdown"></i>
 
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
      <template v-if="isAdmin">
        <li v-if="!profile.isCertified">
          <a
            class="dropdown-item"
            href="#"
            @click="showUserActionModal('certifyUserModal')"
            data-bs-toggle="modal"
            data-bs-target="#modalDialog"
          >
            {{ $t("profile.certify") }}
          </a>
        </li>
        <li v-else>
          <a
            class="dropdown-item"
            href="#"
            @click="showUserActionModal('uncertifyUserModal')"
            data-bs-toggle="modal"
            data-bs-target="#modalDialog"
          >
            {{ $t("profile.uncertify") }}
          </a>
        </li>
        <li v-if="isSuperAdmin">
          <a
            class="dropdown-item"
            href="#"
            @click="showUserActionModal('promoteUserModal')"
            data-bs-toggle="modal"
            data-bs-target="#modalDialog"
          >
            {{ $t("profile.promote") }}
          </a>
        </li>
        <li v-if="!isProfileSuperAdmin">
          <a
            class="dropdown-item"
            href="#"
            @click="showUserActionModal('banUserModal')"
            data-bs-toggle="modal"
            data-bs-target="#modalDialog"
          >
            {{ $t("profile.ban") }}
          </a>
        </li>
      </template>
      <li>
        <a
          class="dropdown-item text-danger fw-bold"
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
import { mapGetters } from "vuex";

import { showModal } from "@/services/modals";

import UserEdit from "@/components/user/actions/UserEdit";
import UserEditPhoto from "@/components/user/actions/UserEditPhoto";
import UserEditPassword from "@/components/user/actions/UserEditPassword";
import UserEditEmail from "@/components/user/actions/UserEditEmail";
import UserConfirm from "@/components/user/actions/UserConfirm";
import UserCertify from "@/components/user/actions/UserCertify";
import UserPromote from "@/components/user/actions/UserPromote";
import BanEdit from "@/components/admin/ban/actions/BanEdit.vue";
import UserDelete from "@/components/user/actions/UserDelete";

export default {
  name: "UserActions",
  props: {
    profile: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters(["isAdmin", "isSuperAdmin"]),
    isProfileSuperAdmin() {
      return this.profile.roles[0] == "ROLE_SUPER_ADMIN";
    },
  },
  methods: {
    showUserActionModal(type) {
      switch (type) {
        case "editUserModal":
          showModal(
            this.$t("profile.edit_title", { username: this.profile.username }),
            UserEdit,
            { profile: this.profile }
          );
          break;
        case "editUserPhotoModal":
          showModal(
            this.$t("profile.edit_photo_title", {
              username: this.profile.username,
            }),
            UserEditPhoto,
            { profile: this.profile }
          );
          break;
        case "editUserPasswordModal":
          showModal(
            this.$t("profile.edit_password_title", {
              username: this.profile.username,
            }),
            UserEditPassword,
            { profile: this.profile }
          );
          break;
        case "editUserEmailModal":
          showModal(
            this.$t("profile.edit_email_title", {
              username: this.profile.username,
            }),
            UserEditEmail,
            { profile: this.profile }
          );
          break;
        case "confirmUserModal":
          showModal(
            this.$t("profile.verify_email_title", {
              username: this.profile.username,
            }),
            UserConfirm,
            { profile: this.profile }
          );
          break;
        case "certifyUserModal":
          showModal(
            this.$t("profile.certify_title", {
              username: this.profile.username,
            }),
            UserCertify,
            { profile: this.profile }
          );
          break;
        case "uncertifyUserModal":
          showModal(
            this.$t("profile.uncertify_title", {
              username: this.profile.username,
            }),
            UserCertify,
            { profile: this.profile, uncertify: true }
          );
          break;
        case "promoteUserModal":
          showModal(
            this.$t("profile.promote_title", {
              username: this.profile.username,
            }),
            UserPromote,
            { profile: this.profile }
          );
          break;
        case "banUserModal":
          showModal(
            this.$t("profile.ban_title", {
              username: this.profile.username,
            }),
            BanEdit,
            { profile: this.profile, edit: false }
          );
          break;
        case "deleteUserModal":
          showModal(
            this.$t("profile.delete_title", {
              username: this.profile.username,
            }),
            UserDelete,
            { profile: this.profile }
          );
          break;
        default:
          break;
      }
    },
  },
};
</script>