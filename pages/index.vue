<template>
  <div>
    <v-row v-if="latest" class="container-wrapper" align="center">
      <v-col cols="12" lg="6" align="center">
        <div class="wrapper">
          <spinner :disabled="!$fetchState.pending"></spinner>
          <v-expansion-panels v-model="panelDolarBlue">
            <v-expansion-panel>
              <v-expansion-panel-header hide-actions class="pa-1" :class="{'pa-4': $vuetify.breakpoint.lgAndUp}">
                <div class="d-flex align-center">
                  <v-row no-gutters>
                    <v-col cols="12" lg="4" align="center">
                      <h2 class="header-text" :class="{'mb-2': $vuetify.breakpoint.mdAndDown}">Dólar Blue</h2>
                    </v-col>
                    <v-col  cols="12" lg="8" align="center">
                      <div class="d-flex flex-column align-center">
                        <div class="d-flex justify-space-between w-100">
                          <h2 class="mr-1 blue-text">Venta: </h2>
                          <h2 class="mr-4 blue-text">$ {{ latest.blue.value_sell.toFixed(0) }}</h2>
                          <h2 class="mr-1 green-text">Compra: </h2>
                          <h2 class="green-text">$ {{ latest.blue.value_buy.toFixed(0) }}</h2>
                        </div>
                        <span class="mt-2 comment-text">Última actualización: {{ lastUpdate }}</span>
                      </div>
                    </v-col>
                  </v-row>
                </div>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row class="my-2">
                  <v-col cols="6" align="center">
                    <v-text-field
                      v-model="monedaExtranjeraValor"
                      hide-details
                      dense
                      solo
                      counter
                      type="number"
                      :prefix="monedaPrefix"
                      @focus="monedaExtranjeraValor = null"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="6" align="center">
                    <v-text-field
                      v-model="pesoValor"
                      hide-details
                      readonly
                      dense
                      solo
                      prefix="AR$"
                    ></v-text-field>
                  </v-col>
                </v-row>
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
          <spinner :disabled="!$fetchState.pending"></spinner>
          <v-expansion-panels v-model="panelDolarOficial">
            <v-expansion-panel>
              <v-expansion-panel-header hide-actions class="pa-1" :class="{'pa-4': $vuetify.breakpoint.lgAndUp}">
                <div class="d-flex align-center">
                  <v-row no-gutters>
                    <v-col cols="12" lg="4" align="center">
                      <h2 class="header-text" :class="{'mb-2': $vuetify.breakpoint.mdAndDown}">Dólar Oficial</h2>
                    </v-col>
                    <v-col cols="12" lg="8" align="center">
                      <div class="d-flex flex-column align-center">
                        <div class="d-flex justify-space-between w-100">
                          <h2 class="mr-1 blue-text">Venta: </h2>
                          <h2 class="mr-4 blue-text">$ {{ latest.oficial.value_sell.toFixed(0) }}</h2>
                          <h2 class="mr-1 green-text">Compra: </h2>
                          <h2 class="green-text">$ {{ latest.oficial.value_buy.toFixed(0) }}</h2>
                        </div>
                        <span class="mt-2 comment-text">Última actualización: {{ lastUpdate }}</span>
                      </div>
                    </v-col>
                  </v-row>
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
    <!-- <v-row class="container-wrapper mt-5" align="center">
      <v-col cols="12" align="center">
        <div class="wrapper d-flex justify-center align-center w-100">
          <div class="d-flex align-center">
            <v-row no-gutters>
              <v-col cols="12" align="center">
                <v-select
                  v-model="monedaPrefix"
                  :items="['USD', '€']"
                  :suffix="Moneda"
                  solo
                  dense
                  hide-details
                  item-color="primary"
                  :menu-props="{ overflowY: true }"
                ></v-select>
                <p class="mb-0 mt-3">1 {{monedaPrefix}} = {{ latest ? latest.blue.value_sell : 'Sin Cotización'}}</p>
                <p class="comment-text ma-0">Última actualización: {{ lastUpdate }}</p>
              </v-col>
              <v-col cols="6" align="center">
                <v-text-field
                  v-model="monedaExtranjeraValor"
                  hide-details
                  dense
                  solo
                  counter
                  type="number"
                  :prefix="monedaPrefix"
                >
                </v-text-field>
              </v-col>
              <v-col cols="6" align="center">
                <v-text-field
                  v-model="pesoValor"
                  hide-details
                  readonly
                  dense
                  solo
                  prefix="AR$"
                ></v-text-field>
              </v-col>
            </v-row>
          </div>
        </div>
      </v-col>
    </v-row> -->
    <v-row v-if="cryptos" class="container-wrapper mt-5" align="center">
      <v-col cols="12" align="center">
        <div class="wrapper d-lg-flex justify-center align-center w-100">
          <spinner :disabled="!$fetchState.pending"></spinner>
          <v-simple-table dense :class="{'w-70 mr-10': $vuetify.breakpoint.lgAndUp}">
            <template #default>
              <thead>
                <tr>
                  <th v-if="$vuetify.breakpoint.lgAndUp"></th>
                  <th class="text-left" :class="{'px-0': $vuetify.breakpoint.mdAndDown}">Name</th>
                  <th v-for="cryptoHeader in cryptoHeaders" :key="cryptoHeader" class="text-right" :class="{'px-0': $vuetify.breakpoint.mdAndDown}">
                    {{ cryptoHeader }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="crypto in cryptos" :key="crypto.id">
                  <td v-if="$vuetify.breakpoint.lgAndUp" class="text-center" :class="{'px-1': $vuetify.breakpoint.mdAndDown}">
                    <img :src="crypto.image" :alt="crypto.id" width="20px" class="pt-1">
                  </td>
                  <td class="text-left" :class="{'px-0': $vuetify.breakpoint.mdAndDown}">{{ crypto.name }}</td>
                  <td class="text-right" :class="{'px-0': $vuetify.breakpoint.mdAndDown}">USD {{ formatNumberMoneyRound(crypto.current_price) }}</td>
                  <td class="text-right" :class="[{'px-0': $vuetify.breakpoint.mdAndDown}, , crypto.price_change_percentage_24h > 0 ? 'green-text' : 'red-text']">{{ formatNumberMoneyRound(crypto.price_change_percentage_24h) }} %</td>
                  <td class="text-right" :class="{'px-0': $vuetify.breakpoint.mdAndDown}">USD {{ formatNumberMoneyRound(crypto.market_cap) }}</td>
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
    <v-row v-if="latest" class="container-wrapper mt-5" align="center">
      <v-col cols="12" align="center">
        <div class="wrapper d-flex justify-center align-center w-100">
          <spinner :disabled="!$fetchState.pending"></spinner>
          <v-expansion-panels v-model="panelEstadisticas">
            <v-expansion-panel>
              <v-expansion-panel-header hide-actions class="pa-1" :class="{'pa-4': $vuetify.breakpoint.lgAndUp}">
                <div class="d-flex align-center">
                  <v-row no-gutters justify="center">
                    <v-col cols="12" lg="4" align="center">
                      <h2 class="header-text">Otras monedas</h2>
                    </v-col>
                  </v-row>
                </div>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row no-gutters>
                  <v-col cols="12" class="d-flex justify-center" align="center">
                    <h2 class="mr-4 normal-text-bold">Euro Oficial:</h2>
                    <p class="mr-4 blue-text">Venta: $ {{ latest.oficial_euro.value_sell.toFixed(0) }}</p>
                    <p class="green-text">Compra: $ {{ latest.oficial_euro.value_buy.toFixed(0) }}</p>
                  </v-col>
                  <v-col cols="12" class="d-flex justify-center" align="center">
                    <h2 class="mr-4 normal-text-bold">Euro Blue:</h2>
                    <p class="mr-4 blue-text">Venta: $ {{ latest.blue_euro.value_sell.toFixed(0) }}</p>
                    <p class="green-text">Compra: $ {{ latest.blue_euro.value_buy.toFixed(0) }}</p>
                  </v-col>
                  <!-- <v-col v-if="real" cols="12" class="d-flex justify-center" align="center">
                    <h2 class="mr-4 normal-text-bold">Real Oficial:</h2>
                    <p class="mr-4 blue-text">Venta: $ {{ real.venta.toFixed(0) }}</p>
                    <p class="green-text">Compra: $ {{ real.compra.toFixed(0) }}</p>
                  </v-col>
                  <v-col v-if="bcraReservas" cols="12" class="d-flex justify-center" align="center">
                    <h2 class="mr-4 normal-text-bold">Reservas BCRA:</h2>
                    <p class="mr-4 blue-text">USD {{ bcraReservas.valor.toFixed(0) }}</p>
                  </v-col>
                  <v-col v-if="riesgoPais" cols="12" class="d-flex justify-center" align="center">
                    <h2 class="mr-4 normal-text-bold">Riesgo Pais:</h2>
                    <p class="mr-4 blue-text">{{ riesgoPais.valor }}</p>
                  </v-col> -->
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
      </v-col>
    </v-row>
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
      panelEstadisticas: 0,
      panelDolarBlue: 1,
      panelDolarOficial: 1,
      latest: null,
      historic: null,
      cryptos: null,
      cryptoHeaders: ["Current Price", "Change 24h", "Market Cap"],
      real: null,
      bcraReservas: null,
      riesgoPais: null,
      monedaPrefix: "USD",
      monedaExtranjeraValor: 0,
      pesoValor: 0,
    };
  },
  async fetch() {
    const params = {
      days: 16,
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
      if (this.latest) {
        return new Date(this.latest.last_update).toLocaleString("es-AR");
      } else {
        return "Sin datos";
      }
    },
    dolarBlueSeries() {
      if (this.historic) {
        const blue = this.historic.filter((e) => e.source === "Blue");
        return [
          {
            name: "Dólar blue - Venta",
            data: blue.map((e) => {
              return {
                x: e.date,
                y: e.value_sell,
              };
            }),
          },
          {
            name: "Dólar Blue - Compra",
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
            name: "Dólar Oficial - Venta",
            data: oficial.map((e) => {
              return {
                x: e.date,
                y: e.value_sell,
              };
            }),
          },
          {
            name: "Dólar Oficial - Compra",
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
    monedaExtranjeraValor(val) {
      const number = val * this.latest.blue.value_sell;
      this.pesoValor = this.formatNumberToMoney(number);
    },
    cryptos(val) {
      val.forEach((e) => {
        this.pieChartOptions.labels.push(e.name);
      });
    }
  },
  methods: {
    formatNumberToMoney(number) {
      const formatter = new Intl.NumberFormat('es-AR', {
        style: 'decimal',
      });
      return formatter.format(number)
    },
    formatNumberMoneyRound(number) {
      if (number > 999999999) {
        number = number / 1000000000;
        return + number.toFixed(0) + ' B';
      } else if (number > 999999) {
        number = number / 1000000;
        return + number.toFixed(0) + ' M';
      }
      return  number.toFixed(2);
    },
  },
};
</script>

<style lang="scss">
.v-expansion-panel {
  background-color: transparent !important;
  color: inherit !important;
  &-content__wrap {
    padding: 0 !important;
  }
}
.v-expansion-panel::before {
  box-shadow: none !important;
}
.v-data-table {
  background-color: transparent !important;
}
th {
  background: transparent !important;
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
