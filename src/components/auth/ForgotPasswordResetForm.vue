<template>
  <div class="row mb-3">
    <div class="col">
      <form @submit.prevent="submitForm" novalidate>
        <!-- Password -->
        <div class="mb-3">
          <InputText
            @input="$emit('input', (body.password = $event))"
            :type="'password'"
            :field="'password'"
            :label="'user.password'"
            :placeholder="'user.password_placeholder'"
            :required="true"
            :validate="validatePassword"
          />
        </div>
        <!-- Password confirmation -->
        <div class="mb-3">
          <InputText
            @input="$emit('input', (body.password_confirmation = $event))"
            :type="'password'"
            :field="'password_confirmation'"
            :label="'user.password_confirmation'"
            :placeholder="'user.password_confirmation_placeholder'"
            :required="true"
            :validate="validatePasswordConfirmation"
          />
        </div>
        <!-- Submit -->
        <div class="mb-3">
          <SubmitButton
            :label="'forgot-password-reset.submit'"
            :disabled="!validateForm()"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import api from "@/services/api.js";
import { addSuccessToast, addErrorToast } from "@/services/toasts";
import { mapGetters } from "vuex";
import {
  validatePassword,
  validatePasswordConfirmation,
} from "@/services/validators";

import InputText from "@/components/form/InputText.vue";
import SubmitButton from "@/components/form/SubmitButton.vue";

export default {
  name: "ForgotPasswordForm",
  data() {
    return {
      body: {
        password: "",
        password_confirmation: "",
      },
      submitted: false,
    };
  },
  computed: {
    ...mapGetters(["isAuthenticated"]),
    token() {
      return this.$route.params.token;
    },
  },
  methods: {
    // Password validation
    validatePassword() {
      return validatePassword(this.body.password, this.submitted);
    },
    validatePasswordConfirmation() {
      return validatePasswordConfirmation(
        this.body.password,
        this.body.password_confirmation,
        this.submitted
      );
    },
    // Form validation
    validateForm() {
      return !this.validatePassword() && !this.validatePasswordConfirmation();
    },
    checkToken() {
      api
        .get(`/check-token/${this.token}`)
        .then(() => {})
        .catch((error) => {
          addErrorToast(error);
          this.$router.push({ name: "login" });
        });
    },
    // Login
    submitForm() {
      // Set submitted to true and check if form is valid
      this.submitted = true;
      if (!this.validateForm()) return;
      // Make request if form is valid
      api
        .put(`/reset-password/${this.token}`, this.body)
        .then((response) => {
          addSuccessToast(response);
          this.$router.push({ name: "login" });
        })
        .catch((error) => {
          addErrorToast(error);
        });
    },
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
    InputText,
    SubmitButton,
  },
};
</script>