<template>
  <label :for="field" class="form-label" :class="{ required: required }">
    {{ $t(label) }}
  </label>
  <input
    @change="onFileChange($event)"
    type="file"
    class="form-control"
    :id="field"
    :name="field"
    :class="{ 'is-invalid': validateInput() }"
    :accept="accepts"
  />
  <div class="invalid-feedback" v-if="validateInput() !== ''">
    {{ $t(validateInput()) }}
  </div>
</template>

<script>
export default {
  name: "InputFile",
  props: {
    field: {
      type: String,
      required: true,
    },
    label: {
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
    accepts: {
      type: String,
      required: false,
      default: "image/*",
    },
  },
  emits: ["file-updated"],
  methods: {
    validateInput() {
      // if validate is empty string than is valid
      if (!this.validate) {
        return "";
      }
      // if validate is a function than call it
      return this.validate();
    },
    onFileChange($event) {
      // emit file
      this.$emit("file-updated", $event.target.files[0]);
    },
  },
};
</script>