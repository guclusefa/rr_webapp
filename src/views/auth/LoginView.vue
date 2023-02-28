<template>
  <section class="container">
    <section class="mb-5">
      <div class="row mb-3">
        <div class="col">
          <div class="d-flex align-items-center border-bottom">
            <div class="me-auto">
              <h1>{{ $t("login.title") }}</h1>
            </div>
          </div>
        </div>
      </div>
      <LoginForm />
    </section>
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
  methods: {
    async checkAuthorization() {
      if (this.isAuthenticated) {
        addErrorToast("login.error");
        this.$router.push({ name: "home" });
      }
    },
  },
  // Check authorization
  beforeMount() {
    this.checkAuthorization();
  },
  components: {
    LoginForm,
  },
};
</script>