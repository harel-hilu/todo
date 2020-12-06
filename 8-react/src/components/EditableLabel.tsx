import React, { ChangeEvent, useEffect, useState } from 'react';
import {createUseStyles} from 'react-jss'
import PropTypes from 'prop-types';

export default function EditableLabel (
  {initialValue, saveText, parentForceEdit=false, updateParentForceEdit}: any) {

  const [isEditing, setEditing] = useState<boolean>(parentForceEdit);
  const [text, setText] = useState<string>(initialValue);
  const classes = useStyles();

  useEffect(() => {
    setEditing(parentForceEdit);
  }, [parentForceEdit]);

  useEffect(() => {
    updateParentForceEdit(isEditing);
    saveText(text);
  }, [isEditing]);
  
  return (
    <span className={classes.label}>
      {isEditing ? (
        <input className={classes.label}
          value={text}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
          onBlur={() => setEditing(false)}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => 
            (e.key === "Enter") && setEditing(false)}
          autoFocus
          onFocus={(e: React.FocusEvent<HTMLInputElement>) => e.currentTarget.select()}
        />
      ) : (
        <label
          className={classes.label}
          onClick={() => setEditing(true)}>
          {text}
        </label>
      )}
    </span>
  );
};

EditableLabel.propTypes = {
  initialValue: PropTypes.string,
  saveText: PropTypes.func,
  parentForceEdit: PropTypes.bool,
  updateParentForceEdit: PropTypes.func
}

const useStyles = createUseStyles({
  label: {
      display: "flex",
      flexGrow: 1,
      fontSize: "20px",
}});
