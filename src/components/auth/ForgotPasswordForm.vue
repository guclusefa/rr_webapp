<template>
  <div class="row mb-3">
    <div class="col">
      <form @submit.prevent="submitForm" novalidate>
        <!-- Email -->
        <div class="mb-3">
          <InputText
            @input="$emit('input', (body.email = $event))"
            :type="'email'"
            :field="'email'"
            :label="'user.email'"
            :placeholder="'user.email'"
            :required="true"
            :validate="validateEmail"
          />
        </div>
        <!-- Submit -->
        <div class="mb-3">
          <SubmitButton
            :label="'forgot-password.submit'"
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
import { validateEmail } from "@/services/validators";

import InputText from "@/components/form/InputText.vue";
import SubmitButton from "@/components/form/SubmitButton.vue";

export default {
  name: "ForgotPasswordForm",
  data() {
    return {
      body: {
        email: "",
      },
      submitted: false,
    };
  },
  methods: {
    // Email validation
    validateEmail() {
      return validateEmail(this.body.email, this.submitted);
    },
    // Form validation
    validateForm() {
      return !this.validateEmail();
    },
    // Login
    submitForm() {
      // Set submitted to true and check if form is valid
      this.submitted = true;
      if (!this.validateForm()) return;
      // Make request if form is valid
      api
        .post("/forgot-password", this.body)
        .then((response) => {
          addSuccessToast(response);
          this.$router.push({ name: "login" });
        })
        .catch((error) => {
          addErrorToast(error);
        });
    },
  },
  components: {
    InputText,
    SubmitButton,
  },
};
</script>