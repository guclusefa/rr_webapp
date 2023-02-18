<template>
  <div class="row mb-3">
    <div class="col">
      <form @submit.prevent="submitForm" novalidate>
        <div class="row">
          <div class="col-md-6 col-sm-12">
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
          </div>
          <div class="col-md-6 col-sm-12">
            <!-- Email confirmation -->
            <div class="mb-3">
              <InputText
                @input="$emit('input', (body.email_confirmation = $event))"
                :type="'email'"
                :field="'email_confirmation'"
                :label="'user.email_confirmation'"
                :placeholder="'user.email_confirmation'"
                :required="true"
                :validate="validateEmailConfirmation"
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4 col-sm-12">
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
          </div>
          <div class="col-md-4 col-sm-12">
            <!-- First name -->
            <div class="mb-3">
              <InputText
                @input="$emit('input', (body.firstName = $event))"
                :type="'text'"
                :field="'first_name'"
                :label="'user.first_name'"
                :placeholder="'user.first_name'"
              />
            </div>
          </div>
          <div class="col-md-4 col-sm-12">
            <!-- Last name -->
            <div class="mb-3">
              <InputText
                @input="$emit('input', (body.lastName = $event))"
                :type="'text'"
                :field="'last_name'"
                :label="'user.last_name'"
                :placeholder="'user.last_name'"
              />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 col-sm-12">
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
          </div>
          <div class="col-md-6 col-sm-12">
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
          </div>
        </div>
        <!-- Accept terms -->
        <div class="mb-3">
          <CheckBox
            @update:modelValue="body.accept_terms = $event"
            :field="'accept_terms'"
            :label="'register.accept_terms'"
            :required="true"
            :validate="validateAcceptTerms"
          />
        </div>
        <!-- Register -->
        <div class="mb-3">
          <router-link to="/login">
            {{ $t("register.login") }}
          </router-link>
        </div>
        <!-- Submit -->
        <div class="mb-3">
          <SubmitButton
            :label="'register.submit'"
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
import {
  validateEmail,
  validateEmailConfirmation,
  validateUsername,
  validatePassword,
  validatePasswordConfirmation,
  validateAcceptTerms,
} from "@/services/validators";

import InputText from "@/components/form/InputText.vue";
import CheckBox from "@/components/form/CheckBox.vue";
import SubmitButton from "@/components/form/SubmitButton.vue";

export default {
  name: "RegisterForm",
  data() {
    return {
      body: {
        email: "",
        email_confirmation: "",
        username: "",
        firstName: "",
        lastName: "",
        password: "",
        password_confirmation: "",
        accept_terms: false,
      },
      submitted: false,
    };
  },
  methods: {
    // Email validation
    validateEmail() {
      return validateEmail(this.body.email, this.submitted);
    },
    // Email confirmation validation
    validateEmailConfirmation() {
      return validateEmailConfirmation(
        this.body.email,
        this.body.email_confirmation,
        this.submitted
      );
    },
    // Username validation
    validateUsername() {
      return validateUsername(this.body.username, this.submitted);
    },
    // Password validation
    validatePassword() {
      return validatePassword(this.body.password, this.submitted);
    },
    // Password confirmation validation
    validatePasswordConfirmation() {
      return validatePasswordConfirmation(
        this.body.password,
        this.body.password_confirmation,
        this.submitted
      );
    },
    // Accept terms validation
    validateAcceptTerms() {
      return validateAcceptTerms(this.body.accept_terms, this.submitted);
    },
    // Form validation
    validateForm() {
      return (
        !this.validateEmail() &&
        !this.validateEmailConfirmation() &&
        !this.validateUsername() &&
        !this.validatePassword() &&
        !this.validatePasswordConfirmation() &&
        !this.validateAcceptTerms()
      );
    },
    // Form submit
    submitForm() {
      // Set submitted to true and check if form is valid
      this.submitted = true;
      if (!this.validateForm()) return;
      // for each field, if it's empty, remove it from the body
      for (const [key, value] of Object.entries(this.body)) {
        if (value === "") delete this.body[key];
      }
      // Make request if form is valid
      api
        .post("/register", this.body)
        .then((response) => {
          addSuccessToast(response);
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