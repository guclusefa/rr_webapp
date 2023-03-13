<template>
  <div class="card">
    <template v-if="profile.photo">
      <img :src="profile.photo" class="card-img-top" />
    </template>
    <template v-else>
      <img src="@/assets/images/user/default.jpg" class="card-img-top" />
    </template>
    <div class="card-body">
      <div class="row">
        <div class="col">
          <h5 class="card-title">
            <router-link :to="{ name: 'profile', params: { id: profile.id } }">
              @{{ profile.username }}
            </router-link>
            <span v-if="profile.isCertified">
              <i class="bi bi-patch-check-fill ms-1"></i>
            </span>
          </h5>
        </div>
        <div class="col" v-if="canEdit()">
          <div class="float-end">
            <UserActionsButton :profile="profile" />
          </div>
        </div>
      </div>
      <p class="card-text" v-if="profile.firstName || profile.lastName">
        <span class="text-muted pb-1">
          {{ profile.firstName }} {{ profile.lastName }}
        </span>
      </p>
      <p class="card-text">
        <span class="badge bg-dark me-1" v-if="profile.roles[0]">
          {{ $t(`user.roles.${profile.roles[0]}`) }}
        </span>
        <span class="badge bg-secondary me-1" v-if="profile.gender">
          {{ $t(`user.genders.${profile.gender}`) }}
        </span>
        <span class="badge bg-info me-1" v-if="profile.state">
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
import { mapGetters } from "vuex";

import dateFormatter from "@/mixins/dateFormatter";

import UserActionsButton from "@/components/user/UserActionsButton";

export default {
  name: "UserCard",
  mixins: [dateFormatter],
  props: {
    profile: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters(["user", "isAdmin"]),
  },
  methods: {
    isOwner() {
      if (!this.user) {
        return false;
      }
      return this.profile.id === this.user.id;
    },
    canEdit() {
      return this.isOwner() || this.isAdmin;
    },
  },
  components: {
    UserActionsButton,
  },
};
</script>