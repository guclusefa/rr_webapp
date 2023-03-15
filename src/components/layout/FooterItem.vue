<template>
  <div class="bg-light">
    <div class="container">
      <footer
        class="d-flex flex-wrap justify-content-between align-items-center py-2 my-2"
      >
        <p class="col-md-4 mb-0 text-muted">
          {{ $t("footer.copyright", { year: currentYear }) }}
        </p>

        <ul class="nav col-md-4 justify-content-end">
          <li class="nav-item">
            <a href="#" class="nav-link px-2 text-muted hotfix"
              ><router-link to="/legal">{{
                $t("legal.page")
              }}</router-link></a
            >
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link px-2 text-muted"
              ><router-link to="/accessibility">{{
                $t("accessibility.page")
              }}</router-link></a
            >
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link px-2 text-muted"
              ><router-link to="/about">{{
                $t("about.page")
              }}</router-link></a
            >
          </li>
        </ul>
      </footer>
    </div>
  </div>
</template>




<script>
export default {
  name: "FooterItem",
  data() {
    return {
      currentYear: new Date().getFullYear(),
    };
  },
};
</script>

<style scoped>
@media (max-width: 768px) {
  .hotfix {
    margin-left: -0.5rem;
  }
}
</style>