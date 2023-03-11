<template>
  <div>
    <label :for="field" class="form-label" :class="{ required: required }">
      {{ $t(label) }}
    </label>
    <div
      :class="{
        'invalid-content': validateInput() !== '',
      }"
    >
      <div ref="editor" v-html="value"></div>
    </div>
    <div class="invalid-message" v-if="validateInput() !== ''">
      {{ $t(validateInput()) }}
    </div>
  </div>
</template>

<script>
import Quill from "quill";
import "quill/dist/quill.snow.css";

export default {
  name: "WysiwygEditor",
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
  },
  mounted() {
    this.editor = new Quill(this.$refs.editor, {
      modules: {
        toolbar: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ font: [] }],
          ["bold", "italic", "underline"],
          [{ color: [] }, { background: [] }],
          [{ list: "ordered" }, { list: "bullet" }],
          ["code", "blockquote", "link", "image"],
          ["clean"],
        ],
      },
      placeholder: this.$t(this.placeholder),
      theme: "snow",
    });
    this.editor.on("text-change", () => {
      this.$emit("input", this.editor.root.innerHTML);
    });
  },
};
</script>

<style scoped lang="scss">
.invalid-content {
  border: 1px solid red !important;
}

.invalid-message {
  width: 100%;
  margin-top: 0.25rem;
  font-size: 0.875em;
  color: #dc3545;
}
</style>