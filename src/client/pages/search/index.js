import React, {useState, useEffect} from 'react';
import { createRoot } from 'react-dom/client';
import "../../stylesheets/search.scss";
import Search from "../../containers/Search";

const url = new URL(window.location.href)
const query = url.searchParams.get('q');

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Search query={query}/>);