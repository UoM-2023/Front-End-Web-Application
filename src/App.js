import React from 'react';
import ShapeComponent from './Component/Sheps/ShapeComponent';
import "./App.css"
import LoginForm from './Component/LoginForm/LoginForm';

function App() {
  
  return (
    <>
      <div className="appContainer">
        <div className="ShepsComponent">
          <ShapeComponent />
        </div>
        <div className="loginFormComponent">
          <LoginForm/>
        </div>
      </div>
    </>
  );
}


export default App;
