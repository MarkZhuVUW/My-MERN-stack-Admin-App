import { Chart } from "chart.js";
import { i18n } from "i18n";
import React from "react";

export default class HomeLineChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //group by role of user.
      // pageViewData: this.groupByRole()
    };
    this.chartRef = React.createRef();
  }

  /**
   *Group logs by page.
   * Example value:
   * {
   *  dashboard: 10,
   *  developer: 25,
   *  useradmin: 5,
   *  cv: 20,
   *  portfolio: 30
   * }
   *
   * @memberof HomeLineChart
   */
  // groupByPage = () => {
  //   var groupedRoles = [];
  //   this.props.data
  //     .map(log => log[4])
  //     .forEach(element => {
  //       if (groupedRoles[element]) ++groupedRoles[element];
  //       else groupedRoles[element] = 1;
  //     });

  //   return groupedRoles;
  // };

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
          i18n("dashboard.lineChart.dashboard"),
          i18n("dashboard.lineChart.developer"),
          i18n("dashboard.lineChart.useradmin"),
          i18n("dashboard.lineChart.cv"),
          i18n("dashboard.lineChart.portfolio")
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
