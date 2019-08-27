// import * as fn from 'app/lib/fn.js'
// import * as promise from 'app/lib/promise.js'
// import * as seq from 'app/lib/seq.js'

export const load = window.globals.module.load

export const unload = window.globals.module.unload

// export const imports = fn.pipe(
//   seq.map((module_path) => import(module_path)),
//   promise.resolved,
// )
//
// export const import_reloadable = (path) => {
//   return import(path)
// }
