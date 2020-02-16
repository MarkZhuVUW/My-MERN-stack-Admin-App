import { Box, makeStyles, Paper, Typography } from "@material-ui/core";
import { StyleSheet } from "@react-pdf/renderer";
import { i18n } from "i18n";
import React, { Component } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { connect } from "react-redux";
import "swagger-ui/dist/swagger-ui.css";
import Breadcrumb from "view/shared/Breadcrumb";
import pdfCV from "./Mark_Zhu_CV.pdf";
import PageNumMenu from "./PageNumMenu";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class CV extends Component {
  componentDidMount() {}
  componentDidUpdate() {}
  static propTypes = {};

  // onDocumentLoadSuccess = ({ numPages }) => {
  //   this.setState({ numPages });
  // };
  render() {
    // return <CVContent isSmallScreen={this.props.isSmallScreen} />;
    // const { pageNumber, numPages } = this.state;

    return <CVContent isSmallScreen={this.props.isSmallScreen} />;
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, {})(CV);

/**
 * The support component. Used in the drawer list.
 *
 * @author Mark Zhu <zdy120939259@outlook.com>
 */
function CVContent(props) {
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
    paper: {
      padding: theme.spacing(props.isSmallScreen ? 1 : 4),
      display: "flex",
      overflow: "auto",
      flexDirection: "column",
      backgroundColor: "white"
    },

    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular
    },
    expansionPanelHeader: {
      backgroundColor: "#3F51B5",
      color: "white"
    }
  }));

  // Create styles
  const styles = StyleSheet.create({
    page: {
      flexDirection: "row",
      backgroundColor: "#E4E4E4",
      width: "100%"
    }
  });

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
  const turnNumPagesToArray = numPages => {
    var arrayOfNums = [];
    for (var i = 1; i <= numPages; ++i) {
      arrayOfNums.push(i);
    }
    return arrayOfNums;
  };

  const setPageNumCallback = num => {
    setPageNumber(num);
  };
  return (
    <>
      <Breadcrumb
        // style={{ textColor: "black" }}
        items={[[i18n("frame.menu"), "/"], [i18n("cv.route")]]}
      />

      <Paper className={classes.paper}>
        <Document file={pdfCV} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} />
        </Document>
      </Paper>
      {numPagesArray ? (
        <Box display="flex" flexDirection="row" alignItems="center">
          <Typography>Page</Typography>
          <PageNumMenu
            numPagesArray={numPagesArray}
            setPageNumCallback={setPageNumCallback}
          />
          <Typography>of {numPages}</Typography>
          <a href="./Mark_Zhu_CV.pdf" download>
            Download CV
          </a>
        </Box>
      ) : null}
    </>
  );
}
