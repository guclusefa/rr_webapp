<template>
  <div class="card mb-4">
    <div class="card-body">
        <img
            v-if="user.photo"
            :src="user.photo"
            class="card-img-top"
            alt="..."
        />
        <img
            v-else
            src="@/assets/images/user/default.jpg"
            class="card-img-top"
            alt="..."
        />
      <h5 class="card-title">{{ user.username }}</h5>
      <p class="card-text">{{ user.firstName + " " + user.lastName }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserCard",
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
};
</script>