<template>
  <div>
    <div v-if="chartData.labels.length > 0">
      <Line ref="chart" :options="chartOptions" :data="chartData" />
    </div>
    <div v-else>
      <NoResultMessage v-if="loaded" />
      <LoadingSpinner v-else />
    </div>
  </div>
</template>
  
  <script>
import api from "@/services/api";
import { addErrorToast } from "@/services/toasts";

import NoResultMessage from "@/components/fragments/NoResultMessage";
import LoadingSpinner from "@/components/fragments/LoadingSpinner";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "vue-chartjs";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default {
  name: "ResourceStats",
  props: {
    resource: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      chartOptions: {
        responsive: true,
      },
      chartData: {
        labels: [],
        datasets: [
          {
            label: this.$t("resource.stats.comments"),
            data: [],
            // blue
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
          },
          {
            label: this.$t("resource.stats.shares"),
            data: [],
            // green
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
          },
          {
            label: this.$t("resource.stats.likes"),
            data: [],
            // red
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
          },
          {
            label: this.$t("resource.stats.exploits"),
            data: [],
            // yellow
            backgroundColor: "rgba(255, 205, 86, 0.2)",
            borderColor: "rgba(255, 205, 86, 1)",
          },
          {
            label: this.$t("resource.stats.saves"),
            data: [],
            // cyan
            backgroundColor: "rgba(0, 188, 212, 0.2)",
            borderColor: "rgba(0, 188, 212, 1)",
          },
          {
            label: this.$t("resource.stats.consults"),
            data: [],
            // purple
            backgroundColor: "rgba(153, 102, 255, 0.2)",
            borderColor: "rgba(153, 102, 255, 1)",
          },
        ],
      },
      laoded: false,
    };
  },
  methods: {
    async fetchStats() {
      const response = await api.get(`/resources/${this.resource.id}/stats`);
      if (response.status >= 200 && response.status < 300) {
        const { data } = response.data;
        // format is createdAt 2023-03-04T11:43:25+01:00 format to 2023-03-04
        this.chartData.labels = data.map((item) =>
          item.createdAt.split("T")[0].split("-").reverse().join("-")
        );
        this.chartData.datasets[0].data = data.map((item) => item.nbComments);
        this.chartData.datasets[1].data = data.map((item) => item.nbShares);
        this.chartData.datasets[2].data = data.map((item) => item.nbLikes);
        this.chartData.datasets[3].data = data.map((item) => item.nbExploits);
        this.chartData.datasets[4].data = data.map((item) => item.nbSaves);
        this.chartData.datasets[5].data = data.map((item) => item.nbConsults);
        this.loaded = true;
        return;
      }
      this.loaded = true;
      addErrorToast(response);
    },
  },
  mounted() {
    this.fetchStats();
  },
  components: {
    Line,
    NoResultMessage,
    LoadingSpinner,
  },
};
</script>
