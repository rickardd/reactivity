import { setupComponent } from "./setup.js";

describe("template-engine", () => {
  let appEl = null;
  let proxy = null;
  let compute = null;

  beforeEach(() => {
    // As this running before each test this id has to be unique.
    const componentString = `
        <div id="main-app">
          <button id="buttonA" @click='proxy.a += 1'>Count Up</button>
          <button id="buttonB" @click='proxy.b += 2'>Count Up</button>
          <div id="valueA">{{a}}</div>
          <div id="valueB">{{b}}</div>
          <div id="sum">{{sum}}</div>
        </div>
        `;
    const component = setupComponent(componentString, "main-app", true);
    appEl = component.appEl;
    proxy = component.proxy;
    compute = component.compute;
  });

  // Clicking a button, then test both compute and proxy changes are reflected in the HTML output
  it("updates the template {{...}} interactively", async () => {
    proxy.a = 1;
    proxy.b = 2;

    compute.sum = () => `$${proxy.a + proxy.b}`;

    expect(appEl.querySelector("#valueA").textContent).toBe("1");
    expect(appEl.querySelector("#valueB").textContent).toBe("2");
    expect(appEl.querySelector("#sum").textContent).toBe("");

    appEl.querySelector("#buttonA").click();
    appEl.querySelector("#buttonB").click();

    expect(appEl.querySelector("#valueA").textContent).toBe("2");
    expect(appEl.querySelector("#valueB").textContent).toBe("4");
    expect(appEl.querySelector("#sum").textContent).toBe("$6");
  });
});
