import * as vdom from 'app/lib/vdom.js'

const button = ({ on_click }) =>
  vdom.element('button', {
    onClick: on_click,
    children: 'edit this to test reload in app/component/button.js',
  })

export { button as component }
