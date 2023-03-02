<template>
  <form @submit.prevent="filter()">
    <div class="row mb-3">
      <div class="col">
        <InputText
          @input="$emit('input', (params.search = $event))"
          :type="'search'"
          :field="'filterResourceSearch'"
          :label="'resources.search'"
          :placeholder="'resources.search_placeholder'"
          :value="resourcesParams.search"
        />
      </div>
    </div>

    <div class="row mb-3">
      <div class="col">
        <SelectField
          @input="$emit('input', (params.verified = $event))"
          :field="'filterResourceVerified'"
          :label="'resources.verified'"
          :placeholder-select="'resources.verified_placeholder_select'"
          :options="'resourcesVerifiedOptions'"
          :value="resourcesParams.verified"
        />
      </div>
    </div>

    <div class="row mb-3">
      <div class="col">
        <SelectField
          @input="$emit('input', (params.visibility = $event))"
          :field="'filterResourceVisibility'"
          :label="'resources.visibility'"
          :placeholder-select="'resources.visibility_placeholder_select'"
          :options="'resourcesVisibilityOptions'"
          :value="resourcesParams.visibility"
        />
      </div>
    </div>

    <div class="row mb-3">
      <div class="col">
        <Select2Field
          @input="$emit('input', (params.author = $event))"
          :field="'filterResourceAuthor'"
          :label="'resources.authors'"
          :placeholder="'resources.authors_placeholder_select'"
          :multiple="true"
          :uri="'/users'"
          :text="'username'"
          :values="resourcesParams.author"
        />
      </div>
    </div>

    <div class="row mb-3">
      <div class="col">
        <Select2Field
          @input="$emit('input', (params.relation = $event))"
          :field="'filterResourceRelation'"
          :label="'resources.relations'"
          :placeholder="'resources.relations_placeholder_select'"
          :multiple="true"
          :uri="'/relations'"
          :text="'name'"
          :values="resourcesParams.relation"
        />
      </div>
    </div>

    <div class="row mb-3">
      <div class="col">
        <Select2Field
          @input="$emit('input', (params.category = $event))"
          :field="'filterResourceCategory'"
          :label="'resources.categories'"
          :placeholder="'resources.categories_placeholder_select'"
          :multiple="true"
          :uri="'/categories'"
          :text="'name'"
          :values="resourcesParams.category"
        />
      </div>
    </div>

    <div class="row mb-3">
      <div class="col">
        <SelectField
          @input="$emit('input', (params.order = $event))"
          :field="'filterResourceOrder'"
          :label="'resources.order'"
          :options="'resourcesOrderOptions'"
          :value="resourcesParams.order"
        />
      </div>
    </div>

    <div class="row mb-3">
      <div class="col">
        <SelectField
          @input="$emit('input', (params.direction = $event))"
          :field="'filterResourceDirection'"
          :label="'resources.direction'"
          :options="'directionOptions'"
          :value="resourcesParams.direction"
        />
      </div>
    </div>

    <div class="row mb-3">
      <div class="col">
        <SubmitButton :label="'resources.filter'" />
      </div>
    </div>
  </form>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import InputText from "@/components/form/InputText.vue";
import SelectField from "@/components/form/SelectField.vue";
import Select2Field from "@/components/form/Select2Field.vue";
import SubmitButton from "@/components/form/SubmitButton.vue";

export default {
  name: "ResourceFilters",
  data() {
    return {
      params: {
        search: "",
        verified: "",
        visibility: 0,
        author: [],
        relation: [],
        category: [],
        order: "createdAt",
        direction: "DESC",
        limit: 10,
        page: 1,
      },
    };
  },
  computed: {
    ...mapGetters(["resourcesParams"]),
  },
  methods: {
    ...mapActions(["filterResources"]),
    async filter() {
      await this.filterResources(this.params);
    },
  },
  created() {
    this.params = this.resourcesParams;
  },
  components: {
    InputText,
    SelectField,
    Select2Field,
    SubmitButton,
  },
};
</script>