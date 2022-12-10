import React, { useState } from 'react';

function AddTask(props) {
  const [title, setTitle] = useState('new task');

  const btnAdd_Clicked = function (e) {
    const newTask = {
      id: Math.floor(Math.random() * 100) + 6,
      title: title,
      complete: false
    };

    props.onTaskAdded(newTask);
  }

  const txtTitle_Changed = function (e) {
    setTitle(e.target.value);
  }

  return (
    <div>
      <h3>Add Item</h3>
      <div className="fg">
        <input type="text" value={title} onChange={txtTitle_Changed} />
        <button type="button" onClick={btnAdd_Clicked}>Add</button>
      </div>
    </div>
  );
}

export default AddTask;