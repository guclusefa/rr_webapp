<template>
  <div v-if="loading" class="text-center">
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden"></span>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { addSuccessToast, addErrorToast } from "@/services/toasts";
export default {
  name: "UserVerify",
  computed: {
    token() {
      return this.$route.params.token;
    },
    ...mapGetters(["loading"]),
  },
  methods: {
    ...mapActions(["verifyEmail"]),
    async verify() {
      const response = await this.verifyEmail(this.token);
      // Success
      if (response.status >= 200 && response.status < 300) {
        // redirect
        addSuccessToast(response);
      } else {
        // Error
        addErrorToast(response);
      }
      this.$router.push({ name: "home" });
    },
  },
  mounted() {
    this.verify();
  },
};
</script>