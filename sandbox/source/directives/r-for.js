import { getElements, createUid } from "../utils/utils.js";
import { DATA_BINDING_SELECTOR, DATA_BINDING_STRING } from "../template/template-engine.js";

const FOR_SELECTOR = '[r-for]'
const FOR_ATTRIBUTE = 'r-for'
const FOR_KEY = 'r-for-key'

const rForMap = new Map()


// This populates the template
const getParsedTemplate = (varName, operator, target, forEl) => {
  const key = forEl.attributes[FOR_KEY].value
  const template = rForMap.get(key)
  let parsedTemplate = '' 

  const hasOneInnerTemplateWrapper = template.children.length === 1 && !template.children[0].dataset.elementBinding
  if (!hasOneInnerTemplateWrapper) {
    console.warn("The r-for must contain one and only one child element")
    return
  }

  if (operator.toLowerCase() == 'of') {
    for (const value of target) {
      // ToDo: Maybe this should live in the Template enginge js file, Keep it DRY
      if (value) {
        // template.firstChild does not work with jest so we use template.children[0] instead
        let clonedInnerTemplate = template.children[0].cloneNode(true)

        // <span data-binding...>
        const mustacheEls = Array.from(clonedInnerTemplate.querySelectorAll(`[${DATA_BINDING_STRING}="${varName}"]`))

        // Update each instance of e.g {name} 
        mustacheEls.forEach( el => {
          el.textContent = value
        })      
        
        parsedTemplate += clonedInnerTemplate.outerHTML
      }
    }
  }
  return parsedTemplate
}

const update = (proxyMap) => {
  getElements(FOR_SELECTOR).forEach( forEl => {
    const property = forEl.attributes[FOR_ATTRIBUTE].value.replace('proxy.', '') // Handles both r-for="name in proxy.names" and r-for="name in names"
    const [varName, operator, targetProperty] = property.split(' ')
    const target = proxyMap.get(targetProperty)

    // Store the innerHTML of r-for as a template
    if (!forEl.attributes[FOR_KEY]) {
      const uid = createUid();
      forEl.setAttribute(FOR_KEY, uid )
      rForMap.set(uid, forEl.cloneNode(true));
    }

    // Clear content within r-for
    forEl.innerHTML = ''
    
    // Return if error
    if (!target) return console.warn(`v-for couldn't find binding to proxy.${targetProperty}`)

    // Replace the r-for innerHTML with the parsed template
    forEl.innerHTML = getParsedTemplate(varName, operator, target, forEl)
  })
}

export { update }
