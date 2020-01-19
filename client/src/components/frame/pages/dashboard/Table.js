import React from "react";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from "@material-ui/core";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";

// components
import Button from "@material-ui/core/Button";

const states = {
  sent: "default",
  pending: "primary",
  declined: "secondary"
};

export default function TableComponent({ data }) {
  var keys = Object.keys(data[0]).map(i => i.toUpperCase());
  keys.shift(); // delete "id" key

  return (
    <TableContainer component={Paper}>
      <Table className="mb-0">
        <TableHead>
          <TableRow>
            {keys.map(key => (
              <TableCell key={key}>{key}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(
            ({ _id, email, name, explanation, role, date_logged, type }) => (
              <TableRow key={_id}>
                <TableCell className="pl-3 fw-normal">{name}</TableCell>
                <TableCell>{email}</TableCell>
                <TableCell>{role}</TableCell>
                <TableCell>{explanation}</TableCell>
                <TableCell>{date_logged}</TableCell>
                <TableCell>
                  <Button
                    color={type[type.toLowerCase()]}
                    size="small"
                    className="px-2"
                    variant="contained"
                  >
                    {type}
                  </Button>
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
