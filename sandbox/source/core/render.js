import { updateCompute } from './compute.js'
import { update as updateTemplate } from '../template-engine.js'
import { updateInput as updateInputValue, updateModel as updateModelValue } from "../directives/input-value.js";
import { update as updateFor } from "../directives/r-for.js";

function render(proxy, compute = null, computeMap = null) {    
    if(compute && computeMap) updateCompute(proxy, compute, computeMap) // Calculate and set values from computed
    updateInputValue(proxy) // Update <input :value="...">
    updateModelValue(proxy) // Update <input :r-model="...">
    updateTemplate(proxy) // Updates template properties {{myValue}}
    updateFor(proxy) // Update r-for
}

export { render }