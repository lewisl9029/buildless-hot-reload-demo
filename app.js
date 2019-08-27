import * as dom from 'app/lib/dom.js'
import * as root from 'app/component/root.js'
import * as vdom from 'app/lib/vdom.js'

export const init = () => {
  vdom.render(vdom.element(root.component), dom.get_element_by_id('root'))
}

export const reset = () => {
  vdom.unmount(dom.get_element_by_id('root'))
}
