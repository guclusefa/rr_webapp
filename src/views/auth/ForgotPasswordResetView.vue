<template>
  <section class="container">
    <section class="mb-5">
      <div class="row mb-3">
        <div class="col">
          <div class="d-flex align-items-center">
            <div class="me-auto">
              <h1>{{ $t("forgot-password-reset.title") }}</h1>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div
          class="col-lg-6 d-flex justify-content-center align-items-center py-5 border shadow-sm d-none d-lg-block"
        >
          <img
            src="@/assets/images/icons/ico-forgot-password.svg"
            class="img-fluid"
          />
        </div>
        <div class="col-lg-6 p-lg-5 border shadow-sm no-shadow-lg">
          <ForgotPasswordResetForm :token="token" />
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { addErrorToast } from "@/services/toasts";
import ForgotPasswordResetForm from "@/components/auth/ForgotPasswordResetForm.vue";

export default {
  name: "ForgotPasswordResetView",
  computed: {
    ...mapGetters(["isAuthenticated"]),
    token() {
      return this.$route.params.token;
    },
  },
  methods: {
    ...mapActions(["checkToken"]),
    async checkTokenStatus() {
      const response = await this.checkToken(this.token);
      // Success
      if (response.status >= 200 && response.status < 300) {
        return;
      }
      // Error
      addErrorToast(response);
      this.$router.push({ name: "home" });
    },
    async checkAuthorization() {
      if (this.isAuthenticated) {
        addErrorToast("login.error");
        this.$router.push({ name: "home" });
      }
    },
  },
  // Check token and authorization
  beforeMount() {
    this.checkTokenStatus();
    this.checkAuthorization();
  },
  components: {
    ForgotPasswordResetForm,
  },
};
</script>