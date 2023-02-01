import { Raccoon } from "../../index.js"
// Set up a view for test witch only requires 1 view.
// Tests can access the global defined variables proxy and compute for this view.
export const setupView = jest.fn((viewString, appId) => {
  document.body.innerHTML = viewString;

  const appEl = document.getElementById(appId);
  const raccoon = new Raccoon(appEl);
  return { appEl, proxy: raccoon.proxy, compute: raccoon.compute };
});

// Similar to above but this returns appEl, proxy, compute rather than setting global variables.
// Good for tests that requires multiple components
export const setupComponent = jest.fn( (componentString, appId) => {
  document.body.insertAdjacentHTML("beforeend", componentString)
    
  const appEl = document.getElementById(appId)
  const raccoon = new Raccoon(appEl)
  return {appEl, ...raccoon}
})