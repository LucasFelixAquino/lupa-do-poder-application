import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

ReactDOM.render((
    <Router history={history}>
      <App /> {/* The various pages will be displayed by the `Main` component. */}
    </Router>
  ),
  document.getElementById('root')
);
