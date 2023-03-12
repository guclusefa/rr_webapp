<template>
  <form @submit.prevent="submitForm" novalidate>
    <div class="row">
      <div class="col-12 mb-3">
        <InputText
          @input="$emit('input', (body.name = $event))"
          :type="'text'"
          :field="'categoryEditName'"
          :label="'category.name_field'"
          :placeholder="'category.name_field_placeholder'"
          :required="true"
          :validate="validateName"
          :value="this.edit ? category.name : body.name"
        />
      </div>
    </div>

    <div class="row">
      <div class="col-6 ms-auto text-end">
        <!-- Submit -->
        <SubmitButton
          :label="this.edit ? 'category.edit' : 'category.create'"
          :disabled="!validateForm()"
        />
      </div>
    </div>
  </form>
</template>

<script>
import { mapActions } from "vuex";
import typeEditValidation from "@/mixins/typeEditValidation.js";
import { withSubmitValidation } from "@/services/validators.js";
import { addSuccessToast, addErrorToast } from "@/services/toasts";

import InputText from "@/components/form/InputText.vue";
import SubmitButton from "@/components/form/SubmitButton.vue";
export default {
  name: "CategoryEdit",
  mixins: [typeEditValidation],
  emits: ["input", "close"],
  data() {
    return {
      body: {
        id: null,
        name: "",
      },
    };
  },
  props: {
    category: {
      type: Object,
      required: false,
      default: null,
    },
    edit: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  methods: {
    setBody() {
      this.body.id = this.category.id;
      this.body.name = this.category.name;
    },
    // Form submit
    ...mapActions(["updateCategory", "createCategory", "reloadCategories"]),
    async submitForm() {
      withSubmitValidation(async function () {
        const response = this.edit
          ? await this.updateCategory(this.body)
          : await this.createCategory(this.body);
        // Success
        if (response.status >= 200 && response.status < 300) {
          await this.reloadCategories();

          addSuccessToast(response);
          // Close modal (if any)
          this.$emit("close");
          return;
        }
        // Error
        addErrorToast(response);
      }).apply(this);
    },
  },
  mounted() {
    if (this.edit) {
      this.setBody();
    }
  },
  components: {
    InputText,
    SubmitButton,
  },
};
</script>