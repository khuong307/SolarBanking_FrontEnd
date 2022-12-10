import React from 'react';

function TodoItem(props) {
  return (
    <li className={props.task.complete ? 'done' : ''}>
      {props.task.title}
      {!props.task.complete && <button>Delete</button>}
    </li>
  );
}

export default TodoItem;