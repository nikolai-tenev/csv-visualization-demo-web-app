import React from 'react';
import ReactDOM from 'react-dom';
import Application from './components/Application';
import {configure} from "mobx";
import localforage from "localforage";

configure({
    enforceActions: "always"
});

localforage.config({
    name: "il_interview_app",
    storeName: "il_interview_app_store"
});


ReactDOM.render(<Application/>,
    document.getElementById('root')
);
