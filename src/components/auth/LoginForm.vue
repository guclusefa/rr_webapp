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
            :label="'user.username'"
            :placeholder="'user.username_placeholder'"
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
            :label="'user.password'"
            :placeholder="'user.password_placeholder'"
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
        <!-- Register -->
        <div class="mb-3">
          <router-link to="/register">
            {{ $t("login.register") }}
          </router-link>
        </div>
        <!-- Forgotten password -->
        <div class="mb-3">
          <router-link to="/forgot-password">
            {{ $t("login.forgot_password") }}
          </router-link>
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
import api from "@/services/api.js";
import { addSuccessToast, addErrorToast } from "@/services/toasts";
import { mapActions } from "vuex";
import { validateUsername, validatePassword } from "@/services/validators";

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
    ...mapActions(["login"]),
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
    // Login
    submitForm() {
      // Set submitted to true and check if form is valid
      this.submitted = true;
      if (!this.validateForm()) return;
      // Make request if form is valid
      api
        .post("/login", this.body)
        .then((response) => {
          response.data.remember_me = this.body.remember_me;
          this.login(response.data);
          addSuccessToast("login.success");
          this.$router.push({ name: "home" });
        })
        .catch((error) => {
          addErrorToast(error);
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