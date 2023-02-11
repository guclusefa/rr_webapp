<template>
  <select v-model="selectedLocale">
    <option v-for="(locale, i) in locales" :key="`locale-${i}`" :value="locale">
      {{ localesLabels[locale] }}
    </option>
  </select>
</template>

<script>
export default {
  name: "LocaleSwitcher",
  data() {
    return {
      localesLabels: {
        fr: "Français",
        en: "English",
      },
      locales: ["fr", "en"],
      selectedLocale: localStorage.getItem("locale") || "fr",
    };
  },
  watch: {
    selectedLocale: function (newVal) {
      this.$i18n.locale = newVal;
      localStorage.setItem("locale", newVal);
      // reload the page to update the translations
      location.reload();
    },
  },
  created() {
    this.$i18n.locale = this.selectedLocale;
  },
};
</script>