import { Raccoon } from "../../../index.js";
import { State } from "../../state-manager/state.js";

const warn = jest.spyOn(console, "warn").mockImplementation(() => {});

describe("state.js", () => {
  describe("set and get states", () => {
    const getTwoComponentsAndTwoStates = () => {
      const component1 = new Raccoon(document);
      const component2 = new Raccoon(document);

      const { proxy: proxy1, compute: compute1 } = component1;
      const { proxy: proxy2, compute: compute2 } = component2;

      const stateData1 = {
        cost: 1,
        tax: 0.33,
        $netCost() {
          // $ computed value. Access without $ and () e.g state.total
          return this.cost * this.tax;
        },
        increment() {
          // call function like normal e.g state.increment()
          this.cost++;
        },
        _text: "my immutable text", // read only and this should block setting the property text as well
      };

      const stateData2 = {
        cost: 2,
        increment() {
          this.cost = this.cost * 2;
        },
      };

      const { state: state1, proxy: stateProxy1 } = new State(stateData1);
      const { state: state2, proxy: stateProxy2 } = new State(stateData2);

      return {
        component1,
        component2,
        proxy1,
        proxy2,
        compute1,
        compute2,
        state1,
        state2,
        stateProxy1,
        stateProxy2,
      };
    };

    afterEach(() => {
      warn.mockReset();
    });

    it("handles different states and proxies without conflicts", () => {
      const { proxy1, proxy2, compute1, compute2, state1, state2, stateProxy1, stateProxy2 } = getTwoComponentsAndTwoStates();

      state1.useState(proxy1);
      state1.useState(proxy2);
      state2.useState(proxy2);

      expect(state1.countProxies()).toBe(2);
      expect(state2.countProxies()).toBe(1);

      proxy1.cost = 11;
      proxy2.cost = 22;

      // Test init proxies values

      expect(proxy1.cost).toBe(11);
      expect(proxy2.cost).toBe(22);

      // Test state 1

      expect(stateProxy1.cost).toBe(1);
      expect(stateProxy1.tax).toBe(0.33);
      expect(stateProxy1.netCost).toBe(0.33);

      stateProxy1.increment();

      expect(stateProxy1.cost).toBe(2);
      expect(stateProxy1.netCost).toBe(0.66);

      stateProxy1.cost = 100;

      expect(stateProxy1.cost).toBe(100);

      // Test state 2

      expect(stateProxy2.cost).toBe(2);

      stateProxy2.increment();

      expect(stateProxy2.cost).toBe(4);

      stateProxy1.text = "Writing to a read only property";

      expect(warn).toBeCalledWith("text is an immutable property and can't be updated");

      stateProxy1._text = "Writing to a read only property";

      expect(warn).toBeCalledWith("text is an immutable property and can't be updated");

      // Test proxy values are unchanged when updating states
      expect(proxy1.cost).toBe(11);
      expect(proxy2.cost).toBe(22);

      // Test that compute can execute both proxy and state values

      compute1.stateTaxPlus;

      // expect(1).toBe(2)
    });

    it("updates both states and proxies when either is changed", () => {
      return;
      const { component1, component2, proxy1, proxy2, compute1, compute2, state1, state2, stateProxy1, stateProxy2 } = getTwoComponentsAndTwoStates();

      state1.useState(component1);
      state1.useState(component2);
      state2.useState(component2);

      proxy1.a = 1;
      proxy2.a = 2;

      stateProxy1.a = 100;
      stateProxy2.a = 200;

      compute1.stateAPlusProxyB = () => proxy.a + state1.a;
      compute2.stateAPlusProxyB = () => proxy.a + state2.a;

      expect(proxy1.stateAPlusProxyB).toBe(101);
      expect(proxy2.stateAPlusProxyB).toBe(202);
    });
  });
});
