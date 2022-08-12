<template>
  <v-app>
    <div class="mobile-menu d-flex flex-column pa-4" :class="{'_active': activeMenu}">
      <button class="login-btn normal-text">Login</button>
      <button class="mt-5 login-btn  normal-text">Create Account</button>
    </div>
    <v-main>
      <v-container>
        <v-app-bar
          flat
          color="transparent"
          class="mb-5"
        >
          <div class="header-text-mono">FinceApp</div>
          <v-spacer></v-spacer>
          <button class="mobile-menu-btn" :class="{'_active': activeMenu}" @click="activeMenu = !activeMenu">
            <transition name="fade" mode="out-in">
              <v-icon v-if="!activeMenu" key="menuClosed">mdi-menu</v-icon>
              <v-icon v-else key="menuOpened">mdi-close</v-icon>
            </transition>
          </button>
          <!-- <v-spacer></v-spacer> -->
          <!-- <button class="mr-5">Financieras</button>
          <button class="mr-5">Sobre nosotros</button>
          <button class="mr-5">Plataformas</button> -->
          <!-- <nuxtLink to="/" class="mr-5 normal-text">Inicio</nuxtLink> -->
          <!-- <a to="/" class="mr-5 normal-text onDevelopment">Quienes somos?<div class="tooltiptext">Coming soon...</div></a>
          <a to="/" class="mr-5 normal-text onDevelopment">Plataformas<div class="tooltiptext">Coming soon...</div></a>
          <a to="/" class="mr-5 normal-text onDevelopment">Contacto<div class="tooltiptext">Coming soon...</div></a> -->
          <!-- <nuxtLink to="/finanzas" class="normal-text">Mis Finanzas</nuxtLink> -->
          <!-- <v-spacer></v-spacer>
          <div>
            <button class="mr-5 normal-text onDevelopment">Create Account</button>
            <button class="login-btn normal-text onDevelopment">Login</button>
          </div> -->
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
}
</script>

<style lang="scss">
.login-btn {
  border-radius: 10px;
  background: linear-gradient(145deg, #f6f6f6, #cfcfcf);
  box-shadow:  2px 2px 2px #c4c4c4,
              -2px -2px 2px #ffffff;
  padding: 8px 16px;
  &:active {
    background: linear-gradient(145deg, #cfcfcf, #f6f6f6);
    box-shadow: inset 2px 2px 2px #c4c4c4,
                inset -2px -2px 2px #ffffff;
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
  background: linear-gradient(145deg, #f6f6f6, #cfcfcf);
  box-shadow:  2px 2px 2px #c4c4c4,
              -2px -2px 2px #ffffff;
  padding: 4px 6px;
  &._active {
    background: linear-gradient(145deg, #cfcfcf, #f6f6f6);
    box-shadow: inset 2px 2px 2px #c4c4c4,
                inset -2px -2px 2px #ffffff;
  }
  .mdi {
    font-size: 28px;
  }
}
.mobile-menu {
  z-index: -1;
  position: absolute;
  top: 0;
  right: 0;
  height: 1vh;
  width: 1vw;
  background: #e6e6e6;
  transition: all .5s ease-in-out;
  opacity: 0;
  &._active {
    z-index: 40;
    top: 70px;
    height: 100vh;
    width: 100vw;
    opacity: 1;
  }
}
</style>
