/* global System */

window.globals = {
  module: {
    load: (module_id) => System.import(module_id),
  },
}

let moduleToDependents = {}

const existingHook = System.constructor.prototype.onload
System.constructor.prototype.onload = (error, module_id, dependencies) =>
  Promise.resolve(existingHook.call(this, error, module_id, dependencies)).then(
    (existingHookResult) => {
      moduleToDependents = {
        ...moduleToDependents,
        ...Object.fromEntries(
          dependencies.map((dependency) => [
            dependency,
            moduleToDependents[dependency]
              ? { [module_id]: module_id, ...moduleToDependents[dependency] }
              : { [module_id]: module_id },
          ]),
        ),
      }

      return existingHookResult
    },
  )

new WebSocket(location.origin.replace(/^http/, 'ws')).onmessage = (payload) => {
  const data = JSON.parse(payload.data)

  if (
    data.path === '/index.html' ||
    data.path === '/index.js' ||
    data.path === '/dev.js'
  ) {
    console.log('reloading page due to change in: ', data.path)

    location.reload()
    return
  }

  window.globals.module.load('app').then((app) => {
    app.reset()

    const trace = (dependents) =>
      Object.values(dependents)
        .map((dependent) =>
          moduleToDependents[dependent]
            ? {
                ...trace(moduleToDependents[dependent]),
                [dependent]: dependent,
              }
            : { [dependent]: dependent },
        )
        .reduce(
          (dependents, nextDependents) => ({
            ...dependents,
            ...nextDependents,
          }),
          {},
        )

    const changedModuleId = System.resolve(data.path)
    const dependents = moduleToDependents[changedModuleId]

    if (dependents) {
      const transitiveDependents = {
        ...trace(dependents),
        [changedModuleId]: changedModuleId,
      }

      console.log('reloading modules: ', Object.values(transitiveDependents))
      Object.values(transitiveDependents).forEach((module_id) =>
        System.delete(module_id),
      )
    } else {
      const internalModules = Array.from(System.entries())
        .map(([module_id]) => module_id)
        .filter((module_id) => module_id.startsWith('http://localhost'))
      console.log('reloading all internal modules: ', internalModules)
      internalModules.forEach((module_id) => System.delete(module_id))
    }

    window.globals.module.load('app').then((app) => {
      app.init()
    })
  })
}
