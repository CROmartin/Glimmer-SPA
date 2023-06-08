import Component, { hbs, tracked } from '@glimmerx/component';
import { action } from '@glimmerx/modifier';
import { helper } from '@glimmerx/helper';
import './header.css';

const eq = helper(([att1, att2]) => {
  return att1 == att2;
});

export default class Header extends Component {
  @tracked lastNumber = 0;

  @action
  changeRoute(route) {
    history.pushState(null, '/', route);
    this.args.updateCurrentRoute(route);
  }

  constructor() {
    super(...arguments);
    // Extract the last number from the URL
    const urlSegments = window.location.pathname.split('/');
    const lastSegment = urlSegments[urlSegments.length - 1];
    const regex = /\d+/;
    const match = lastSegment.match(regex);
    this.lastNumber = match ? match[0] : '';
    if (this.lastNumber > this.args.projects.length) {
      this.lastNumber = -1;
    }
  }

  static template = hbs`
  <div class="project-page"> 
  {{#each this.args.projects as |project index|}}
  {{#if (eq index this.lastNumber)}}
    <div class="project">
      <img src={{project.image}} alt={{project.title}} />
      <h3>{{project.title}}</h3>
      <p>{{project.description}}</p>
      <h4>Technologies used:</h4>
      <ul>
        {{#each project.technologies as |technology|}}
          <li>{{technology}}</li>
        {{/each}}
      </ul>
    </div>
  {{/if}}
{{/each}}

{{#if (eq -1 this.lastNumber)}}
    <h1 class="error">404 - project not found</h1>
{{/if}}
</div> 
  `;
}
