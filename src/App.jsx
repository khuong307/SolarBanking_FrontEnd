import SearchBar from './components/SearchBar.jsx';
import TodoList from './components/TodoList.jsx';
import AddTask from './components/AddTask.jsx';
import { useState } from 'react';

function App() {
  const [list, setList] = useState([
    { id: 1, title: 'Pay Bills', complete: true },
    { id: 2, title: '@vue/cli vs create-react-app', complete: false },
    { id: 3, title: 'vue-router vs react-router', complete: false },
    { id: 4, title: 'redux vs vuex', complete: false },
    { id: 5, title: 'learn FBM Platform', complete: false }
  ]);
  const [query, setQuery] = useState('');

  const handleTaskAdded = function (newTask) {
    const newList = [...list, newTask];
    setList(newList);
  }

  const handleTermChanged = function (queryValue) {
    setQuery(queryValue);
  }

  return (
    <div className="container">
      <SearchBar onTermChanged={handleTermChanged} />
      <TodoList tasks={list} query={query} />
      <AddTask onTaskAdded={handleTaskAdded} />
    </div>
  )
}

export default App
