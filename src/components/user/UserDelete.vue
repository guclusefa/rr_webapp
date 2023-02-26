<template>
  <form @submit.prevent="deleteUserProfile" novalidate>
    <div class="row">
      <div class="col-12 mb-3">
        {{ $t("profile.delete_confirmation") }}
      </div>
    </div>
    <div class="row">
      <div class="col-6 ms-auto text-end">
        <!-- Submit -->
        <SubmitButton :label="'profile.delete'" />
      </div>
    </div>
  </form>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { addSuccessToast, addErrorToast } from "@/services/toasts";

import SubmitButton from "@/components/form/SubmitButton.vue";

export default {
  name: "UserDelete",
  computed: {
    ...mapGetters(["profile", "user"]),
  },
  methods: {
    // send email verification
    ...mapActions(["deleteProfile", "logout"]),
    async deleteUserProfile() {
      const response = await this.deleteProfile(this.profile.id);
      if (response.status >= 200 && response.status < 300) {
        // if user deletes own profile, logout
        if (this.profile.id === this.user.id) {
          this.logout();
        }
        // close modal
        this.$emit("close");
        // redirect to home
        this.$router.push({ name: "home" });
        // Success
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