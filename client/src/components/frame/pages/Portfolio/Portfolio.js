import { Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import classNames from "classnames";
import FacebookProgress from "components/FacebookProgress";
import { i18n } from "i18n";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import ReactTypingEffect from "react-typing-effect";
import "swagger-ui/dist/swagger-ui.css";
import Breadcrumb from "view/shared/Breadcrumb";
import { logDownload } from "../../../../actions/adminActions";
import { clearErrors } from "../../../../actions/errorActions";
import { getGithubUser } from "../../../../actions/utilityActions";
import "./portfolio.scss";
import PortfolioCard from "./PortfolioCard";

class Portfolio extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired,
    getGithubUser: PropTypes.func.isRequired,
    githubUser: PropTypes.object,
  };
  componentDidMount() {
    // get my github user object through calling github getuser api.
    setTimeout(() => {
      this.props.getGithubUser("MarkZhuVUW");
    }, 1000);
  }
  componentDidUpdate() {}

  // handleDownload = (href) => {
  //   // console.log(this.props.user);

  //   const { _id, name, email, role, company } = this.props.user;

  //   const downloadLog = {
  //     name: name,
  //     email: email,
  //     role: role,
  //     explanation: href,
  //     type: "DOWNLOAD",
  //     company: company,
  //   };

  //   this.props.logDownload(_id, downloadLog);

  //   this.toggle();
  // };
  // toggle = () => {
  //   // Clear errors
  //   this.props.clearErrors();
  // };
  render() {
    const { githubUser } = this.props;
    if (!githubUser) return <FacebookProgress msg="calling github api..." />;
    return (
      <PortfolioContent
        isSmallScreen={this.props.isSmallScreen}
        githubUser={githubUser}
        // handleDownload={this.handleDownload}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  githubUser: state.utility.githubUser,
});

export default connect(mapStateToProps, {
  logDownload,
  clearErrors,
  getGithubUser,
})(Portfolio);

/**
 * The support component. Used in the drawer list.
 *
 * @author Mark Zhu <zdy120939259@outlook.com>
 */
function PortfolioContent(props) {
  const useStyles = makeStyles((theme) => ({
    root: {
      padding: theme.spacing(props.isSmallScreen ? 1 : 4),
    },

    paper: {
      justifyContent: "center",
      padding: theme.spacing(props.isSmallScreen ? 1 : 4),
      marginTop: theme.spacing(props.isSmallScreen ? 2 : 4),
      marginBottom: theme.spacing(props.isSmallScreen ? 2 : 4),
      display: "flex",
      overflow: "auto",
      flexDirection: "row",
      zIndex: 1,
      position: "relative",
    },

    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
    expansionPanelHeader: {
      backgroundColor: "#3F51B5",
      color: "white",
    },
    box: {
      justifyContent: "center",
      alignItems: "center",
    },
  }));

  const classes = useStyles();

  return (
    <>
      <Breadcrumb
        // style={{ textColor: "black" }}
        items={[[i18n("frame.menu"), "/"], [i18n("portfolio.route")]]}
      />

      <div className={classes.root}>
        <Grid container>
          <Paper className={classNames(classes.paper, "business-card")}>
            <Typography variant="h3">
              Hi, I am
              <ReactTypingEffect
                speed={25}
                eraseDelay={1200}
                typingDelay={200}
                text={[
                  " a web developer",
                  " a material design lover",
                  " a react/vue developer",
                  " a nodejs developer",
                  " a .net developer",
                ]}
              />
            </Typography>
          </Paper>
        </Grid>
        <Grid container spacing={props.isSmallScreen ? 0 : 4} className="grid">
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <PortfolioCard
              title={i18n("portfolio.hireable")}
              cardBackgroundColor="secondary"
              className="card-scale"
              content={props.githubUser.hireable ? "true" : "false"}
            />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <PortfolioCard
              title={i18n("portfolio.githubUsername")}
              content={props.githubUser.login}
              className="card-curl"
            />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <PortfolioCard
              title={i18n("portfolio.followers")}
              content={props.githubUser.followers}
              className="card"
            />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <PortfolioCard
              cardBackgroundColor="primary"
              title={i18n("portfolio.numOfPublicRepos")}
              content={props.githubUser.public_repos}
              className="card"
            />
          </Grid>
        </Grid>
      </div>
    </>
  );
}
