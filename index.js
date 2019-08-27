window.globals.module
  .load('app')
  .then((app) => {
    app.init()
  })
  .catch((error) => console.error(error))
