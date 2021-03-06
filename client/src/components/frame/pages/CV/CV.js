import { makeStyles } from "@material-ui/core";
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Breadcrumb from "components/shared/Breadcrumb";
// import { StyleSheet } from "@react-pdf/renderer";
import { i18n } from "i18n";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { Document, Page } from 'react-pdf';
import { connect } from "react-redux";
import { logDownload } from "../../../../actions/adminActions";
import { clearErrors } from "../../../../actions/errorActions";
import { pdfCV } from "./Mark_Zhu_CV.pdf";
import PageNumMenu from './PageNumMenu';
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


class CV extends Component {


  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {}

  static propTypes = {
    user: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired,
  };

  handleDownload = (href) => {
    console.log(this.props.user);

    const { _id, name, email, role, company } = this.props.user;

    const downloadLog = {
      name,
      email,
      role,
      explanation: href,
      type: "DOWNLOAD",
      company,
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
      <CVContent
        isSmallScreen={this.props.isSmallScreen}
        handleDownload={this.handleDownload}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  logDownload,
  clearErrors,
})(CV);

/**
 * The support component. Used in the drawer list.
 *
 * @author Mark Zhu <zdy120939259@outlook.com>
 */
function CVContent(props) {

  const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: "#E9EAED",
      width: "100%",
      //   backgroundColor: "black"
    },
    container: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    smallScreenPaper: {
      padding: theme.spacing(props.isSmallScreen ? 1 : 4),
      display: "flex",
      overflow: "auto",
      flexDirection: "row",
      backgroundColor: "white",
      zIndex: 1,
      position: "relative",
    },
    paper: {
      justifyContent: "center",
      alignItems: "center",
      padding: theme.spacing(props.isSmallScreen ? 1 : 4),
      display: "flex",
      overflow: "auto",
      flexDirection: "row",
      backgroundColor: "white",
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

  const [pageNumber, setPageNumber] = React.useState(1);
  const [numPages, setNumPages] = React.useState(null);
  const [numPagesArray, setNumPagesArray] = React.useState(null);

  // const { pageNumber, numPages } = this.state;
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setNumPagesArray(turnNumPagesToArray(numPages));
  };

  /**
   * Converts an integer number into a list of integer numbers.
   * For example. 3 will be converted to [1, 2, 3]
   */
  const turnNumPagesToArray = (numPages) => {
    const arrayOfNums = [];
    for (let i = 1; i <= numPages; ++i) {
      arrayOfNums.push(i);
    }
    return arrayOfNums;
  };

  const setPageNumCallback = (num) => {
    setPageNumber(num);
  };
  return (
    <>
      <Breadcrumb
        // style={{ textColor: "black" }}
        items={[[i18n("frame.menu"), "/"], [i18n("cv.route")]]}
      />
      Will implement a pdf preview but for now there is only CV download.
      <Paper
        className={
          props.isSmallScreen ? classes.smallScreenPaper : classes.paper
        }
      >
        <Document file={pdfCV} onLoadSuccess={onDocumentLoadSuccess}>
          <Page
            pageNumber={pageNumber}
            width={props.isSmallScreen ? null : 1000}
          />
        </Document>
      </Paper>
      {numPagesArray ? (
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          className={classes.box}
        >
          <Typography>Page</Typography>

          <PageNumMenu
            numPagesArray={numPagesArray}
            setPageNumCallback={setPageNumCallback}
          />

          <Typography>
            of
            {' '}
            {numPages}
          </Typography>

          <Link
            href={`${process.env.PUBLIC_URL}/Mark_Zhu_CV.pdf`}
            target="_blank"
            download
            onClick={() => props.handleDownload("Mark_Zhu_CV.pdf")}
            style={{
              textDecoration: "none",
              color:
                localStorage.getItem("theme") === "dark" ? "white" : "black"
            }}
          >
            <Box m={2}>
              <Typography>Download CV</Typography>
            </Box>
          </Link>
        </Box>
      ) : null}
    </>
  );
}
