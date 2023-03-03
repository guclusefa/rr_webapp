<template>
  <form @submit.prevent="deleteResourceItem" novalidate>
    <div class="row">
      <div class="col-12 mb-3">
        {{ $t("resource.delete_confirmation") }}
      </div>
    </div>
    <div class="row">
      <div class="col-6 ms-auto text-end">
        <!-- Submit -->
        <SubmitButton :label="'resource.delete'" />
      </div>
    </div>
  </form>
</template>

<script>
import { mapActions } from "vuex";
import { addSuccessToast, addErrorToast } from "@/services/toasts";

import SubmitButton from "@/components/form/SubmitButton.vue";

export default {
  name: "ResourceDelete",
  emits: ["input", "close"],
  props: {
    resource: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ...mapActions(["deleteResource", "reloadResources"]),
    async deleteResourceItem() {
      const response = await this.deleteResource(this.resource.id);
      if (response.status >= 200 && response.status < 300) {
        // close modal (if any)
        this.$emit("close");
        // redirect to home
        if (this.$route.name == "resource") {
          this.$router.push({ name: "resources" });
        } else {
          this.reloadResources();
        }
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