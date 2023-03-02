<template>
  <form @submit.prevent="submitForm" novalidate>
    <div class="row">
      <div class="col-12 mb-3">
        <InputText
          @input="$emit('input', (body.old = $event))"
          :type="'password'"
          :field="'userEditEmailPassword'"
          :label="'user.password'"
          :placeholder="'user.password'"
          :required="true"
          :validate="validateOldPassword"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-12 mb-3">
        <InputText
          @input="$emit('input', (body.email = $event))"
          :type="'email'"
          :field="'userEditEmailEmail'"
          :label="'user.email'"
          :placeholder="'user.email'"
          :required="true"
          :validate="validateEmail"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-12 mb-3">
        <InputText
          @input="$emit('input', (body.email_confirmation = $event))"
          :type="'email'"
          :field="'userEditEmailEmailConfirmation'"
          :label="'user.email_confirmation'"
          :placeholder="'user.email_confirmation'"
          :required="true"
          :validate="validateEmailConfirmation"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-6 ms-auto text-end">
        <!-- Submit -->
        <SubmitButton
          :label="'profile.edit_email'"
          :disabled="!validateForm()"
        />
      </div>
    </div>
  </form>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import userEditEmailValidation from "@/mixins/userEditEmailValidation.js";
import { withSubmitValidation } from "@/services/validators.js";
import { addSuccessToast, addErrorToast } from "@/services/toasts";

import InputText from "@/components/form/InputText.vue";
import SubmitButton from "@/components/form/SubmitButton.vue";

export default {
  name: "UserEditEmail",
  mixins: [userEditEmailValidation],
  data() {
    return {
      body: {
        id: null,
        old: "",
        email: "",
        email_confirmation: "",
      },
    };
  },
  computed: {
    ...mapGetters(["profile", "user"]),
  },
  methods: {
    setBody() {
      this.body.id = this.profile.id;
    },
    // Form submit
    ...mapActions(["updateProfileEmail", "updateUser", "logout"]),
    async submitForm() {
      withSubmitValidation(async function () {
        const response = await this.updateProfileEmail(this.body);
        // Success
        if (response.status >= 200 && response.status < 300) {
          // logout and redirect to login
          await this.logout();
          this.$router.push({ name: "login" });
          // close modal (if any)
          this.$emit("close");
          // Show success toast
          addSuccessToast(response);
          return;
        }
        // Error
        addErrorToast(response);
      }).apply(this);
    },
  },
  created() {
    this.setBody();
  },
  components: {
    InputText,
    SubmitButton,
  },
};
</script>