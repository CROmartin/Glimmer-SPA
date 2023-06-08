import Component, { hbs, tracked } from '@glimmerx/component';
import { action } from '@glimmerx/modifier';
import { helper } from '@glimmerx/helper';
import Homepage from './components/Homepage';
import Header from './components/Header';
import Project from './components/Project';
import Contact from './components/Contact';
import Route from './components/Router/Route';
import Route404 from './components/Router/Route404';

import './App.css';
import { faker } from '@faker-js/faker';

const eq = helper(([att1, att2]) => {
  return att1 == att2;
});

const onRoute = helper(([att1]: any) => {
  return location.pathname.includes(att1);
});

const projects = [];

// Generate random projects
for (let i = 1; i <= ((Math.random() * 100) % 10) + 4; i++) {
  const project = {
    title: faker.company.catchPhrase(),
    description: faker.lorem.paragraph(),
    image: faker.image.urlLoremFlickr({ category: 'abstract' }),
    technologies: [faker.hacker.noun(), faker.hacker.adjective(), faker.hacker.noun()],
  };
  projects.push(project);
}

const inspiration = [];
for (let i = 1; i <= ((Math.random() * 100) % 5) + 2; i++) {
  inspiration.push(faker.hacker.adjective());
}

export default class App extends Component {
  @tracked projects = projects;
  @tracked inspiration = inspiration;
  @tracked avatar = faker.image.avatar(420, 420);
  @tracked email = faker.internet.email();

  static template = hbs`
    <Header  />
    <Route @path="/"  @exact={{true}}> 
      <Homepage @projects={{this.projects}} @inspiration={{this.inspiration}} @avatar={{this.avatar}}/>
    </Route>
    <Route @path="/project/:id"  @exact={{true}}> 
      <Project @projects={{this.projects}} />
    </Route>
    <Route @path="/contact"  @exact={{true}}> 
      <Contact @email={{this.email}} />    
    </Route>
    <Route404 />
  `;
}
