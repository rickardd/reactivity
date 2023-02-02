import { setupComponent } from "./setup.js";

describe("compute", () => {
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

  describe("calculates the sum of proxy.a and proxy.b", () => {
    it("updates sum on init", () => {
      compute.sum = () => proxy.a + proxy.b;

      proxy.a = 12;
      proxy.b = 12;

      expect(proxy.sum).toBe(24);
    });

    it("updates sum when when proxy updates", () => {
      compute.sum = () => proxy.a + proxy.b;

      proxy.a = 12;
      proxy.b = 12;

      expect(proxy.sum).toBe(24);

      proxy.a += 12;
      proxy.b += 12;

      expect(proxy.sum).toBe(48);
    });
  });
});
