import { render } from "../core/render.js";

function Reactive(compute) {
  const self = this

  const proxyHandler = {
    set(proxyMap, property, value) {
      proxyMap.set(property, value) // Set values defined by proxy e.g proxy.price - (none computed values)
      render(proxyMap, compute)
      return true // Fixes a proxy trap issue but why is this needed? What should it return?
    },
    get(proxyMap, property) {
      return proxyMap.get(property)
    },
    // deleteProperty(proxyMap, property) { // e.g delete proxy.names
    //   // if (!(property in proxyMap)) { return false; }
    //   // return proxyMap.removeItem(property);
    //   // console.log('deleteProperty()');
    //   // return true
    // },
  }

  return new Proxy(new Map, proxyHandler);
}

export { Reactive }