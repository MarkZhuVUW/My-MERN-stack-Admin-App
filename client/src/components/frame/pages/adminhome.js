import React, { Component } from "react";
import { i18n } from "i18n";
import HomeDoughnutChart from "../UserDashboard/HomeDoughnutChart";
import HomePolarChart from "../UserDashboard/HomePolarChart";
import clsx from "clsx";

import { Grid, Paper, Typography, Toolbar } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteLog } from "../../actions/adminActions";

import { clearErrors } from "../../actions/errorActions";
import { makeStyles } from "@material-ui/core";
import Iframe from "react-iframe";

import { loadAllLogsForSpecificUser } from "../../actions/adminActions";
import EditableTable from "components/EditableTable";
const styles = {};

class AdminHome extends Component {
  state = {};

  static propTypes = {
    clearErrors: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    allLogs: PropTypes.array,
    user: PropTypes.object
  };

  componentDidMount() {
    if (this.props.user && !this.props.allLogs)
      this.props.loadAllLogsForSpecificUser(this.props.user._id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.user && !this.props.allLogs)
      this.props.loadAllLogsForSpecificUser(this.props.user._id);
  }

  toggle = () => {
    // Clear errors
    this.props.clearErrors();
  };

  onSubmit = e => {
    e.preventDefault();

    const { code } = this.state;
    const { email } = this.props;

    //clear errors
    this.toggle();
  };

  render() {
    const { classes, allLogs, deleteLog, user } = this.props;

    return (
      <div>
        <HomeContent allLogs={allLogs} deleteLog={deleteLog} user={user} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
  user: state.auth.user,
  allLogs: state.admin.allLogs
});
export default connect(mapStateToProps, {
  clearErrors,
  loadAllLogsForSpecificUser,
  deleteLog
})(withStyles(styles)(AdminHome));

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: "#E9EAED",
    width: "100%"
    //   backgroundColor: "black"
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  fixedHeight: {
    height: 260
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  container: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  }
}));

/**
 * The support component. Used in the drawer list.
 *
 * @author Mark Zhu <zdy120939259@outlook.com>
 */

function HomeContent(props) {
  const classes = useStyles();

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
      name: "type",
      label: "type",
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: "Email",
      label: "Email",
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: "Name",
      label: "Name",
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: "Role",
      label: "Role",
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: "Company",
      label: "Company",
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: "Explanation",
      label: "Explanation",
      options: {
        filter: true,
        sort: true
      }
    },

    {
      name: "Date_logged",
      label: "Date_logged",
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
          log.type,
          log.email,
          log.name,
          log.role,
          log.company,
          log.explanation,
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
        props.deleteLog(props.user._id, data[rowsDeleted.data[i].index][0]);

        console.log(rowsDeleted.data[i].index);
        console.log(data[i]);
      }
    }
  };
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={6}>
          <Toolbar variant="dense" style={{ backgroundColor: "#3f51b5" }}>
            <Typography variant="h6" style={{ color: "white" }}>
              {i18n("home.device")}
            </Typography>
          </Toolbar>
          <Paper>
            <HomeDoughnutChart />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Toolbar variant="dense" style={{ backgroundColor: "#3f51b5" }}>
            <Typography variant="h6" style={{ color: "white" }}>
              {i18n("home.customers")}
            </Typography>
          </Toolbar>
          <Paper>
            <HomePolarChart
              data={{
                datasets: [
                  {
                    data: [100, 50, 30],
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
                  i18n("home.charts.NCR"),
                  i18n("home.charts.DIYAR"),
                  i18n("home.charts.GALLAGHER")
                ]
              }}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={12} lg={12}>
          <EditableTable
            data={data}
            options={options}
            columns={columns}
            title="User Activities"
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
        {i18n("home.message")}
      </p>
    </div>
  );
}
