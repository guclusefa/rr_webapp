<template>
  <div class="row">
    <div class="col-12 col-md-4 col-lg-3">
      <template v-if="profile.photo">
        <img :src="profile.photo" class="img-fluid rounded" />
      </template>
      <template v-else>
        <img src="@/assets/images/user/default.jpg" class="img-fluid rounded" />
      </template>
    </div>
    <div class="col-12 col-md-8 col-lg-9">
      <div class="row pt-3 pt-md-0">
        <div class="col">
          <div class="row">
            <div class="col">
              <h5 class="card-title">
                <router-link
                  :to="{ name: 'profile', params: { id: profile.id } }"
                >
                  @{{ profile.username }}
                </router-link>
                <span v-if="profile.isCertified">
                  <i class="bi bi-patch-check-fill ms-1 text-secondary"></i>
                </span>
              </h5>
            </div>
            <div class="col" v-if="canEdit">
              <div class="float-end">
                <UserActionsButton :profile="profile" />
              </div>
            </div>
          </div>
          <div
            class="text-muted pb-1 mt-2"
            v-if="profile.roles[0] || profile.gender || profile.state"
          >
            <span class="badge bg-dark me-1" v-if="profile.roles[0]">
              {{ $t(`user.roles.${profile.roles[0]}`) }}
            </span>
            <span class="badge bg-secondary me-1" v-if="profile.gender">
              {{ $t(`user.genders.${profile.gender}`) }}
            </span>
            <span class="badge bg-info me-1" v-if="profile.state">
              {{ profile.state.name }}
            </span>
          </div>
          <div class="text-muted pb-1 mt-2" v-if="profile.email">
            {{ profile.email }}
            <span class="badge bg-success me-1" v-if="profile.isVerified">
              {{ $t("user.verified") }}
            </span>
            <span class="badge bg-warning me-1" v-else>
              {{ $t("user.unverified") }}
            </span>
          </div>
          <div
            class="text-muted pb-1 mt-2"
            v-if="profile.firstName || profile.lastName"
          >
            <template v-if="profile.firstName">{{
              profile.firstName
            }}</template>
            <template v-if="profile.lastName">{{
              " " + profile.lastName
            }}</template>
          </div>
          <div class="text-muted pb-1 mt-2 pre-line" v-if="profile.bio">
            {{ profile.bio }}
          </div>
          <div class="text-muted pb-1 mt-2" v-if="profile.birthDate">
            {{
              $t(`user.age`, {
                birthDate: formatDate(profile.birthDate),
                age: getAge(profile.birthDate),
              })
            }}
          </div>
          <div class="text-muted pb-1 mt-2" v-if="profile.createdAt">
            {{
              $t(`user.member_since`, {
                createdAt: formatDate(profile.createdAt),
                days: getDays(profile.createdAt),
              })
            }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dateFormatter from "@/mixins/dateFormatter";

import UserActionsButton from "@/components/user/UserActionsButton";

export default {
  name: "UserItem",
  mixins: [dateFormatter],
  props: {
    profile: {
      type: Object,
      required: true,
    },
    canEdit: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  components: {
    UserActionsButton,
  },
};
</script>