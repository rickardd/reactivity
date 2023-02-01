import { render } from "../core/render.js";

function State(state) {
  this.components = new Set();

  const proxyHandler = {
    set(proxyObj, property, value) {
      const isPrivateProp = (property) => property[0] === "_";

      if (isPrivateProp(property)) return true;

      // If a property is prepended with _ e.g state: {_text: "..."} it's read only
      // This will block writing to both state.text and state._text.
      // This creates an array of blocked properties e.g [_text, text]
      // and then checks if current property is one of these.
      const isBlocked = Object.keys(proxyObj)
        .filter(isPrivateProp)
        .map((property) => [property, property.substring(1)])
        .flat()
        .includes(property);

      if (isBlocked) {
        // Maybe this should be a warning instead..
        // return new Error(`${property} is an immutable property and can't be updated`)
        console.warn(`${property} is an immutable property and can't be updated`);
        return true;
      }

      proxyObj[property] = value;
      // this.components.forEach(component => {
      //     render(component)
      // });
      return true;
    },
    get(proxyObj, property) {
      const isComputedMethod = (property) => property[0] === "$";

      const isComputed = Object.keys(proxyObj)
        .filter(isComputedMethod)
        .map((property) => [property, property.substring(1)])
        .flat()
        .includes(property);

      if (isComputed) {
        return proxyObj[`$${property}`](); // Appends $ as state.myCompute is referring to state.$myCompute...
      }
      return proxyObj[property];
    },
  };

  return {
    state: this,
    proxy: new Proxy(state, proxyHandler),
  };
}

State.prototype.useState = function (component) {
  this.components.add(component);
};

State.prototype.countProxies = function () {
  return this.components.size;
};

export { State };
