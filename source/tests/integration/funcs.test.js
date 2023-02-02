import { setupComponent } from "./setup.js";

describe("func methods", () => {
  it("can run functions interactively", () => {
    const componentString1 = `<div id="component-1"><button id="button" @click='funcs.myFn(proxy.a)'>Count Up</button></div>`;
    const { appEl, proxy, funcs } = setupComponent(componentString1, "component-1");

    proxy.a = 1;
    // The first argument will always be the proxy which is applied by the framework.
    funcs.myFn = (proxy, value) => (proxy.a = Number(value) + 1);

    appEl.querySelector("button").click();
    expect(proxy.a).toBe(2);

    appEl.querySelector("button").click();
    expect(proxy.a).toBe(3);
  });

  it("throws an error if invalid function", () => {
    const componentString1 = `<div id="component-1"><button id="button" @click='funcs.myFn(proxy.a)'>Count Up</button></div>`;
    const { proxy, funcs } = setupComponent(componentString1, "component-1");

    proxy.a = 1;

    expect(() => {
      funcs.myFn = "my invalid function";
    }).toThrow("Argument myFn has to be of type function");
  });
});
