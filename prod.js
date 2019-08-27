/* global System */

window.globals = {
  module: {
    // Using the lighter weight https://github.com/guybedford/es-module-shims
    // instead, since we don't need hot reloading in prod
    load: (id) => window.importShim(id),
  },
}
