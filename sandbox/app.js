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
