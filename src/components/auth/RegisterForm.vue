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
                :field="'registerEmail'"
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
                :field="'registerEmailConfirmation'"
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
                :field="'registerUsername'"
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
                :field="'registerFirstName'"
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
                :field="'registerLastName'"
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
                :field="'registerPassword'"
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
                :field="'registerPasswordConfirmation'"
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
            :field="'registerAcceptTerms'"
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
import { mapActions } from "vuex";
import registerValidation from "@/mixins/registerValidation.js";
import { withSubmitValidation } from "@/services/validators.js";
import { addSuccessToast, addErrorToast } from "@/services/toasts";

import InputText from "@/components/form/InputText.vue";
import CheckBox from "@/components/form/CheckBox.vue";
import SubmitButton from "@/components/form/SubmitButton.vue";

export default {
  name: "RegisterForm",
  mixins: [registerValidation],
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
        accept_terms: false
      },
    };
  },
  methods: {
    // Form submit
    ...mapActions(["register"]),
    async submitForm() {
      withSubmitValidation(async function () {
        const response = await this.register(this.body);
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
    CheckBox,
    SubmitButton,
  },
};
</script>