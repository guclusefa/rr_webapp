<template>
  <!-- Side -->
  <div class="col-lg-12 col-xl-6 border position-relative">
    <div class="dropdown position-absolute top-0 end-0 m-2" v-if="canEdit">
      <button class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown">
        {{ $t("profile.actions") }}
      </button>
      <ul class="dropdown-menu dropdown-menu-end">
        <li>
          <a class="dropdown-item" href="#" @click="showEditModal('edit')">
            {{ $t("profile.edit") }}
          </a>
        </li>
        <li>
          <a class="dropdown-item" href="#" @click="showEditModal('photo')">
            {{ $t("profile.edit_photo") }}
          </a>
        </li>
        <li>
          <a class="dropdown-item" href="#">
            {{ $t("profile.edit_password") }}</a
          >
        </li>
        <li>
          <a class="dropdown-item" href="#">{{ $t("profile.edit_email") }}</a>
        </li>
        <li v-if="!profile.isVerified">
          <a class="dropdown-item" href="#">{{ $t("profile.verify_email") }}</a>
        </li>
        <li>
          <a class="dropdown-item" href="#">{{ $t("profile.delete") }}</a>
        </li>
      </ul>
    </div>
    <div class="row d-flex align-items-center">
      <div class="col-4">
        <template v-if="profile.photo">
          <img :src="profile.photo" class="img-fluid" />
        </template>
        <template v-else>
          <img src="@/assets/images/user/default.jpg" class="img-fluid" />
        </template>
      </div>
      <div class="col-8 p-2">
        <div class="text-strong pb-1" v-if="profile.username">
          @{{ profile.username }}
          <span class="badge bg-primary ms-1" v-if="profile.isCertified">
            {{ $t("user.certified") }}
          </span>
          <span class="badge bg-success ms-1" v-if="profile.isVerified">
            {{ $t("user.verified") }}
          </span>
        </div>
        <div class="text-muted pb-1" v-if="profile.roles[0] || profile.gender">
          <span class="badge bg-dark" v-if="profile.roles[0]">
            {{ $t(`user.roles.${profile.roles[0]}`) }}
          </span>
          <span class="badge bg-secondary ms-1" v-if="profile.gender">
            {{ $t(`user.genders.${profile.gender}`) }}
          </span>
          <span class="badge bg-info ms-1" v-if="profile.state">
            {{ profile.state.name }}
          </span>
        </div>
        <div class="text-muted pb-1" v-if="profile.email">
          {{ profile.email }}
        </div>
        <div
          class="text-muted pb-1"
          v-if="profile.firstName || profile.lastName"
        >
          <template v-if="profile.firstName">{{ profile.firstName }}</template>
          <template v-if="profile.lastName">{{
            " " + profile.lastName
          }}</template>
        </div>
        <div class="text-muted pb-1" v-if="profile.bio">{{ profile.bio }}</div>
        <div class="text-muted pb-1" v-if="profile.birthDate">
          {{
            $t(`user.age`, {
              birthDate: formatDate(profile.birthDate),
              age: getAge(profile.birthDate),
            })
          }}
        </div>
        <div class="text-muted pb-1" v-if="profile.createdAt">
          {{
            $t(`user.member_since`, {
              createdAt: formatDate(profile.createdAt),
              days: getDays(profile.createdAt),
            })
          }}
        </div>
      </div>
    </div>
  </div>
  <!-- Edit -->
  <ModalDialog ref="editModal" :title="modalTitle">
    <template #body>
      <component :is="modalComponent" @close="closeEditModal" />
    </template>
  </ModalDialog>
</template>

<script>
import { mapGetters } from "vuex";
import dateFormatter from "@/mixins/dateFormatter";

import ModalDialog from "@/components/fragments/ModalDialog";
import UserEdit from "@/components/user/UserEdit";
import UserEditPhoto from "@/components/user/UserEditPhoto";

export default {
  name: "UserProfile",
  mixins: [dateFormatter],
  data() {
    return {
      modalType: null,
    };
  },
  computed: {
    // get profile
    ...mapGetters(["profile", "user"]),
    canEdit() {
      return this.profile.id === this.user.id;
    },
    // modal title
    modalTitle() {
      switch (this.modalType) {
        case "edit":
          return this.$t("profile.edit_title", {
            username: this.profile.username,
          });
        case "photo":
          return this.$t("profile.edit_photo_title", {
            username: this.profile.username,
          });
        default:
          return "";
      }
    },
    // modal component
    modalComponent() {
      switch (this.modalType) {
        case "edit":
          return UserEdit;
        case "photo":
          return UserEditPhoto;
        default:
          return null;
      }
    },
  },
  methods: {
    showEditModal(type) {
      this.modalType = type;
      this.$refs.editModal.show();
    },
    closeEditModal() {
      this.$refs.editModal.close();
    },
  },
  components: {
    ModalDialog,
    UserEdit,
    UserEditPhoto,
  },
};
</script>