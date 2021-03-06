import { Grid } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { deleteLog, loadAllLogs } from "actions/adminActions";
import { clearErrors } from "actions/errorActions";
import classNames from "classnames";
import Breadcrumb from "components/shared/Breadcrumb";
import EditableTable from "components/shared/EditableTable";
import FacebookProgress from "components/shared/FacebookProgress";
import { i18n } from "i18n";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import "./dashboard.scss";
import HomeDoughnutChart from "./HomeDoughnutChart";
import HomeLineChart from "./HomeLineChart";
import HomePolarChart from "./HomePolarChart";

const propTypes = {
  
  clearErrors: PropTypes.func.isRequired,
  loadAllLogs: PropTypes.func.isRequired,
  allLogs: PropTypes.oneOfType([PropTypes.array]),
  user: PropTypes.oneOfType([PropTypes.object]).isRequired,
  deleteLog: PropTypes.func.isRequired,
  isSmallScreen: PropTypes.bool.isRequired,
};
const defaultProps = {
  
  allLogs: null,
};
class Dashboard extends Component {
  componentDidMount() {
    // if (this.props.user)
    //   this.props.loadAllLogsForSpecificUser(this.props.user._id);
    this.props.loadAllLogs();
  }

  toggle = () => {
    // Clear errors
    this.props.clearErrors();
  };

  /**
   * This callback function sends back the email of the user to be deleted
   * after the delete button is clicked on the mui datatable.
   */
  deleteLogCallback = (logId) => {
    // eslint-disable-next-line no-underscore-dangle
    this.props.deleteLog(this.props.user._id, logId);
  };

  onSubmit = (e) => {
    e.preventDefault();

    // clear errors
    this.toggle();
  };

  render() {
    const { allLogs, user, isSmallScreen } = this.props;
    if (!user || !allLogs)
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FacebookProgress />
        </div>
      );

    return (
      <div>
        <DashboardContent
          allLogs={allLogs}
          deleteLogCallback={this.deleteLogCallback}
          user={user}
          isSmallScreen={isSmallScreen}
        />
      </div>
    );
  }
}

Dashboard.propTypes = propTypes;
Dashboard.defaultProps = defaultProps;
const mapStateToProps = (state) => ({
  error: state.error,
  allLogs: state.admin.allLogs,
  user: state.auth.user,
});
export default connect(mapStateToProps, {
  clearErrors,
  loadAllLogs,
  deleteLog,
})(Dashboard);

function DashboardContent(props) {
  const useStyle = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(2),
      display: "flex",
      overflow: "auto",
      flexDirection: "column",
      zIndex: 1,
      position: "relative",
      height: "100%",
    },
    aboveParticles: {
      zIndex: 1,
      position: "relative",
    },
  }));
  const classes = useStyle();

  const columns = [
    {
      name: "id",
      label: "id",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: i18n("dashboard.table.name"),
      label: i18n("dashboard.table.name"),
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: i18n("dashboard.table.email"),
      label: i18n("dashboard.table.email"),
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: i18n("dashboard.table.role"),
      label: i18n("dashboard.table.role"),
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: i18n("dashboard.table.company"),
      label: i18n("dashboard.table.company"),
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: i18n("dashboard.table.explanation"),
      label: i18n("dashboard.table.explanation"),
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: i18n("dashboard.table.type"),
      label: i18n("dashboard.table.type"),
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: i18n("dashboard.table.dateLogged"),
      label: i18n("dashboard.table.dateLogged"),
      options: {
        filter: true,
        sort: true,
      },
    },
  ];
  const data = props.allLogs
    ? props.allLogs.map((log) => {
        return [
          // eslint-disable-next-line no-underscore-dangle
          log._id,
          log.name,
          log.email,
          log.role,
          log.company,
          log.explanation,
          log.type,
          new Date(log.date_logged).toString(),
        ];
      })
    : [];
  const options = {
    filter: true,
    responsive: "scrollMaxHeight",
    textLabels: {
      pagination: {
        next: i18n("MuiDataTable.nextPage"),
        previous: i18n("MuiDataTable.previousPage"),
        rowsPerPage: i18n("MuiDataTable.rowsPerPage"),
        displayRows: i18n("MuiDataTable.displayRows"), // 1-10 of 30
      },
      toolbar: {
        search: i18n("MuiDataTable.search"),
        downloadCsv: i18n("MuiDataTable.downloadCsv"),
        print: i18n("MuiDataTable.print"),
        viewColumns: i18n("MuiDataTable.viewColumns"),
        filterTable: i18n("MuiDataTable.filterTable"),
      },
      filter: {
        title: i18n("MuiDataTable.filterTable"),
        reset: i18n("MuiDataTable.filterTitle"),
      },
      viewColumns: {
        title: i18n("MuiDataTable.viewColumnsTitle"),
      },
      selectedRows: {
        text: i18n("MuiDataTable.selectedRowsText"),
        delete: i18n("MuiDataTable.delete"),
      },
    },
    onRowsDelete: (rowsDeleted) => {
      if (props.user.role !== "admin") {
        // console.log(props.user.role + " is not allowed to delete logs");
        return;
      }
      // rowdDeleted.lookup gets the actual indexes that are deleted in the log data.
      // loop through each index and delete them one by one.
      Object.keys(rowsDeleted.lookup).forEach((index) => {
        // console.log(data[index][0]);

        props.deleteLogCallback(data[index][0]);
      });
    },
  };

  return (
    <div>
      <Breadcrumb
        items={[[i18n("frame.menu"), "/"], [i18n("dashboard.route")]]}
      />
      <Grid container spacing={props.isSmallScreen ? 1 : 3}>
        <Grid item xs={12} md={4} lg={4}>
          <Paper className={classNames(classes.paper, "chart-paper")}>
            <Typography component="h2" variant="h6">
              {i18n("dashboard.doughnutChart.title")}
            </Typography>
            <HomeDoughnutChart data={data} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={4} lg={4}>
          <Paper className={classNames(classes.paper, "chart-paper")}>
            <Typography component="h2" variant="h6">
              {i18n("dashboard.lineChart.title")}
            </Typography>

            <HomeLineChart data={data} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Paper className={classNames(classes.paper, "chart-paper")}>
            <Typography component="h2" variant="h6">
              {i18n("dashboard.polarChart.title")}
            </Typography>
            <HomePolarChart data={data} />
          </Paper>
        </Grid>

        <Grid item xs={12} className={classes.aboveParticles}>
          <EditableTable
            title={i18n("dashboard.table.userActivities")}
            options={options}
            data={data}
            columns={columns}
            className="data-table"
          />
        </Grid>
      </Grid>

      <p
        style={{
          width: "100%",
          textAlign: "center",
        }}
      >
        {i18n("dashboard.message")}
      </p>
    </div>
  );
}

DashboardContent.propTypes = {
  allLogs: PropTypes.oneOfType([PropTypes.array]).isRequired,
  deleteLogCallback: PropTypes.func.isRequired,
  user: PropTypes.oneOfType([PropTypes.object]).isRequired,
  isSmallScreen: PropTypes.bool.isRequired,
};
