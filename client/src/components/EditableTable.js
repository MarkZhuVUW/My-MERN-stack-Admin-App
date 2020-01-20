import React, { Component } from "react";

import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

export default function EditableTable(props) {
  const tableTheme = () =>
    createMuiTheme({
      overrides: {
        MUIDataTableBodyCell: {
          root: {
            backgroundColor: "#FFF",
            width: "50px"
          }
        }
      }
    });

  return (
    <MUIDataTable
      title="User List"
      data={props.data}
      columns={props.columns}
      options={props.options}
      theme={tableTheme}
    ></MUIDataTable>
  );
}
