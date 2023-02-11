<template>
  <div class="nav-link">
    <div class="form-check form-switch">
      <input
        class="form-check-input"
        type="checkbox"
        role="switch"
        id="flexSwitchCheckChecked"
        :checked="isDark"
        @change="toggleDark()"
      />
    </div>
  </div>
</template>

<script setup>
import { useDark, useToggle } from "@vueuse/core";

const isDark = useDark({
  selector: "body", //element to add attribute to
  attribute: "data-bs-theme", // attribute name
  valueDark: "dark", // attribute value for dark mode
  valueLight: "light", // attribute value for light mode
});

const toggleDark = useToggle(isDark);
</script>