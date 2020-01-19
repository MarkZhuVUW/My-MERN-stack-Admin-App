import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { green, blue, red } from "@material-ui/core/colors";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import DirectionsWalkIcon from "@material-ui/icons/DirectionsWalk";
import AccessibilityNewIcon from "@material-ui/icons/AccessibilityNew";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";
import DirectionsRunIcon from "@material-ui/icons/DirectionsRun";
const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600]
    }
  },
  checked: {}
})(props => <Checkbox color="default" {...props} />);

const BlueCheckbox = withStyles({
  root: {
    color: blue[400],
    "&$checked": {
      color: blue[600]
    }
  },
  checked: {}
})(props => <Checkbox color="default" {...props} />);

const RedCheckbox = withStyles({
  root: {
    color: red[400],
    "&$checked": {
      color: red[600]
    }
  },
  checked: {}
})(props => <Checkbox color="default" {...props} />);

export default function RoleCheckboxes() {
  const [checkedA, setCheckedA] = React.useState(false);
  const [checkedB, setCheckedB] = React.useState(false);
  const [checkedC, setCheckedC] = React.useState(false);

  const handleChange = name => {
    setCheckedA(false);
    setCheckedB(false);
    setCheckedC(false);

    if (name === "checkedA") setCheckedA(true);
    if (name === "checkedB") setCheckedB(true);
    if (name === "checkedC") setCheckedC(true);

    // ({ [name]: event.target.checked });
  };

  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <GreenCheckbox
            checked={checkedA}
            icon={<DirectionsWalkIcon color="disabled" />}
            checkedIcon={<AccessibilityNewIcon />}
            onChange={handleChange("checkedA")}
            value="checkedA"
          />
        }
        label="admin"
      />

      <FormControlLabel
        control={
          <BlueCheckbox
            checked={checkedB}
            icon={<DirectionsWalkIcon color="disabled" />}
            checkedIcon={<DirectionsRunIcon />}
            onChange={handleChange("checkedB")}
            value="checkedB"
          />
        }
        label="employer"
      />

      <FormControlLabel
        control={
          <RedCheckbox
            checked={checkedC}
            icon={<DirectionsWalkIcon color="disabled" />}
            checkedIcon={<BeachAccessIcon />}
            onChange={handleChange("checkedC")}
            value="checkedC"
          />
        }
        label="guest"
      />
    </FormGroup>
  );
}
