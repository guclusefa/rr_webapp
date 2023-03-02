<template>
  <label :for="field" class="form-label" :class="{ required: required }">
    {{ $t(label) }}
  </label>
  <select
    class="form-control"
    :id="field"
    :name="field"
    :multiple="multiple"
    :class="{ 'is-invalid': validateInput() }"
  ></select>
  <div class="invalid-feedback" v-if="validateInput() !== ''">
    {{ $t(validateInput()) }}
  </div>
</template>

<script>
import "select2/dist/css/select2.css";
import "select2-bootstrap-5-theme/dist/select2-bootstrap-5-theme.css";
import $ from "jquery";
import "select2";

export default {
  name: "AboutView",
  emits: ["input"],
  props: {
    field: {
      type: String,
      required: true,
    },
    required: {
      type: Boolean,
      required: false,
      default: false,
    },
    label: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
    multiple: {
      type: Boolean,
      required: true,
    },
    uri: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    values: {
      type: Array,
      required: false,
      default: () => [],
    },
    validate: {
      type: Function,
      required: false,
      default: () => "",
    },
  },
  methods: {
    // validate input
    validateInput() {
      // if validate is empty string than is valid
      if (!this.validate) {
        return "";
      }
      // if validate is a function than call it
      return this.validate();
    },

    createSelect2(field, placeholder, multiple, uri, text, values) {
      var select2 = $("#" + field);
      // Fill select2 with values
      this.setSelect2Values(select2, placeholder, multiple, uri, text);
      // Fill select2 with selected values
      if (values) {
        values = values.map((value) => parseInt(value));
        values.forEach((value) => {
          this.fillSelectedValues(select2, uri, value, text);
        });
      }
    },
    setSelect2Values(select2, placeholder, multiple, uri, text) {
      select2.select2({
        // Global options
        theme: "bootstrap-5",
        width: "100%",
        allowClear: true,
        // Dynamic options
        placeholder: this.$t(placeholder),
        multiple: multiple,
        // Ajax options
        ajax: {
          url: process.env.VUE_APP_API_URL + uri,
          dataType: "json",
          delay: 250,
          data: function (params) {
            return {
              search: params.term,
              page: params.page,
            };
          },
          processResults: function (data, params) {
            params.page = params.page || 1;
            return {
              results: data.data.map((item) => {
                return {
                  id: item.id,
                  text: item[text],
                };
              }),
              pagination: {
                more: data.meta.page < data.meta.pages,
              },
            };
          },
          cache: true,
        },
      });
    },
    fillSelectedValues(select2, uri, id, text) {
      $.ajax({
        url: process.env.VUE_APP_API_URL + uri + "/" + id,
        dataType: "json",
        success: function (data) {
          // create the option and append to Select2
          var option = new Option(data[text], data.id, true, true);
          select2.append(option).trigger("change");
          // hide option
          select2.find("option[value='" + data.id + "']").hide();
        },
      });
    },
  },
  mounted() {
    // every time the input changes of the select2 field
    var select2 = $("#" + this.field);
    select2.on("change", () => {
      this.$emit("input", select2.val());
    });

    this.createSelect2(
      this.field,
      this.placeholder,
      this.multiple,
      this.uri,
      this.text,
      this.values
    );
  },
};
</script>