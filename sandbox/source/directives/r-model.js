import { getElements } from "../utils/utils.js";

const SELECTOR = '[r-model]'
const ATTRIBUTE = 'r-model'

const update = (el, proxy, attribute) => {
  const property = el.attributes[attribute].value.replace("proxy.", "")
  let value = el.value
  
  value = Number(value) ? Number(value) : value

  
  proxy[property] = value
}

// Bind r-model attributes.
const bind = (proxy) => {
  // could move to a DOM-event-utils script
  const bindElements = (selector, attribute, eventName) => {
    getElements(selector).forEach( el => el.addEventListener(eventName, update.bind(this, el, proxy, attribute)) )
  }
  
  // Should bind to the same events as for @input
  bindElements(SELECTOR, ATTRIBUTE, 'change')
  bindElements(SELECTOR, ATTRIBUTE, 'keyup')
}

export { bind }
