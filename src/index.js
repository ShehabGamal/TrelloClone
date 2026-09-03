import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { MultiBackend,TouchTransition } from 'dnd-multi-backend';
import { HashRouter } from "react-router-dom";

const HTML5toTouch = {
  backends: [
      {   
          id:1,
          backend: HTML5Backend,
      },
      {
          id:2,
          backend: TouchBackend,
          options: { enableMouseEvents: true }, // Enable mouse events for better compatibility
          preview: true,
          transition: TouchTransition,
      },
  ],
};
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
    <DndProvider backend={MultiBackend} options={HTML5toTouch}>
    <App />
    </DndProvider>
    </HashRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
