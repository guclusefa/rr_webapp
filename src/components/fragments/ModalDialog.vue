<template>
  <div class="modal fade" id="modalDialog">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5">
            {{ modal.title }}
          </h1>
          <button
            id="modalDialogCloseButton"
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            data-bs-target="#modalDialog"
          ></button>
        </div>
        <div class="modal-body">
          <component
            :is="modal.body"
            v-bind="modal.props"
            @close="closeModal"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ModalDialog",
  computed: {
    ...mapGetters(["modal"]),
  },
  methods: {
    ...mapActions(["setModal"]),
    closeModal() {
      // click on close button
      document.getElementById("modalDialogCloseButton").click();
      document.getElementById("modalDialog").classList.remove("show");
    },
  },
};
</script>