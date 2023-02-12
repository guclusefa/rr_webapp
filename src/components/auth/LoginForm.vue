<template>
  <div class="row mb-3">
    <div class="col">
      <form @submit.prevent="submitForm" novalidate>
        <!-- Username -->
        <div class="mb-3">
          <InputText
            @input="body.username = $event"
            :type="'text'"
            :field="'username'"
            :label="$t('login.username')"
            :placeholder="$t('login.username_placeholder')"
          />
        </div>
        <!-- Password -->
        <div class="mb-3">
          <InputText
            @input="body.password = $event"
            :type="'password'"
            :field="'password'"
            :label="$t('login.password')"
            :placeholder="$t('login.password_placeholder')"
          />
        </div>
        <!-- Remember Me -->
        <div class="mb-3">
          <CheckBox
            @update:modelValue="body.remember_me = $event"
            :field="'remember_me'"
            :label="$t('login.remember_me')"
          />
        </div>
        <!-- Submit -->
        <div class="mb-3">
          <SubmitButton :label="$t('login.submit')" :isLoading="isLoading" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { login } from "@/services/modules/auth";
import InputText from "../form/InputText.vue";
import CheckBox from "@/components/form/CheckBox.vue";
import SubmitButton from "../form/SubmitButton.vue";

export default {
  name: "LoginForm",
  data() {
    return {
      body: {
        username: "",
        password: "",
        remember_me: false,
      },
    };
  },
  methods: {
    validateUsername() {
      // check if username is empty
      if (!this.body.username) {
        return false;
      }
      // check if at least 20 characters
      if (this.body.username.length < 20) {
        return false;
      }
      return true;
    },
    validatePassword() {
      // check if password is empty
      if (!this.body.password) {
        return false;
      }
      // check if at least 20 characters
      if (this.body.password.length < 20) {
        return false;
      }
      return true;
    },
    validateForm() {
      const form = document.querySelector("form");
      if (!form.checkValidity()) {
        form.classList.add("was-validated");
        return false;
      }
      return true;
    },
    submitForm() {
      console.log(this.body)
      if (!this.validateForm()) {
        return;
      }
      login(this.body);
    },
  },
  components: {
    InputText,
    CheckBox,
    SubmitButton,
  },
};
</script>