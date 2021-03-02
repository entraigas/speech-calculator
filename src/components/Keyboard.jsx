import React from 'react';
import Store from "../contexts/store";

function Keyboard () {
  const arrButtons = Array.from('789/456x123-0.=+');

  return (
    <div className="container">
      <Store.Consumer>
        {store => (
          <div className="buttons">
            {arrButtons.map((key, index) => (
              <span key={index} onClick={() => {store.add(key)}} className="btn">{key}</span>
            ))}
          </div>
        )}
      </Store.Consumer>
    </div>
  );
}

export default Keyboard;
