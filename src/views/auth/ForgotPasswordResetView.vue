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
import ForgotPasswordResetForm from "@/components/auth/ForgotPasswordResetForm.vue";

export default {
  name: "ForgotPasswordResetView",
  components: {
    ForgotPasswordResetForm,
  },
};
</script>