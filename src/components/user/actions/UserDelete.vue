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
  emits: ["input", "close"],
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
    ...mapActions(["deleteProfile", "logout", "reloadProfiles"]),
    async deleteUserProfile() {
      const idProfile = this.profile.id;
      const idUser = this.user.id;
      const response = await this.deleteProfile(this.profile.id);
      if (response.status >= 200 && response.status < 300) {
        // succes
        addSuccessToast(response);
        // if user deletes own profile, logout
        if (idProfile == idUser) {
          this.logout();
          this.$router.push({ name: "home" });
          return;
        }
        // redirect to home
        if (this.$route.name == "profile") {
          this.$router.push({ name: "profiles" });
        } else {
          // reload profiles
          this.reloadProfiles();
        }
        // close modal
        this.$emit("close");
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