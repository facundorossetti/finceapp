<template>
  <div>
    <v-row v-if="latest" class="container-wrapper" align="center">
      <v-col cols="12" lg="6" align="center">
        <div class="wrapper">
          <v-expansion-panels v-model="panel">
            <v-expansion-panel>
              <v-expansion-panel-header hide-actions>
                <div class="d-flex align-center">
                  <h2>Dolar Blue</h2>
                  <v-spacer></v-spacer>
                  <div class="d-flex flex-column align-center">
                    <div class="d-flex justify-space-between w-100">
                      <h2 class="mr-4 blue-text">Venta: </h2>
                      <h2 class="mr-4 blue-text">$ {{ latest.blue.value_sell.toFixed(0) }}</h2>
                      <h2 class="mr-4 green-text">Compra: </h2>
                      <h2 class="green-text">$ {{ latest.blue.value_buy.toFixed(0) }}</h2>
                    </div>
                    <span class="mt-2 comment-text">Ultima actualizacion: {{ lastUpdate }}</span>
                  </div>
                </div>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <div id="blue-chart">
                  <AreaChart :series="dolarBlueSeries" />
                </div>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
      </v-col>
      <v-col cols="12" lg="6" align="center">
        <div class="wrapper">
          <v-expansion-panels v-model="panel">
            <v-expansion-panel>
              <v-expansion-panel-header hide-actions>
                <div class="d-flex align-center">
                  <h2>Dolar Oficial</h2>
                  <v-spacer></v-spacer>
                  <div class="d-flex flex-column align-center">
                    <div class="d-flex justify-space-between w-100">
                      <h2 class="mr-4 blue-text">Venta: </h2>
                      <h2 class="mr-4 blue-text">$ {{ latest.oficial.value_sell.toFixed(0) }}</h2>
                      <h2 class="mr-4 green-text">Compra: </h2>
                      <h2 class="green-text">$ {{ latest.oficial.value_buy.toFixed(0) }}</h2>
                    </div>
                    <span class="mt-2 comment-text">Ultima actualizacion: {{ lastUpdate }}</span>
                  </div>
                </div>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <div id="oficial-chart">
                  <AreaChart :series="dolarOficialSeries"/>
                </div>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
      </v-col>
    </v-row>
    <v-row v-if="latest" class="container-wrapper mt-5" align="center">
      <v-col cols="12" align="center">
        <div class="wrapper d-flex justify-center align-center w-100">
          <v-simple-table dense fixed-header class="mr-10" :class="{'w-70': $vuetify.breakpoint.lgAndUp}">
            <template #default>
              <thead>
                <tr>
                  <th></th>
                  <th class="text-left">Name</th>
                  <th v-for="cryptoHeader in cryptoHeaders" :key="cryptoHeader" class="text-right">
                    {{ cryptoHeader }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="crypto in cryptos" :key="crypto.id">
                  <td class="text-center">
                    <img :src="crypto.image" :alt="crypto.id" width="20px">
                  </td>
                  <td class="text-left">{{ crypto.name }}</td>
                  <td class="text-right">{{ formatNumber(crypto.current_price) }}</td>
                  <td class="text-right">{{ crypto.price_change_percentage_24h }} %</td>
                  <td class="text-right">{{ formatNumber(crypto.market_cap) }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
          <client-only v-if="$vuetify.breakpoint.lgAndUp">
            <div id="chart">
              <VueApexCharts type="pie" height="250" :options="pieChartOptions" :series="pieChartSeries" />
            </div>
          </client-only>
        </div>
      </v-col>
    </v-row>
    <!-- <v-row v-if="latest" class="container-wrapper mt-5" align="center">
      <v-col cols="12" align="center">
        <div class="wrapper d-flex justify-center align-center w-100">
          otras monedas
        </div>
      </v-col>
    </v-row> -->
  </div>
</template>

<script>

export default {
  components: {
    VueApexCharts: () => import('vue-apexcharts')
  },
  transition: 'transition',
  data() {
    return {
      loader: true,
      pieChartOptions: {
        chart: {
          width: 380,
          type: 'pie',
        },
        legend: {
          show: false,
        },
        labels: [],
      },
      panel: 0,
      latest: null,
      historic: null,
      cryptos: null,
      cryptoHeaders: ["Current Price", "Change 24h", "Market Cap"],
    };
  },
  computed: {
    pieChartSeries() {
      if (this.cryptos) {
        return this.cryptos.map((e) => e.market_cap);
      } else {
        return [];
      }
    },
    lastUpdate() {
      return new Date(this.latest.last_update).toLocaleString("es-AR");
    },
    dolarBlueSeries() {
      if (this.historic) {
        const blue = this.historic.filter((e) => e.source === "Blue");
        return [
          {
            name: "Dolar blue - Venta",
            data: blue.map((e) => {
              return {
                x: e.date,
                y: e.value_sell,
              };
            }),
          },
          {
            name: "Dolar Blue - Compra",
            data: blue.map((e) => {
              return {
                x: e.date,
                y: e.value_buy,
              };
            }),
          },
        ];
      } else {
        return [];
      }
    },
    dolarOficialSeries() {
      if (this.historic) {
        const oficial = this.historic.filter((e) => e.source === "Oficial");
        return [
          {
            name: "Dolar Oficial - Venta",
            data: oficial.map((e) => {
              return {
                x: e.date,
                y: e.value_sell,
              };
            }),
          },
          {
            name: "Dolar Oficial - Compra",
            data: oficial.map((e) => {
              return {
                x: e.date,
                y: e.value_buy,
              };
            }),
          },
        ];
      } else {
        return [];
      }
    },
  },
  watch: {
    cryptos(val) {
      val.forEach((e) => {
        this.pieChartOptions.labels.push(e.name);
      });
    }
  },
  beforeMount() {
    this.getCurrencyData();
  },
  methods: {
    formatNumber(number) {
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      });
      return formatter.format(number);
    },
    async getCurrencyData() {
      const params = {
        days: 66,
      };
      this.latest = (
        await this.$axios.get("https://api.bluelytics.com.ar/v2/latest")
      ).data;
      this.historic = (
        await this.$axios.get("https://api.bluelytics.com.ar/v2/evolution.json", {
          params,
        })
      ).data;
      const cryptos = (await this.$axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=false")).data;
      this.cryptos = cryptos.map((e) => {
        return {
          id: e.id,
          image: e.image,
          name: e.name,
          current_price: e.current_price,
          price_change_percentage_24h: e.price_change_percentage_24h,
          market_cap: e.market_cap
        }
      });
      this.loader = false;
    },
  },
};
</script>

<style scoped>
.v-expansion-panel {
  background-color: transparent !important;
  color: inherit !important;
}
.v-expansion-panel::before {
  box-shadow: none;
}
.v-data-table {
  background-color: transparent !important;
}
th {
  background: transparent !important;
}

</style>
