<template>
  <v-app>
    <v-main>
    <div class="mobile-menu pa-4 pt-8" :class="{'_active': activeMenu}">
      <div v-if="activeMenu" class="d-flex flex-column">
        <button @click="activeMenu = false">
          <NuxtLink class="wrapper menu-btn-mobile py-3 mb-6" to="/">Home</NuxtLink>
        </button>
        <button @click="activeMenu = false">
          <NuxtLink class="wrapper menu-btn-mobile py-3 mb-6" to="/about">Sobre Nosotros</NuxtLink>
        </button>
        <button @click="activeMenu = false">
          <NuxtLink class="wrapper menu-btn-mobile py-3" to="/contact">Contacto</NuxtLink>
        </button>
        <v-row class="mt-16" align="center">
          <v-col cols="12" align="center">
            <p>Diseñado y Desarrollado por</p>
            <p>Facundo Rossetti</p>
            <a href="http://www.facundorossetti.com.ar" target="_blank">
              <img src="~/static/logo_transparent_background.png" alt="logoFR" width="60px">
            </a>
          </v-col>
        </v-row>
      </div>
    </div>
      <v-container>
        <v-app-bar
          flat
          color="transparent"
          class="mb-5"
        >
          <h2 v-if="$vuetify.breakpoint.smAndUp" class="header-text-mono">FinceApp</h2>
          <v-spacer v-if="$vuetify.breakpoint.smAndUp"></v-spacer>
          <div v-if="$vuetify.breakpoint.smAndUp" class="pa-0 d-flex">
            <NuxtLink class="wrapper menu-btn py-1 mr-2" to="/">Home</NuxtLink>
            <NuxtLink class="wrapper menu-btn py-1 mr-2" to="/about">Sobre Nosotros</NuxtLink>
            <NuxtLink class="wrapper menu-btn py-1 mr-2" to="/contact">Contacto</NuxtLink>
            <div class="wrapper py-1">
              <v-btn
                icon
                :ripple="false"
                depressed
                small
                @click="changeTheme"
              >
                <v-icon color="text" medium>
                  {{ $vuetify.theme.dark ? 'mdi-weather-night' : 'mdi-white-balance-sunny' }}
                </v-icon>
              </v-btn>
            </div>
          </div>
          <v-btn
            v-if="$vuetify.breakpoint.xsOnly"
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
          <v-spacer v-if="$vuetify.breakpoint.xsOnly"></v-spacer>
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
      activeMenu: false,
    }
  },
  methods: {
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
  .menu-btn-mobile {
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--v-text-base) !important;
    width: 100%;
    &.nuxt-link-exact-active {
      background: var(--v-background-base) !important;
      box-shadow:  inset 3px 3px 6px var(--v-shadow1-base),
                  inset -3px -3px 6px var(--v-shadow2-base) !important;
    }
  }
}
</style>

<style lang="scss" scoped>
.menu-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  color: var(--v-text-base) !important;
  &.nuxt-link-exact-active {
    background: var(--v-background-base) !important;
    box-shadow:  inset 3px 3px 6px var(--v-shadow1-base),
                inset -3px -3px 6px var(--v-shadow2-base) !important;
  }
}

:deep(.v-input__slot) {
  border-radius: 12px !important;
  background: var(--v-background-base) !important;
  box-shadow:  inset 3px 3px 6px var(--v-shadow1-base),
              inset -3px -3px 6px var(--v-shadow2-base) !important;
}
</style>
