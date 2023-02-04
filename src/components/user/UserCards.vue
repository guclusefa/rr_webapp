<template>
  <div class="row">
    <div class="col-12 col-md-6 col-lg-3" v-for="user in users" :key="user">
      <UserCard :user="user" />
    </div>
    <div
      class="col-12 col-md-6 col-lg-3"
      v-for="skeleton in skeletons"
      :key="skeleton"
    >
      <UserCardSkeleton />
    </div>
  </div>
</template>

<script>
import UserCard from "@/components/user/UserCard.vue";
import UserCardSkeleton from "@/components/user/UserCardSkeleton.vue";

export default {
  name: "UserCards",
  props: {
    users: {
      type: Array,
      required: true,
    },
    skeletons: {
      type: Array,
      required: true,
    },
  },
  components: {
    UserCard,
    UserCardSkeleton,
  },
};
</script>