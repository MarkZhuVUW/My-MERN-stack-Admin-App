import { makeStyles } from "@material-ui/core";
import Breadcrumb from "components/shared/Breadcrumb";
// import { StyleSheet } from "@react-pdf/renderer";
import { i18n } from "i18n";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { logDownload } from "../../../actions/adminActions";
import { clearErrors } from "../../../actions/errorActions";

// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class WelcomePage extends Component {
  componentDidMount() {}

  componentDidUpdate(prevProp, prevState, snapshot) {}

  static propTypes = {
    user: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  handleDownload = href => {
    const { _id, name, email, role, company } = this.props.user;

    const downloadLog = {
      name,
      email,
      role,
      explanation: href,
      type: "DOWNLOAD",
      company
    };

    this.props.logDownload(_id, downloadLog);

    this.toggle();
  };

  toggle = () => {
    // Clear errors
    this.props.clearErrors();
  };

  render() {
    return (
      <WelcomePageContent
        isSmallScreen={this.props.isSmallScreen}
        handleDownload={this.handleDownload}
      />
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps, {
  logDownload,
  clearErrors
})(WelcomePage);

/**
 * The support component. Used in the drawer list.
 *
 * @author Mark Zhu <zdy120939259@outlook.com>
 */
function WelcomePageContent(props) {
  const useStyles = makeStyles(theme => ({
    root: {
      backgroundColor: "#E9EAED",
      width: "100%"
      //   backgroundColor: "black"
    },
    container: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1)
    },
    smallScreenPaper: {
      padding: theme.spacing(props.isSmallScreen ? 1 : 4),
      display: "flex",
      overflow: "auto",
      flexDirection: "row",
      backgroundColor: "white"
    },
    paper: {
      justifyContent: "center",
      alignItems: "center",
      padding: theme.spacing(props.isSmallScreen ? 1 : 4),
      display: "flex",
      overflow: "auto",
      flexDirection: "row",
      backgroundColor: "white"
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

  return (
    <>
      <Breadcrumb
        // style={{ textColor: "black" }}
        items={[[i18n("frame.menu"), "/"], [i18n("welcomePage.route")]]}
      />

      {/* <Typography>
        Oops it appears I dont want you guys to see my CV for now :)
      </Typography> */}
    </>
  );
}
