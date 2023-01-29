<template>
    <div>
      <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" :checked="isDark" @change="toggleDark()">
      </div>
    </div>
  </template>
  
  <script>
  import { useDark, useToggle } from '@vueuse/core'
  import { setVar } from 'sass-vars-manager'
  
  export default {
    setup() {
      const isDark = useDark({
        selector: "html",
        attribute: "data-bs-theme",
        valueDark: "dark",
        valueLight: "light",
      });
  
      const toggleDark = useToggle(isDark)
  
      function changeTheme(theme) {
        setVar('$theme', theme)
      }
  
      return {
        isDark,
        toggleDark,
        changeTheme
      }
    }
  }
  </script>