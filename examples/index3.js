
// This Update:
// 1. Remove use of executed
// 2. Swap Object for Map in proxy
// 3. Store computed values in the proxy Map
// ---------------

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
  },
  get(obj, property) {
    return obj.get(property)
  }
}

// Set up proxy (Update: Use Map)
const proxy = new Proxy(new Map, proxyHandler);


// Compute functions
compute = {
  sum() {
    return proxy.price * proxy.quantity
  },
  total() {
    return proxy.price * proxy.quantity + proxy.tax
  }
}

// Values
proxy.price = 5;
proxy.quantity = 5;
proxy.tax = 5;

// ***************
// ** TEST CODE **
// ***************

console.log(map); // Map { 'sum' => Function, 'total' => Function }

console.log(proxy.price); // 5
console.log(proxy.quantity); // 5
console.log(proxy.tax); // 5
console.log(proxy.sum); // 25 - computed
console.log(proxy.total); // 30 - computed

// Updating proxy values will update computed values.
proxy.price += 10 // 15
proxy.price += 10 // 25

console.log(proxy.price); // 25
console.log(proxy.quantity); // 5
console.log(proxy.tax); // 5
console.log(proxy.sum); // 125 - computed
console.log(proxy.total); //130 - computed