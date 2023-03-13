<template>
  <form @submit.prevent="submitForm" novalidate>
    <div class="row">
      <div class="col-12 mb-3">
        <Select2Field
          @input="$emit('input', (body.user = $event))"
          :field="'banEditUser'"
          :label="'ban.user'"
          :placeholder="'ban.user_placeholder_select'"
          :required="true"
          :uri="'/users'"
          :text="'username'"
          :validate="validateUser"
          :values="this.edit ? ban.user : body.user"
          :disabled="this.edit"
        />
      </div>
    </div>

    <div class="row">
      <div class="col-12 mb-3">
        <InputText
          @input="$emit('input', (body.reason = $event))"
          :type="'text'"
          :field="'banEditName'"
          :label="'ban.reason'"
          :placeholder="'ban.reason_field_placeholder'"
          :required="true"
          :validate="validateReason"
          :value="this.edit ? ban.reason : body.reason"
        />
      </div>
    </div>

    <div class="row">
      <div class="col-12 mb-3">
        <DatePicker
          @input="$emit('input', (body.endDate = $event))"
          :field="'banEditEndDate'"
          :label="'ban.endDate'"
          :value="this.edit ? ban.endDate : body.endDate"
        />
      </div>
    </div>

    <div class="row">
      <div class="col-6 ms-auto text-end">
        <!-- Submit -->
        <SubmitButton
          :label="this.edit ? 'ban.edit' : 'ban.create'"
          :disabled="!validateForm()"
        />
      </div>
    </div>
  </form>
</template>

<script>
import { mapActions } from "vuex";
import userBanEditValidation from "@/mixins/userBanEditValidation";
import { withSubmitValidation } from "@/services/validators.js";
import { addSuccessToast, addErrorToast } from "@/services/toasts";

import Select2Field from "@/components/form/Select2Field.vue";
import InputText from "@/components/form/InputText.vue";
import DatePicker from "@/components/form/DatePicker.vue";
import SubmitButton from "@/components/form/SubmitButton.vue";

export default {
  name: "BanEdit",
  mixins: [userBanEditValidation],
  emits: ["input", "close"],
  data() {
    return {
      body: {
        id: null,
        user: null,
        reason: "",
        endDate: null,
      },
    };
  },
  props: {
    ban: {
      type: Object,
      required: false,
      default: null,
    },
    edit: {
      type: Boolean,
      required: false,
      default: true,
    },
    profile: {
      type: Object,
      required: false,
      default: null,
    },
  },
  methods: {
    setBody() {
      this.body.id = this.ban.id;
      this.body.user = this.ban.user.id;
      this.body.reason = this.ban.reason;
      this.body.endDate = this.ban.endDate;
    },
    setProfile() {
      this.body.user = this.profile.id;
    },
    // Form submit
    ...mapActions(["updateBan", "createBan", "reloadBans"]),
    async submitForm() {
      withSubmitValidation(async function () {
        const response = this.edit
          ? await this.updateBan(this.body)
          : await this.createBan(this.body);
        // Success
        if (response.status >= 200 && response.status < 300) {
          await this.reloadBans();

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
  beforeMount() {
    if (this.edit) {
      this.setBody();
    }
    if (this.profile) {
      this.setProfile();
    }
  },
  components: {
    Select2Field,
    InputText,
    DatePicker,
    SubmitButton,
  },
};
</script>