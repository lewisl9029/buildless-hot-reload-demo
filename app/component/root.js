import * as parent1 from 'app/component/parent1.js'
import * as parent2 from 'app/component/parent2.js'
import * as suspense from 'app/component/suspense.js'
import * as vdom from 'app/lib/vdom.js'

const terminal = vdom.lazy('app/component/terminal.js')
const button = vdom.lazy('app/component/button.js')

const root = () => {
  const [click_count, set_click_count] = vdom.use_state(0)

  return vdom.element(suspense.component, {
    fallback: 'loading',
    static_children: [
      vdom.element(suspense.component, {
        fallback: 'loading',
        children: vdom.element(button, {
          on_click: () => set_click_count((click_count) => click_count + 1),
        }),
      }),
      vdom.element('div', {
        children: `click count: ${click_count}`,
      }),
      vdom.element(parent1.component),
      vdom.element(parent2.component),
      vdom.element('div', {
        children: 'edit this to test reload in app/component/root.js',
      }),
      vdom.element(suspense.component, {
        fallback: 'loading',
        children: vdom.element(terminal),
      }),
    ],
  })
}

export { root as component }
