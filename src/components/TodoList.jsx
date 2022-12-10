import React from 'react';
import TodoItem from './TodoItem.jsx';

function TodoList(props) {

  return (
    <div>
      <h3>Todo</h3>
      <ul>
        {
          props.tasks
            .filter(function (item) {
              return item.title.includes(props.query);
            })
            .map(function (item) {
              return (<TodoItem key={item.id} task={item} />);
            })
        }
        {/*<li className="done">Pay Bills</li>*/}
        {/*<li>*/}
        {/*  @vue/cli vs create-react-app*/}
        {/*  <button>Delete</button>*/}
        {/*</li>*/}
      </ul>
    </div>
  );
}

export default TodoList;