import { Raccoon } from "../../index.js"
export const setupComponent = jest.fn((viewString, appId, forceResetBody = false) => {
  // This will replace anything in the body tag with viewString markup.
  // This can be useful some cases when using beforeEach()
  if (forceResetBody) {
    document.body.innerHTML = viewString;
  }
  else {
    document.body.insertAdjacentHTML("beforeend", viewString)
  }

  const appEl = document.getElementById(appId);
  const raccoon = new Raccoon(appEl);
  return {appEl, ...raccoon}
});
