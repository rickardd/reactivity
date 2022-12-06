import { update as updateTemplate, prepare as prepareTemplate } from './template-engine.js'
import { bind as bindDomEvents } from "./dom-events.js";
import { bind as bindModelEvents } from "./dom-model-events.js";
import { updateInput as updateInputValue, updateModel as updateModelValue } from "./dom-input-value.js";
import { update as updateFor } from "./directives/for.js";

function Reactive(compute) {
  this.computeMap = new Map() // Holds computed method e.g {sum: fn() {..}, ...}
  
  // Calculate and set values from computed
  // Runs every time a value has changed.
  const updateCompute = (proxyMap) => {
    // Add compute methods to the computeMap. 
    // Entries stays unique due to the Map behavior.
    for (const key in compute) {
      this.computeMap.set(key, compute[key])
    }
    
    // Run each method in the map and apply it's computed value to the executed object
    this.computeMap.forEach( (value, key, map) => {
      proxyMap.set(key, value()) // set computed values (Update: set to the proxy Map)
    })
  }

  const proxyHandler = {
    set(proxyMap, property, value) {
      proxyMap.set(property, value) // Set values defined by proxy e.g proxy.price - (none computed values)
      updateCompute(proxyMap) // Calculate and set values from computed
      updateInputValue(proxyMap) // Update <input :value="...">
      updateModelValue(proxyMap) // Update <input :r-model="...">
      updateTemplate(proxyMap)
      updateFor(proxyMap) // Update r-for
      return true // Fixes a proxy trap issue but why is this needed? What should it return?
    },
    get(proxyMap, property) {
      return proxyMap.get(property)
    },
    deleteProperty(proxyMap, property) { // e.g delete proxy.names
      // if (!(property in proxyMap)) { return false; }
      // return proxyMap.removeItem(property);
      console.log('deleteProperty()');
      return true
    },
  }

  return new Proxy(new Map, proxyHandler);
}

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