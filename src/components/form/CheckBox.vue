<template>
  <div class="form-check">
    <input
      @change="$emit('update:modelValue', $event.target.checked)"
      class="form-check-input"
      type="checkbox"
      :id="field"
      :name="field"
      :class="{ 'is-invalid': validateInput() }"
    />
    <label
      :for="field"
      class="form-check-label"
      :class="{ required: required }"
    >
      <template v-if="label === 'register.accept_terms'">
        <router-link to="/legal" target="_blank">
          {{ $t(label) }}
        </router-link>
      </template>
      <template v-else>
        {{ $t(label) }}
      </template>
    </label>
    <div class="invalid-feedback" v-if="validateInput() !== ''">
      {{ $t(validateInput()) }}
    </div>
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
      required: false,
      default: false,
    },
    validate: {
      type: Function,
      required: false,
      default: () => "",
    },
  },
  emits: ["update:modelValue"],
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