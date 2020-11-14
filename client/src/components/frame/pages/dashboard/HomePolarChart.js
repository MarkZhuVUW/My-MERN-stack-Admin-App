import { Chart } from "chart.js";
import React from "react";

export default class HomePolarChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // group by role of user.
      companyData: this.groupByCompany(),
    };
    this.chartRef = React.createRef();
  }

  /**
   * Group logs by company.
   * Example value:
   * {
   *  Invenco: 10,
   *  Alibaba: 25,
   *  Utilmate: 5,
   *  Tencent: 20,
   *  Google: 30
   * }
   *
   * @memberof HomePolarChart
   */
  groupByCompany = () => {
    const groupedCompanies = {};

    this.props.data
      .filter((user) => user[3] === "employer")
      .map((log) => log[4])
      .filter((company) => company !== "")
      .forEach((element) => {
        if (groupedCompanies[element]) ++groupedCompanies[element];
        else groupedCompanies[element] = 1;
      });

    return groupedCompanies;
  };

  componentDidUpdate(prevProp, prevState, snapshot) {
    // this.myChart.data.labels = this.props.data.map(d => d.label);
    // this.myChart.data.datasets[0].data = this.props.data.map(d => d.value);
    if (prevProp.data !== this.props.data) {
      this.setState({
        companyData: this.groupByCompany(),
      });
      this.myChart.data.datasets = [
        {
          data: Object.entries(this.groupByCompany()).map(
            (companyEntry) => companyEntry[1]
          ),
          backgroundColor: Object.entries(
            this.groupByCompany()
          ).map((company, index) => this.colorChooser(index)),
        },
      ];
      this.myChart.update();
    }
  }

  componentDidMount() {
    const { companyData } = this.state;
    this.myChart = new Chart(this.chartRef.current, {
      type: "polarArea",
      data: {
        datasets: [
          {
            data: Object.entries(companyData).map(
              (companyEntry) => companyEntry[1]
            ),
            backgroundColor: Object.entries(companyData).map((company, index) =>
              this.colorChooser(index)
            ),
          },
        ],
        labels: Object.keys(companyData),
      },
      options: {
        legend: {
          display: false,
        },
      },
    });
  }

  /**
   * Choose color based on input index.
   * @param {*} index
   */
  colorChooser = (index) => {
    // console.log(index);
    switch (index) {
      case 0:
        return "#a83236";
      case 1:
        return "#98a832";
      case 2:
        return "#6ba832";
      case 3:
        return "#32a865";
      case 4:
        return "#32a842";
      case 5:
        return "#36A2EB";
      case 6:
        return "#FF6384";
      case 7:
        return "#FFCE56";
    }
  };

  render() {
    return <canvas ref={this.chartRef} />;
  }
}
