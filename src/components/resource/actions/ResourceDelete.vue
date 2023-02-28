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
import { mapGetters, mapActions } from "vuex";
import { addSuccessToast, addErrorToast } from "@/services/toasts";

import SubmitButton from "@/components/form/SubmitButton.vue";

export default {
  name: "ResourceDelete",
  computed: {
    ...mapGetters(["resource", "user"]),
  },
  methods: {
    ...mapActions(["deleteResource"]),
    async deleteResourceItem() {
      const response = await this.deleteResource(this.resource.id);
      if (response.status >= 200 && response.status < 300) {
        // close modal
        this.$emit("close");
        // redirect to home
        this.$router.push({ name: "resources" });
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