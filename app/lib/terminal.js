import * as xterm from 'dep/xterm'

export const css_href =
  'https://cdn.jsdelivr.net/npm/xterm@3.14.5/dist/xterm.min.css'

export const create = () => new xterm.default.Terminal()
export const open = ({ terminal, container }) => terminal.open(container)
export const dispose = ({ terminal }) => terminal.dispose()
