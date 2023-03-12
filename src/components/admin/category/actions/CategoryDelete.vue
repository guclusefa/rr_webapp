<template>
  <form @submit.prevent="deleteCategoryItem" novalidate>
    <div class="row">
      <div class="col-12 mb-3">
        {{ $t("category.delete_confirmation") }}
      </div>
    </div>
    <div class="row">
      <div class="col-6 ms-auto text-end">
        <!-- Submit -->
        <SubmitButton :label="'category.delete'" />
      </div>
    </div>
  </form>
</template>

<script>
import { mapActions } from "vuex";
import { addSuccessToast, addErrorToast } from "@/services/toasts";

import SubmitButton from "@/components/form/SubmitButton.vue";

export default {
  name: "CategoryDelete",
  emits: ["input", "close"],
  props: {
    category: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ...mapActions(["deleteCategory", "reloadCategories"]),
    async deleteCategoryItem() {
      const response = await this.deleteCategory(this.category.id);
      if (response.status >= 200 && response.status < 300) {
        // close modal (if any)
        this.$emit("close");
        // redirect to home
        if (this.$route.name == "category") {
          this.$router.push({ name: "categories" });
        } else {
          this.reloadCategories();
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