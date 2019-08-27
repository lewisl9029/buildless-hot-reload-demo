# buildless-hot-reload-demo

## Give it a try!

Clone the repo and run the following:

```
yarn
yarn start
```

Go to http://localhost in browser.

Edit any module to have the edited module and any dependent modules reloaded without a refresh!

Open devtools to see which modules are being reloaded.

The prod version of this repo is available on [GitHub Pages here](https://lewisl9029.github.io/buildless-hot-reload-demo/).

To test out the prod workflow I encourage you to fork this repo and enable GitHub Pages on it. Deploying to prod is as simple as pushing a change! You can even use GitHub's web editor to make changes to further minimize friction.

## How it works

A simple file watcher and WebSocket server running in [init.js](https://github.com/lewisl9029/buildless-hot-reload-demo/blob/master/init.js#L39) notifies client of changed modules.

[SystemJS](https://github.com/systemjs/systemjs) is used to load modules in dev so we can use its [onload hook](https://github.com/systemjs/systemjs/blob/master/docs/hooks.md#onloaderr-id-deps-sync) to [build a lookup table of modules and their dependents](https://github.com/lewisl9029/buildless-hot-reload-demo/blob/master/dev.js#L15).

When a module is changed, we then use that table to [recursively look up all the modules that depend on it](https://github.com/lewisl9029/buildless-hot-reload-demo/blob/master/dev.js#L48), delete them from the SystemJS registry using its [API](https://github.com/systemjs/systemjs/blob/master/docs/api.md#systemdeleteid---boolean), and then [reinitialize the root app.js module](https://github.com/lewisl9029/buildless-hot-reload-demo/blob/master/dev.js#L87).

The prod version uses a much lighter weight module loading mechanism using [es-module-shims](https://github.com/guybedford/es-module-shims), served _directly from source without any build steps_ using an alternate [index.html](https://github.com/lewisl9029/buildless-hot-reload-demo/blob/master/index.html) file as entry point (dev workflow actually serves [index.dev.html](https://github.com/lewisl9029/buildless-hot-reload-demo/blob/master/index.dev.html)).

## Areas for further exploration

### Hot-reloading for dynamically loaded modules

[Some](https://github.com/lewisl9029/buildless-hot-reload-demo/blob/master/app/component/root.js#L12) [of](https://github.com/lewisl9029/buildless-hot-reload-demo/blob/master/app/component/root.js#L23) the modules in this demo are dynamically loaded. I suspect with the advent of [React.lazy](https://reactjs.org/docs/code-splitting.html#reactlazy) this approach will only get more popular with time. However, this poses a challenge for hot reloading workflows because dynamic imports by nature cannot be reliably expressed in a static dependency graph.

My original implementation of the reload client ended up ignoring dynamically loaded modules because they'd never appear in any other module's dependency list in SystemJS's onload hook. I assume that's because the dependency list is generated through some kind of static analysis of the module's source code.

The workaround I have today is simply [reloading every first-party module](https://github.com/lewisl9029/buildless-hot-reload-demo/blob/master/dev.js#L80) when a changed module doesn't appear in the lookup table, which actually works surprisingly well for the use cases I have so far, but I suspect will break down when a module ends up getting imported both statically and dynamically, in which case only the static dependents will end up getting reloaded, and performance won't scale well for large codebases with lots of first-party modules.

I'd love to hear any thoughts on how we could tackle this.

### Path towards a shim-less future

Projects like SystemJS and es-module-shims makes this workflow possible today, but ideally I'd like to see a future where all of this can be accomplished with built-in browser APIs.

As far as I could find, browsers today don't offer a way for users to delete a module from its cache once loaded, nor a way to modify or even observe the loading process. These are the bare minimum requirements for building a functioning hot-reload client.

If there are any ongoing proposals for these I'd love to know about them. Initial load and hot reload performance should improve dramatically for large dependencies/codebases if we could get rid of the runtime transformation step into the [System.register module format](https://github.com/systemjs/systemjs/blob/master/docs/system-register.md).
