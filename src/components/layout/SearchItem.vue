<template>
  <li class="nav-item fs-5">
    <a class="nav-link" role="button" @click="showSearchModal">
      <span class="border-end border-2 pe-3">
        <i
          class="bi bi-search cursor-pointer"
          data-bs-toggle="modal"
          data-bs-target="#modalDialog"
        ></i>
      </span>
    </a>
  </li>
</template>

<script>
import { showModal } from "@/services/modals";
import SearchModal from "@/components/layout/SearchModal.vue";

export default {
  name: "SearchItem",
  methods: {
    showSearchModal() {
      showModal(this.$t("app.search"), SearchModal, {}, true);
    },
  },
};
</script>
  