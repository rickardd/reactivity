const map = new Map()

let price = 5;
let quantity = 5;
let tax = 5;

const compute = {
  sum() {
    return price * quantity
  },
  total() {
    return price * quantity + tax
  }
}

const executed = {};

const update = () => {
  for (const key in compute) {
    map.set(key, compute[key])
  }

  map.forEach( (value, key, map) => {
    console.log(value());
    console.log(key);

    executed[key] = value()
  })
}

update()
console.log(executed);


price = 10

update() // run update again to update executed values
console.log(executed)