<template>
  <div class="dropdown">
    <i class="bi bi-three-dots-vertical cursor-pointer" data-bs-toggle="dropdown"></i>

    <ul class="dropdown-menu dropdown-menu-end">
      <li>
        <a
          class="dropdown-item"
          href="#"
          @click="showRessourceActionModal('editResourceModal')"
          data-bs-toggle="modal"
          data-bs-target="#modalDialog"
        >
          {{ $t("resource.edit") }}
        </a>
      </li>
      <li>
        <a
          class="dropdown-item"
          href="#"
          @click="showRessourceActionModal('editMediaResourceModal')"
          data-bs-toggle="modal"
          data-bs-target="#modalDialog"
        >
          {{ $t("resource.edit_media") }}
        </a>
      </li>
      <li>
        <a
          class="dropdown-item"
          href="#"
          @click="showRessourceActionModal('editShareToResourceModal')"
          data-bs-toggle="modal"
          data-bs-target="#modalDialog"
        >
          {{ $t("resource.edit_shareto") }}
        </a>
      </li>
      <template v-if="isModerator">
        <li v-if="!resource.isVerified">
          <a
            class="dropdown-item"
            href="#"
            @click="showRessourceActionModal('verifyResourceModal')"
            data-bs-toggle="modal"
            data-bs-target="#modalDialog"
          >
            {{ $t("resource.verify") }}
          </a>
        </li>
        <li v-else>
          <a
            class="dropdown-item"
            href="#"
            @click="showRessourceActionModal('unverifyResourceModal')"
            data-bs-toggle="modal"
            data-bs-target="#modalDialog"
          >
            {{ $t("resource.unverify") }}
          </a>
        </li>
      </template>
      <li>
        <a
          class="dropdown-item"
          href="#"
          @click="showRessourceActionModal('deleteResourceModal')"
          data-bs-toggle="modal"
          data-bs-target="#modalDialog"
        >
          {{ $t("resource.delete") }}</a
        >
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import { showModal } from "@/services/modals";

import ResourceEdit from "@/components/resource/actions/ResourceEdit";
import ResourceEditMedia from "@/components/resource/actions/ResourceEditMedia";
import ResourceEditShareTo from "@/components/resource/actions/ResourceEditShareTo";
import ResourceVerify from "@/components/resource/actions/ResourceVerify";
import ResourceDelete from "@/components/resource/actions/ResourceDelete";

export default {
  name: "ResourceActions",
  props: {
    resource: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters(["isAuthenticated", "isModerator", "isAdmin"]),
  },
  methods: {
    showRessourceActionModal(type) {
      switch (type) {
        case "editResourceModal":
          showModal(
            this.$t("resource.edit_title", { title: this.resource.title }),
            ResourceEdit,
            { resource: this.resource },
            true
          );
          break;
        case "editMediaResourceModal":
          showModal(
            this.$t("resource.edit_media_title", {
              title: this.resource.title,
            }),
            ResourceEditMedia,
            { resource: this.resource }
          );
          break;
        case "editShareToResourceModal":
          showModal(
            this.$t("resource.edit_shareto_title", {
              title: this.resource.title,
            }),
            ResourceEditShareTo,
            { resource: this.resource }
          );
          break;
        case "verifyResourceModal":
          showModal(
            this.$t("resource.verify_title", { title: this.resource.title }),
            ResourceVerify,
            { resource: this.resource }
          );
          break;
        case "unverifyResourceModal":
          showModal(
            this.$t("resource.unverify_title", { title: this.resource.title }),
            ResourceVerify,
            { resource: this.resource, unverify: true }
          );
          break;
        case "deleteResourceModal":
          showModal(
            this.$t("resource.delete_title", { title: this.resource.title }),
            ResourceDelete,
            { resource: this.resource }
          );
          break;
      }
    },
  },
};
</script>