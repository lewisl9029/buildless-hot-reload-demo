// import * as fn from 'app/lib/fn.js'
import * as module from 'app/lib/module.js'
// import * as seq from 'app/lib/seq.js'

import * as react from 'dep/react'
import * as react_dom from 'dep/react-dom'

export const element = (component, { static_children = [], ...props } = {}) =>
  react.default.createElement(component, props, ...static_children)
export const suspense = react.default.Suspense
export const fragment = react.default.Fragment
export const lazy = (module_id) =>
  react.default.lazy(() =>
    module
      .load(module_id)
      .then((loaded_module) => ({ default: loaded_module.component })),
  )
export const render = react_dom.default.render
export const unmount = react_dom.default.unmountComponentAtNode
export const use_effect = react.default.useEffect
export const use_ref = react.default.useRef
export const use_state = react.default.useState
export const use_memo = react.default.useMemo
export const use_callback = react.default.useCallback
export const set_display_name = ({ component, url }) => {
  component.displayName = url
}
