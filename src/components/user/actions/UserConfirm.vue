<template>
  <form @submit.prevent="sendEmailVerification" novalidate>
    <div class="row">
      <div class="col-12 mb-3">
        {{ $t("profile.verify_email_description") }}
      </div>
    </div>
    <div class="row">
      <div class="col-6 ms-auto text-end">
        <!-- Submit -->
        <SubmitButton :label="'profile.verify_email'" />
      </div>
    </div>
  </form>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { addSuccessToast, addErrorToast } from "@/services/toasts";

import SubmitButton from "@/components/form/SubmitButton.vue";

export default {
  name: "UserConfirm",
  computed: {
    ...mapGetters(["profile"]),
  },
  emits: ["input", "close"],
  methods: {
    // send email verification
    ...mapActions(["confirmEmail"]),
    async sendEmailVerification() {
      const response = await this.confirmEmail(this.profile.id);
      if (response.status >= 200 && response.status < 300) {
        // close modal
        this.$emit("close");
        addSuccessToast(response);
        return;
      }
      // Error
      addErrorToast(response);
    },
  },
  components: {
    SubmitButton,
  },
};
</script>