import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";
import { i18n } from "i18n";

const data = {
  labels: [
    i18n("dashboard.charts.red"),
    i18n("dashboard.charts.green"),
    i18n("dashboard.charts.yellow")
  ],
  datasets: [
    {
      data: [300, 50, 100],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
    }
  ]
};

export default class DoughnutChart extends Component {
  render() {
    return <Doughnut data={data} />;
  }
}
