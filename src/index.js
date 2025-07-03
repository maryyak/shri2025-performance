import './styles.css';

import { createHeader } from './header.js';
import { createMain } from './main.js';

const app = document.getElementById('app');
app.appendChild(createHeader());
app.appendChild(createMain());