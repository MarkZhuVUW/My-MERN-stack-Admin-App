import React, { Component } from "react";
import { Polar } from "react-chartjs-2";
import { i18n } from "i18n";

const data = {
  datasets: [
    {
      data: [11, 16, 7, 3, 14],
      backgroundColor: ["#FF6384", "#4BC0C0", "#FFCE56", "#E7E9ED", "#36A2EB"]
    }
  ],
  labels: [
    i18n("dashboard.charts.red"),
    i18n("dashboard.charts.green"),
    i18n("dashboard.charts.yellow"),
    i18n("dashboard.charts.grey"),
    i18n("dashboard.charts.blue")
  ]
};

export default class PolarChart extends Component {
  render() {
    return <Polar data={data} />;
  }
}
