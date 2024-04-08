import React from 'react';
import routes from './router';
import { useRoutes } from "react-router-dom";
import './App.css'

function App() {
  const content = useRoutes(routes);
  return (
    <>
      {content}
    </>
  );
}

export default App;
