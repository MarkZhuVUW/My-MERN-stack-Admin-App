import Checkbox from '@material-ui/core/Checkbox';
import {blue, green, red} from '@material-ui/core/colors';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import {withStyles} from '@material-ui/core/styles';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import {i18n} from 'i18n';
import React from 'react';

const GreenCheckbox = withStyles({
  root: {
    'color': green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const BlueCheckbox = withStyles({
  root: {
    'color': blue[400],
    '&$checked': {
      color: blue[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const RedCheckbox = withStyles({
  root: {
    'color': red[400],
    '&$checked': {
      color: red[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

/**
 * displays three role checkboxes: employer, admin and passes selected role
 * to parent through callback functions.
 * @param props
 * @return {*}
 * @constructor
 */
export default function RoleCheckboxes(props) {
  const [admin, setAdmin] = React.useState(false);
  const [employer, setEmployer] = React.useState(false);
  const [guest, setGuest] = React.useState(false);

  const handleChange = (name) => {
    setAdmin(false);
    setEmployer(false);
    setGuest(false);
    props.roleSelectedCallback(name);
    if (name === 'admin') setAdmin(true);
    if (name === 'employer') setEmployer(true);
    if (name === 'guest') setGuest(true);

    // ({ [name]: event.target.checked });
  };

  return (
    <FormGroup row>
      <FormControlLabel
        control={(
          <GreenCheckbox
            checked={admin}
            icon={<DirectionsWalkIcon color="disabled" />}
            checkedIcon={<AccessibilityNewIcon />}
            onChange={() => handleChange('admin')}
            value="admin"
          />
        )}
        label={i18n('admin')}
      />

      <FormControlLabel
        control={(
          <BlueCheckbox
            checked={employer}
            icon={<DirectionsWalkIcon color="disabled" />}
            checkedIcon={<BusinessCenterIcon />}
            onChange={() => handleChange('employer')}
            value="employer"
          />
        )}
        label={i18n('employer')}
      />

      <FormControlLabel
        control={(
          <RedCheckbox
            checked={guest}
            icon={<DirectionsWalkIcon color="disabled" />}
            checkedIcon={<BeachAccessIcon />}
            onChange={() => handleChange('guest')}
            value="guest"
          />
        )}
        label={i18n('guest')}
      />
    </FormGroup>
  );
}
