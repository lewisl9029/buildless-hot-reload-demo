import * as shared_child from 'app/component/shared_child.js'
import * as vdom from 'app/lib/vdom.js'

const parent2 = () =>
  vdom.element('div', {
    static_children: [
      'edit this to test reload in app/component/parent2.js',
      vdom.element(shared_child.component),
    ],
  })

export { parent2 as component }
