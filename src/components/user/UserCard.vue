<template>
  <div class="card">
    <template v-if="profile.photo">
      <img :src="profile.photo" class="card-img-top" />
    </template>
    <template v-else>
      <img src="@/assets/images/user/default.jpg" class="card-img-top" />
    </template>
    <div class="card-body">
      <h5 class="card-title">
        <router-link :to="{ name: 'profile', params: { id: profile.id } }">
          @{{ profile.username }}
        </router-link>
        <span class="badge bg-primary ms-1" v-if="profile.isCertified">
          {{ $t("user.certified") }}
        </span>
      </h5>
      <p class="card-text" v-if="profile.firstName || profile.lastName">
        <span class="text-muted pb-1">
          {{ profile.firstName }} {{ profile.lastName }}
        </span>
      </p>
      <p class="card-text" v-if="profile.gender">
        <span class="badge bg-dark" v-if="profile.roles[0]">
          {{ $t(`user.roles.${profile.roles[0]}`) }}
        </span>
        <span class="badge bg-secondary" v-if="profile.gender">
          {{ $t(`user.genders.${profile.gender}`) }}
        </span>
        <span class="badge bg-info">
          {{ profile.state.name }}
        </span>
      </p>
      <p class="card-text" v-if="profile.createdAt">
        <span class="text-muted pb-1">
          {{
            $t(`user.member_since`, {
              createdAt: formatDate(profile.createdAt),
              days: getDays(profile.createdAt),
            })
          }}
        </span>
      </p>
    </div>
  </div>
</template>

<script>
import dateFormatter from "@/mixins/dateFormatter";

export default {
  name: "UserCard",
  mixins: [dateFormatter],
  props: {
    profile: {
      type: Object,
      required: true,
    },
  },
};
</script>