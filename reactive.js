const weakMap = new WeakMap();
// Holds a key value for each property in the proxy object.
// Each item will serve as a key for the weakMap
const map = new Map();

const computedMethods = new Set();

// const o = {}
// map.set(o, { value: 'rick' })
// console.log(map.get(o).value);

const proxyHandler = {
    set(obj, property, value) {
        // Create a new key value par.
        // The Map() won't duplicate keys so we can set it every time.
        map.set(property, {value})
        const key = map.get(property)
        console.log('setting', obj, property, value, map);
        console.log(key);
        // WeakMap() needs an object as a key, Hence we're using the map-key.
        // The Map() is only used to create a key <object> value <any> pair.
        weakMap.set(key, key.value)

        for (const key in compute) {
            console.log(key);
            computedMethods.add(key)
        }
    },
    get(obj, property) {
        // Grab the WeakMap() key from the Map().
        const key = map.get(property)
        console.log('getting', key);
        console.log(key.value);
        console.log(weakMap.get(key));

        console.log(computedMethods)
        for (const key in compute) {

            // console.log(weakMap.set(key, computedMethods.get(key)()))
            // console.log(obj)
        }

        // Return the weakMap value
        return weakMap.get(key)
    }
}

const proxy = new Proxy({}, proxyHandler);

const compute = {
    sum() {
        return proxy.price * proxy.amount
    }
}

proxy.price = 10;
proxy.amount = 15;

proxy.price += 2;
proxy.amount += 2;

// map.set({}, 12)
console.log(proxy.price)
console.log(proxy.amount)
console.log(weakMap);
console.log(map);


console.log(compute.sum)