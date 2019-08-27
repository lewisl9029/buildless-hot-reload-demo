import * as lib_terminal from 'app/lib/terminal.js'
import * as vdom from 'app/lib/vdom.js'

const terminal = () => {
  const container_ref = vdom.use_ref(null)

  const [is_stylesheet_loaded, set_is_stylesheet_loaded] = vdom.use_state(false)

  const trigger_stylesheet_loaded = vdom.use_callback(
    () => set_is_stylesheet_loaded(true),
    [set_is_stylesheet_loaded],
  )

  vdom.use_effect(() => {
    const current_terminal = lib_terminal.create()
    lib_terminal.open({
      terminal: current_terminal,
      container: container_ref.current,
    })

    return () => lib_terminal.dispose({ terminal: current_terminal })
  }, [container_ref])

  return vdom.element(vdom.fragment, {
    static_children: [
      vdom.element('link', {
        rel: 'stylesheet',
        type: 'text/css',
        href: lib_terminal.css_href,
        onLoad: trigger_stylesheet_loaded,
      }),
      vdom.element('div', {
        children: 'edit this to test reload in app/component/terminal.js',
      }),
      vdom.element('div', {
        ref: container_ref,
        style: { display: is_stylesheet_loaded ? 'block' : 'none' },
      }),
    ],
  })
}

export { terminal as component }
