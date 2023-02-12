<template>
  <div class="row mb-3">
    <div class="col">
      <form @submit.prevent="submitForm" novalidate>
        <!-- Username -->
        <div class="mb-3">
          <InputText
            @input="$emit('input', body.username = $event)"
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
            @input="$emit('input', body.password = $event)"
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
            :label="$t('login.remember_me')"
          />
        </div>
        <!-- Submit -->
        <div class="mb-3">
          <SubmitButton :label="$t('login.submit')" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { postData } from "@/services/api";
import { constants, handleMessage } from "@/services/messages";

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
  watch: {
    body: {
      handler() {
        this.validateForm();
      },
      deep: true,
    },
  },
  methods: {
    ...mapActions(["setToken"]),
    validateUsername() {
      // check if username is empty (trim)
      if (!this.body.username.trim()) {
        return "login.username_required";
      }
      return "";
    },
    validatePassword() {
      // check if password is empty (trim)
      if (!this.body.password.trim()) {
        return "login.password_required";
      }
      return "";
    },
    validateForm() {
      let invalids = document.querySelectorAll(".is-invalid");
      if (invalids.length > 0) {
        return false;
      }
      return true;
    },
    submitForm() {
      if (!this.validateForm()) {
        return;
      }
      postData("/login", this.body).then((response) => {
        // No response or error
        if (response == null) return;
        if (response.status !== 200) {
          handleMessage(constants.TYPE_ERROR, response.data.errors.message);
          return;
        }
        // Set token
        this.setToken(response.data.token);
        // If all good, redirect to home with success message and refresh
        handleMessage(constants.TYPE_SUCCESS, "login.success", true);
        this.$router.push({ name: "home" });
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