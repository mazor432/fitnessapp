import React from 'react';
import ReactDOM from 'react-dom';
import './index.sass';
import App from './App';
import { firebase } from './firebase';

firebase.auth().onAuthStateChanged((user) => {
    ReactDOM.render(<App user={user} />, document.getElementById('root'));
})

