<template>
  <section>
    <div class="container">
      <div class="row">
        <div class="col">
          <h1>{{ $t("forgot-password.title") }}</h1>
          <hr />
        </div>
      </div>
      <ForgotPasswordForm />
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import { addErrorToast } from "@/services/toasts";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm.vue";

export default {
  name: "ForgotPasswordView",
  computed: {
    ...mapGetters(["isAuthenticated"]),
  },
  // Redirect to home if user is logged in
  beforeMount() {
    if (this.isAuthenticated) {
      addErrorToast("login.error");
      this.$router.push({ name: "home" });
    }
  },
  components: {
    ForgotPasswordForm,
  },
};
</script>