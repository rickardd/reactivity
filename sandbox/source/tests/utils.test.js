import { getElements } from "../utils.js";

describe("utils.js", () => {

  describe("getElements method", () => {
    
    it('gets 2 elements from the dom', () => {
      document.body.innerHTML = `
        <div class='my-elements'>My text</div>
        <div class='my-elements'>My text 2</div>
      `
      const elements = getElements('.my-elements')
      
      // innerText not working, we use innerHTML instead
      expect(elements[0].innerHTML).toBe('My text');
      expect(elements[0].classList.contains('my-elements')).toBe(true);
      expect(elements[0]).toBeDefined();
      expect(elements.length).toBe(2);
      expect(Array.isArray(elements)).toBeTruthy();
    });
  })
  
})
