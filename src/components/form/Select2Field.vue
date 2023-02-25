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
    <option value="" selected :disabled="required" v-if="placeholderSelect">
      {{ $t(placeholderSelect) }}
    </option>
    <option v-for="option in getOptions" :value="option.id" :key="option.id" :selected="this.value === option.id">
      {{ option.name }} ({{ option.code }})
    </option>
  </select>

  <div class="invalid-feedback" v-if="validateInput() !== ''">
    {{ $t(validateInput()) }}
  </div>
</template>

<script>
export default {
  name: "Select2Field",
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
      // type integer
      type: Number,
      required: false,
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
  computed: {
    getOptions() {
      return this.$store.getters[this.options];
    },
  },
  methods: {
    // set options
    setOptions() {
      this.$store.dispatch("setStates");
    },
    // validate input
    validateInput() {
      // if validate is empty string than is valid
      if (!this.validate) {
        return "";
      }
      // if validate is a function than call it
      return this.validate();
    },
  },
  mounted() {
    this.setOptions();
  },
};
</script>