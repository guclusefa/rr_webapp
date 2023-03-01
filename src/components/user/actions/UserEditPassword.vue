<template>
  <form @submit.prevent="submitForm" novalidate>
    <div class="row">
      <div class="col-12 mb-3">
        <InputText
          @input="$emit('input', (body.old = $event))"
          :type="'password'"
          :field="'old_password'"
          :label="'user.old_password'"
          :placeholder="'user.old_password'"
          :required="true"
          :validate="validateOldPassword"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-12 mb-3">
        <InputText
          @input="$emit('input', (body.password = $event))"
          :type="'password'"
          :field="'password'"
          :label="'user.password'"
          :placeholder="'user.password'"
          :required="true"
          :validate="validatePassword"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-12 mb-3">
        <InputText
          @input="$emit('input', (body.password_confirmation = $event))"
          :type="'password'"
          :field="'password_confirmation'"
          :label="'user.password_confirmation'"
          :placeholder="'user.password_confirmation'"
          :required="true"
          :validate="validatePasswordConfirmation"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-6 ms-auto text-end">
        <!-- Submit -->
        <SubmitButton
          :label="'profile.edit_password'"
          :disabled="!validateForm()"
        />
      </div>
    </div>
  </form>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import userEditPasswordValidation from "@/mixins/userEditPasswordValidation.js";
import { withSubmitValidation } from "@/services/validators.js";
import { addSuccessToast, addErrorToast } from "@/services/toasts";

import InputText from "@/components/form/InputText.vue";
import SubmitButton from "@/components/form/SubmitButton.vue";

export default {
  name: "UserEditPassword",
  mixins: [userEditPasswordValidation],
  data() {
    return {
      body: {
        id: null,
        old: "",
        password: "",
        password_confirmation: "",
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
    ...mapActions(["updateProfilePassword", "updateUser"]),
    async submitForm() {
      withSubmitValidation(async function () {
        const response = await this.updateProfilePassword(this.body);
        // Success
        if (response.status >= 200 && response.status < 300) {
          // If my profile
          if (this.profile.id === this.user.id) {
            await this.updateUser(this.body);
          }
          addSuccessToast(response);
          // Close modal (if any)
          this.$emit("close");
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