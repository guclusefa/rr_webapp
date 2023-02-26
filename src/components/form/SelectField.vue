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
    :class="{ 'is-invalid': validateInput() }"
  >
    <option value="" :disabled="required" v-if="placeholderSelect">
      {{ $t(placeholderSelect) }}
    </option>
    <option
      v-for="(value, key) in getOptions()"
      :key="key"
      :value="key"
      :selected="this.value == key || this.values.includes(key)"
    >
      <template v-if="isApiOptions">
        {{ value }}
      </template>
      <template v-else>
        {{ $t(value) }}
      </template>
    </option>
  </select>

  <div class="invalid-feedback" v-if="validateInput() !== ''">
    {{ $t(validateInput()) }}
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

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
    },
    values: {
      type: Array,
      required: false,
      default: () => [],
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
      stateOptions: {},
      isApiOptions: false,
    };
  },
  computed: {
    ...mapGetters(["states"]),
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
    // fill api options
    ...mapActions(["setStates"]),
    fillOptions() {
      switch (this.options) {
        case "stateOptions":
          this.isApiOptions = true;
          this.setStates().then(() => {
            for (const state of this.states) {
              this.stateOptions[state.id] = state.name + " (" + state.code + ")";
            }
          });
          break;
        default:
          break;
      }
    },
  },
  mounted() {
    this.fillOptions();
  },
};
</script>