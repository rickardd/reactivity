// Calculate and set values from computed
// Runs every time a value has changed.
// Proxy = Raccoons main proxy. 
// compute = Raccoons compute object e.g compute.myFn = () => {...}
// computeMap = The map to which we store the key: myFn and the value: () => {}
const updateCompute = (proxy, compute, computeMap) => {
    // Add compute methods to the computeMap. 
    // Entries stays unique due to the Map behavior.
    for (const key in compute) {
        computeMap.set(key, compute[key])
    }
    
    // Run each method in the map and apply it's computed value to the executed object
    computeMap.forEach( (value, key, map) => {
        proxy.set(key, value()) // set computed values (Update: set to the proxy Map)
    })
}

export { updateCompute }