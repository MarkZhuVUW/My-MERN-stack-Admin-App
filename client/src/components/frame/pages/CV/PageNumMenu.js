import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import React from "react";
import { Box } from "@material-ui/core";

export default function PageNumMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [i, setI] = React.useState(1);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = i => {
    setAnchorEl(null);

    //if i is not integer, it means that none of the menuItems are clicked.
    //which means user clicked on somethings else and closed the menu.
    //In this case do not set i and call the callback function.
    if (i !== parseInt(i, 10)) return;
    setI(i);
    props.setPageNumCallback(i);
  };

  return (
    <>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        {i}
      </Button>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        style={{ width: "100%" }}
      >
        {props.numPagesArray.map(i => (
          <MenuItem key={i} onClick={() => handleClose(i)}>
            {i}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
