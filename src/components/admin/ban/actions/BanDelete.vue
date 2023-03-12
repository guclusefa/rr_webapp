<template>
  <form @submit.prevent="deleteBanItem" novalidate>
    <div class="row">
      <div class="col-12 mb-3">
        {{ $t("ban.delete_confirmation") }}
      </div>
    </div>
    <div class="row">
      <div class="col-6 ms-auto text-end">
        <!-- Submit -->
        <SubmitButton :label="'ban.delete'" />
      </div>
    </div>
  </form>
</template>

<script>
import { mapActions } from "vuex";
import { addSuccessToast, addErrorToast } from "@/services/toasts";

import SubmitButton from "@/components/form/SubmitButton.vue";

export default {
  name: "BanDelete",
  emits: ["input", "close"],
  props: {
    ban: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ...mapActions(["deleteBan", "reloadBans"]),
    async deleteBanItem() {
      const response = await this.deleteBan(this.ban.id);
      if (response.status >= 200 && response.status < 300) {
        // close modal (if any)
        this.$emit("close");
        // redirect to home
        if (this.$route.name == "ban") {
          this.$router.push({ name: "bans" });
        } else {
          this.reloadBans();
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