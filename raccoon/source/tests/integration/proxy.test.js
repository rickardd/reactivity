import { setupComponent } from "./setup.js";

describe("proxy", () => {
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

  describe("proxy properties can be updated", () => {
    it("sets a proxy property", () => {
      proxy.a = 1;

      expect(proxy.a).toBe(1);
    });

    it("increment proxy property", () => {
      proxy.a = 1;
      expect(proxy.a).toBe(1);

      proxy.a += 1;
      expect(proxy.a).toBe(2);
    });

    // ToDo:
    // test array, delete last with slice
    // test array, delete last with splice
    // delete property with delete
  });
});
