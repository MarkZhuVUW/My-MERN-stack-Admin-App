import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import MUIDataTable from "mui-datatables";
import React from "react";
import { enUS, zhCN } from "@material-ui/core/locale";

export default function EditableTable(props) {
  // const tableTheme = () =>
  //   // createMuiTheme(
  //   //   {
  //   //     overrides: {
  //   //       MUIDataTableBodyCell: {
  //   //         root: {
  //   //           // backgroundColor: "#FFF",
  //   //           width: "50px"
  //   //         }
  //   //       }
  //   //     }
  //   //   },
  //   //   localStorage.getItem("language") === "en" ? enUS : zhCN
  //   // );
  //   createMuiTheme(
  //     {
  //       palette: {
  //         primary: { main: "#1976d2" },
  //         type: localStorage.getItem("theme") == "dark" ? "dark" : "light"
  //       }
  //     },
  //     localStorage.getItem("language") === "en" ? enUS : zhCN
  //   );
  return (
    <MUIDataTable
      title={props.title}
      data={props.data}
      columns={props.columns}
      options={props.options}
    />
  );
}
