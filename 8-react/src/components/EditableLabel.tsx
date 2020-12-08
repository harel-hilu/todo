import React, { ChangeEvent, useState } from 'react';
import {createUseStyles} from 'react-jss'
import PropTypes from 'prop-types';

export default function EditableLabel (
  { saveText, initialText, setEditing, isEditing }: any) {
  const [text, setText] = useState(initialText);
  const classes = useStyles();

  const finishEditing = () => {
    saveText(text); 
    setEditing(false);
  }

  return (
    <span className={classes.label}>
      {isEditing ? (
        <input className={classes.label}
          value={text}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
          onBlur={finishEditing}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => 
            (e.key === "Enter") && finishEditing()}
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
  initialText: PropTypes.string,
  isEditing: PropTypes.bool,
  setEditing: PropTypes.func,
  saveText: PropTypes.func
}

const useStyles = createUseStyles({
  label: {
      display: "flex",
      flexGrow: 1,
      fontSize: "20px",
}});
