const CLICK_SELECTOR = '[\\@click]'

// Execute expression e.g @click='proxy.price += 10'
// Proxy needs to be available as it's used in the expression.
const executeExpression = (el, proxy) => {
  const expression = el.attributes['@click'].value

  // Quick and dirty. Eval is risky. 
  eval(expression)
}

// Bind all click elements.
const bind = (proxy) => {
  const els = Array.from(document.querySelectorAll(CLICK_SELECTOR))
  
  els.forEach( el => el.addEventListener('click', executeExpression.bind(this, el, proxy)) )
}

export { bind }
