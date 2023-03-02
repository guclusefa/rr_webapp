<template>
  <div class="row mb-3">
    <div class="col">
      <form @submit.prevent="submitForm" novalidate>
        <!-- Username -->
        <div class="mb-3">
          <InputText
            @input="$emit('input', (body.username = $event))"
            :type="'text'"
            :field="'loginUsername'"
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
            :field="'loginPassword'"
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
            :field="'loginRememberMe'"
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
import { mapActions } from "vuex";
import loginValidation from "@/mixins/loginValidation.js";
import { withSubmitValidation } from "@/services/validators.js";
import { addSuccessToast, addErrorToast } from "@/services/toasts";

import InputText from "@/components/form/InputText.vue";
import CheckBox from "@/components/form/CheckBox.vue";
import SubmitButton from "@/components/form/SubmitButton.vue";

export default {
  name: "LoginForm",
  mixins: [loginValidation],
  data() {
    return {
      body: {
        username: "",
        password: "",
        remember_me: false
      },
    };
  },
  methods: {
    // Form submit
    ...mapActions(["login"]),
    async submitForm() {
      withSubmitValidation(async function () {
        const response = await this.login(this.body);
        // Success
        if (response.status >= 200 && response.status < 300) {
          addSuccessToast(this.$t("login.success"));
          this.$router.push({ name: "home" });
          return;
        }
        // Error
        addErrorToast(response);
      }).apply(this);
    },
  },
  components: {
    InputText,
    CheckBox,
    SubmitButton,
  },
};
</script>