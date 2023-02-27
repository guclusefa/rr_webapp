<template>
  <form @submit.prevent="submitForm" novalidate>
    <div class="row">
      <div class="col-12 mb-3">
        <InputText
          @input="$emit('input', (body.title = $event))"
          :type="'text'"
          :field="'title'"
          :label="'resource.title_field'"
          :placeholder="'resource.title_field_placeholder'"
          :required="true"
          :validate="validateTitle"
          :value="this.edit ? resource.title : body.title"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-12 mb-3">
        <InputTextarea
          @input="$emit('input', (body.content = $event))"
          :field="'content'"
          :label="'resource.content'"
          :placeholder="'resource.content_placeholder'"
          :required="true"
          :validate="validateContent"
          :value="this.edit ? resource.content : body.content"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-12 mb-3">
        <InputText
          @input="$emit('input', (body.link = $event))"
          :type="'url'"
          :field="'link'"
          :label="'resource.link'"
          :placeholder="'resource.link_placeholder'"
          :validate="validateLink"
          :value="this.edit ? resource.link : body.link"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-12 mb-3">
        <SelectField
          @input="$emit('input', (body.visibility = $event))"
          :field="'visibility'"
          :label="'resources.visibility'"
          :options="'resourcesVisibilityOptions'"
          :required="true"
          :value="this.edit ? resource.visibility : body.visibility"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-12 mb-3">
        <SelectField
          @input="$emit('input', (body.isPublished = $event))"
          :field="'isPublished'"
          :label="'resource.is_published'"
          :options="'booleanOptions'"
          :required="true"
          :value="this.edit ? resource.isPublished : body.isPublished"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-12 mb-3">
        <SelectField
          @input="$emit('input', (body.relation = $event))"
          :field="'relation'"
          :label="'resource.relation'"
          :placeholderSelect="'resource.relation_placeholder_select'"
          :options="'relationOptions'"
          :required="true"
          :validate="validateRelation"
          :value="this.edit ? resource.relation.id : body.relation"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-12 mb-3">
        <SelectField
          @input="$emit('input', (body.categories = $event))"
          :field="'categories'"
          :label="'resource.categories'"
          :options="'categoryOptions'"
          :multiple="true"
          :values="
            this.edit && resource.categories
              ? resource.categories.map((category) => category.id)
              : body.categories
          "
        />
      </div>
    </div>
    <div class="row">
      <div class="col-6 ms-auto text-end">
        <!-- Submit -->
        <SubmitButton
          :label="this.edit ? 'resource.edit' : 'resource.create'"
          :disabled="!validateForm()"
        />
      </div>
    </div>
  </form>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import resourceEditValidation from "@/mixins/resourceEditValidation.js";
import { withSubmitValidation } from "@/services/validators.js";
import { addSuccessToast, addErrorToast } from "@/services/toasts";

import InputText from "@/components/form/InputText.vue";
import InputTextarea from "@/components/form/InputTextarea.vue";
import SelectField from "@/components/form/SelectField.vue";
import SubmitButton from "@/components/form/SubmitButton.vue";
export default {
  name: "ResourceEdit",
  mixins: [resourceEditValidation],
  data() {
    return {
      body: {
        id: null,
        title: "",
        content: "",
        link: "",
        visibility: 1,
        isPublished: 1,
        relation: "",
        categories: [],
      },
    };
  },
  props: {
    edit: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    ...mapGetters(["resource"]),
  },
  methods: {
    setBody() {
      this.body.id = this.resource.id;
      this.body.title = this.resource.title;
      this.body.content = this.resource.content;
      this.body.link = this.resource.link;
      this.body.visibility = this.resource.visibility;
      this.body.isPublished = this.resource.isPublished;
      this.body.relation = this.resource.relation
        ? this.resource.relation.id
        : null;
      this.body.categories = this.resource.categories
        ? this.resource.categories.map((category) => category.id)
        : [];
    },
    // Form submit
    ...mapActions(["updateResource", "createResource", "reloadResources"]),
    async submitForm() {
      withSubmitValidation(async function () {
        const response = this.edit
          ? await this.updateResource(this.body)
          : await this.createResource(this.body);
        // Success
        if (response.status >= 200 && response.status < 300) {
          if (!this.edit) {
            this.reloadResources();
          }
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
    InputTextarea,
    SelectField,
    SubmitButton,
  },
};
</script>