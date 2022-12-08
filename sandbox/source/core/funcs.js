// Creates a proxy object to hold functions.
// Applies the proxy to the argument list to each
// function that's added to the funcs object e.g func.myFunk('1') 
// will have corresponding function function myFunc(proxy, value) {...}
function createFuncProxy(proxy) {
    return new Proxy({}, { 
        set(fnObj, fnKey, fn) {
            if (typeof fn !== 'function') {
            throw new Error `Argument ${fnKey} has to be of type function`
            }
            fnObj[fnKey] = fn.bind(proxy, proxy)
            return true // Fixes a proxy trap issue but why is this needed? What should it return?
        },
    })
} 

export { createFuncProxy }