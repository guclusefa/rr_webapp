<template>
  <section>
    <div class="row">
      <div class="col-12 col-md-4 col-lg-3">
        <template v-if="profile.photo">
          <img :src="profile.photo" class="img-fluid rounded" />
        </template>
        <template v-else>
          <img
            src="@/assets/images/user/default.jpg"
            class="img-fluid rounded"
          />
        </template>
      </div>
      <div class="col-12 col-md-8 col-lg-9">
        <div class="row pt-3 pt-md-0">
          <div class="col">
            <div class="text-strong pb-1" v-if="profile.username">
              @{{ profile.username }}
              <span class="badge bg-primary me-1" v-if="profile.isCertified">
                {{ $t("user.certified") }}
              </span>
              <span class="badge bg-success me-1" v-if="profile.isVerified">
                {{ $t("user.verified") }}
              </span>
              <span class="badge bg-warning me-1" v-else>
                {{ $t("user.unverified") }}
              </span>
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
            <div class="text-muted pb-1" v-if="profile.email">
              {{ profile.email }}
            </div>
            <div
              class="text-muted pb-1"
              v-if="profile.firstName || profile.lastName"
            >
              <template v-if="profile.firstName">{{
                profile.firstName
              }}</template>
              <template v-if="profile.lastName">{{
                " " + profile.lastName
              }}</template>
            </div>
            <div class="text-muted pb-1 pre-line" v-if="profile.bio">
              {{ profile.bio }}
            </div>
            <div class="text-muted pb-1" v-if="profile.birthDate">
              {{
                $t(`user.age`, {
                  birthDate: formatDate(profile.birthDate),
                  age: getAge(profile.birthDate),
                })
              }}
            </div>
            <div class="text-muted pb-1" v-if="profile.createdAt">
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
  </section>
</template>

<script>
import dateFormatter from "@/mixins/dateFormatter";

export default {
  name: "UserItem",
  mixins: [dateFormatter],
  props: {
    profile: {
      type: Object,
      required: true,
    },
  },
};
</script>