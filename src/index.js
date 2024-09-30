import React from 'react';
// import ReactDOM from 'react-dom';
// import * ReactDOM from 'react-dom';

import { createRoot } from 'react-dom/client';
import App from './App'; // require('./App').default

const containerElement = document.getElementById('root');

const root = createRoot(containerElement);
root.render(<App />);
