<template>
  <form @submit.prevent="submitForm" novalidate>
    <div class="row">
      <div class="col-12 mb-3">
        <InputText
          @input="$emit('input', (body.username = $event))"
          :type="'text'"
          :field="'userEditUsername'"
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
          :field="'userEditFirstName'"
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
          :field="'userEditLastName'"
          :label="'user.last_name'"
          :placeholder="'user.last_name'"
          :value="profile.lastName"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-12 mb-3">
        <!-- State -->
        <Select2Field
          @input="$emit('input', (body.state = $event))"
          :field="'userEditState'"
          :label="'user.state'"
          :placeholder="'user.state_placeholder_select'"
          :uri="'/states'"
          :text="'name'"
          :values="body.state"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-12 mb-3">
        <!-- Bio -->
        <InputTextarea
          @input="$emit('input', (body.bio = $event))"
          :field="'userEditBio'"
          :label="'user.bio'"
          :placeholder="'user.bio_placeholder'"
          :value="profile.bio"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-6 mb-3">
        <!-- Gender -->
        <SelectField
          @input="$emit('input', (body.gender = $event))"
          :field="'userEditGender'"
          :label="'user.gender'"
          :placeholderSelect="'user.gender_placeholder_select'"
          :options="'genderOptions'"
          :value="profile.gender"
        />
      </div>
      <div class="col-12 col-md-6 mb-3">
        <!-- BirthDate -->
        <DatePicker
          @input="$emit('input', (body.birthDate = $event))"
          :field="'userEditBirthDate'"
          :label="'user.birthDate'"
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
import SelectField from "@/components/form/SelectField.vue";
import Select2Field from "@/components/form/Select2Field.vue";
import DatePicker from "@/components/form/DatePicker.vue";
import SubmitButton from "@/components/form/SubmitButton.vue";

export default {
  name: "UserEdit",
  mixins: [userEditValidation],
  emits: ["input", "close"],
  data() {
    return {
      body: {
        id: null,
        username: null,
        firstName: null,
        lastName: null,
        state: null,
        bio: null,
        gender: null,
        birthDate: null,
      },
    };
  },
  props: {
    profile: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters(["user"]),
  },
  methods: {
    setBody() {
      this.body.id = this.profile.id;
      this.body.username = this.profile.username;
      this.body.firstName = this.profile.firstName;
      this.body.lastName = this.profile.lastName;
      this.body.state = this.profile.state ? this.profile.state.id : null;
      this.body.bio = this.profile.bio;
      this.body.gender = this.profile.gender;
      this.body.birthDate = this.profile.birthDate;
    },
    // Form submit
    ...mapActions(["updateProfile", "updateUser", "reloadProfiles"]),
    async submitForm() {
      withSubmitValidation(async function () {
        const response = await this.updateProfile(this.body);
        // Success
        if (response.status >= 200 && response.status < 300) {
          // If my profile
          if (this.profile.id === this.user.id) {
            await this.updateUser(this.body);
          }
          // Reload profiles
          await this.reloadProfiles();
          // close modal (if any)
          this.$emit("close");
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
    InputTextarea,
    SelectField,
    Select2Field,
    DatePicker,
    SubmitButton,
  },
};
</script>