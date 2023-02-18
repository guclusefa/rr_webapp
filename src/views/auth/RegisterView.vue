<template>
  <section>
    <div class="container">
      <div class="row">
        <div class="col">
          <h1>{{ $t("register.title") }}</h1>
          <hr />
        </div>
      </div>
      <RegisterForm />
    </div>
  </section>
</template>

<script>
import RegisterForm from "@/components/auth/RegisterForm.vue";

export default {
  name: "LoginView",
  components: {
    RegisterForm,
  },
};
</script>