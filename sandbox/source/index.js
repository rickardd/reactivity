import { prepare as prepareTemplate } from "./template/template-engine.js";
import { bind as bindDomEvents } from "./directives/input-events.js";
import { bind as bindModelEvents } from "./directives/r-model.js";
import { Reactive } from "./core/reactive.js";
import { createFuncProxy } from "./core/funcs.js";

function Raccoon(appEl) {
  this.compute = {};
  const proxy = new Reactive(this.compute);
  this.funcs = createFuncProxy(proxy);

  prepareTemplate(appEl);
  bindDomEvents(proxy, this.funcs, appEl);
  bindModelEvents(proxy);

  return {
    compute: this.compute,
    proxy,
    funcs: this.funcs,
  };
}

export { Raccoon };
