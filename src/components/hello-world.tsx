import React from 'react';
import { useState } from 'react';

export default function HelloWorld (props) {
  
  const [clicked, setClicked] = useState(false);
  
  console.log('HelloWorldProps', props);

  return (
    <div>
      <h1>Hello from React! Clicked: {clicked ? "Yes" : "No"} </h1>
      <button onClick={() => {
        console.log("clicked")
        setClicked(!clicked)
        }} 
      >
        Click-me
      </button>
    </div>
  );
}
