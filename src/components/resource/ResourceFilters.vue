<template>
  <form @submit.prevent="filter()">
    <div class="row mb-3">
      <div class="col">
        <InputText
          @input="$emit('input', (params.search = $event))"
          :type="'search'"
          :field="'search'"
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
          :field="'verified'"
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
          :field="'visibility'"
          :label="'resources.visibility'"
          :placeholder-select="'resources.visibility_placeholder_select'"
          :options="'resourcesVisibilityOptions'"
          :value="resourcesParams.visibility"
        />
      </div>
    </div>

    <div class="row mb-3" v-if="!isProfile">
      <div class="col">
        <SelectField
          @input="$emit('input', (params.author = $event))"
          :field="'author'"
          :label="'resources.authors'"
          :options="'authorOptions'"
          :multiple="true"
          :values="resourcesParams.author"
        />
      </div>
    </div>

    <div class="row mb-3">
      <div class="col">
        <SelectField
          @input="$emit('input', (params.relation = $event))"
          :field="'relation'"
          :label="'resources.relations'"
          :options="'relationOptions'"
          :multiple="true"
          :values="resourcesParams.relation"
        />
      </div>
    </div>

    <div class="col">
      <SelectField
        @input="$emit('input', (params.category = $event))"
        :field="'category'"
        :label="'resources.categories'"
        :options="'categoryOptions'"
        :multiple="true"
        :values="resourcesParams.category"
      />
    </div>

    <div class="row mb-3">
      <div class="col">
        <SelectField
          @input="$emit('input', (params.order = $event))"
          :field="'order'"
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
          :field="'direction'"
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
import SubmitButton from "@/components/form/SubmitButton.vue";

export default {
  name: "UserFilters",
  props: {
    isProfile: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
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
      // If the component is used in the profile page, the author is set to the profile id
      if (this.isProfile) {
        this.params.author = [this.$route.params.id];
      }
      await this.filterResources(this.params);
    },
  },
  created() {
    this.params = this.resourcesParams;
  },
  components: {
    InputText,
    SelectField,
    SubmitButton,
  },
};
</script>