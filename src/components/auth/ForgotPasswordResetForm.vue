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
import { mapActions } from "vuex";
import forgotPasswordResetValidation from "@/mixins/forgotPasswordResetValidation.js";
import { withSubmitValidation } from "@/services/validators.js";
import { addSuccessToast, addErrorToast } from "@/services/toasts";

import InputText from "@/components/form/InputText.vue";
import SubmitButton from "@/components/form/SubmitButton.vue";

export default {
  name: "ForgotPasswordForm",
  mixins: [forgotPasswordResetValidation],
  data() {
    return {
      body: {
        password: "",
        password_confirmation: ""
      }
    };
  },
  props: {
    token: {
      type: String,
      required: true,
    },
  },
  methods: {
    // Form submit
    ...mapActions(["forgotPasswordReset"]),
    async submitForm() {
      withSubmitValidation(async function () {
        this.body.token = this.token;
        const response = await this.forgotPasswordReset(this.body);
        // Success
        if (response.status >= 200 && response.status < 300) {
          addSuccessToast(response);
          this.$router.push({ name: "login" });
          return;
        }
        // Error
        addErrorToast(response);
      }).apply(this);
    },
  },
  components: {
    InputText,
    SubmitButton,
  },
};
</script>