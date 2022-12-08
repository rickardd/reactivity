import { getElements } from "../utils/utils.js";
import { DATA_BINDING_SELECTOR } from "../template/template-engine.js";

const FOR_SELECTOR = '[r-for]'
const FOR_ATTRIBUTE = 'r-for'

function getTemplate(value) {
  const clonedNode = window.itemTemplate.cloneNode(true)
  clonedNode.querySelector(DATA_BINDING_SELECTOR).innerHTML = value
  return clonedNode.outerHTML
}

const update = (proxyMap) => {
  getElements(FOR_SELECTOR).forEach( el => {
    const property = el.attributes[FOR_ATTRIBUTE].value.replace('proxy.', '') // Handles both r-for="name in proxy.names" and r-for="name in names"
    const [varName, operator, targetProperty] = property.split(' ')
    const target = proxyMap.get(targetProperty)
    let mainTemplate = ''

    // Store the innerHTML of r-for as a template
    window.itemTemplate = window.itemTemplate || el.cloneNode(true) // This will not work with multiple r-for. Consider store in an instance!?

    // Clear content within r-for
    el.innerHTML = ''
    
    // Early return if error
    if (!target) return console.warn(`v-for couldn't find binding to proxy.${targetProperty}`)
    if (!window.itemTemplate) return console.warn(`v-for couldn't find any template for "${property}"`)
    
    if (operator.toLowerCase() == 'of') {
      for (const value of target) {
        // Append template the mainTemplate
        mainTemplate += getTemplate(value)
      }
    }

    // Replace the r-for innerHTML with mainTemplate
    el.innerHTML = mainTemplate
  })
}

export { update }
