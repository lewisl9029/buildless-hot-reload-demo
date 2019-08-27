import * as vdom from 'app/lib/vdom.js'

const shared_child = () =>
  vdom.element('div', {
    children: 'edit this to test reload in app/component/shared_child.js',
  })

export { shared_child as component }
