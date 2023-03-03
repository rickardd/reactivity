# Raccoon JS

This is an experimental JS framework inspired by Vue.js. It's created for personal learning and exploration. 
Play around with it but don't use it for any production work. 

Raccoon is a reactive - component based framework with basic functionality such as, reactivity, template engine, computed functions, dom-events, etc.

## Setup

Install Raccoon 

```bash
npm install raccoon-js-framework
npm install http-server --save-dev # Or what ever server you like
```

```json
{
  "scripts": {
    "start": "http-server . -o"
  }
}
```

```html
<!-- Add in the header -->
<script src="app.js" type="module"></script>
```

```js
// Import Raccoon
// ToDo: Fix this import statement.
import { Raccoon } from "./node_modules/raccoon-js-framework/source/index.js";
```

Create a component

```html
<div id="demo-component-2">
  <button @click="proxy.price += 10">Increase price</button>
  <button @click="proxy.quantity += 1">Increase quantity</button>
  <button @click="funcs.addOnePercentTax()">Add 1% tax</button>

  <div>Price: {{price}}</div>
  <div>Quantity: {{quantity}}</div>
  <div>Tax: {{taxHuman}}</div>
  <div>Sum (inc tax): {{sum}}</div>
</div>
```

Write some javascript

```js
import { Raccoon } from "./node_modules/raccoon-js-framework/source/index.js";

const componentEl = document.getElementById("demo-component-2");

// The Raccoon object returns 3 object
// 1. proxy, changes to properties will update the page
// 2. compute, a method that which returned value will be updated on the page when any proxy property updates.
// 3. funcs, an object to hold functions. This keeps the template clean and declarative. Good to handle e.g on-click logic.
const { proxy, compute, funcs } = new Raccoon(componentEl); 

proxy.price = 1;
proxy.quantity = 15;
proxy.tax = 0.01;

compute.sum = () => (proxy.price * proxy.quantity) + (100 * proxy.tax);
compute.taxHuman = () => `${100 * proxy.tax}%`

funcs.addOnePercentTax = () => proxy.tax += 0.01
```


r-for 

```html
<div id="component">
  <div r-for="name of names">
    {{ name }}
</div>
```

```
proxy.names = ["Lisa", "Frank", "Steve"];
```