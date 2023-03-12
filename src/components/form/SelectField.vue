<template>
  <label :for="field" class="form-label" :class="{ required: required }">
    {{ $t(label) }}
  </label>
  <select
    @input="handleInput($event)"
    class="form-control"
    :id="field"
    :name="field"
    :multiple="multiple"
    :class="{ 'is-invalid': validateInput(), 'd-none': select2 }"
  >
    {{
      value
    }}
    <option
      value=""
      :disabled="required"
      v-if="placeholderSelect"
      :selected="this.value === ''"
    >
      {{ $t(placeholderSelect) }}
    </option>
    <option
      v-for="(value, key) in getOptions()"
      :key="key"
      :value="key"
      :selected="
        this.value == key ||
        this.value == parseInt(key) ||
        this.values.includes(key) ||
        this.values.includes(parseInt(key))
      "
    >
      {{ $t(value) }}
    </option>
  </select>

  <div class="invalid-feedback" v-if="validateInput() !== ''">
    {{ $t(validateInput()) }}
  </div>
</template>

<script>
import $ from "jquery";
import "select2/dist/css/select2.css";
import "select2-bootstrap-5-theme/dist/select2-bootstrap-5-theme.css";
import "select2";

export default {
  name: "SelectField",
  emits: ["input"],
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
      required: false,
    },
    placeholderSelect: {
      type: String,
      required: false,
    },
    options: {
      type: String,
      required: true,
    },
    multiple: {
      type: Boolean,
      required: false,
      default: false,
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
      required: false,
      default: "",
    },
    values: {
      type: Array,
      required: false,
      default: () => [],
    },
    select2: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      genderOptions: {
        M: "user.genders.M",
        F: "user.genders.F",
        O: "user.genders.O",
      },
      booleanOptions: {
        0: "app.no",
        1: "app.yes",
      },
      rolesOptions: {
        ROLE_USER: "user.roles.ROLE_USER",
        ROLE_MODERATOR: "user.roles.ROLE_MODERATOR",
        ROLE_ADMIN: "user.roles.ROLE_ADMIN",
        ROLE_SUPER_ADMIN: "user.roles.ROLE_SUPER_ADMIN",
      },
      profilesOrderOptions: {
        createdAt: "profiles.orders.createdAt",
        username: "profiles.orders.username",
        firstName: "profiles.orders.firstName",
        lastName: "profiles.orders.lastName",
      },
      resourcesOrderOptions: {
        createdAt: "resources.orders.createdAt",
        title: "resources.orders.title",
        likes: "resources.orders.likes",
        comments: "resources.orders.comments",
        shares: "resources.orders.shares",
        exploits: "resources.orders.exploits",
        saves: "resources.orders.saves",
        consults: "resources.orders.consults",
      },
      commentsOrderOptions: {
        createdAt: "comments.orders.createdAt",
        content: "comments.orders.content",
      },
      resourcesVerifiedOptions: {
        0: "resources.verifies.0",
        1: "resources.verifies.1",
      },
      resourcesVisibilityOptions: {
        1: "resources.visibilities.1",
        2: "resources.visibilities.2",
        3: "resources.visibilities.3",
      },
      directionOptions: {
        DESC: "app.desc",
        ASC: "app.asc",
      },
      limitOptions: {
        10: "app.limits.10",
        25: "app.limits.25",
        50: "app.limits.50",
        100: "app.limits.100",
      },
    };
  },
  methods: {
    // handle input if multiple or not
    handleInput(event) {
      const selectedValues = Array.from(
        event.target.selectedOptions,
        (option) => option.value
      );
      this.$emit("input", this.multiple ? selectedValues : selectedValues[0]);
    },
    // validate input
    validateInput() {
      // if validate is empty string than is valid
      if (!this.validate) {
        return "";
      }
      // if validate is a function than call it
      return this.validate();
    },
    // get options
    getOptions() {
      return this[this.options];
    },
  },
  mounted() {
    if (this.select2) {
      var select2 = $("#" + this.field);
      select2.select2({
        theme: "bootstrap-5",
        width: "100%",
        allowClear: true,
        language: this.$i18n.locale,

        placeholder: this.$t(this.placeholder),
      });
      // every time the input changes of the select2 field
      select2.on("change", () => {
        this.$emit("input", select2.val());
      });
    }
  },
};
</script>