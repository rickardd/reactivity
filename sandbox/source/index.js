import { prepare as prepareTemplate } from './template-engine.js'
import { bind as bindDomEvents } from "./dom-events.js";
import { bind as bindModelEvents } from "./dom-model-events.js";
import { Reactive } from "./core/reactive.js";

function Raccoon(appEl) {
  this.compute = {}
  const proxy = new Reactive(this.compute)
  
  // Creates a proxy object to hold functions.
  // Applies the proxy to the argument list to each
  // function that's added to the funcs object e.g func.myFunk('1') 
  // will have corresponding function function myFunc(proxy, value) {...}
  this.funcs = new Proxy({}, { 
    set(fnObj, fnKey, fn) {
      if (typeof fn !== 'function') {
        throw new Error `Argument ${fnKey} has to be of type function`
      }
      fnObj[fnKey] = fn.bind(proxy, proxy)
      return true // Fixes a proxy trap issue but why is this needed? What should it return?
    },
  })
  
  prepareTemplate(appEl)

  bindDomEvents(proxy, this.funcs, appEl)
  bindModelEvents(proxy)
  
  return {
    compute: this.compute,
    proxy,
    funcs: this.funcs,
  }
}

export { Raccoon }