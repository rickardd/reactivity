// With bundler
import { Raccoon } from "raccoon-js-framework";
// Without bundler
// import { Raccoon } from "./node_modules/raccoon-js-framework";

const componentEl = document.getElementById("demo-component-2");

const { proxy, compute, funcs } = new Raccoon(componentEl);

proxy.price = 1;
proxy.quantity = 15;
proxy.tax = 0.01;

compute.sum = () => (proxy.price * proxy.quantity) + (100 * proxy.tax);
compute.taxHuman = () => `${100 * proxy.tax}%`

funcs.addOnePercentTax = () => proxy.tax += 0.01
