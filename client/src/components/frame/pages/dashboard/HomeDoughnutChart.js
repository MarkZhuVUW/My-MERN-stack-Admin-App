import { Chart } from "chart.js";
import { i18n } from "i18n";
import React from "react";

export default class HomeDoughnutChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //group by role of user.

      roleData: this.groupByRole()
    };
    this.chartRef = React.createRef();
  }

  componentDidUpdate() {
    this.myChart.update();
  }

  /**
   * Group logs by role.
   * Example value:
   * {
   *  admin: 10,
   *  employer: 25,
   *  guest: 5
   * }
   *
   * @memberof HomeDoughnutChart
   */
  groupByRole = () => {
    var groupedRoles = [];
    this.props.data
      .map(log => log[3])
      .forEach(element => {
        if (groupedRoles[element]) ++groupedRoles[element];
        else groupedRoles[element] = 1;
      });

    return groupedRoles;
  };

  componentDidMount() {
    const { roleData } = this.state;
    this.myChart = new Chart(this.chartRef.current, {
      type: "doughnut",
      data: {
        labels: Object.keys(roleData).map(role =>
          i18n(`dashboard.doughnutChart.${role}`)
        ),
        datasets: [
          {
            data: Object.entries(roleData).map(roleEntry => roleEntry[1]),
            backgroundColor: Object.entries(roleData).map((role, index) =>
              this.colorChooser(index)
            )
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

  /**
   * Choose color based on input index.
   * @param {*} index
   */
  colorChooser = index => {
    // console.log(index);
    switch (index) {
      case 0:
        return "#FF6384";
      case 1:
        return "#36A2EB";
      case 2:
        return "#FFCE56";
      case 3:
        return "#3275a8";
      case 4:
        return "#32a842";
      case 5:
        return "#32a865";
      case 6:
        return "#6ba832";
      case 7:
        return "#98a832";
      case 8:
        return "#a83236";
    }
  };

  render() {
    return <canvas ref={this.chartRef} />;
  }
}
