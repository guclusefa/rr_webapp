<template>
  <form @submit.prevent="promote" novalidate>
    <div class="row">
      <div class="col-12 mb-3">
        <SelectField
          @input="$emit('input', (body.role = $event))"
          :field="'promoteProfile'"
          :label="'profile.role'"
          :options="'rolesOptions'"
          :required="true"
          :values="profile.roles"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-6 ms-auto text-end">
        <!-- Submit -->
        <SubmitButton :label="'profile.promote'" />
      </div>
    </div>
  </form>
</template>
    
<script>
import { mapActions } from "vuex";
import { addSuccessToast, addErrorToast } from "@/services/toasts";

import SelectField from "@/components/form/SelectField.vue";
import SubmitButton from "@/components/form/SubmitButton.vue";

export default {
  name: "UserPromote",
  emits: ["input", "close"],
  props: {
    profile: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      body: {
        id: null,
        role: [],
      },
    };
  },
  methods: {
    setBody() {
      this.body.id = this.profile.id;
      this.body.role = this.profile.roles;
    },
    setRole(role) {
      switch (role) {
        case "ROLE_SUPER_ADMIN":
          this.body.role = 3;
          break;
        case "ROLE_ADMIN":
          this.body.role = 2;
          break;
        case "ROLE_MODERATOR":
          this.body.role = 1;
          break;
        case "ROLE_USER":
          this.body.role = 0;
          break;
      }
    },
    // send email verification
    ...mapActions(["promoteProfile", "reloadProfiles", "setProfile"]),
    async promote() {
      this.setRole(this.body.role);
      // Promote
      const response = await this.promoteProfile(this.body);
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
  mounted() {
    this.setBody();
  },
  components: {
    SelectField,
    SubmitButton,
  },
};
</script>