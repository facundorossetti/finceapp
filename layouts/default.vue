<template>
  <v-app>
    <v-main>
      <v-container>
        <v-app-bar
          flat
          color="transparent"
          class="mb-5"
        >
          <div class="header-text-mono">FinceApp</div>
          <v-spacer></v-spacer>
          <!-- <button class="mr-5">Financieras</button>
          <button class="mr-5">Sobre nosotros</button>
          <button class="mr-5">Plataformas</button> -->
          <nuxtLink to="/" class="mr-5 normal-text">Inicio</nuxtLink>
          <!-- <a to="/" class="mr-5 normal-text onDevelopment">Quienes somos?<div class="tooltiptext">Coming soon...</div></a>
          <a to="/" class="mr-5 normal-text onDevelopment">Plataformas<div class="tooltiptext">Coming soon...</div></a>
          <a to="/" class="mr-5 normal-text onDevelopment">Contacto<div class="tooltiptext">Coming soon...</div></a> -->
          <nuxtLink to="/finanzas" class="normal-text">Mis Finanzas</nuxtLink>
          <!-- <v-spacer></v-spacer>
          <div>
            <button class="mr-5 normal-text onDevelopment">Create Account</button>
            <button class="login-btn normal-text onDevelopment">Login</button>
          </div> -->
        </v-app-bar>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
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
</style>
