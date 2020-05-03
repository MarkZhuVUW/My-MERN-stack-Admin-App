import { Chart } from "chart.js";
import { i18n } from "i18n";
import React from "react";

export default class HomeLineChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //group by role of user.
      pageViewData: this.groupPageViewsByCompany(),
    };
    this.chartRef = React.createRef();
  }

  /**
   * Group page view logs by company.
   * Example value:
   * [
   * 0 : 40, // represents welcome page
   * 1 : 40, // represents portfolio page
   * 2 : 40, // represents cv page
   * 3 : 10, // represents 403 error page
   * 4 : 10, // represents 404 error page
   * ]
   *
   * @memberof HomeLineChart
   */
  groupPageViewsByCompany = () => {
    var groupedPages = [0, 0, 0, 0, 0];
    // console.log(this.props.data);
    this.props.data
      .filter((log) => log[3] === "employer")
      .filter((log) => log[6] === "PAGE VIEW")
      .map((log) => log[5])
      .forEach((page) => {
        ++groupedPages[this.parsePageToIndex(page)];
      });

    return groupedPages;
  };

  parsePageToIndex = (page) => {
    switch (page) {
      case "welcomepage":
        return 0;
      case "porfolio":
        return 1;
      case "cv":
        return 2;
      case "403":
        return 3;
      case "404":
        return 4;
    }
  };
  componentDidUpdate(prevProp) {
    let pageViewData = this.groupPageViewsByCompany();
    if (prevProp.data !== this.props.data) {
      this.setState({
        pageViewData: pageViewData,
      });
      this.myChart.data.datasets = [
        {
          data: Object.entries(pageViewData).map((pageEntry) => pageEntry[1]),
          backgroundColor: [
            "#FF6384",
            "#4BC0C0",
            "#FFCE56",
            "#E7E9ED",
            "#32a842",
            "#FFCE56",
          ],
        },
      ];
      this.myChart.update();
    }
  }

  componentDidMount() {
    const { pageViewData } = this.state;

    this.myChart = new Chart(this.chartRef.current, {
      type: "line",
      data: {
        datasets: [
          {
            data: Object.entries(pageViewData).map((pageEntry) => pageEntry[1]),
            backgroundColor: [
              "#FF6384",
              "#4BC0C0",
              "#FFCE56",
              "#E7E9ED",
              "#32a842",
            ],
          },
        ],
        labels: [
          i18n("dashboard.lineChart.welcomePage"),
          i18n("dashboard.lineChart.portfolio"),
          i18n("dashboard.lineChart.cv"),
          "403",
          "404",
        ],
      },
      options: {
        legend: {
          display: false,
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
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
        return "#36A2EB";
      case 1:
        return "#FF6384";
      case 2:
        return "#FFCE56";
      case 3:
        return "#98a832";
      case 4:
        return "#a83236";
      case 5:
        return "#6ba832";
      case 6:
        return "#32a865";
      case 7:
        return "#32a842";
    }
  };

  render() {
    return <canvas ref={this.chartRef} />;
  }
}
