const map = new Map()
let compute = null

// Object holding the last results of compute methods
const executed = {};

// Calculate and set values from computed
// Runs every time a value has changed.
const update = () => {
  // Add all compute methods to the map. Entries will never be duplicated
  for (const key in compute) {
    map.set(key, compute[key])
  }

  // Run each method in the map and apply it's computed value to the executed object
  map.forEach( (value, key, map) => {
    executed[key] = value()
  })
}

const proxyHandler = {
  set(obj, property, value) {
    obj[property] = value // Setting value to the proxy obj (normal set/get behavior). 
    update() // Calculate and set values from computed
  },
  get(obj, property) {
    return obj[property] // Returning value from the proxy obj (normal set/get behavior).
  }
}

// Set up proxy
const proxy = new Proxy({}, proxyHandler);


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

console.log(executed); // { sum: 25, total: 30 }

// If we update a value we expect the computed values for sum and total to be updated.
proxy.price += 10
proxy.price += 10

console.log(executed) // { sum: 125, total: 130 }

console.log(map); // Map { 'sum' => Function, 'total' => Function }
console.log(proxy); // { price: 25, quantity, 2, tax, 5 }