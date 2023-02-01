import { Raccoon } from "../../index.js"
export const setupComponent = jest.fn((componentString, appId, forceResetBody = false) => {
  // This will replace anything in the body tag with componentString markup.
  // This can be useful some cases when using beforeEach()
  if (forceResetBody) {
    document.body.innerHTML = componentString;
  }
  else {
    document.body.insertAdjacentHTML("beforeend", componentString)
  }

  const appEl = document.getElementById(appId);
  const raccoon = new Raccoon(appEl);
  return {appEl, ...raccoon}
});
