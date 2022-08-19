<template>
  <v-app>
    <div class="mobile-menu pa-4" :class="{'_active': activeMenu}">
      <div v-if="activeMenu" class="d-flex flex-column">
        <button class="login-btn normal-text" @click="openLoginDialog">Login</button>
        <button class="mt-5 login-btn  normal-text" @click="openLoginDialog">Create Account</button>
      </div>
    </div>
    <v-dialog v-model="loginAndSignupDialog" max-width="500px" overlay-opacity="0.5" content-class="login-dialog">
      <v-card color="background">
        <v-card-title class="justify-center px-4 pt-6">
          <span class="text-h5">Login</span>
        </v-card-title>
        <v-card-text class="px-4">
          <v-row no-gutters>
            <v-col cols="12" class="pb-4">
              <v-text-field
                v-model="user.email"
                hide-details
                dense
                solo
                label="Email"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="user.password"
                type="password"
                hide-details
                dense
                solo
                label="Password"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions class="px-4 pb-6">
          <v-spacer></v-spacer>
          <button
            class="login-btn mr-4"
            @click="loginAndSignupDialog = false"
          >
            Cancelar
          </button>
          <button
            class="login-btn"
            :class="{'active': loading}"
            @click="loading = true"
          >
            <v-progress-circular
              v-if="loading"
              indeterminate
              small
              :size="20"
              color="bluetext"
            ></v-progress-circular>
            <span v-else>Login</span>
          </button>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-main>
      <v-container>
        <v-app-bar
          flat
          color="transparent"
          class="mb-5"
        >
          <h2 v-if="$vuetify.breakpoint.smAndUp" class="header-text-mono">FinceApp</h2>
          <v-spacer v-if="$vuetify.breakpoint.smAndUp"></v-spacer>
          <v-btn
            icon
            :ripple="false"
            class="ml-2"
            depressed
            small
            @click="changeTheme"
          >
            <v-icon color="text" large>
              {{ $vuetify.theme.dark ? 'mdi-weather-night' : 'mdi-white-balance-sunny' }}
            </v-icon>
          </v-btn>
          <v-spacer v-if="$vuetify.breakpoint.smAndDown"></v-spacer>
          <h2 v-if="$vuetify.breakpoint.xsOnly" class="header-text-mono">FinceApp</h2>
          <v-spacer v-if="$vuetify.breakpoint.xsOnly"></v-spacer>
          <button v-if="$vuetify.breakpoint.xsOnly" class="mobile-menu-btn" :class="{'_active': activeMenu}" @click="activeMenu = !activeMenu">
            <transition name="fade" :duration="250" mode="out-in">
              <v-icon v-if="!activeMenu" key="menuClosed">mdi-menu</v-icon>
              <v-icon v-else key="menuOpened">mdi-close</v-icon>
            </transition>
          </button>
        </v-app-bar>
        <Nuxt keep-alive />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      loginAndSignupDialog: false,
      loading: false,
      user: {
        email: null,
        password: null
      },
      activeMenu: false,
    }
  },
  methods: {
    openLoginDialog() {
      this.activeMenu = false;
      this.loginAndSignupDialog = true;
    },
    changeTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
  }
}
</script>

<style lang="scss">
.login-btn {
  border-radius: 10px;
  background: linear-gradient(145deg, var(--v-shadow2-base), var(--v-shadow1-base));
  box-shadow:  2px 2px 2px var(--v-shadow3-base),
              -2px -2px 2px var(--v-lightest-base);
  padding: 8px 16px;
  &.active {
    background: linear-gradient(145deg, var(--v-shadow1-base), var(--v-shadow2-base));
    box-shadow: inset 2px 2px 2px var(--v-shadow3-base),
                inset -2px -2px 2px var(--v-lightest-base);
  }
}
.v-toolbar__content, .v-toolbar__extension {
  padding: 0;
}
.v-toolbar__content {
  justify-content: center;
}
.mobile-menu-btn {
  z-index: 999;
  border-radius: 6px;
  background: linear-gradient(145deg, var(--v-shadow2-base), var(--v-shadow1-base));
  box-shadow:  2px 2px 2px var(--v-shadow3-base),
              -2px -2px 2px var(--v-lightest-base);
  padding: 4px 6px;
  &._active {
    background: linear-gradient(145deg, var(--v-shadow1-base), var(--v-shadow2-base));
    box-shadow: inset 2px 2px 2px var(--v-shadow3-base),
                inset -2px -2px 2px var(--v-lightest-base);
  }
  .mdi {
    font-size: 28px;
  }
}
.mobile-menu {
  z-index: -1;
  position: absolute;
  top: 70px;
  right: 0;
  height: 0;
  width: 0;
  background: var(--v-background-base);
  transition: all .2s ease-in-out;
  &._active {
    z-index: 40;
    height: 100vh;
    width: 100vw;
  }
}
.login-dialog {
  border-radius: 20px;
}
</style>

<style lang="scss" scoped>
::v-deep .v-input__slot {
  border-radius: 12px !important;
  background: var(--v-background-base) !important;
  box-shadow:  inset 3px 3px 6px var(--v-shadow1-base),
              inset -3px -3px 6px var(--v-shadow2-base) !important;
}
</style>
