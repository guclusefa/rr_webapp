<template>
  <label class="form-label" :for="field">{{ label }}</label>
  <input
    class="form-control"
    :type="type"
    :id="field"
    :name="field"
    :placeholder="placeholder"
    :value="value"
    @input="$emit('input', $event.target.value)"
    :required="validation.required.value"
  />
  <div class="invalid-feedback">
    {{ validation.required.message }}
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
    value: {
      type: String,
      required: true,
    },
    validation: {
      type: Object,
      required: true,
    },
  },
};
</script>