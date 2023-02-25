<template>
  <label :for="field" class="form-label" :class="{ required: required }">
    {{ $t(label) }}
  </label>
  <select
    @input="$emit('input', $event.target.value)"
    class="form-control"
    :id="field"
    :name="field"
    :placeholder="$t(placeholder)"
    :class="{ 'is-invalid': validateInput() }"
  >
    <option value="" disabled selected v-if="placeholderSelect">
      {{ $t(placeholderSelect) }}
    </option>
    <option
      v-for="(value, key) in getOptions()"
      :key="key"
      :value="key"
      :selected="this.value === key"
    >
      {{ $t(value) }}
    </option>
  </select>

  <div class="invalid-feedback" v-if="validateInput() !== ''">
    {{ $t(validateInput()) }}
  </div>
</template>

<script>
export default {
  name: "SelectField",
  props: {
    field: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
    placeholderSelect: {
      type: String,
      required: true,
    },
    options: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: false,
      default: "",
    },
    required: {
      type: Boolean,
      required: false,
      default: false,
    },
    validate: {
      type: Function,
      required: false,
      default: () => "",
    },
  },
  emits: ["input"],
  data() {
    return {
      genderOptions: {
        M: "user.genders.M",
        F: "user.genders.F",
        O: "user.genders.O",
      },
    };
  },
  methods: {
    validateInput() {
      // if validate is empty string than is valid
      if (!this.validate) {
        return "";
      }
      // if validate is a function than call it
      return this.validate();
    },
    getOptions() {
      return this[this.options];
    },
  },
};
</script>