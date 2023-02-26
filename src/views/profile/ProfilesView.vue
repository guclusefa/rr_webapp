<template>
  <section>
    <div class="container">
      <div class="row">
        <div class="col">
          <h1>{{ $t("profiles.title") }}</h1>
          <hr />
        </div>
      </div>
      <div class="row">
        <div class="col">
          <UserList />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import UserList from "@/components/user/UserList";

export default {
  name: "ProfilesView",
  components: {
    UserList,
  },
};
</script>