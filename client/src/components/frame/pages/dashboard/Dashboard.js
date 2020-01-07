import React from "react";
import {
  Grid,
  LinearProgress,
  Select,
  OutlinedInput,
  MenuItem
} from "@material-ui/core";

import {
  ResponsiveContainer,
  ComposedChart,
  AreaChart,
  LineChart,
  Line,
  Area,
  PieChart,
  Pie,
  Cell,
  YAxis,
  XAxis
} from "recharts";

import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";

import Table from ".//Table";

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  }
}));
export default function Dashboard(props) {
  const table = {
    table: [
      {
        id: 0,
        name: "Mark Otto",
        email: "ottoto@wxample.com",
        product: "ON the Road",
        price: "$25 224.2",
        date: "11 May 2017",
        city: "Otsego",
        status: "Sent"
      },
      {
        id: 1,
        name: "Jacob Thornton",
        email: "thornton@wxample.com",
        product: "HP Core i7",
        price: "$1 254.2",
        date: "4 Jun 2017",
        city: "Fivepointville",
        status: "Sent"
      },
      {
        id: 2,
        name: "Larry the Bird",
        email: "bird@wxample.com",
        product: "Air Pro",
        price: "$1 570.0",
        date: "27 Aug 2017",
        city: "Leadville North",
        status: "Pending"
      },
      {
        id: 3,
        name: "Joseph May",
        email: "josephmay@wxample.com",
        product: "Version Control",
        price: "$5 224.5",
        date: "19 Feb 2018",
        city: "Seaforth",
        status: "Declined"
      },
      {
        id: 4,
        name: "Peter Horadnia",
        email: "horadnia@wxample.com",
        product: "Let's Dance",
        price: "$43 594.7",
        date: "1 Mar 2018",
        city: "Hanoverton",
        status: "Sent"
      }
    ]
  };

  const classes = useStyles();

  return (
    <>
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
      {/*page title */}

      <Container className={classes.container}>
        <Paper className={classes.paper}>
          <Table data={table.table} />
        </Paper>
      </Container>
    </>
  );
}
