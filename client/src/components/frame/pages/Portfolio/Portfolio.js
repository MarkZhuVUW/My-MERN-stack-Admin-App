import { Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import { TreeView } from "@material-ui/lab";
import classNames from "classnames";
import Breadcrumb from "components/shared/Breadcrumb";
import FacebookProgress from "components/shared/FacebookProgress";
import MyTreeItem from "components/shared/MyTreeItem";
import { i18n } from "i18n";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import ReactTypingEffect from "react-typing-effect";

import FolderIcon from "@material-ui/icons/Folder";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { logDownload } from "../../../../actions/adminActions";
import { clearErrors } from "../../../../actions/errorActions";
import { getGithubUser } from "../../../../actions/utilityActions";
import "./portfolio.scss";
import PortfolioCard from "./PortfolioCard";

const propTypes = {
  user: PropTypes.oneOfType([PropTypes.object]).isRequired,
  // clearErrors: PropTypes.func.isRequired,
  getGithubUser: PropTypes.func.isRequired,
  githubUser: PropTypes.oneOfType([PropTypes.object]),
  isSmallScreen: PropTypes.bool.isRequired

  // logDownload: PropTypes.func.isRequired
};
const defaultProps = { githubUser: null };
const Portfolio = (props) => {
  const { githubUser, isSmallScreen, user } = props;
  useEffect(() => {
    if (!githubUser) {
      props.getGithubUser("MarkZhuVUW");
    }
  });
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

  const useStyles = makeStyles((theme) => ({
    root: {
      padding: theme.spacing(props.isSmallScreen ? 1 : 4),
      flexGrow: 1
    },

    paper: {
      justifyContent: "center",
      padding: theme.spacing(props.isSmallScreen ? 1 : 4),
      marginTop: theme.spacing(props.isSmallScreen ? 2 : 4),
      marginBottom: theme.spacing(props.isSmallScreen ? 2 : 4),
      display: "flex",
      overflow: "auto",
      flexDirection: "row"
    },

    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular
    },
    expansionPanelHeader: {
      backgroundColor: "#3F51B5",
      color: "white"
    },
    box: {
      justifyContent: "center",
      alignItems: "center"
    }
  }));

  const classes = useStyles();

  const [expanded, setExpanded] = React.useState([]);

  const handleChange = (event, nodes) => {
    setExpanded(nodes);
  };
  return (
    <>
      {githubUser ? (
        <>
          <Breadcrumb
            // style={{ textColor: "black" }}
            items={[[i18n("frame.menu"), "/"], [i18n("portfolio.route")]]}
          />

          <div className={classes.root}>
            <Grid container className="grid" spacing={isSmallScreen ? 1 : 4}>
              <Paper className={classNames(classes.paper, "business-card")}>
                <Typography
                  variant={props.isSmallScreen ? "body2" : "h3"}
                  gutterBottom
                >
                  Hi, I am
                  <ReactTypingEffect
                    speed={25}
                    eraseDelay={1200}
                    typingDelay={200}
                    text={[
                      "a software engineer",
                      "a web developer",
                      "an indie game enthusiast"
                    ]}
                  />
                </Typography>
              </Paper>
            </Grid>
            <Grid container spacing={isSmallScreen ? 1 : 4}>
              <Grid item lg={3} sm={6} xl={3} xs={12} className="grid">
                <PortfolioCard
                  title={i18n("portfolio.hireable")}
                  cardBackgroundColor="secondary"
                  className={classNames("card-scale")}
                  content={githubUser.hireable ? "true" : "false"}
                />
              </Grid>
              <Grid item lg={3} sm={6} xl={3} xs={12} className="grid">
                <PortfolioCard
                  title={i18n("portfolio.githubUsername")}
                  content={githubUser.login}
                  className={classNames("card-scale")}
                />
              </Grid>
              <Grid item lg={3} sm={6} xl={3} xs={12} className="grid">
                <PortfolioCard
                  title={i18n("portfolio.followers")}
                  content={githubUser.followers}
                  className={classNames("card-scale")}
                />
              </Grid>
              <Grid item lg={3} sm={6} xl={3} xs={12} className="grid">
                <PortfolioCard
                  cardBackgroundColor="primary"
                  title={i18n("portfolio.numOfPublicRepos")}
                  content={githubUser.public_repos}
                  className={classNames("card-scale")}
                />
              </Grid>
            </Grid>

            <Grid container className="grid" spacing={isSmallScreen ? 1 : 4}>
              <TreeView
                className={classes.root}
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                expanded={expanded}
                onNodeToggle={handleChange}
              >
                <MyTreeItem
                  nodeId="1"
                  labelText="RSMSSB"
                  labelIcon={FolderIcon}
                />
                <MyTreeItem
                  nodeId="2"
                  labelText="RSMSSB"
                  labelIcon={FolderIcon}
                />
                <MyTreeItem
                  nodeId="3"
                  labelText="RSMSSB"
                  labelIcon={FolderIcon}
                />
              </TreeView>
            </Grid>
          </div>
        </>
      ) : (
        <FacebookProgress msg="calling github api..." />
      )}
    </>
  );
};

Portfolio.propTypes = propTypes;
Portfolio.defaultProps = defaultProps;

const mapStateToProps = (state) => ({
  user: state.auth.user,
  githubUser: state.utility.githubUser
});

export default connect(mapStateToProps, {
  logDownload,
  clearErrors,
  getGithubUser
})(Portfolio);
