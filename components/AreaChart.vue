<template>
  <client-only>
    <div id="oficial-chart">
      <VueApexCharts
        type="area"
        :height="height"
        :options="options"
        :series="series"
      />
    </div>
  </client-only>
</template>

<script>

export default {
  name: "AreaChart",
  components: {
    VueApexCharts: () => import('vue-apexcharts')
  },
  props: {
    height: {
      type: Number,
      default: 180
    },
    series: {
      type: Array,
      default: () => []
    },
    changeColors: {
      type: Array,
      default: () => []
    },
  },
  data() {
    return {
      options: {
        fill: {
          opacity: 1,
          type: "gradient",
          gradient: {
            shadeIntensity: 0.6,
            opacityFrom: 1,
            opacityTo: 0.9,
          },
          colors: ["var(--v-bluetext-base)", "#00AB8B"],
        },
        tooltip: {
          enabled: true,
          theme: "dark",
        },
        chart: {
          type: "area",
          height: 350,
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          lineCap: "round",
          width: 2,
          curve: "smooth",
          colors: ["#fff"],
        },
        yaxis: {
          opposite: false,
          labels: {
            style: {
              colors: "var(--v-text-base)",
            },
          },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
        },
        xaxis: {
          type: "datetime",
          labels: {
            style: {
              colors: "var(--v-text-base)",
            },
          },
          axisBorder: {
            color: "var(--v-text-base)",
          },
          axisTicks: {
            color: "var(--v-text-base)",
          },
        },
        legend: {
          horizontalAlign: "left",
          position: 'top',
          labels: {
              useSeriesColors: true
          },
        },
      },
    };
  },
  beforeMount() {
    if(this.changeColors.length) {
      this.options.fill.colors = this.changeColors;
    }
  }
};
</script>
