<template>
  <div class="modal fade" id="modalDialog">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header" v-if="modal.title">
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
        <div class="modal-body" v-if="modal.body">
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
      this.setModal({
        title: "",
        body: null,
        props: {},
      });
    },
  },
  mounted() {
    // watch every time class of #modalDialog changes to show, console log modal show
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          const attributeValue = mutation.target.getAttribute(
            mutation.attributeName
          );
          if (!attributeValue.includes("show")) {
            this.setModal({
              title: "",
              body: null,
              props: {},
            });
          }
        }
      });
    });
    observer.observe(document.getElementById("modalDialog"), {
      attributes: true,
    });
  },
  // watch change route, reload modal
  // watch class of modal dialog, if not show, set modal to null
  watch: {
    $route() {
      this.setModal({
        title: "",
        body: null,
        props: {},
      });
    },
  },
};
</script>