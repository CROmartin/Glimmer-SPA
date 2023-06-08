import Component, { hbs } from '@glimmerx/component';
import { service } from '@glimmerx/service';
import { helper } from '@glimmerx/helper';

const matchUrlPattern = helper(([realPath, pattern, exact, ref]) => {
  if (!pattern || !realPath || exact === undefined) {
    return false;
  }
  const patternParts = pattern.split('/');
  const realPathParts = realPath.split('/');

  if (patternParts.length !== realPathParts.length) {
    return false;
  }

  for (let i = 0; i < patternParts.length; i++) {
    const patternPart = patternParts[i];
    const realPathPart = realPathParts[i];

    if (patternPart === realPathPart) {
      continue;
    } else if (patternPart.startsWith(':')) {
      // Parameter in pattern, continue to next part
      continue;
    } else if (exact) {
      // Exact match required, return false

      return false;
    } else if (patternPart !== '' && !realPathPart.startsWith(patternPart)) {
      // Partial match not found, return false

      return false;
    }
  }

  ref.router.routeExists = true;
  return true;
});

export default class Route extends Component {
  @service router;
  static template = hbs`
  {{#if (matchUrlPattern this.router.route this.args.path this.args.exact this)}}
  {{yield}}
  {{/if}}
  `;
}
