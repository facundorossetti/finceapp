<template>
  <div>
    <v-row class="container-wrapper" align="center">
      <v-col cols="12" lg="6" align="center">
        <div class="wrapper">
          <h2 class="mb-4">Activos</h2>
          <client-only>
            <FinanceTable :headers="headers"></FinanceTable>
            <div id="chart">
              <VueApexCharts type="donut" height="300" :options="chartOptions" :series="radialSeries" />
            </div>
          </client-only>
        </div>
      </v-col>
      <v-col cols="12" lg="6" align="center">
        <div class="wrapper">
          <h2 class="mb-4">Pasivos</h2>
          <client-only>
            <FinanceTable :headers="headers"></FinanceTable>
            <div id="chart">
              <VueApexCharts type="donut" height="300" :options="chartOptions" :series="radialSeries" />
            </div>
          </client-only>
        </div>
      </v-col>
      <v-col cols="12" align="center">
      </v-col>
    </v-row>
  </div>
</template>

<script>

export default {
  components: {
    VueApexCharts: () => import('vue-apexcharts')
  },
  data() {
    return {
      chartOptions: {
        chart: {
          width: 380,
          type: 'pie',
        },
        legend: {
          show: false,
        },
        labels: ['Sueldo', 'Banco', 'Otros'],
      },
      headers: [
        {
          text: 'Descripcion',
          align: 'start',
          value: 'descripcion',
        },
        { text: 'Valor (AR$)', value: 'ars', align: 'right' },
        { text: 'Valor (USD)', value: 'usd', align: 'right' },
        { text: 'Actions', value: 'actions', align: 'right' },
      ],
    };
  },
  computed: {
    radialSeries() {
      return [1600, 400, 900];
    }
  }
};
</script>
