<template>
  <label :for="field" class="form-label" :class="{ required: required }">
    {{ $t(label) }}
  </label>
  <textarea
    @input="$emit('input', $event.target.value)"
    class="form-control"
    :id="field"
    :name="field"
    :placeholder="$t(placeholder)"
    :class="{ 'is-invalid': validateInput() }"
  ></textarea>
  <div class="invalid-feedback" v-if="validateInput() !== ''">
    {{ $t(validateInput()) }}
  </div>
</template>
  
  <script>
export default {
  name: "InputTextarea",
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
    value: {
      type: String,
      required: false,
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
    fillInput() {
      const input = document.getElementById(this.field);
      if (this.value || this.value == '') {
        input.value = this.value;
      }
    },
  },
  mounted() {
    this.fillInput();
  },
};
</script>