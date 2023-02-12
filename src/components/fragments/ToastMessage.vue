<template>
  <div class="toast-container position-absolute bottom-0 end-0 p-3">
    <div
      class="toast"
      role="alert"
      v-for="toast in toasts"
      :key="toast.message"
    >
      <div class="toast-header">
        <strong class="me-auto">{{ $t("toast."+toast.type) }}</strong>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="toast"
          aria-label="Close"
        ></button>
      </div>
      <div class="toast-body">
        {{ toast.message }}
      </div>
    </div>
  </div>
</template>
  
<script>
import { Toast } from "bootstrap";

export default {
  name: "ToastMessage",
  computed: {
    toasts() {
      return this.$store.getters["toasts"];
    },
  },
  methods: {
    showToast() {
      const toastElList = [].slice.call(document.querySelectorAll(".toast"));
      const toastList = toastElList.map((toastEl) => {
        return new Toast(toastEl);
      });
      toastList.forEach((toast) => toast.show());
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