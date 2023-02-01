import { setupComponent } from "./setup.js";

describe("r-for", () => {
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

  describe("r-for", () => {
    it("lists html-cards with name for each name in the list", () => {
      const componentString = `
          <div id="app">
            <div r-for="name of names">
              <article class="card">
                <span class="text-red">{{ name }}<span>
              </article>
            </div>
          </div>
        `;
      const { appEl, proxy } = setupComponent(componentString, "app");

      proxy.names = ["Lisa", "Frank", "Steve"];

      expect(appEl.innerHTML).toMatch(/Lisa/);
      expect(appEl.innerHTML).toMatch(/Frank/);
      expect(appEl.innerHTML).toMatch(/Steve/);
    });

    it("does not require any wrapping markup around template bindings", () => {
      console.warn = jest.fn();
      const componentString = `
          <div id="app">
            <div r-for="name of names">
              {{ name }}
            </div>
          </div>
        `;
      const { appEl, proxy } = setupComponent(componentString, "app");

      proxy.names = ["Lisa", "Frank", "Steve"];

      expect(appEl.innerHTML).not.toMatch(/Lisa/);
      expect(appEl.innerHTML).not.toMatch(/Frank/);
      expect(appEl.innerHTML).not.toMatch(/Steve/);

      expect(console.warn).toHaveBeenCalledWith(
        "The r-for must contain one and only one child element"
      );
    });

    it("doesn't break if r-for has no template bindings", () => {
      const componentString = `
          <div id="app">
            <div r-for="name of names">
              <div>..._</div>
            </div>
          </div>
        `;
      const { appEl, proxy } = setupComponent(componentString, "app");

      proxy.names = ["Lisa", "Frank", "Steve"];

      expect(appEl.innerHTML).toMatch("..._");
      // Expected to run the loop 3 times as proxy.names.length === 3
      expect(appEl.textContent).toMatch("..._..._..._");
    });

    it("does not list names if binding is wrong", () => {
      const componentString = `
          <div id="app">
            <div r-for="name of names">
              <span>{{ unknown }}</span>
            </div>
          </div>
        `;
      const { appEl, proxy } = setupComponent(componentString, "app");

      proxy.names = ["Lisa", "Frank", "Steve"];

      expect(appEl.innerHTML).not.toMatch(/Lisa/);
      expect(appEl.innerHTML).not.toMatch(/Frank/);
      expect(appEl.innerHTML).not.toMatch(/Steve/);
    });

    it("works with multiple r-for loops", () => {
      const componentString = `
          <div id="app">
            <div r-for="name of names" id="loop-1">
              <span>{{ name }}</span>
            </div>
            
            <div r-for="name of names" id="loop-2">
              <span>{{ name }}</span>
            </div>

            <div r-for="surname of surnames" id="loop-3">
              <span>{{ surname }}</span>
            </div>
          </div>
        `;
      const { appEl, proxy } = setupComponent(componentString, "app");

      const loop1El = appEl.querySelector("#loop-1");
      const loop2El = appEl.querySelector("#loop-2");
      const loop3El = appEl.querySelector("#loop-3");

      proxy.names = ["Lisa", "Frank", "Steve"];
      proxy.surnames = ["Growl", "Drake", "Cobain"];

      // Test that the each r-for-key is unique
      expect(loop1El.attributes["r-for-key"].value).not.toBe(
        loop2El.attributes["r-for-key"].value
      );

      // Loop 1 names
      expect(loop1El.innerHTML).toMatch(/Lisa/);
      expect(loop1El.innerHTML).toMatch(/Frank/);
      expect(loop1El.innerHTML).toMatch(/Steve/);
      expect(loop1El.attributes["r-for-key"].value).not.toBe("");

      // Loop 2 names (testing duplicated loop)
      expect(loop2El.innerHTML).toMatch(/Lisa/);
      expect(loop2El.innerHTML).toMatch(/Frank/);
      expect(loop2El.innerHTML).toMatch(/Steve/);
      expect(loop2El.attributes["r-for-key"].value).not.toBe("");

      // Loop 3 surnames
      expect(loop3El.innerHTML).toMatch(/Drake/);
      expect(loop3El.innerHTML).toMatch(/Growl/);
      expect(loop3El.innerHTML).toMatch(/Cobain/);
      expect(loop3El.attributes["r-for-key"].value).not.toBe("");
    });

    it("logs an error if invalid proxy binding", () => {
      console.warn = jest.fn();

      const componentString = `
          <div id="app">
            <div r-for="name of unknown">
              {{ unknown.name }}
            </div>
          </div>
        `;
      const { proxy } = setupComponent(componentString, "app");

      proxy.names = ["Lisa", "Frank", "Steve"];

      expect(console.warn).toHaveBeenCalledWith(
        "v-for couldn't find binding to proxy.unknown"
      );
    });
  });
});
