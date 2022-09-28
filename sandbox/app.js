import { Raccoon } from "./source/index.js"

const appEl = document.getElementById('app')

const {proxy, compute} = new Raccoon(appEl)

// Set init values
proxy.price = 5;
proxy.quantity = 15;
proxy.tax = 25;

// To allow the syntax compute = {...} we need to use set, or proxy 
compute.sum = () => proxy.price * proxy.quantity

compute.total = () => proxy.price * proxy.quantity + proxy.tax

function onClick(e) {
  proxy.price += 10
  console.table({ price: proxy.price, quantity: proxy.quantity, tax: proxy.tax, sum: proxy.sum, total: proxy.total });
}

// Bind count up
document.querySelector('[data-count-up]').addEventListener('click', onClick)
