const map = new Map()
let compute = null

// Calculate and set values from computed
// Runs every time a value has changed.
const update = (obj) => {
  // Add all compute methods to the map. Entries will never be duplicated
  for (const key in compute) {
    map.set(key, compute[key])
  }

  // Run each method in the map and apply it's computed value to the executed object
  map.forEach( (value, key, map) => {
    obj.set(key, value()) // set computed values (Update: set to the proxy Map)
  })
}

const proxyHandler = {
  set(obj, property, value) {
    obj.set(property, value) // Set values (none computed values)
    update(obj) // Calculate and set values from computed
    return true // Fixes a proxy trap issue but why is this needed? What should it return?
  },
  get(obj, property) {
    return obj.get(property)
  }
}

const create = (_compute) => {
  compute = _compute
  return new Proxy(new Map, proxyHandler);
}

export { create }