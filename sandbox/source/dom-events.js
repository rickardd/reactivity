import { getElements } from "./utils.js";

const BINDINGS = [
  {
    selector: '[\\@click]',
    attribute: '@click',
    events: ['click'],
  },
  {
    selector: '[\\@input]',
    attribute: '@input',
    events: ['change', 'keyup'],
  },
  {
    selector: '[\\@change]',
    attribute: '@change',
    events: ['change'],
  },
  {
    selector: '[\\@keyup]',
    attribute: '@keyup',
    events: ['keyup'],
  },
  {
    selector: '[\\@keydown]',
    attribute: '@keydown',
    events: ['keydown'],
  },
  {
    selector: '[\\@focus]',
    attribute: '@focus',
    events: ['focus'],
  },
  {
    selector: '[\\@blur]',
    attribute: '@blur',
    events: ['blur'],
  }
]

// Execute expression e.g @click='proxy.price += 10' or @input='proxy.price += 10'
// Proxy needs to be available as it's used in the expression.
const executeExpression = (el, proxy, attribute) => {
  const expression = el.attributes[attribute].value
  
  // Quick and dirty. Eval is risky. 
  eval(expression)
}

// Bind all DOM elements.
const bind = (proxy) => {
  const bindElements = (selector, attribute, eventName) => {
    getElements(selector).forEach( el => el.addEventListener(eventName, executeExpression.bind(this, el, proxy, attribute)) )
  }

  BINDINGS.forEach(({selector, attribute, events}) => {
    events.forEach(event => {
      bindElements(selector, attribute, event)
    })
  })
  
}

export { bind }
