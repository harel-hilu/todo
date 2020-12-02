import React, { ChangeEvent, useState } from 'react';
import {createUseStyles} from 'react-jss'

export default function EditableLabel (props: any) {
  const [isEditing, setEditing] = useState<boolean>(false);
  const [text, setText] = useState<string>(props.children);
  const classes = useStyles();
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    (e.key === "Enter")  && setEditing(false);
  };

  function changeText(e: ChangeEvent<HTMLInputElement>){
    setText(e.target.value);
  }

  function doneEditing() {
    setEditing(false);
    props.saveText(text);
  }
  
  return (
    <span className={classes.label}>
      {isEditing ? (
        <input className={classes.label}
          value={text}
          onChange={changeText}
          onBlur={doneEditing}
          onKeyDown={handleKeyDown}
          autoFocus
          onFocus={e => e.currentTarget.select()}
        />
      ) : (
        <label
          className={classes.label}
          onClick={() => setEditing(true)}
        >
          {text}
        </label>
      )}
    </span>
  );
};

const useStyles = createUseStyles({
  label: {
      display: "flex",
      flexGrow: 1,
      fontSize: "20px",
}});