<template>
  <div class="nav-link">
    <i
      class="bi bi-search cursor-pointer"
      @click="showSearchModal"
      data-bs-toggle="modal"
      data-bs-target="#modalDialog"
    ></i>
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
  