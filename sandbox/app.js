// ToDo: Investigate why (.. from "raccoon") does not work with symlink with http-server.
// import { Raccoon } from "raccoon";
import { Raccoon } from "./node_modules/raccoon/source/index.js";

const appEl = document.getElementById("demo-component-1");

const { proxy, compute, funcs } = new Raccoon(appEl);

// Set init values
proxy.price = 5;
proxy.quantity = 15;
proxy.tax = 25;
proxy.names = ["Frank", "Lisa", "Peter", "Amanda"];

// Documentation note: Compute methods should be declared before properties.
// Compute will only update after a proxy property has triggered a changed.

// To allow the syntax compute = {...} we need to use set, or proxy
compute.sum = () => proxy.price * proxy.quantity;

compute.total = () => proxy.price * proxy.quantity + proxy.tax;


proxy.users = []

funcs.getUsers = (proxy, value) => {
  console.log(proxy, value, "users...");

  // ToDo: Currently r-for does not handle nested object props e.g {user.name}
  fetch('https://dummyjson.com/users')
    .then(res => res.json())
    .then(res => {
      proxy.users = res.users.map(user => user.firstName)
    })
}

funcs.getProducts = (proxy, value) => {
  console.log(proxy, value, "products...");

  fetch('https://dummyjson.com/products')
    .then(res => res.json())
    .then(json => console.log(json))
}



