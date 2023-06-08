import Component, { hbs } from '@glimmerx/component';
import { action, on } from '@glimmerx/modifier';
import './contact.css';
export default class MyForm extends Component {
  title = '';
  description = '';

  @action
  handleSubmit(event) {
    event.preventDefault();
    // Generate the mailto URL with the recipient, title, and description
    const subject = encodeURIComponent(this.title);
    const body = encodeURIComponent(this.description);
    const mailtoUrl = `mailto:${this.args.email}?subject=${subject}&body=${body}`;

    // Open the user's default email client
    window.location.href = mailtoUrl;
  }

  static template = hbs`
    <form class="form-container" {{on "submit" this.handleSubmit}}>
      <label>
        Title:
        <input type="text" value={{this.title}} {{on "input" this.updateTitle}} />
      </label>
      <br />
      <label>
        Description:
        <textarea value={{this.description}} {{on "input" this.updateDescription}}></textarea>
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  `;

  @action
  updateTitle(event) {
    this.title = event.target.value;
  }

  @action
  updateDescription(event) {
    this.description = event.target.value;
  }
}
