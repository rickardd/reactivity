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

describe("Integration test", () => {

  describe("Reactivity", () => {

    beforeEach(() => {
      const viewString = `<div id="app"></div>`
      setupView(viewString, 'app')
    })

    describe('proxy properties', () => {
      it('sets a proxy property', () => {
        proxy.a = 1;
  
        expect(proxy.a).toBe(1)
      });
      
      it('Increment proxy property', () => {
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

      describe('Multiple views', () => {
        it('handles 2 views', () => {
          // ToDo
        })
      })    
      
    })    

  })
})
