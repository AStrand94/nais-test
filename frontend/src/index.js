import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from "react-router-dom";
import 'bootstrap3/dist/css/bootstrap.min.css'
import 'bootstrap3/dist/css/bootstrap.css'

ReactDOM.render(
    (
        <BrowserRouter>
            <App />
        </BrowserRouter>
    ), document.getElementById('root'));
registerServiceWorker();
