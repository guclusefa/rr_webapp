<template id="user-edit">
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
      <div class="col-12 col-md-6 mb-3">
        <!-- First name -->
        <InputText
          @input="$emit('input', (body.firstName = $event))"
          :type="'text'"
          :field="'first_name'"
          :label="'user.first_name'"
          :placeholder="'user.first_name'"
          :value="profile.firstName"
        />
      </div>
      <div class="col-12 col-md-6 mb-3">
        <!-- Last name -->
        <InputText
          @input="$emit('input', (body.lastName = $event))"
          :type="'text'"
          :field="'last_name'"
          :label="'user.last_name'"
          :placeholder="'user.last_name'"
          :value="profile.lastName"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-12 mb-3">
        <!-- Bio -->
        <InputTextarea
          @input="$emit('input', (body.bio = $event))"
          :field="'bio'"
          :label="'user.bio'"
          :placeholder="'user.bio_placeholder'"
          :value="profile.bio"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-12 mb-3">
        <!-- BirthDate -->
        <DatePicker
          @input="$emit('input', (body.birthDate = $event))"
          :field="'birthDate'"
          :label="'user.birthDate'"
          :placeholder="'user.birthDate_placeholder'"
          :value="profile.birthDate"
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
import { mapGetters, mapActions } from "vuex";
import userEditValidation from "@/mixins/userEditValidation.js";
import { withSubmitValidation } from "@/services/validators.js";
import { addSuccessToast, addErrorToast } from "@/services/toasts";

import InputText from "@/components/form/InputText.vue";
import InputTextarea from "@/components/form/InputTextarea.vue";
import DatePicker from "@/components/form/DatePicker.vue";
import SubmitButton from "@/components/form/SubmitButton.vue";

export default {
  name: "UserEdit",
  mixins: [userEditValidation],
  computed: {
    ...mapGetters(["profile", "user"]),
    body() {
      return {
        id: this.profile.id,
        username: this.profile.username,
        first_name: this.profile.firstName,
        last_name: this.profile.lastName,
        bio: this.profile.bio,
        birthDate: this.profile.birthDate,
      };
    },
  },
  methods: {
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
          return;
        }
        // Error
        addErrorToast(response);
      }).apply(this);
    },
  },
  components: {
    InputText,
    InputTextarea,
    DatePicker,
    SubmitButton,
  },
};
</script>