import Header from "./Header";
import Main from "./Main";
import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
    <>
        <Header/>
        <Main/>
    </>
);