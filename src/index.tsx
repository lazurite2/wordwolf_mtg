import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const container: HTMLElement | null = document.getElementById('root');
document.addEventListener('DOMContentLoaded', (event) =>{
  if(container !== null){
    const root = ReactDOM.createRoot(container);
    root.render(
      <App />
    );
  }
})
