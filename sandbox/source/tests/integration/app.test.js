import { Raccoon } from "../../index.js"

let appEl = null
let proxy = null
let compute = null
  
const setupView = jest.fn( (viewString, appId) => {
  document.body.innerHTML = viewString
    
  appEl = document.getElementById(appId)
  const raccoon = new Raccoon(appEl)
  proxy = raccoon.proxy 
  compute = raccoon.compute 
})

const setupView2 = jest.fn( (viewString, appId) => {
  document.body.insertAdjacentHTML("beforeend", viewString)
    
  appEl = document.getElementById(appId)
  const raccoon = new Raccoon(appEl)
  proxy = raccoon.proxy 
  compute = raccoon.compute 
  return {appEl, proxy, compute}
})

describe("Integration test", () => {

  describe("Reactivity", () => {

    beforeEach(() => {
      const viewString = `<div id="app"></div>`
      setupView(viewString, 'app')
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

      beforeEach(() => {
        const viewString = `
          <div id="app">
            <button id="button" @click='proxy.a += 10'>Count Up</button>
          </div>
        `
        setupView(viewString, 'app')
      })

      describe('@click', () => {
        it('execute method expression', () => {
          proxy.a = 1;

          // Click counts proxy.a up by 10
          document.getElementById('button').click()

          expect(proxy.a).toBe(11)
        });
      })
      
      describe('@input', () => {
        it('...', () => {
          // ....
        });
      })
            
      describe('@input', () => {
        it('...', () => {
          // ....
        });
      })
      
      // @change
      // @keyup
      // @keydown
      // r-model
      // :value
    })

    describe('Views', () => {

      beforeEach(() => {
        const viewString = `
          <div id="app">
            <button id="button" @click='proxy.a += 10'>Count Up</button>
            <div>{{a}}</div>
            <div>{{b}}</div>
            <div>{{sum}}</div>
          </div>
        `
        setupView(viewString, 'app')
      })

      // test that templage {{...}} is updating

      describe('Multiple views has one scope per view', () => {

        it('each view has programmatically different scopes', () => {
          const viewString1 = `<div id="app1"></div>`
          const viewString2 = `<div id="app2"></div>`

          const {appEl: appEl1, proxy: proxy1, compute: compute1} = setupView2(viewString1, 'app1')
          const {appEl: appEl2, proxy: proxy2, compute: compute2} = setupView2(viewString2, 'app2')

          compute1.aPlusOne = () => proxy1.a + 1
          compute2.aPlusOne = () => proxy2.a + 1
          
          proxy1.a = 1;
          proxy2.a = 2;
          
          expect(proxy1.a).toBe(1)
          expect(proxy2.a).toBe(2)
          
          expect(proxy1.aPlusOne).toBe(2)
          expect(proxy2.aPlusOne).toBe(3)
        })
        
        it('each view has interactively different scopes', () => {
            // proxy1 and proxy2 are just aliases, the actual name is proxy which means we have two different proxy objects with the same name. 
            // How do we make this unique per view e.g #app1
            const viewString1 = `<div id="app1"><button id="button" @click='proxy1.a += 10'>Count Up</button></div>`
            const viewString2 = `<div id="app2"><button id="button" @click='proxy2.a += 10'>Count Up</button></div>`

            const {appEl: appEl1, proxy: proxy1, compute: compute1} = setupView2(viewString1, 'app1')
            const {appEl: appEl2, proxy: proxy2, compute: compute2} = setupView2(viewString2, 'app2')

            proxy1.a = 1;
            proxy2.a = 2;

            appEl1.querySelector("button").click()
            appEl2.querySelector("button").click()

            expect(proxy1.a).toBe(11)
            expect(proxy2.a).toBe(12)
          })
        })    
      })    
      
    })    

  })
