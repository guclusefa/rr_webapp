<template>
  <div class="form-check">
    <input
      @change="$emit('update:modelValue', $event.target.checked)"
      class="form-check-input"
      type="checkbox"
      :id="field"
      :name="field"
    />
    <label class="form-check-label" :for="field">{{ label }}</label>
  </div>
</template>

<script>
export default {
  name: "CheckBox",
  props: {
    field: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  },
};
</script>