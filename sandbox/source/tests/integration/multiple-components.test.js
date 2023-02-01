import { setupComponent } from "./setup.js";

describe("multiple components", () => {
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

  describe("has one scope/proxy per component", () => {
    it("has programmatically different scopes", () => {
      const componentString1 = `<div id="component-1"></div>`;
      const componentString2 = `<div id="component-2"></div>`;

      const { proxy: proxy1, compute: compute1 } = setupComponent(componentString1, "component-1");
      const { proxy: proxy2, compute: compute2 } = setupComponent(componentString2, "component-2");

      compute1.aPlusOne = () => proxy1.a + 1;
      compute2.aPlusOne = () => proxy2.a + 1;

      proxy1.a = 1;
      proxy2.a = 2;

      expect(proxy1.a).toBe(1);
      expect(proxy2.a).toBe(2);

      expect(proxy1.aPlusOne).toBe(2);
      expect(proxy2.aPlusOne).toBe(3);
    });

    it("has interactively different scopes", () => {
      const componentString1 = `<div id="component-1"><button id="button" @click='proxy.a += 10'>Count Up</button></div>`;
      const componentString2 = `<div id="component-2"><button id="button" @click='proxy.a += 10'>Count Up</button></div>`;

      const { appEl: appEl1, proxy: proxy1, compute: compute1 } = setupComponent(componentString1, "component-1");
      const { appEl: appEl2, proxy: proxy2, compute: compute2 } = setupComponent(componentString2, "component-2");

      proxy1.a = 1;
      proxy2.a = 2;

      compute1.withDollarSign = () => `$${proxy1.a}`;
      compute2.withDollarSign = () => `$${proxy2.a}`;

      appEl1.querySelector("button").click();
      appEl2.querySelector("button").click();

      expect(proxy1.a).toBe(11);
      expect(proxy2.a).toBe(12);

      expect(proxy1.withDollarSign).toBe("$11");
      expect(proxy2.withDollarSign).toBe("$12");

      appEl1.querySelector("button").click();
      appEl2.querySelector("button").click();

      expect(proxy1.withDollarSign).toBe("$21");
      expect(proxy2.withDollarSign).toBe("$22");
    });
  });

  it("can run functions interactively", () => {
    const componentString1 = `<div id="component-1"><button id="button" @click='funcs.myFn(proxy.a)'>Count Up</button></div>`;
    const componentString2 = `<div id="component-2"><button id="button" @click='funcs.myFn()'>Count Up</button></div>`;

    const { appEl: appEl1, proxy: proxy1, compute: compute1, funcs: funcs1 } = setupComponent(componentString1, "component-1");
    const { appEl: appEl2, proxy: proxy2, compute: compute2, funcs: funcs2 } = setupComponent(componentString2, "component-2");

    proxy1.a = 1;
    proxy2.a = 2;

    // The first argument will always be the proxy which is applied by the framework.
    funcs1.myFn = (proxy, value) => (proxy.a = Number(value) + 111);
    funcs2.myFn = (proxy) => (proxy.a = proxy.a * 2);

    // Can this be scopes so we're using proxy.a rather than proxy1.a?
    compute1.withDollarSign = () => `$${proxy1.a}`;
    compute2.withDollarSign = () => `$${proxy2.a}`;

    appEl1.querySelector("button").click();
    appEl2.querySelector("button").click();

    expect(proxy1.a).toBe(112);
    expect(proxy2.a).toBe(4);

    expect(proxy1.withDollarSign).toBe("$112");
    expect(proxy2.withDollarSign).toBe("$4");

    appEl1.querySelector("button").click();
    appEl2.querySelector("button").click();

    expect(proxy1.a).toBe(223);
    expect(proxy2.a).toBe(8);

    expect(proxy1.withDollarSign).toBe("$223");
    expect(proxy2.withDollarSign).toBe("$8");
  });
});
