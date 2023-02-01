import { Raccoon } from "../../index.js"
export const setupComponent = jest.fn((viewString, appId, isSingleComponent = false) => {
  if (isSingleComponent) {
    document.body.innerHTML = viewString;
  }
  else {
    document.body.insertAdjacentHTML("beforeend", viewString)
  }

  const appEl = document.getElementById(appId);
  const raccoon = new Raccoon(appEl);
  return {appEl, ...raccoon}
});
