<template>
  <li class="nav-item dropdown fs-5">
    <a
      class="nav-link"
      href="#"
      role="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <span class="border-end border-2 pe-3">
        <i class="bi bi-translate"></i> {{ selectedLocale.toUpperCase() }}
        <i class="ms-2 dropdown-toggle"></i>
      </span>
    </a>
    <ul class="dropdown-menu">
      <li v-for="(locale, i) in locales" :key="`locale-${i}`">
        <a
          class="dropdown-item"
          href="#"
          @click.prevent="selectedLocale = locale"
        >
          <span class="fi fi-fr" v-if="locale === 'fr'"></span>
          <span class="fi fi-gb" v-else></span>
          {{ localesLabels[locale] }}
        </a>
      </li>
    </ul>
  </li>
</template>

<script>
// flag icons
import "/node_modules/flag-icons/css/flag-icons.min.css";

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