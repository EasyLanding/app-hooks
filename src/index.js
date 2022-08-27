import React from 'react';
import ReactDOM from 'react-dom/client';
import "./components/index.css"
import App from './components/App/App'


const container = document.getElementById('body');
const root = ReactDOM.createRoot(container);
root.render(< App />)