import { update as updateTemplate, prepare as prepareTemplate } from './template-engine.js'
import { bind as bindDomEvents } from "./dom-events.js";
import { bind as bindModelEvents } from "./dom-model-events.js";
import { updateInput as updateInputValue, updateModel as updateModelValue } from "./dom-input-value.js";

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
      return true // Fixes a proxy trap issue but why is this needed? What should it return?
    },
    get(proxyMap, property) {
      return proxyMap.get(property)
    }
  }

  return new Proxy(new Map, proxyHandler);
}

function Raccoon(appEl) {
  this.compute = {}
  const proxy = new Reactive(this.compute)
  
  prepareTemplate(appEl)
  bindDomEvents(proxy)
  bindModelEvents(proxy)
  
  return {
    compute: this.compute,
    proxy: proxy,
  }
}

export { Raccoon }