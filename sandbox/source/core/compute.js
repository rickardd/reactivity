// Execute each computed function and save it's value to the proxy
// e.g compute.sum = () => proxy.a + proxy.b
// can then be accessed by {{proxy.sum}}
const updateCompute = (proxy, compute) => {
  Object.entries(compute).forEach(([key, fn]) => {
    proxy.set(key, fn());
  });
};

export { updateCompute };
