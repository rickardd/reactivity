import { setupView, setupComponent } from "./setup.js";  

describe("Integration test", () => {

  describe("Reactivity", () => {

    let appEl = null
    let proxy = null
    let compute = null

    beforeEach(() => {
      const viewString = `<div id="app"></div>`

      const view = setupView(viewString, 'app')
      appEl = view.appEl
      proxy = view.proxy
      compute = view.compute
    })

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
    
    describe('compute methods', () => {
      it('calculates the sum of proxy.a and proxy.b', () => {
        compute.sum = () => proxy.a + proxy.b
        
        proxy.a = 12;
        proxy.b = 12;
  
        expect(proxy.sum).toBe(24)
      });
    })
    
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
      describe('@click', () => {
        it('execute method expression', () => {

          const viewString = `
            <div id="app">
              <button id="button" @click='proxy.a += 10'>Count Up</button>
            </div>
          `
          const { appEl, proxy, compute } = setupView(viewString, 'app')
          
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
          const { appEl, proxy, compute } = setupView(viewString, 'app')
          
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
          const { appEl, proxy, compute } = setupView(viewString, 'app')
          
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
          const { appEl, proxy, compute } = setupView(viewString, 'app')
          
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
          const { appEl, proxy, compute } = setupView(viewString, 'app')
          
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
          const { appEl, proxy, compute } = setupView(viewString, 'app')
          
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
          const { appEl, proxy, compute } = setupView(viewString, 'app')
          
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
        
        it('treats numbers as numbers and strings as strings (r-model)', () => {
          const viewString = `
            <div id="app">
              <input id="inputNumber" type="number" r-model="proxy.myNumber">
              <input id="inputString" type="text" r-model="proxy.myString">
            </div>
          `
          const { appEl, proxy, compute } = setupView(viewString, 'app')
          
          const inputNumber = appEl.querySelector("#inputNumber")
          const inputString = appEl.querySelector("#inputString")

          proxy.myNumber = "1"
          proxy.myString = "my string 1"
          
          // Set value to to 2 and trigger the change event
          inputNumber.value = 2
          inputNumber.dispatchEvent(new Event('change'));
          
          expect(inputNumber.value).toBe("2")
          expect(proxy.myNumber).toBe(2) // Expecting "2" to be converted to 2

          // Set new value and trigger the change event
          inputString.value = "my string 2"
          inputString.dispatchEvent(new Event('change'));
          
          expect(inputString.value).toBe("my string 2")
          expect(proxy.myString).toBe("my string 2") // Expecting no alteration
        });

      })

      describe('r-for', () => {
        it('lists html-cards with name for each name in the list', () => {
          const viewString = `
            <div id="app">
              <div r-for="name of names">
                <article class="card">
                  <span class="text-red">{{ name }}<span>
                </article>
              </div>
            </div>
          `
          const { appEl, proxy, compute } = setupView(viewString, 'app')
          
          proxy.names = ["Lisa", "Frank", "Steve"]

          expect(appEl.innerHTML).toMatch(/Lisa/);
          expect(appEl.innerHTML).toMatch(/Frank/);
          expect(appEl.innerHTML).toMatch(/Steve/);
        });
        
        it('does not require any wrapping markup around template bindings', () => {
          console.warn = jest.fn()
          const viewString = `
            <div id="app">
              <div r-for="name of names">
                {{ name }}
              </div>
            </div>
          `
          const { appEl, proxy, compute } = setupView(viewString, 'app')
          
          proxy.names = ["Lisa", "Frank", "Steve"]

          expect(appEl.innerHTML).not.toMatch(/Lisa/);
          expect(appEl.innerHTML).not.toMatch(/Frank/);
          expect(appEl.innerHTML).not.toMatch(/Steve/);
          
          expect(console.warn).toHaveBeenCalledWith("The r-for must contain one and only one child element");
        });
        
        it('doesn\'t break if r-for has no template bindings', () => {

          const viewString = `
            <div id="app">
              <div r-for="name of names">
                <div>..._</div>
              </div>
            </div>
          `
          const { appEl, proxy, compute } = setupView(viewString, 'app')
          
          proxy.names = ["Lisa", "Frank", "Steve"]

          expect(appEl.innerHTML).toMatch("..._");
          // Expected to run the loop 3 times as proxy.names.length === 3
          expect(appEl.textContent).toMatch("..._..._..._");
        });
        
        it('does not list names if binding is wrong', () => {
          const viewString = `
            <div id="app">
              <div r-for="name of names">
                <span>{{ unknown }}</span>
              </div>
            </div>
          `
          const { appEl, proxy, compute } = setupView(viewString, 'app')
          
          proxy.names = ["Lisa", "Frank", "Steve"]

          expect(appEl.innerHTML).not.toMatch(/Lisa/);
          expect(appEl.innerHTML).not.toMatch(/Frank/);
          expect(appEl.innerHTML).not.toMatch(/Steve/);
        });

        it('works with multiple r-for loops', () => {
          const viewString = `
            <div id="app">
              <div r-for="name of names" id="loop-1">
                <span>{{ name }}</span>
              </div>
              
              <div r-for="name of names" id="loop-2">
                <span>{{ name }}</span>
              </div>

              <div r-for="surname of surnames" id="loop-3">
                <span>{{ surname }}</span>
              </div>
            </div>
          `
          const { appEl, proxy, compute } = setupView(viewString, 'app')

          const loop1El = appEl.querySelector("#loop-1")
          const loop2El = appEl.querySelector("#loop-2")
          const loop3El = appEl.querySelector("#loop-3")
          
          proxy.names = ["Lisa", "Frank", "Steve"]
          proxy.surnames = ["Growl", "Drake", "Cobain"]

          // Test that the each r-for-key is unique
          expect(loop1El.attributes["r-for-key"].value).not.toBe(loop2El.attributes["r-for-key"].value)

          // Loop 1 names
          expect(loop1El.innerHTML).toMatch(/Lisa/);
          expect(loop1El.innerHTML).toMatch(/Frank/);
          expect(loop1El.innerHTML).toMatch(/Steve/);
          expect(loop1El.attributes["r-for-key"].value).not.toBe("")
          
          // Loop 2 names (testing duplicated loop)
          expect(loop2El.innerHTML).toMatch(/Lisa/);
          expect(loop2El.innerHTML).toMatch(/Frank/);
          expect(loop2El.innerHTML).toMatch(/Steve/);
          expect(loop2El.attributes["r-for-key"].value).not.toBe("")
          
          // Loop 3 surnames
          expect(loop3El.innerHTML).toMatch(/Drake/);
          expect(loop3El.innerHTML).toMatch(/Growl/);
          expect(loop3El.innerHTML).toMatch(/Cobain/);
          expect(loop3El.attributes["r-for-key"].value).not.toBe("")
        });
        
        it('logs an error if invalid proxy binding', () => {
          console.warn = jest.fn();

          const viewString = `
            <div id="app">
              <div r-for="name of unknown">
                {{ unknown.name }}
              </div>
            </div>
          `
          const { appEl, proxy, compute } = setupView(viewString, 'app')

          proxy.names = ["Lisa", "Frank", "Steve"]
                    
          expect(console.warn).toHaveBeenCalledWith("v-for couldn't find binding to proxy.unknown");
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
          const { appEl, proxy, compute } = setupView(viewString, 'app')
          
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
      let appEl = null
      let proxy = null
      let compute = null

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
        const view = setupView(viewString, 'view')
        appEl = view.appEl
        proxy = view.proxy
        compute = view.compute
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

    describe('funcs methods', () => {
      it('can run functions interactively', () => {
        const componentString1 = `<div id="component-1"><button id="button" @click='funcs.myFn(proxy.a)'>Count Up</button></div>`
        const {appEl, proxy, compute, funcs} = setupComponent(componentString1, 'component-1')
        
        proxy.a = 1;
        // The first argument will always be the proxy which is applied by the framework.
        funcs.myFn = (proxy, value) => proxy.a = Number(value) + 1

        appEl.querySelector("button").click()
        expect(proxy.a).toBe(2)

        appEl.querySelector("button").click()
        expect(proxy.a).toBe(3)
      })
      
      it('throws an error if invalid function', () => {
        const componentString1 = `<div id="component-1"><button id="button" @click='funcs.myFn(proxy.a)'>Count Up</button></div>`
        const {proxy, funcs} = setupComponent(componentString1, 'component-1')
        
        proxy.a = 1;
        
        expect(() => {
          funcs.myFn = "my invalid function"
        }).toThrow("Argument myFn has to be of type function");
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
