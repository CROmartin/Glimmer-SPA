// my-service.js

import Service from '@glimmerx/service';
import { tracked } from '@glimmerx/component';
export default class Router extends Service {
  @tracked route = window.location.pathname;
  @tracked routeExists = false;

  updateRoute = () => {
    this.route = window.location.pathname;
    this.routeExists = false;
  };

  navigate = (route) => {
    history.pushState(null, '', route);
    this.updateRoute();
  };

  constructor() {
    super();
    window.onpopstate = this.updateRoute;
  }
}
