import { setupComponent } from "./setup.js";

describe("dom-events", () => {
  let appEl = null;
  let proxy = null;
  let compute = null;

  beforeEach(() => {
    // As this running before each test this id has to be unique.
    const componentString = `<div id="main-app"></div>`;

    const component = setupComponent(componentString, "main-app", true);
    appEl = component.appEl;
    proxy = component.proxy;
    compute = component.compute;
  });

  describe("@click", () => {
    it("execute method expression", () => {
      const componentString = `
          <div id="app">
            <button id="button" @click='proxy.a += 10'>Count Up</button>
          </div>
        `;
      const { proxy } = setupComponent(componentString, "app");

      proxy.a = 1;

      // Click counts proxy.a up by 10
      document.getElementById("button").click();

      expect(proxy.a).toBe(11);
    });
  });

  describe("@input - reacts on change and key-up events", () => {
    it("updates the proxy when input value changes and vice versa", () => {
      const componentString = `
          <div id="app">
            <label for="price">Price</label>
            <input type="number" @input="proxy.price = Number(event.target.value)" :value="proxy.price">
          </div>
        `;
      const { appEl, proxy } = setupComponent(componentString, "app");

      const inputEl = appEl.querySelector("input");

      proxy.price = 1;

      expect(inputEl.value).toBe("1");

      // testing change event
      inputEl.value = 2;
      inputEl.dispatchEvent(new Event("change"));

      expect(inputEl.value).toBe("2");
      expect(proxy.price).toBe(2);

      // testing key up event
      inputEl.value = 3;
      inputEl.dispatchEvent(new Event("keyup"));

      expect(inputEl.value).toBe("3");
      expect(proxy.price).toBe(3);

      // Test that following events doesn't update the proxy
      inputEl.value = 4;
      inputEl.dispatchEvent(new Event("keydown"));
      inputEl.dispatchEvent(new Event("keypress"));
      inputEl.dispatchEvent(new Event("select"));
      inputEl.dispatchEvent(new Event("focus"));
      inputEl.dispatchEvent(new Event("blur"));
      inputEl.dispatchEvent(new Event("submit"));
      inputEl.dispatchEvent(new Event("click"));
      inputEl.dispatchEvent(new Event("input"));

      expect(proxy.price).not.toBe(4);
    });
  });

  describe("@change - reacts on change event only", () => {
    it("updates the proxy when input value changes and vice versa", () => {
      const componentString = `
          <div id="app">
            <label for="price">Price</label>
            <input type="number" @change="proxy.price = Number(event.target.value)" :value="proxy.price">
          </div>
        `;
      const { appEl, proxy } = setupComponent(componentString, "app");

      const inputEl = appEl.querySelector("input");

      proxy.price = 1;

      expect(inputEl.value).toBe("1");

      // testing change event
      inputEl.value = 2;
      inputEl.dispatchEvent(new Event("change"));

      expect(inputEl.value).toBe("2");
      expect(proxy.price).toBe(2);

      // Test that following events doesn't update the proxy
      inputEl.value = 3;
      inputEl.dispatchEvent(new Event("keyup"));
      inputEl.dispatchEvent(new Event("keydown"));
      inputEl.dispatchEvent(new Event("keypress"));
      inputEl.dispatchEvent(new Event("select"));
      inputEl.dispatchEvent(new Event("focus"));
      inputEl.dispatchEvent(new Event("blur"));
      inputEl.dispatchEvent(new Event("submit"));
      inputEl.dispatchEvent(new Event("click"));
      inputEl.dispatchEvent(new Event("input"));

      expect(proxy.price).not.toBe(3);
    });
  });

  describe("@keyup - reacts on key up event only", () => {
    it("updates the proxy when input value changes and vice versa", () => {
      const componentString = `
          <div id="app">
            <label for="price">Price</label>
            <input type="number" @keyup="proxy.price = Number(event.target.value)" :value="proxy.price">
          </div>
        `;
      const { appEl, proxy } = setupComponent(componentString, "app");

      const inputEl = appEl.querySelector("input");

      proxy.price = 1;

      expect(inputEl.value).toBe("1");

      // testing change event
      inputEl.value = 2;
      inputEl.dispatchEvent(new Event("keyup"));

      expect(inputEl.value).toBe("2");
      expect(proxy.price).toBe(2);

      // Test that following events doesn't update the proxy
      inputEl.value = 3;

      inputEl.dispatchEvent(new Event("input"));
      inputEl.dispatchEvent(new Event("change"));
      inputEl.dispatchEvent(new Event("keydown"));
      inputEl.dispatchEvent(new Event("keypress"));
      inputEl.dispatchEvent(new Event("select"));
      inputEl.dispatchEvent(new Event("focus"));
      inputEl.dispatchEvent(new Event("blur"));
      inputEl.dispatchEvent(new Event("submit"));
      inputEl.dispatchEvent(new Event("click"));

      expect(proxy.price).not.toBe(3);
    });
  });

  describe("@keydown - reacts on key up event only", () => {
    it("updates the proxy when input value changes and vice versa", () => {
      const componentString = `
          <div id="app">
            <label for="price">Price</label>
            <input type="number" @keydown="proxy.price = Number(event.target.value)" :value="proxy.price">
          </div>
        `;
      const { appEl, proxy } = setupComponent(componentString, "app");

      const inputEl = appEl.querySelector("input");

      proxy.price = 1;

      expect(inputEl.value).toBe("1");

      // testing change event
      inputEl.value = 2;
      inputEl.dispatchEvent(new Event("keydown"));

      expect(inputEl.value).toBe("2");
      expect(proxy.price).toBe(2);

      // Test that following events doesn't update the proxy
      inputEl.value = 3;

      inputEl.dispatchEvent(new Event("input"));
      inputEl.dispatchEvent(new Event("change"));
      inputEl.dispatchEvent(new Event("keyup"));
      inputEl.dispatchEvent(new Event("keypress"));
      inputEl.dispatchEvent(new Event("select"));
      inputEl.dispatchEvent(new Event("focus"));
      inputEl.dispatchEvent(new Event("blur"));
      inputEl.dispatchEvent(new Event("submit"));
      inputEl.dispatchEvent(new Event("click"));

      expect(proxy.price).not.toBe(3);
    });
  });

  describe("r-model - reacts on key up event only", () => {
    it("updates the proxy when input value changes and vice versa", () => {
      const componentString = `
          <div id="app">
            <input id="inputEl" type="number" r-model="price">
          </div>
        `;
      const { appEl, proxy } = setupComponent(componentString, "app");

      const inputEl = appEl.querySelector("#inputEl");

      proxy.price = 1;
      proxy.tax = 10;

      expect(inputEl.value).toBe("1");

      // testing change event
      inputEl.value = 2;
      inputEl.dispatchEvent(new Event("change"));

      expect(inputEl.value).toBe("2");
      expect(proxy.price).toBe(2);

      // testing keyup event
      inputEl.value = 3;
      inputEl.dispatchEvent(new Event("keyup"));

      expect(inputEl.value).toBe("3");
      expect(proxy.price).toBe(3);

      // Test that following events doesn't update the proxy
      inputEl.value = 4;

      inputEl.dispatchEvent(new Event("input"));
      inputEl.dispatchEvent(new Event("keypress"));
      inputEl.dispatchEvent(new Event("select"));
      inputEl.dispatchEvent(new Event("focus"));
      inputEl.dispatchEvent(new Event("blur"));
      inputEl.dispatchEvent(new Event("submit"));
      inputEl.dispatchEvent(new Event("click"));

      expect(proxy.price).not.toBe(4);
    });

    it('works with prefixed proxy e.g r-model="proxy.price"', () => {
      const componentString = `
          <div id="app">
            <input id="inputEl" type="number" r-model="proxy.price">
          </div>
        `;
      const { appEl, proxy } = setupComponent(componentString, "app");

      const inputEl = appEl.querySelector("#inputEl");

      proxy.price = 1;

      expect(inputEl.value).toBe("1");

      // testing change event
      inputEl.value = 2;
      inputEl.dispatchEvent(new Event("change"));

      expect(inputEl.value).toBe("2");
      expect(proxy.price).toBe(2);

      // testing keyup event
      inputEl.value = 3;
      inputEl.dispatchEvent(new Event("keyup"));

      expect(inputEl.value).toBe("3");
      expect(proxy.price).toBe(3);

      // Test that following events doesn't update the proxy
      inputEl.value = 4;

      inputEl.dispatchEvent(new Event("input"));
      inputEl.dispatchEvent(new Event("keypress"));
      inputEl.dispatchEvent(new Event("select"));
      inputEl.dispatchEvent(new Event("focus"));
      inputEl.dispatchEvent(new Event("blur"));
      inputEl.dispatchEvent(new Event("submit"));
      inputEl.dispatchEvent(new Event("click"));

      expect(proxy.price).not.toBe(4);
    });

    it("treats numbers as numbers and strings as strings (r-model)", () => {
      const componentString = `
          <div id="app">
            <input id="inputNumber" type="number" r-model="proxy.myNumber">
            <input id="inputString" type="text" r-model="proxy.myString">
          </div>
        `;
      const { appEl, proxy } = setupComponent(componentString, "app");

      const inputNumber = appEl.querySelector("#inputNumber");
      const inputString = appEl.querySelector("#inputString");

      proxy.myNumber = "1";
      proxy.myString = "my string 1";

      // Set value to to 2 and trigger the change event
      inputNumber.value = 2;
      inputNumber.dispatchEvent(new Event("change"));

      expect(inputNumber.value).toBe("2");
      expect(proxy.myNumber).toBe(2); // Expecting "2" to be converted to 2

      // Set new value and trigger the change event
      inputString.value = "my string 2";
      inputString.dispatchEvent(new Event("change"));

      expect(inputString.value).toBe("my string 2");
      expect(proxy.myString).toBe("my string 2"); // Expecting no alteration
    });
  });

  describe(":value - reacts to no input events", () => {
    it("updates only when the proxy value has changed", () => {
      const componentString = `
          <div id="app">
            <label for="price">Price</label>
            <input type="number" :value="proxy.price">
          </div>
        `;
      const { appEl, proxy } = setupComponent(componentString, "app");
      const inputEl = appEl.querySelector("input");

      proxy.price = 1;

      expect(inputEl.value).toBe("1");

      // Test that following events doesn't update the proxy
      inputEl.value = 2;

      inputEl.dispatchEvent(new Event("keyup"));
      inputEl.dispatchEvent(new Event("keydown"));
      inputEl.dispatchEvent(new Event("input"));
      inputEl.dispatchEvent(new Event("change"));
      inputEl.dispatchEvent(new Event("keypress"));
      inputEl.dispatchEvent(new Event("select"));
      inputEl.dispatchEvent(new Event("focus"));
      inputEl.dispatchEvent(new Event("blur"));
      inputEl.dispatchEvent(new Event("submit"));
      inputEl.dispatchEvent(new Event("click"));

      expect(proxy.price).not.toBe(2);
    });
  });
});
