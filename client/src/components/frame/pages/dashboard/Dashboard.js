import clsx from "clsx";
import { i18n } from "i18n";
import Breadcrumb from "view/shared/Breadcrumb";
import { Grid } from "@material-ui/core";

import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";

import Table from ".//Table";
import Chart from "./chart";
import DoughnutChart from "./DoughnutChart";
import LineChart from "./LineChart";
import MixChartOne from "./MixChartOne";
import PolarChart from "./PolarChart";

import React, { Component } from "react";

import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { clearErrors } from "../../../../actions/errorActions";

const styles = {};

class Dashboard extends Component {
  state = {};

  static propTypes = {
    clearErrors: PropTypes.func.isRequired,
    loadAllUsers: PropTypes.func.isRequired,
    allUsers: PropTypes.array,
    isAuthenticated: PropTypes.bool.isRequired,
    deleteUser: PropTypes.func.isRequired
  };
  componentDidMount() {
    this.props.loadAllUsers();
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
  callback = id => {
    console.log();
    this.props.deleteUser(id);
  };
  onSubmit = e => {
    e.preventDefault();

    const { code } = this.state;
    const { email } = this.props;

    //clear errors
    this.toggle();
  };

  render() {
    const { classes, allUsers } = this.props;

    return (
      <div>
        <DashboardContent />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
  allUsers: state.auth.allUsers
});
export default connect(mapStateToProps, {
  clearErrors
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
    }
  }));

  // Generate Sales Data
  function createData(time, amount) {
    return { time, amount };
  }

  const chartData = [
    createData("00:00", 0),
    createData("03:00", 300),
    createData("06:00", 600),
    createData("09:00", 800),
    createData("12:00", 1500),
    createData("15:00", 2000),
    createData("18:00", 2400),
    createData("21:00", 2400),
    createData("24:00", undefined)
  ];

  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const a = () => {
    return (
      <>
        <Breadcrumb
          items={[[i18n("frame.menu"), "/"], [i18n("dashboard.menu")]]}
        />
        {/*page title */}
        <div>
          <Typography variant="h1" size="sm">
            {props.title}
          </Typography>
          {props.button && (
            <Button variant="contained" size="large" color="secondary">
              {props.button}
            </Button>
          )}
        </div>
        <Grid container spacing={props.isSmallScreen ? 1 : 3}>
          <Grid item xs={12} md={8} lg={8}>
            <Paper className={fixedHeightPaper}>
              <Chart data={chartData} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <Paper className={fixedHeightPaper}>
              <Typography
                component="h2"
                variant="h6"
                color="primary"
                gutterBottom
              >
                doughbut
              </Typography>
              <DoughnutChart />
            </Paper>
          </Grid>

          <Grid item xs={12} md={4} lg={4}>
            <Paper className={fixedHeightPaper}>
              <Typography
                component="h2"
                variant="h6"
                color="primary"
                gutterBottom
              >
                line
              </Typography>
              <LineChart />
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <Paper className={fixedHeightPaper}>
              <Typography
                component="h2"
                variant="h6"
                color="primary"
                gutterBottom
              >
                mixone
              </Typography>
              <MixChartOne />
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <Paper className={fixedHeightPaper}>
              <Typography
                component="h2"
                variant="h6"
                color="primary"
                gutterBottom
              >
                polar
              </Typography>
              <PolarChart />
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Table data={null} />
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
  };

  return <>{a()}</>;
}
