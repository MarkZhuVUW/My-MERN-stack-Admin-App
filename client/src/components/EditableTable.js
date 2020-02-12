import { createMuiTheme } from "@material-ui/core/styles";
import MUIDataTable from "mui-datatables";
import React from "react";

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
      title={props.title}
      data={props.data}
      columns={props.columns}
      options={props.options}
      theme={tableTheme}
    ></MUIDataTable>
  );
}
