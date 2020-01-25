import React, { Component } from "react";
import { Chart } from "chart.js";
import { i18n } from "i18n";

export default class HomeDoughnutChart extends React.Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
  }

  componentDidUpdate() {
    // this.myChart.data.labels = this.props.data.map(d => d.label);
    // this.myChart.data.datasets[0].data = this.props.data.map(d => d.value);
    this.myChart.update();
  }

  componentDidMount() {
    this.myChart = new Chart(this.chartRef.current, {
      type: "doughnut",
      data: {
        labels: [
          i18n("home.charts.red"),
          i18n("home.charts.green"),
          i18n("home.charts.yellow")
        ],
        datasets: [
          {
            data: [300, 50, 100],
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
            hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
          }
        ]
      },
      options: {
        legend: {
          display: false
        }
      }
    });
  }

  render() {
    return <canvas ref={this.chartRef} />;
  }
}
