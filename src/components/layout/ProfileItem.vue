<template>
  <li class="nav-item dropdown">
    <a
      class="nav-link dropdown-toggle"
      href="#"
      role="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      {{ user.username }}
    </a>
    <ul class="dropdown-menu">
      <li class="nav-item">
        <router-link to="/logout" class="dropdown-item">{{
          $t("logout.page")
        }}</router-link>
      </li>
    </ul>
  </li>
</template>
<script>
export default {
  name: "ProfileItem",
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
};
</script>