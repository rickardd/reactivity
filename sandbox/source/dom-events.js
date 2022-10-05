const CLICK_SELECTOR = '[\\@click]'
const CLICK_ATTRIBUTE = '@click'
const INPUT_SELECTOR = '[\\@input]'
const INPUT_ATTRIBUTE = '@input'

// Execute expression e.g @click='proxy.price += 10' or @input='proxy.price += 10'
// Proxy needs to be available as it's used in the expression.
const executeExpression = (el, proxy, attribute) => {
  const expression = el.attributes[attribute].value
  
  // Quick and dirty. Eval is risky. 
  eval(expression)
}

// Bind all DOM elements.
const bind = (proxy) => {

  const getElements = selector => Array.from(document.querySelectorAll(selector))

  const bindElements = (selector, attribute, eventName) => {
    return getElements(selector).forEach( el => el.addEventListener(eventName, executeExpression.bind(this, el, proxy, attribute)) )
  }

  bindElements(CLICK_SELECTOR, CLICK_ATTRIBUTE, 'click')
  bindElements(INPUT_SELECTOR, INPUT_ATTRIBUTE, 'keyup')
}

export { bind }
