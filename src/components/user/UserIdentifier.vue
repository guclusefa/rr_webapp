<template>
  <div>
    <img
      :src="user.photo"
      class="img-fluid rounded me-2"
      width="30"
      height="30"
      v-if="user.photo"
    />
    <img
      src="@/assets/images/user/default.jpg"
      class="img-fluid rounded me-2"
      width="30"
      height="30"
      v-else
    />
    <router-link :to="{ name: 'profile', params: { id: user.id } }"
      >@{{ user.username }}
    </router-link>
    <span v-if="user.isCertified">
      <i class="bi bi-patch-check-fill ms-1 text-secondary" />
    </span>
  </div>
</template>

<script>
export default {
  name: "ResourceCard",
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
};
</script>