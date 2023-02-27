<template>
  <label :for="field" class="form-label" :class="{ required: required }">
    {{ $t(label) }}
  </label>
  <input
    @input="$emit('input', $event.target.value), $emit('input', formatDate())"
    class="form-control"
    type="date"
    :id="field"
    :name="field"
    :class="{ 'is-invalid': validateInput() }"
  />
  <div class="invalid-feedback" v-if="validateInput() !== ''">
    {{ $t(validateInput()) }}
  </div>
</template>

<script>
export default {
  name: "DatePicker",
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
      if (this.value) {
        // format the date to yyyy-mm-dd
        // For example: 2021-01-01T00:00:00+00:00 -> 2021-01-01
        const date = new Date(this.value);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        input.value = `${year}-${month.toString().padStart(2, "0")}-${day
          .toString()
          .padStart(2, "0")}`;
      }
    },
    formatDate() {
      const input = document.getElementById(this.field);
      if (!input.value) {
        return "";
      }
      // Input is in format yyyy-mm-dd
      // Format it to Y-m-d\TH:i:sP
      // For example: 2021-01-01 -> 2021-01-01T00:00:00+00:00
      const date = new Date(input.value);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();
      const offset = date.getTimezoneOffset();
      const offsetHours = Math.abs(Math.floor(offset / 60));
      const offsetMinutes = Math.abs(offset % 60);
      const offsetSign = offset < 0 ? "+" : "-";
      const offsetString = `${offsetSign}${offsetHours
        .toString()
        .padStart(2, "0")}:${offsetMinutes.toString().padStart(2, "0")}`;
      return `${year}-${month.toString().padStart(2, "0")}-${day
        .toString()
        .padStart(2, "0")}T${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}${offsetString}`;
    },
  },
  mounted() {
    this.fillInput();
  },
};
</script>