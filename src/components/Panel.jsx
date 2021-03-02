import React from 'react';
import Store from "../contexts/store";
import Backspace from '../assets/backspace.svg';

function Panel() {
  return (
    <div className="container">
      <Store.Consumer>
        {store => (
          <div className="panel">
            <div>{store.text}</div>
            <img src={Backspace} alt="Delete" onClick={store.remove} />
          </div>
        )}
      </Store.Consumer>
    </div>
  );
}

export default Panel;
