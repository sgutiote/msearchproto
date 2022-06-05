/**
 * @jest-environment jsdom
 * @jest-environment-options {"url": "https://jestjs.io/"}
 */


import React from "react";
import { createRoot } from 'react-dom/client';
import { act } from "react-dom/test-utils";
import Item from '../containers/Item';


let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it("render item data", async () => {
  const stubInitialState = {categories: [], picture: "picture", description: "desc", sold_quantity: 12, condition: "condition", title: "title", price: {amount: 1233} }
  // Use the asynchronous version of act to apply resolved promises
  //jest.spyOn(global, "fetch").mockImplementation(() =>    Promise.resolve({      json: () => Promise.resolve(stubInitialState)    })  );
  global.fetch = jest.fn().mockImplementation(() =>    Promise.resolve({      json: () => Promise.resolve(stubInitialState)    })  );
  await act(async () => {
    const root = createRoot(container);
    root.render(<Item id="123" />);
  });

  expect(container.querySelector("#description").textContent).toBe(stubInitialState.description);
  expect(container.querySelector("#condition").textContent).toBe(`Usado - ${stubInitialState.sold_quantity} vendidos`);
  expect(container.querySelector("#title").textContent).toBe(stubInitialState.title);
  expect(container.querySelector("#amount").textContent).toBe(`$ ${stubInitialState.price.amount}`);

});

