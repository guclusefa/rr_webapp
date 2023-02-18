<template>
  <div
    ref="toastContainer"
    class="toast-container position-absolute bottom-0 end-0 p-3"
  ></div>
</template>

<script>
import { mapGetters } from "vuex";
import { Toast } from "bootstrap";

export default {
  name: "ToastMessage",
  computed: {
    ...mapGetters(["toast"]),
  },
  methods: {
    // Show toast message
    showToast(toast) {
      // Get toast container
      const toastContainer = this.$refs.toastContainer;
      // Create and show new toast element
      const toastEl = document.createElement("div");
      const type =
        toast.type == "error"
          ? "danger"
          : toast.type == "success"
          ? "success"
          : "info";
      toastEl.classList.add("toast");
      toastEl.classList.add(`text-bg-${type}`);
      toastEl.setAttribute("role", "alert");
      // Header
      const toastHeader = document.createElement("div");
      toastHeader.classList.add("toast-header");
      // Title
      const toastTitle = document.createElement("strong");
      toastTitle.classList.add("me-auto");
      toastTitle.innerText = this.$t(`toast.${toast.type}`);
      // Close button
      const toastButton = document.createElement("button");
      toastButton.classList.add("btn-close");
      toastButton.setAttribute("type", "button");
      toastButton.setAttribute("data-bs-dismiss", "toast");
      toastButton.setAttribute("aria-label", "Close");
      // Body
      const toastBody = document.createElement("div");
      toastBody.classList.add("toast-body");
      toastBody.innerText = toast.message;
      // Append elements
      toastHeader.appendChild(toastTitle);
      toastHeader.appendChild(toastButton);
      toastEl.appendChild(toastHeader);
      toastEl.appendChild(toastBody);
      // Append toast to container
      toastContainer.insertBefore(toastEl, toastContainer.firstChild);
      const newToast = new Toast(toastEl);
      newToast.show();
    },
  },
  mounted() {
    this.$store.subscribe((mutation) => {
      if (mutation.type === "ADD_TOAST") {
        this.showToast(mutation.payload);
      }
    });
  },
};
</script>