<template>
  <section class="container">
    <section class="mb-5">
      <div class="row mb-3">
        <div class="col">
          <div class="d-flex align-items-center">
            <div class="me-auto">
              <h1>{{ $t("register.title") }}</h1>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div
          class="col-lg-6 d-flex justify-content-center align-items-center py-5 border shadow-sm d-none d-lg-block"
        >
          <img
            src="@/assets/images/icons/ico-register.svg"
            class="img-fluid"
          />
        </div>
        <div class="col-lg-6 p-lg-5 border shadow-sm no-shadow-lg">
          <RegisterForm />
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import { addErrorToast } from "@/services/toasts";
import RegisterForm from "@/components/auth/RegisterForm.vue";

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
    RegisterForm,
  },
};
</script>