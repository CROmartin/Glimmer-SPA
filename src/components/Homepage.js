import Component, { hbs, tracked } from '@glimmerx/component';
import { on } from '@glimmerx/modifier';
import { fn } from '@glimmerx/helper';
import { service } from '@glimmerx/service';
import { helper } from '@glimmerx/helper';

import './portofolio.css';
const concat = helper(([...args]) => {
  return args.join('');
});

export default class Homepage extends Component {
  @tracked projectsCount = this.args.projects.length;
  @service router;

  @tracked aboutMe =
    'I am a passionate developer with expertise in web development. I love creating beautiful and functional websites that provide a great user experience. My goal is to combine my technical skills with my creativity to build innovative and impactful projects.';

  static template = hbs`
  <div class="portfolio-page">
  <h1>Welcome to My Portfolio</h1>
  <div class="row">
    <div class="column"> 
      <div class="about-me">
        <h2>About Me</h2>
        <p>{{this.aboutMe}}</p>
      </div>
      <div class="inspiration">
        <h2>Inspiration</h2>
        <ul>
          {{#each this.args.inspiration as |item|}}
            <li>{{item}}</li>
          {{/each}}
        </ul>
      </div>
    </div>
    <img id="avatar" src= {{this.args.avatar}} alt="Avatar" />
  </div>
  <h2>Projects ({{this.projectsCount}})</h2>

  <div class="projects">
    {{#each this.args.projects as |project index|}}
      <div class="project" {{on "click" (fn this.router.navigate (concat '/project/' index))}}>
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
    {{/each}}
  </div>
</div>



  `;
}
