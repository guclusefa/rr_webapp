<template>
  <li class="nav-item dropdown">
    <a
      class="nav-link dropdown-toggle"
      href="#"
      role="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <span v-if="selectedLocale === 'fr'">🇫🇷</span>
      <span v-else>🇬🇧</span>
    </a>
    <ul class="dropdown-menu">
      <li v-for="(locale, i) in locales" :key="`locale-${i}`">
        <a
          class="dropdown-item"
          href="#"
          @click.prevent="selectedLocale = locale"
        >
          {{ localesLabels[locale] }}
        </a>
      </li>
    </ul>
  </li>
</template>

<script>
export default {
  name: "LocaleItem",
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
      /* // reload the page to update the translations because of the way we get messages
      location.reload(); */
    },
  },
  created() {
    this.$i18n.locale = this.selectedLocale;
  },
};
</script>