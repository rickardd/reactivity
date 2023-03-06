// With bundler
import { Raccoon } from "raccoon-js-framework";
// Without bundler
// import { Raccoon } from "./node_modules/raccoon-js-framework/index.js";

const appEl = document.getElementById("demo-component-1");

const { proxy, compute, funcs } = new Raccoon(appEl);

// Set init values
proxy.price = 5;
proxy.quantity = 15;
proxy.tax = 25;
proxy.names = ["Frank", "Lisa", "Peter", "Amanda"];
proxy.users = []

// Documentation note: Compute methods should be declared before properties.
// Compute will only update after a proxy property has triggered a changed.

// To allow the syntax compute = {...} we need to use set, or proxy
compute.sum = () => proxy.price * proxy.quantity;

compute.total = () => proxy.price * proxy.quantity + proxy.tax;

funcs.getUsers = (proxy, value) => {
  // ToDo: Currently r-for does not handle nested object props e.g {user.name}
  fetch('https://dummyjson.com/users')
    .then(res => res.json())
    .then(res => {
      proxy.users = res.users.map(user => user.firstName)
    })
}


