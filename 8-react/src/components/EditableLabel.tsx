import React, { ChangeEvent, useState } from 'react';
import {createUseStyles} from 'react-jss'
import PropTypes from 'prop-types';

export default function EditableLabel (props: any) {
  const [isEditing, setEditing] = useState<boolean>(false);
  const [text, setText] = useState<string>(props.children);
  const classes = useStyles();

  function doneEditing() {
    setEditing(false);
    props.saveText(text);
  }
  
  return (
    <span className={classes.label}>
      {isEditing ? (
        <input className={classes.label}
          value={text}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
          onBlur={doneEditing}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => 
            (e.key === "Enter") && doneEditing()}
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
  children: PropTypes.string,
  saveText: PropTypes.func
}

const useStyles = createUseStyles({
  label: {
      display: "flex",
      flexGrow: 1,
      fontSize: "20px",
}});
