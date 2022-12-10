import React, { useEffect, useState } from 'react';

function SearchBar(props) {

  const [term, setTerm] = useState('');

  useEffect(function () {
    props.onTermChanged(term);
  }, [term]);

  const txtTerm_Changed = function (e) {
    setTerm(e.target.value);
    // props.onTermChanged(e.target.value);
  }

  const btnClear_Clicked = function (e) {
    setTerm('');
  }

  const txtTerm_KeyUp = function (e) {
    if (e.keyCode === 27) {
      btnClear_Clicked();
    }
  }

  return (
    <div>
      <label style={{ fontWeight: 'bold' }}>
        Filter tasks (by name)
        <div className="fg">
          <input type="text" value={term} onChange={txtTerm_Changed} onKeyUp={txtTerm_KeyUp} />
          <button type="button" onClick={btnClear_Clicked}>Clear</button>
        </div>
      </label>
    </div>
  );
}

export default SearchBar;