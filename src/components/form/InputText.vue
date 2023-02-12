<template>
  <label class="form-label" :for="field">{{ label }}</label>
  <input
    @input="$emit('input', $event.target.value)"
    class="form-control"
    :type="type"
    :id="field"
    :name="field"
    :placeholder="placeholder"
  />
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
  },
};
</script>