import Component, { hbs } from '@glimmerx/component';
import { service } from '@glimmerx/service';
import { helper } from '@glimmerx/helper';

const eq = helper(([att1, att2]) => {
  return att1 == att2;
});

export default class Route404 extends Component {
  @service router;

  static template = hbs`
  {{#if (eq this.router.routeExists false)}}
  <h1 class="error"> 404 - page not found</h1>

  {{/if}}
  
  `;
}
