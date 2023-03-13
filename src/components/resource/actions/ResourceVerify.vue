<template>
  <form @submit.prevent="verify" novalidate>
    <div class="row">
      <div class="col-12 mb-3" v-if="unverify">
        {{ $t("resource.unverify_description") }}
      </div>
      <div class="col-12 mb-3" v-else>
        {{ $t("resource.verify_description") }}
      </div>
    </div>
    <div class="row">
      <div class="col-6 ms-auto text-end">
        <!-- Submit -->
        <SubmitButton
          :label="unverify ? 'resource.unverify' : 'resource.verify'"
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
  name: "ResourceVerify",
  emits: ["input", "close"],
  props: {
    resource: {
      type: Object,
      required: true,
    },
    unverify: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    // send email verification
    ...mapActions(["verifyResource", "reloadResources", "setResource"]),
    async verify() {
      const response = await this.verifyResource(this.resource.id);
      if (response.status >= 200 && response.status < 300) {
        if (this.$route.name === "resource") {
          await this.setResource(this.resource.id);
        } else {
          await this.reloadResources();
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