<template>
  <div class="row mb-3">
    <div class="col">
      <form @submit.prevent="submitForm" novalidate>
        <!-- Username -->
        <div class="mb-3">
          <InputText
            @input="$emit('input', (body.username = $event))"
            :type="'text'"
            :field="'username'"
            :label="'login.username'"
            :placeholder="'login.username_placeholder'"
            :required="true"
            :validate="validateUsername"
          />
        </div>
        <!-- Password -->
        <div class="mb-3">
          <InputText
            @input="$emit('input', (body.password = $event))"
            :type="'password'"
            :field="'password'"
            :label="'login.password'"
            :placeholder="'login.password_placeholder'"
            :required="true"
            :validate="validatePassword"
          />
        </div>
        <!-- Remember Me -->
        <div class="mb-3">
          <CheckBox
            @update:modelValue="body.remember_me = $event"
            :field="'remember_me'"
            :label="'login.remember_me'"
          />
        </div>
        <!-- Submit -->
        <div class="mb-3">
          <SubmitButton :label="'login.submit'" :disabled="!validateForm()" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import {
  api,
  handleApiSuccessMessage,
  handleApiErrorMessage,
} from "@/services/api.js";
import { validateUsername, validatePassword } from "@/services/validators.js";

import InputText from "@/components/form/InputText.vue";
import CheckBox from "@/components/form/CheckBox.vue";
import SubmitButton from "@/components/form/SubmitButton.vue";

export default {
  name: "LoginForm",
  data() {
    return {
      body: {
        username: "",
        password: "",
        remember_me: false,
      },
      submitted: false,
    };
  },
  methods: {
    // Username validation
    validateUsername() {
      return validateUsername(this.body.username, this.submitted);
    },
    // Password validation
    validatePassword() {
      return validatePassword(this.body.password, this.submitted);
    },
    // Form validation
    validateForm() {
      return !this.validateUsername() && !this.validatePassword();
    },
    // Form submit
    submitForm() {
      // Set submitted to true
      this.submitted = true;
      // Check if form is valid and submit
      if (!this.validateForm()) {
        return;
      }
      // Send request
      api
        .post("/login", this.body)
        .then((response) => {
          // My code (TODO)
          console.log(response);
          // Send success message
          handleApiSuccessMessage("login.success");
          // Redirect
          this.$router.push({ name: "home" });
        })
        .catch((error) => {
          // Send error message
          handleApiErrorMessage(error);
        });
    },
  },
  components: {
    InputText,
    CheckBox,
    SubmitButton,
  },
};
</script>