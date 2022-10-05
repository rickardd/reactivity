import { getElements } from "./utils.js";

const VALUE_SELECTOR = '[\\:value]'
const VALUE_ATTRIBUTE = ':value'

const update = (proxyMap) => {
  getElements(VALUE_SELECTOR).forEach( el => {
    const property = el.attributes[VALUE_ATTRIBUTE].value.replace('proxy.', '') // Handles both :value="proxy.tax" and :value="tax"
    const value = proxyMap.get(property)
    el.value = value
  })
}

export { update }
