import { renderComponent } from '@glimmerx/core';

import App from './App';
import Router from './router';

const containerElement = document.getElementById('app');

renderComponent(App, { element: containerElement!, services: { router: Router } });
