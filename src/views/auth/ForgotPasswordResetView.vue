<template>
  <section>
    <div class="container">
      <div class="row">
        <div class="col">
          <h1>{{ $t("forgot-password-reset.title") }}</h1>
          <hr />
        </div>
      </div>
      <ForgotPasswordResetForm />
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import { addErrorToast } from "@/services/toasts";
import ForgotPasswordResetForm from "@/components/auth/ForgotPasswordResetForm.vue";

export default {
  name: "ForgotPasswordResetView",
  computed: {
    ...mapGetters(["isAuthenticated"]),
  },
  // Redirect to home if user is logged in
  beforeMount() {
    this.checkToken();
    if (this.isAuthenticated) {
      addErrorToast("login.error");
      this.$router.push({ name: "home" });
    }
  },
  components: {
    ForgotPasswordResetForm,
  },
};
</script>