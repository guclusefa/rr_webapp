<template id="user-edit">
  <form @submit.prevent="submitForm" novalidate>
    <div class="row">
      <div class="col-12 mb-3">
        <InputText
          @input="$emit('input', (body.username = $event))"
          :value="body.username"
          :type="'text'"
          :field="'username'"
          :label="'user.username'"
          :placeholder="'user.username_placeholder'"
          :required="true"
          :validate="validateUsername"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-6 mb-3">
        <!-- First name -->
        <InputText
          @input="$emit('input', (body.firstName = $event))"
          :value="body.firstName"
          :type="'text'"
          :field="'first_name'"
          :label="'user.first_name'"
          :placeholder="'user.first_name'"
        />
      </div>
      <div class="col-12 col-md-6 mb-3">
        <!-- Last name -->
        <InputText
          @input="$emit('input', (body.lastName = $event))"
          :value="body.lastName"
          :type="'text'"
          :field="'last_name'"
          :label="'user.last_name'"
          :placeholder="'user.last_name'"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-6 ms-auto text-end">
        <!-- Submit -->
        <SubmitButton :label="'profile.edit'" :disabled="!validateForm()" />
      </div>
    </div>
  </form>
</template>

<script>
import api from "@/services/api.js";
import { addSuccessToast, addErrorToast } from "@/services/toasts";
import { validateUsername } from "@/services/validators";

import InputText from "@/components/form/InputText.vue";
import SubmitButton from "@/components/form/SubmitButton.vue";

export default {
  name: "UserEdit",
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      body: {
        username: this.user.username,
        firstName: this.user.firstName,
        lastName: this.user.lastName,
      },
      submitted: false,
    };
  },
  methods: {
    // Username validation
    validateUsername() {
      return validateUsername(this.body.username, this.submitted);
    },
    // Form validation
    validateForm() {
      return !this.validateUsername();
    },
    // Submit form
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
        .put(`/users/${this.user.id}`, this.body)
        .then((response) => {
          addSuccessToast(response);
        })
        .catch((error) => {
          addErrorToast(error);
        });
    },
  },
  components: {
    InputText,
    SubmitButton,
  },
};
</script>