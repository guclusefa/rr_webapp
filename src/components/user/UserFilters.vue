<template>
  <form @submit.prevent="filter()">
    <div class="row mb-3">
      <div class="col">
        <InputText
          @input="$emit('input', (params.search = $event))"
          :type="'search'"
          :field="'filterProfileSearch'"
          :label="'profiles.search'"
          :placeholder="'profiles.search_placeholder'"
          :value="profilesParams.search"
        />
      </div>
    </div>

    <div class="row mb-3">
      <div class="col">
        <SelectField
          @input="$emit('input', (params.certified = $event))"
          :field="'filterProfileCertified'"
          :label="'profiles.certified'"
          :placeholderSelect="'profiles.certified_placeholder_select'"
          :options="'booleanOptions'"
          :value="profilesParams.certified"
        />
      </div>
    </div>

    <div class="row mb-3">
      <div class="col">
        <SelectField
          @input="$emit('input', (params.role = $event))"
          :field="'filterProfileRoles'"
          :label="'profiles.roles'"
          :placeholder="'profiles.roles_placeholder_select'"
          :options="'rolesOptions'"
          :multiple="true"
          :select2="true"
          :values="profilesParams.role"
        />
      </div>
    </div>

    <div class="row mb-3">
      <div class="col">
        <Select2Field
          @input="$emit('input', (params.state = $event))"
          :field="'filterProfileStates'"
          :label="'profiles.states'"
          :placeholder="'profiles.states_placeholder_select'"
          :multiple="true"
          :uri="'/states'"
          :text="'name'"
          :values="profilesParams.state"
        />
      </div>
    </div>

    <div class="row mb-3">
      <div class="col">
        <SelectField
          @input="$emit('input', (params.gender = $event))"
          :field="'filterProfileGenders'"
          :label="'profiles.genders'"
          :placeholder="'profiles.genders_placeholder_select'"
          :options="'genderOptions'"
          :multiple="true"
          :select2="true"
          :values="profilesParams.gender"
        />
      </div>
    </div>

    <div class="row mb-3">
      <div class="col">
        <SelectField
          @input="$emit('input', (params.order = $event))"
          :field="'filterProfileOrder'"
          :label="'profiles.order'"
          :options="'profilesOrderOptions'"
          :value="profilesParams.order"
        />
      </div>
    </div>

    <div class="row mb-3">
      <div class="col">
        <SelectField
          @input="$emit('input', (params.direction = $event))"
          :field="'filterProfileDirection'"
          :label="'profiles.direction'"
          :options="'directionOptions'"
          :value="profilesParams.direction"
        />
      </div>
    </div>

    <div class="row mb-3">
      <div class="col">
        <SelectField
          @input="$emit('input', (params.limit = $event))"
          :field="'filterProfileLimit'"
          :label="'profiles.limit'"
          :options="'limitOptions'"
          :value="profilesParams.limit"
        />
      </div>
    </div>

    <div class="row mb-3">
      <div class="col">
        <SubmitButton :label="'profiles.filter'" />
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
  name: "UserFilters",
  data() {
    return {
      params: {
        search: "",
        certified: 0,
        role: [],
        state: [],
        gender: [],
        order: "createdAt",
        direction: "desc",
        limit: 10,
        page: 1,
      },
    };
  },
  computed: {
    ...mapGetters(["profilesParams"]),
  },
  methods: {
    ...mapActions(["filterProfiles"]),
    async filter() {
      await this.filterProfiles(this.params);
    },
  },
  created() {
    this.params = this.profilesParams;
  },
  components: {
    InputText,
    SelectField,
    Select2Field,
    SubmitButton,
  },
};
</script>