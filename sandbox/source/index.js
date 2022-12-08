import { prepare as prepareTemplate } from './template-engine.js'
import { bind as bindDomEvents } from "./dom-events.js";
import { bind as bindModelEvents } from "./dom-model-events.js";
import { Reactive } from "./core/reactive.js";
import { createFuncProxy } from "./core/funcs.js";

function Raccoon(appEl) {
  this.compute = {}
  const proxy = new Reactive(this.compute)
  
  // functions has it's own proxy to listen to set and get. 
  // E.g <button @click="func.addUser"> will need to run and
  // access the main proxy to use it's values.
  this.funcs = createFuncProxy(proxy)
  
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