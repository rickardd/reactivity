import { Raccoon } from "../../index.js"

let appEl = null
let proxy = null
let compute = null
  
// Set up a view for test witch only requires 1 view.
// Tests can access the global defined variables proxy and compute for this view.
const setupView = jest.fn( (viewString, appId) => {
  document.body.innerHTML = viewString
    
  appEl = document.getElementById(appId)
  const raccoon = new Raccoon(appEl)
  proxy = raccoon.proxy 
  compute = raccoon.compute 
})

// Similar to above but this returns appEl, proxy, compute rather than setting global variables.
// Good for tests that requires multiple components
const setupComponent = jest.fn( (componentString, appId) => {
  document.body.insertAdjacentHTML("beforeend", componentString)
    
  appEl = document.getElementById(appId)
  const raccoon = new Raccoon(appEl)
  return {appEl, ...raccoon}
})

describe("Integration test", () => {

  describe("Reactivity", () => {

    beforeEach(() => {
      const viewString = `<div id="app"></div>`
      setupView(viewString, 'app')
    })

    // Might be redundant due to later tests
    describe('proxy properties can be updated', () => {
      it('sets a proxy property', () => {
        proxy.a = 1;
  
        expect(proxy.a).toBe(1)
      });
      
      it('increment proxy property', () => {
        proxy.a = 1;
        expect(proxy.a).toBe(1)
        
        proxy.a += 1;
        expect(proxy.a).toBe(2)
      });

      // test array, delete last with slice
      // test array, delete last with splice
      // delete property with delete
    })
    
    // Might be redundant due to later tests
    describe('compute methods', () => {
      it('calculates the sum of proxy.a and proxy.b', () => {
        compute.sum = () => proxy.a + proxy.b
        
        proxy.a = 12;
        proxy.b = 12;
  
        expect(proxy.sum).toBe(24)
      });
    })
    
    // Might be redundant due to later tests
    describe('compute methods updates when property value changes', () => {
      it('calculates the sum of proxy.a and proxy.b', () => {
        compute.sum = () => proxy.a + proxy.b
        
        proxy.a = 12;
        proxy.b = 12;
  
        expect(proxy.sum).toBe(24)
        
        proxy.a += 12;
        proxy.b += 12;
  
        expect(proxy.sum).toBe(48)
      });
    })

    describe('DOM events', () => {
      // Might be redundant due to later tests
      describe('@click', () => {
        it('execute method expression', () => {

          const viewString = `
            <div id="app">
              <button id="button" @click='proxy.a += 10'>Count Up</button>
            </div>
          `
          setupView(viewString, 'app')
          
          proxy.a = 1;

          // Click counts proxy.a up by 10
          document.getElementById('button').click()

          expect(proxy.a).toBe(11)
        });
      })
      
      describe('@input - reacts on change and key-up events', () => {
        it('updates the proxy when input value changes and vice versa', () => {
          const viewString = `
            <div id="app">
              <label for="price">Price</label>
              <input type="number" @input="proxy.price = Number(event.target.value)" :value="proxy.price">
            </div>
          `
          setupView(viewString, 'app')
          
          const inputEl = appEl.querySelector("input")

          proxy.price = 1

          expect(inputEl.value).toBe("1")
          
          // testing change event
          inputEl.value = 2
          inputEl.dispatchEvent(new Event('change'));
          
          expect(inputEl.value).toBe("2")
          expect(proxy.price).toBe(2)         
          
          // testing key up event
          inputEl.value = 3
          inputEl.dispatchEvent(new Event('keyup'));
          
          expect(inputEl.value).toBe("3")
          expect(proxy.price).toBe(3)  
          
          // Test that following events doesn't update the proxy
          inputEl.value = 4
          inputEl.dispatchEvent(new Event('keydown'));
          inputEl.dispatchEvent(new Event('keypress'));
          inputEl.dispatchEvent(new Event('select'));
          inputEl.dispatchEvent(new Event('focus'));
          inputEl.dispatchEvent(new Event('blur'));
          inputEl.dispatchEvent(new Event('submit'));
          inputEl.dispatchEvent(new Event('click'));
          inputEl.dispatchEvent(new Event('input'));

          expect(proxy.price).not.toBe(4)  
        });
      })

      describe('@change - reacts on change event only', () => {
        it('updates the proxy when input value changes and vice versa', () => {
          const viewString = `
            <div id="app">
              <label for="price">Price</label>
              <input type="number" @change="proxy.price = Number(event.target.value)" :value="proxy.price">
            </div>
          `
          setupView(viewString, 'app')
          
          const inputEl = appEl.querySelector("input")

          proxy.price = 1

          expect(inputEl.value).toBe("1")
          
          // testing change event
          inputEl.value = 2
          inputEl.dispatchEvent(new Event('change'));
          
          expect(inputEl.value).toBe("2")
          expect(proxy.price).toBe(2)         
          
          // Test that following events doesn't update the proxy
          inputEl.value = 3
          inputEl.dispatchEvent(new Event('keyup'));
          inputEl.dispatchEvent(new Event('keydown'));
          inputEl.dispatchEvent(new Event('keypress'));
          inputEl.dispatchEvent(new Event('select'));
          inputEl.dispatchEvent(new Event('focus'));
          inputEl.dispatchEvent(new Event('blur'));
          inputEl.dispatchEvent(new Event('submit'));
          inputEl.dispatchEvent(new Event('click'));
          inputEl.dispatchEvent(new Event('input'));
          
          expect(proxy.price).not.toBe(3)
        });
      })
      
      describe('@keyup - reacts on key up event only', () => {
        it('updates the proxy when input value changes and vice versa', () => {
          const viewString = `
            <div id="app">
              <label for="price">Price</label>
              <input type="number" @keyup="proxy.price = Number(event.target.value)" :value="proxy.price">
            </div>
          `
          setupView(viewString, 'app')
          
          const inputEl = appEl.querySelector("input")

          proxy.price = 1

          expect(inputEl.value).toBe("1")
          
          // testing change event
          inputEl.value = 2
          inputEl.dispatchEvent(new Event('keyup'));
          
          expect(inputEl.value).toBe("2")
          expect(proxy.price).toBe(2)         
          
          // Test that following events doesn't update the proxy
          inputEl.value = 3
          
          inputEl.dispatchEvent(new Event('input'));
          inputEl.dispatchEvent(new Event('change'));
          inputEl.dispatchEvent(new Event('keydown'));
          inputEl.dispatchEvent(new Event('keypress'));
          inputEl.dispatchEvent(new Event('select'));
          inputEl.dispatchEvent(new Event('focus'));
          inputEl.dispatchEvent(new Event('blur'));
          inputEl.dispatchEvent(new Event('submit'));
          inputEl.dispatchEvent(new Event('click'));
          
          expect(proxy.price).not.toBe(3)
        });
      })
      
      describe('@keydown - reacts on key up event only', () => {
        it('updates the proxy when input value changes and vice versa', () => {
          const viewString = `
            <div id="app">
              <label for="price">Price</label>
              <input type="number" @keydown="proxy.price = Number(event.target.value)" :value="proxy.price">
            </div>
          `
          setupView(viewString, 'app')
          
          const inputEl = appEl.querySelector("input")

          proxy.price = 1

          expect(inputEl.value).toBe("1")
          
          // testing change event
          inputEl.value = 2
          inputEl.dispatchEvent(new Event('keydown'));
          
          expect(inputEl.value).toBe("2")
          expect(proxy.price).toBe(2)         
          
          // Test that following events doesn't update the proxy
          inputEl.value = 3
          
          inputEl.dispatchEvent(new Event('input'));
          inputEl.dispatchEvent(new Event('change'));
          inputEl.dispatchEvent(new Event('keyup'));
          inputEl.dispatchEvent(new Event('keypress'));
          inputEl.dispatchEvent(new Event('select'));
          inputEl.dispatchEvent(new Event('focus'));
          inputEl.dispatchEvent(new Event('blur'));
          inputEl.dispatchEvent(new Event('submit'));
          inputEl.dispatchEvent(new Event('click'));
          
          expect(proxy.price).not.toBe(3)
        });
      })
      
      describe('r-model - reacts on key up event only', () => {
        it('updates the proxy when input value changes and vice versa', () => {
          const viewString = `
            <div id="app">
              <input id="inputEl" type="number" r-model="price">
            </div>
          `
          setupView(viewString, 'app')
          
          const inputEl = appEl.querySelector("#inputEl")

          proxy.price = 1
          proxy.tax = 10

          expect(inputEl.value).toBe("1")
          
          // testing change event
          inputEl.value = 2
          inputEl.dispatchEvent(new Event('change'));
          
          expect(inputEl.value).toBe("2")
          expect(proxy.price).toBe(2)    

          // testing keyup event
          inputEl.value = 3
          inputEl.dispatchEvent(new Event('keyup'));
          
          expect(inputEl.value).toBe("3")
          expect(proxy.price).toBe(3)    
          
          // Test that following events doesn't update the proxy
          inputEl.value = 4
          
          inputEl.dispatchEvent(new Event('input'));
          inputEl.dispatchEvent(new Event('keypress'));
          inputEl.dispatchEvent(new Event('select'));
          inputEl.dispatchEvent(new Event('focus'));
          inputEl.dispatchEvent(new Event('blur'));
          inputEl.dispatchEvent(new Event('submit'));
          inputEl.dispatchEvent(new Event('click'));
          
          expect(proxy.price).not.toBe(4)
        });

        it('works with prefixed proxy e.g r-model="proxy.price"', () => {
          const viewString = `
            <div id="app">
              <input id="inputEl" type="number" r-model="proxy.price">
            </div>
          `
          setupView(viewString, 'app')
          
          const inputEl = appEl.querySelector("#inputEl")

          proxy.price = 1

          expect(inputEl.value).toBe("1")
          
          // testing change event
          inputEl.value = 2
          inputEl.dispatchEvent(new Event('change'));
          
          expect(inputEl.value).toBe("2")
          expect(proxy.price).toBe(2)    

          // testing keyup event
          inputEl.value = 3
          inputEl.dispatchEvent(new Event('keyup'));
          
          expect(inputEl.value).toBe("3")
          expect(proxy.price).toBe(3)    
          
          // Test that following events doesn't update the proxy
          inputEl.value = 4
          
          inputEl.dispatchEvent(new Event('input'));
          inputEl.dispatchEvent(new Event('keypress'));
          inputEl.dispatchEvent(new Event('select'));
          inputEl.dispatchEvent(new Event('focus'));
          inputEl.dispatchEvent(new Event('blur'));
          inputEl.dispatchEvent(new Event('submit'));
          inputEl.dispatchEvent(new Event('click'));
          
          expect(proxy.price).not.toBe(4)
        });

      })

      describe('r-for', () => {
        it('lists names with a loop', () => {
          const viewString = `
            <div id="app">
              <div r-for="name of names">
                {{ names.name }}
              </div>
            </div>
          `
          setupView(viewString, 'app')
          
          proxy.names = ["Lisa", "Frank", "Steve"]

          expect(appEl.innerHTML).toMatch(/Lisa/);
          expect(appEl.innerHTML).toMatch(/Frank/);
          expect(appEl.innerHTML).toMatch(/Steve/);
        });
      })

      describe(':value - reacts to no input events', () => {
        it('updates only when the proxy value has changed', () => {
          const viewString = `
            <div id="app">
              <label for="price">Price</label>
              <input type="number" :value="proxy.price">
            </div>
          `
          setupView(viewString, 'app')
          
          const inputEl = appEl.querySelector("input")

          proxy.price = 1

          expect(inputEl.value).toBe("1")
          
          // Test that following events doesn't update the proxy
          inputEl.value = 2
          
          inputEl.dispatchEvent(new Event('keyup'));
          inputEl.dispatchEvent(new Event('keydown'));
          inputEl.dispatchEvent(new Event('input'));
          inputEl.dispatchEvent(new Event('change'));
          inputEl.dispatchEvent(new Event('keypress'));
          inputEl.dispatchEvent(new Event('select'));
          inputEl.dispatchEvent(new Event('focus'));
          inputEl.dispatchEvent(new Event('blur'));
          inputEl.dispatchEvent(new Event('submit'));
          inputEl.dispatchEvent(new Event('click'));
          
          expect(proxy.price).not.toBe(2)
        });
      })
    
    })

    describe('Template engine', () => {
      beforeEach(() => {
        const viewString = `
          <div id="view">
            <button id="buttonA" @click='proxy.a += 1'>Count Up</button>
            <button id="buttonB" @click='proxy.b += 2'>Count Up</button>
            <div id="valueA">{{a}}</div>
            <div id="valueB">{{b}}</div>
            <div id="sum">{{sum}}</div>
          </div>
        `
        setupView(viewString, 'view')
      })

      // Clicking a button, then test both compute and proxy changes are reflected in the HTML output
      it('updates the template {{...}} interactively', async () => {
        proxy.a = 1
        proxy.b = 2

        compute.sum = () => `$${proxy.a + proxy.b}`

        expect(appEl.querySelector("#valueA").textContent).toBe("1")
        expect(appEl.querySelector("#valueB").textContent).toBe("2")
        expect(appEl.querySelector("#sum").textContent).toBe("")

        appEl.querySelector("#buttonA").click()
        appEl.querySelector("#buttonB").click()

        expect(appEl.querySelector("#valueA").textContent).toBe("2")
        expect(appEl.querySelector("#valueB").textContent).toBe("4")
        expect(appEl.querySelector("#sum").textContent).toBe("$6")
      })

    })

    describe('Multiple components', () => {

      describe('has one scope/proxy per component', () => {

        it('has programmatically different scopes', () => {
          const componentString1 = `<div id="component-1"></div>`
          const componentString2 = `<div id="component-2"></div>`
          
          const {proxy: proxy1, compute: compute1} = setupComponent(componentString1, 'component-1')
          const {proxy: proxy2, compute: compute2} = setupComponent(componentString2, 'component-2')

          compute1.aPlusOne = () => proxy1.a + 1
          compute2.aPlusOne = () => proxy2.a + 1
          
          proxy1.a = 1;
          proxy2.a = 2;
          
          expect(proxy1.a).toBe(1)
          expect(proxy2.a).toBe(2)
          
          expect(proxy1.aPlusOne).toBe(2)
          expect(proxy2.aPlusOne).toBe(3)
        })
        
        it('has interactively different scopes', () => {
            const componentString1 = `<div id="component-1"><button id="button" @click='proxy.a += 10'>Count Up</button></div>`
            const componentString2 = `<div id="component-2"><button id="button" @click='proxy.a += 10'>Count Up</button></div>`
            
            const {appEl: appEl1, proxy: proxy1, compute: compute1} = setupComponent(componentString1, 'component-1')
            const {appEl: appEl2, proxy: proxy2, compute: compute2} = setupComponent(componentString2, 'component-2')
            
            proxy1.a = 1;
            proxy2.a = 2;

            compute1.withDollarSign = () => `$${proxy1.a}`
            compute2.withDollarSign = () => `$${proxy2.a}`

            appEl1.querySelector("button").click()
            appEl2.querySelector("button").click()

            expect(proxy1.a).toBe(11)
            expect(proxy2.a).toBe(12)

            expect(proxy1.withDollarSign).toBe("$11")
            expect(proxy2.withDollarSign).toBe("$12")

            appEl1.querySelector("button").click()
            appEl2.querySelector("button").click()

            expect(proxy1.withDollarSign).toBe("$21")
            expect(proxy2.withDollarSign).toBe("$22")
          })
        })    

        it('can run functions interactively', () => {
          const componentString1 = `<div id="component-1"><button id="button" @click='funcs.myFn(proxy.a)'>Count Up</button></div>`
          const componentString2 = `<div id="component-2"><button id="button" @click='funcs.myFn()'>Count Up</button></div>`
          
          const {appEl: appEl1, proxy: proxy1, compute: compute1, funcs: funcs1} = setupComponent(componentString1, 'component-1')
          const {appEl: appEl2, proxy: proxy2, compute: compute2, funcs: funcs2} = setupComponent(componentString2, 'component-2')
          
          proxy1.a = 1;
          proxy2.a = 2;
          
          // The first argument will always be the proxy which is applied by the framework.
          funcs1.myFn = (proxy, value) => proxy.a = Number(value) + 111
          funcs2.myFn = (proxy) => proxy.a = proxy.a * 2

          // Can this be scopes so we're using proxy.a rather than proxy1.a?
          compute1.withDollarSign = () => `$${proxy1.a}`
          compute2.withDollarSign = () => `$${proxy2.a}`

          appEl1.querySelector("button").click()
          appEl2.querySelector("button").click()

          expect(proxy1.a).toBe(112)
          expect(proxy2.a).toBe(4)

          expect(proxy1.withDollarSign).toBe("$112")
          expect(proxy2.withDollarSign).toBe("$4")

          appEl1.querySelector("button").click()
          appEl2.querySelector("button").click()

          expect(proxy1.a).toBe(223)
          expect(proxy2.a).toBe(8)

          expect(proxy1.withDollarSign).toBe("$223")
          expect(proxy2.withDollarSign).toBe("$8")
        })
    })
      
  })
})
