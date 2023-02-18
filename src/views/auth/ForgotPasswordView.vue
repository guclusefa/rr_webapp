<template>
  <section>
    <div class="container">
      <div class="row">
        <div class="col">
          <h1>{{ $t("forgot-password.title") }}</h1>
          <hr />
        </div>
      </div>
      <ForgotPasswordForm v-if="!hasToken" />
      <ForgotPasswordResetForm v-else />
    </div>
  </section>
</template>

<script>
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm.vue";
import ForgotPasswordResetForm from "@/components/auth/ForgotPasswordResetForm.vue";

export default {
  name: "ForgotPasswordView",
  // check if route with token
  computed: {
    hasToken() {
      return this.$route.params.token;
    },
  },
  components: {
    ForgotPasswordForm,
    ForgotPasswordResetForm,
  },
};
</script>