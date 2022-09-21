import { Raccoon } from "./source/index.js"

const {proxy, compute} = new Raccoon()

compute.sum = () => proxy.price * proxy.quantity

compute.total = () => proxy.price * proxy.quantity + proxy.tax

// In order to allow the declaring compute like raccoon.compute = { sum()..., total()...} we need to add setters and getters.

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

