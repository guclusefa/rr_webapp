<template>
  <div class="nav-link fs-5">
    <span class="border-end border-2 pe-3">
      <i
        class="bi bi-search cursor-pointer"
        @click="showSearchModal"
        data-bs-toggle="modal"
        data-bs-target="#modalDialog"
      ></i>
    </span>
  </div>
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
  