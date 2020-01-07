import React from "react";
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

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

export default function EditableTable(props) {
  const options = {
    filter: true,
    responsive: "scrollMaxHeight",
    onRowsDelete: rowsDeleted => {
      for (var i = 0; i < rowsDeleted.data.length; ++i) {
        //send back to UserAdmin component the email of the user to be deleted.
        props.cb(data[rowsDeleted.data[i].index][0]);
        console.log(rowsDeleted.data[i].index);
        console.log(data[i]);
      }
    }
  };

  const columns = [
    {
      name: "id",
      label: "id",
      options: {
        filter: false,
        sort: false
      }
    },
    {
      name: "name",
      label: "name",
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: "Email",
      label: "Email",
      options: {
        filter: true,
        sort: true
      }
    },
    {
      name: "register date",
      label: "register date",
      options: {
        filter: true,
        sort: true
      }
    }
  ];

  const data = props.data.map(user => {
    return [user._id, user.name, user.email, user.register_date];
  });

  return (
    <MUIDataTable
      title="User List"
      data={data}
      columns={columns}
      options={options}
      theme={tableTheme}
    ></MUIDataTable>
  );
}
