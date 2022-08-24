<template>
  <v-row class="container-wrapper my-6" align="center" justify="center">
    <v-col cols="12" align="center">
      <div class="wrapper py-5">
        <p><strong>FinceApp</strong> es una App diseñada para la visualización de datos actualizados e históricos de las monedas de intercambio más utilizadas en Argentina</p>
        <p>Actualmente nos encontramos en etapa de desarrollo, por lo cual algunas funciones no están disponibles aún, pero esperamos contar con su apoyo para seguir creciendo y brindar un mejor servicio a nuestros usuarios.</p>
        <p>En futuras versiones estará disponible la funcion para crear una cuenta y administrar sus finanzas personales.</p>
        <p>La app no tiene costo para su uso, pero si así lo desea puede colaborar con el desarrollo de la misma mediante el siguiente link</p>
        <p>También puede enviarnos sugerencias y comentarios mediante la página de <nuxt-link to="/contact">Contacto</nuxt-link> </p>
        <p>Muchas gracias por utilizar <strong>FinceApp</strong>!</p>
        <p class="mt-10">Diseñado y Desarrollado por</p>
        <p>Facundo Rossetti</p>
        <a href="http://www.facundorossetti.com.ar" target="_blank">
          <img src="~/static/logo_transparent_background.png" alt="logoFR" width="60px">
        </a>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  transition: 'transition',
}
</script>
