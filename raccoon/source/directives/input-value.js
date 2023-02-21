import { getElements } from "../utils/utils.js";

const VALUE_SELECTOR = "[\\:value]";
const VALUE_ATTRIBUTE = ":value";
const MODEL_SELECTOR = "[r-model]";
const MODEL_ATTRIBUTE = "r-model";

const update = (proxyMap, selector, attribute) => {
  getElements(selector).forEach((el) => {
    const property = el.attributes[attribute].value.replace("proxy.", ""); // Handles both :value="proxy.tax" and :value="tax"
    const value = proxyMap.get(property);
    el.value = value;
  });
};

const updateInput = (proxyMap) => {
  update(proxyMap, VALUE_SELECTOR, VALUE_ATTRIBUTE);
};

const updateModel = (proxyMap) => {
  update(proxyMap, MODEL_SELECTOR, MODEL_ATTRIBUTE);
};

export { updateInput, updateModel };
