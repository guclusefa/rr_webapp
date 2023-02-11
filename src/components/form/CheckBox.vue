<template>
  <div class="form-check">
    <input
      class="form-check-input"
      type="checkbox"
      :id="field"
      :name="field"
      :required="required"
      :value="value"
      :checked="checked"
      @change="$emit('update:modelValue', $event.target.checked)"
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
    required: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
      required: true,
    },
    checked: {
      type: Boolean,
      default: false,
    },
  },
};
</script>