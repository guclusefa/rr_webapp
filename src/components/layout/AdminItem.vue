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
        <i class="bi bi-tools"></i>
        <i class="ms-2 dropdown-toggle"></i>
      </span>
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