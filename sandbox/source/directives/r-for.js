import { getElements, createUid } from "../utils/utils.js";
import { DATA_BINDING_SELECTOR } from "../template/template-engine.js";

const FOR_SELECTOR = '[r-for]'
const FOR_ATTRIBUTE = 'r-for'

const rForMap = new Map()

function getTemplate(value, el) {
  const uid = el.attributes["r-for-key"].value

  const template = rForMap.get(uid);
  if (!template) return console.warn(`v-for couldn't find any template for "${property}"`)
  template.querySelector(DATA_BINDING_SELECTOR).innerHTML = value

  return template.outerHTML
}

const update = (proxyMap) => {
  getElements(FOR_SELECTOR).forEach( el => {
    const property = el.attributes[FOR_ATTRIBUTE].value.replace('proxy.', '') // Handles both r-for="name in proxy.names" and r-for="name in names"
    const [varName, operator, targetProperty] = property.split(' ')
    const target = proxyMap.get(targetProperty)

    // Store the innerHTML of r-for as a template
    if (!el.attributes["r-for-key"]) {
      const uid = createUid();
      el.setAttribute("r-for-key", uid )

      rForMap.set(uid, el.cloneNode(true));
    }

    // Clear content within r-for
    el.innerHTML = ''
    
    // Early return if error
    if (!target) return console.warn(`v-for couldn't find binding to proxy.${targetProperty}`)
    
    let template = ''
    
    if (operator.toLowerCase() == 'of') {
      for (const value of target) {
        template += getTemplate(value, el)
      }
    }

    // Replace the r-for innerHTML with template
    el.innerHTML = template
  })
}

export { update }
