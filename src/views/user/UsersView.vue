<template>
  <section>
    <div class="container">
      <div class="row mb-3">
        <div class="col">
          <h1>{{ $t("users.title") }}</h1>
          <hr />
        </div>
      </div>
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