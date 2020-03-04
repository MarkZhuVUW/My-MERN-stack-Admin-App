import MUIDataTable from "mui-datatables";
import React from "react";

export default function EditableTable(props) {
  return (
    <div style={{ position: "relative" }}>
      <MUIDataTable
        title={props.title}
        data={props.data}
        columns={props.columns}
        options={props.options}
      />
    </div>
  );
}
