import React from 'react';
import { createRoot } from 'react-dom/client';
import Item from "../../containers/Item";

const id = window.location.pathname.split('/').pop();

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Item id={id}/>);