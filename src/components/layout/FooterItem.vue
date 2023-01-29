<template>
  <footer>
    <div class="container">
        <p>{{ $t("footer.copyright", {year: currentYear}) }}</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterItem",
  data() {
    return {
      currentYear: new Date().getFullYear()
    };
  }
};
</script>