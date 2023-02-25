<template>
  <form @submit.prevent="submitForm" novalidate>
    <div class="row">
      <div class="col-12 mb-3">
        <InputText
          @input="$emit('input', (body.username = $event))"
          :type="'text'"
          :field="'username'"
          :label="'user.username'"
          :placeholder="'user.username_placeholder'"
          :required="true"
          :validate="validateUsername"
          :value="profile.username"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-6 ms-auto text-end">
        <!-- Submit -->
        <SubmitButton :label="'profile.edit_photo'" :disabled="!validateForm()" />
      </div>
    </div>
  </form>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import userEditValidation from "@/mixins/userEditValidation.js";
import { withSubmitValidation } from "@/services/validators.js";
import { addSuccessToast, addErrorToast } from "@/services/toasts";

import InputText from "@/components/form/InputText.vue";
import SubmitButton from "@/components/form/SubmitButton.vue";

export default {
  name: "UserEdit",
  mixins: [userEditValidation],
  data() {
    return {
      body: {
        id: null,
        photo: null,
      },
    };
  },
  computed: {
    ...mapGetters(["profile", "user"]),
  },
  methods: {
    setBody() {
      this.body.photo = this.profile.photo;
    },
    // Form submit
    ...mapActions(["updateProfile", "updateUser"]),
    async submitForm() {
      withSubmitValidation(async function () {
        const response = await this.updateProfile(this.body);
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