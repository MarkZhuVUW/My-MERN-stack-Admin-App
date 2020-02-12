import { Grid } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/styles";
import EditableTable from "components/EditableTable";
import { i18n } from "i18n";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import Breadcrumb from "view/shared/Breadcrumb";
import {
  deleteLog,
  loadAllLogsForSpecificUser
} from "../../../../actions/adminActions";
import { loadUser } from "../../../../actions/authActions";
import { clearErrors } from "../../../../actions/errorActions";
import HomeDoughnutChart from "./HomeDoughnutChart";
import HomeLineChart from "./HomeLineChart";
import HomePolarChart from "./HomePolarChart";

const styles = {};

class Dashboard extends Component {
  state = {};

  static propTypes = {
    clearErrors: PropTypes.func.isRequired,
    allLogs: PropTypes.array,
    loadAllLogsForSpecificUser: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    loadUser: PropTypes.func.isRequired,
    user: PropTypes.object,
    deleteLog: PropTypes.func.isRequired
  };
  componentDidMount() {
    // this.props.loadUser();
    setTimeout(() => {
      this.props.loadAllLogsForSpecificUser(this.props.user._id);
    }, 1000);
  }

  componentDidUpdate(prevProps) {}
  toggle = () => {
    // Clear errors
    this.props.clearErrors();
  };

  /**
   * This callback function sends back the email of the user to be deleted
   * after the delete button is clicked on the mui datatable.
   */
  deleteLogCallback = logid => {
    this.props.deleteLog(this.props.user._id, logid);
  };

  onSubmit = e => {
    e.preventDefault();

    const { code } = this.state;

    const { email } = this.props;

    //clear errors
    this.toggle();
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <DashboardContent
          allLogs={this.props.allLogs}
          deleteLogCallback={this.deleteLogCallback}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
  allLogs: state.admin.allLogs,
  user: state.auth.user
});
export default connect(mapStateToProps, {
  clearErrors,
  loadAllLogsForSpecificUser,
  loadUser,
  deleteLog
})(withStyles(styles)(Dashboard));

function DashboardContent(props) {
  const useStyles = makeStyles(theme => ({
    paper: {
      padding: theme.spacing(2),
      display: "flex",
      overflow: "auto",
      flexDirection: "column"
    },
    fixedHeight: {
      height: 260
    },
    smallScreenFixedHeight: {
      height: 360
    }
  }));

  const classes = useStyles();
  // const fixedHeightPaper = props.isSmallScreen
  //   ? clsx(classes.paper, classes.fixedHeight)
  //   : clsx(classes.paper, classes.smallScreenFixedHeight);

  const columns = [
    {
      name: "id",
      label: "id",
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: i18n("dashboard.table.name"),
      label: i18n("dashboard.table.name"),
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: i18n("dashboard.table.email"),
      label: i18n("dashboard.table.email"),
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: i18n("dashboard.table.role"),
      label: i18n("dashboard.table.role"),
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: i18n("dashboard.table.explanation"),
      label: i18n("dashboard.table.explanation"),
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: i18n("dashboard.table.type"),
      label: i18n("dashboard.table.type"),
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: i18n("dashboard.table.dateLogged"),
      label: i18n("dashboard.table.dateLogged"),
      options: {
        filter: true,
        sort: true
      }
    }
  ];
  const data = props.allLogs
    ? props.allLogs.map(log => {
        return [
          log._id,
          log.name,
          log.email,
          log.role,
          log.explanation,
          log.type,
          new Date(log.date_logged).toString()
        ];
      })
    : [];
  const options = {
    filter: true,
    responsive: "scrollMaxHeight",
    onRowsDelete: rowsDeleted => {
      for (var i = 0; i < rowsDeleted.data.length; ++i) {
        //send back to UserAdmin component the email of the user to be deleted.
        props.deleteLogCallback(data[rowsDeleted.data[i].index][0]);
        console.log(rowsDeleted.data[i].index);
        console.log(data[i]);
      }
    }
  };

  return (
    <>
      <Breadcrumb
        items={[[i18n("frame.menu"), "/"], [i18n("dashboard.menu")]]}
      />

      <Grid container spacing={props.isSmallScreen ? 1 : 3}>
        <Grid item xs={12} md={4} lg={4}>
          <Paper className={classes.paper}>
            <Typography component="h2" variant="h6" color="primary">
              {i18n("dashboard.doughnutChart.title")}
            </Typography>
            <HomeDoughnutChart />
          </Paper>
        </Grid>

        <Grid item xs={12} md={4} lg={4}>
          <Paper className={classes.paper}>
            <Typography component="h2" variant="h6" color="primary">
              {i18n("dashboard.websiteViews")}
            </Typography>

            <HomeLineChart />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Paper className={classes.paper}>
            <Typography component="h2" variant="h6" color="primary">
              polar
            </Typography>
            <HomePolarChart />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <EditableTable
            title={i18n("dashboard.table.userActivities")}
            options={options}
            data={data}
            columns={columns}
          />
        </Grid>
      </Grid>

      <p
        style={{
          width: "100%",
          textAlign: "center",
          color: "grey"
        }}
      >
        {i18n("dashboard.message")}
      </p>
    </>
  );
}
