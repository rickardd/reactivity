import { Raccoon } from "./source/index.js"

const compute = {
  sum() {
    return proxy.price * proxy.quantity
  },
  total() {
    return proxy.price * proxy.quantity + proxy.tax
  }
}

// Create reactive object.
const proxy = new Raccoon(compute)

// Set init values
proxy.price = 5;
proxy.quantity = 5;
proxy.tax = 5;

function onClick(e) {
  proxy.price += 10
  console.table({ price: proxy.price, quantity: proxy.quantity, tax: proxy.tax, sum: proxy.sum, total: proxy.total });
}


// Bind count up
document.querySelector('[data-count-up]').addEventListener('click', onClick)

