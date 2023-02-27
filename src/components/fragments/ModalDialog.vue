<template>
  <!-- Modal -->
  <div class="modal fade" id="bs-modal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title fs-5">{{ title }}</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
          ></button>
        </div>
        <div class="modal-body">
          <slot name="body"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
 
<script>
import { Modal } from "bootstrap";

export default {
  name: "ModalDialog",
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  methods: {
    async show() {
      const modal = new Modal(document.getElementById("bs-modal"));
      modal.show();
    },
    async close() {
      // click on the close button
      document.querySelector("#bs-modal .btn-close").click();
    },
  },
};
</script>