<template>
  <li class="nav-item dropdown">
    <a
      class="nav-link dropdown-toggle"
      href="#"
      role="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <i class="bi bi-tools"></i>
    </a>
    <ul class="dropdown-menu">
      <li>
        <router-link to="/admin" class="dropdown-item">
          {{ $t("admin.page") }}
        </router-link>
      </li>
    </ul>
  </li>
</template>
  
<script>
export default {
  name: "AdminItem",
};
</script>