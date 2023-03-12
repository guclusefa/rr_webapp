<template>
  <form @submit.prevent="submitForm" novalidate>
    <div class="row">
      <div class="col-12 mb-3">
        <InputText
          @input="$emit('input', (body.name = $event))"
          :type="'text'"
          :field="'relationEditName'"
          :label="'relation.name_field'"
          :placeholder="'relation.name_field_placeholder'"
          :required="true"
          :validate="validateName"
          :value="this.edit ? relation.name : body.name"
        />
      </div>
    </div>

    <div class="row">
      <div class="col-6 ms-auto text-end">
        <!-- Submit -->
        <SubmitButton
          :label="this.edit ? 'relation.edit' : 'relation.create'"
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
  name: "RelationEdit",
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
    relation: {
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
      this.body.id = this.relation.id;
      this.body.name = this.relation.name;
    },
    // Form submit
    ...mapActions(["updateRelation", "createRelation", "reloadRelations"]),
    async submitForm() {
      withSubmitValidation(async function () {
        const response = this.edit
          ? await this.updateRelation(this.body)
          : await this.createRelation(this.body);
        // Success
        if (response.status >= 200 && response.status < 300) {
          await this.reloadRelations();

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