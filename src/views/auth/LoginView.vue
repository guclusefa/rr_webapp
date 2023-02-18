<template>
  <section>
    <div class="container">
      <div class="row">
        <div class="col">
          <h1>{{ $t("login.title") }}</h1>
          <hr />
        </div>
      </div>
      <LoginForm />
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import { addErrorToast } from "@/services/toasts";
import LoginForm from "@/components/auth/LoginForm.vue";

export default {
  name: "LoginView",
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
    LoginForm,
  },
};
</script>