import { updateCompute } from './compute.js'
import { update as updateTemplate } from '../template/template-engine.js'
import { updateInput as updateInputValue, updateModel as updateModelValue } from "../directives/input-value.js";
import { update as updateFor } from "../directives/r-for.js";

function render(proxy, compute) {  
    const hasCompute = compute && Object.entries(compute).length

    if(hasCompute) updateCompute(proxy, compute) // executes compute functions and stores the result on the proxy
    updateInputValue(proxy) // Update <input :value="...">
    updateModelValue(proxy) // Update <input :r-model="...">
    updateTemplate(proxy) // Updates template properties {{myValue}}
    updateFor(proxy) // Update r-for
}

export { render }