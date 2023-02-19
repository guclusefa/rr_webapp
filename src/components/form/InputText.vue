<template>
  <label :for="field" class="form-label" :class="{ required: required }">
    {{ $t(label) }}
  </label>
  <input
    @input="$emit('input', $event.target.value)"
    :value="value"
    class="form-control"
    :type="type"
    :id="field"
    :name="field"
    :placeholder="$t(placeholder)"
    :class="{ 'is-invalid': validateInput() }"
  />
  <div class="invalid-feedback" v-if="validateInput() !== ''">
    {{ $t(validateInput()) }}
  </div>
</template>

<script>
export default {
  name: "InputText",
  props: {
    type: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: false,
      default: "",
    },
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
  methods: {
    validateInput() {
      // if validate is empty string than is valid
      if (!this.validate) {
        return "";
      }
      // if validate is a function than call it
      return this.validate();
    },
  },
};
</script>