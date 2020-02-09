/* eslint-disable no-use-before-define */
import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { withStyles, TextField, Divider } from "@material-ui/core";

/**
 * The dropdown selection component. Used on page to select which kind of user is logging in.
 * Used for development. Will be removed after we connect to existing user authentication database.
 */
export default function DropdownSelection(props) {
  const BlueFocusTextField = withStyles({
    root: {
      "& input:valid + fieldset": {
        // borderColor: "#0084ff",
        borderWidth: 1
      },
      "& input:invalid + fieldset": {
        borderColor: "red",
        borderWidth: 1
      },
      "& input:valid:focus + fieldset": {
        borderLeftWidth: 6,
        borderRightWidth: 6,
        borderDownWidth: 6,
        padding: "4px !important", // override inline-style
        borderColor: "#73A7FF"
      }
    }
  })(TextField);

  const options = props.typesOfUser.map(option => {
    const type = option.type.toUpperCase();
    return {
      type: /[0-9]/.test(type) ? "0-9" : type,
      ...option
    };
  });

  const onChange = e => {
    props.dropdownSelectedCallback(e);
  };
  return (
    // <TextField
    //   label={props.label}
    //   variant="outlined"
    //   onChange={onChange}
    //   required
    // />
    <Autocomplete
      disabled={props.disabled}
      options={options.sort((a, b) => -b.type.localeCompare(a.type))}
      groupBy={option => option.type}
      getOptionLabel={option => option.specific}
      renderInput={params => (
        <BlueFocusTextField
          ref={params.InputProps.ref}
          inputProps={{ ...params.inputProps, readOnly: true }}
          label={props.label}
          variant="outlined"
          onChange={(event, value) => onChange(value ? value.specific : "")}
        />
      )}
      onChange={(event, value) => onChange(value ? value.specific : "")}
    />
  );
}
