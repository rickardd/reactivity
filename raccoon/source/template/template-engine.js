const DATA_BINDING_STRING = "data-element-binding";
const DATA_BINDING_SELECTOR = "[data-element-binding]";

// Applies data attributes e.g data-element-binding="my-var"
// Replaces {{...}} within passed in html string with mapped proxy.value.
// E.g if proxy.foo='bar' then this would replace {{foo}} with <span>bar</span>
// Side-effect: This alters the markup. It adds a child span element.
function prepare(appEl) {
  const markToken = (match, variable) => `<span ${DATA_BINDING_STRING}=${variable}></span>`;

  const content = appEl.innerHTML?.replace(/\{\{(.*)\}\}/g, markToken); // ? optional chaining in case appEl has not content.

  appEl.innerHTML = content;
}

// Maps the data-element-binding="my-var" with proxyMap.get('my-var')
// 1. Finds all elements with data-element-binding.
// 2. Applies corresponding proxyMap value to the DOM for matched element.
function update(proxyMap) {
  const els = Array.from(document.querySelectorAll(`[${DATA_BINDING_STRING}]`));
  els.forEach((el) => {
    const value = proxyMap.get(el.dataset.elementBinding);
    if (value) {
      el.textContent = value;
    }
  });
}

export { DATA_BINDING_SELECTOR, DATA_BINDING_STRING, update, prepare };
