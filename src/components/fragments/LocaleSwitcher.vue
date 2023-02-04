<template>
  <select v-model="selectedLocale">
    <option v-for="(locale, i) in locales" :key="`locale-${i}`" :value="locale">
      {{ locale }}
    </option>
  </select>
</template>

<script>
export default {
  name: "LocaleSwitcher",
  data() {
    return { locales: ["fr", "en"], selectedLocale: localStorage.getItem('locale') || 'fr' };
  },
  watch: {
    selectedLocale: function(newVal) {
      this.$i18n.locale = newVal;
      localStorage.setItem('locale', newVal);
      document.querySelector('html').setAttribute('lang', newVal);
    }
  },
  mounted() {
    document.querySelector('html').setAttribute('lang', this.selectedLocale);
  }
};
</script>