import { Chart } from "chart.js";
import { i18n } from "i18n";
import React from "react";

export default class HomeLineChart extends React.Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
  }

  componentDidUpdate() {
    this.myChart.update();
  }

  componentDidMount() {
    this.myChart = new Chart(this.chartRef.current, {
      type: "line",
      data: {
        datasets: [
          {
            data: [11, 16, 7, 3, 14],
            backgroundColor: [
              "#FF6384",
              "#4BC0C0",
              "#FFCE56",
              "#E7E9ED",
              "#36A2EB"
            ]
          }
        ],
        labels: [
          i18n("home.charts.red"),
          i18n("home.charts.green"),
          i18n("home.charts.yellow"),
          i18n("home.charts.grey"),
          i18n("home.charts.blue")
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
