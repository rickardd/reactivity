const map = new Map()

// Values
let price = 5;
let quantity = 5;
let tax = 5;

// Compute functions
const compute = {
  sum() {
    return price * quantity
  },
  total() {
    return price * quantity + tax
  }
}

// Object holding the last results of compute methods
const executed = {};

// Method to run every time a value has changed
const update = () => {
  // Add all compute methods to the map. Entries will never be duplicated
  for (const key in compute) {
    map.set(key, compute[key])
  }

  // Run each method in the map and apply it's computed value to the executed object
  map.forEach( (value, key, map) => {
    console.log(value());
    console.log(key);

    executed[key] = value()
  })
}

// TEST CODE ---

update()
console.log(executed); // { sum: 25, total: 30 }

// If we update a value we expect the computed values for sum and total to be updated.
price = 10

update() // run update again to update executed values
console.log(executed) // { sum: 50, total: 55 }