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
import { mapActions } from "vuex";
import forgotPasswordValidation from "@/mixins/forgotPasswordValidation.js";
import { withSubmitValidation } from "@/services/validators.js";
import { addSuccessToast, addErrorToast } from "@/services/toasts";

import InputText from "@/components/form/InputText.vue";
import SubmitButton from "@/components/form/SubmitButton.vue";

export default {
  name: "ForgotPasswordForm",
  mixins: [forgotPasswordValidation],
  data() {
    return {
      body: {
        email: "",
      }
    };
  },
  methods: {
    // Form submit
    ...mapActions(["forgotPassword"]),
    async submitForm() {
      withSubmitValidation(async function () {
        const response = await this.forgotPassword(this.body);
        // Success
        if (response.status >= 200 && response.status < 300) {
          addSuccessToast(response);
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
    SubmitButton,
  },
};
</script>