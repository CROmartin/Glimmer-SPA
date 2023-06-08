import Component, { hbs } from '@glimmerx/component';
import { action, on } from '@glimmerx/modifier';
import { fn } from '@glimmerx/helper';
import { service } from '@glimmerx/service';
import './header.css';

export default class Header extends Component {
  @action
  changeRoute(route) {
    history.pushState(null, '', route);
    this.args.updateCurrentRoute();
  }
  @service router;

  static template = hbs`
  <header >
  <div class="inner"> 
    <button {{on "click" (fn this.router.navigate '/')}}>Home</button>
    <button {{on "click" (fn this.router.navigate '/contact')}}>Contact</button>
  </div> 
  </header>
  `;
}
