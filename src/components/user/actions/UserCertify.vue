<template>
  <form @submit.prevent="certify" novalidate>
    <div class="row">
      <div class="col-12 mb-3" v-if="uncertify">
        {{ $t("profile.uncertify_description") }}
      </div>
      <div class="col-12 mb-3" v-else>
        {{ $t("profile.certify_description") }}
      </div>
    </div>
    <div class="row">
      <div class="col-6 ms-auto text-end">
        <!-- Submit -->
        <SubmitButton
          :label="uncertify ? 'profile.uncertify' : 'profile.certify'"
        />
      </div>
    </div>
  </form>
</template>
  
  <script>
import { mapActions } from "vuex";
import { addSuccessToast, addErrorToast } from "@/services/toasts";

import SubmitButton from "@/components/form/SubmitButton.vue";

export default {
  name: "UserCertify",
  emits: ["input", "close"],
  props: {
    profile: {
      type: Object,
      required: true,
    },
    uncertify: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    // send email verification
    ...mapActions(["certifyProfile", "reloadProfiles", "setProfile"]),
    async certify() {
      const response = await this.certifyProfile(this.profile.id);
      if (response.status >= 200 && response.status < 300) {
        if (this.$route.name === "profile") {
          await this.setProfile(this.profile.id);
        } else {
          await this.reloadProfiles();
        }
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