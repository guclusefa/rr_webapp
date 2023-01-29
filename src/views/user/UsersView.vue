<template>
  <section>
    <div class="container">
        <h1 class="mb-3">{{ $t("users.title") }}</h1>
        <hr>
        <UserList />
    </div>
  </section>
</template>

<script>
import UserList from "@/components/user/UserList.vue";
export default {
  name: "UsersView",
  components: {
    UserList,
  },
};
</script>

<style>
</style>