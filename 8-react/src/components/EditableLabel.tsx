import React, { ChangeEvent, useState } from 'react';

function EditableLabel (props: any) {
  const [isEditing, setEditing] = useState<boolean>(false);
  const [text, setText] = useState<string>(props.children);

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
    <span>
      {isEditing ? (
        <input
          value={text}
          onChange={changeText}
          onBlur={doneEditing}
          onKeyDown={handleKeyDown}
          autoFocus
          onFocus={e => e.currentTarget.select()}
        />
      ) : (
        <label
          onClick={() => setEditing(true)}
        >
          {text}
        </label>
      )}
    </span>
  );
};

export default EditableLabel;