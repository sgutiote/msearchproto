/**
 * @jest-environment jsdom
 * @jest-environment-options {"url": "https://jestjs.io/"}
 */


import React from "react";
import { createRoot } from 'react-dom/client';
import { act } from "react-dom/test-utils";
import Search from "../containers/Search";


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

it("render search data", async () => {
  const stubInitialState = {"items":[{"id":"MLA923579170","title":"Peluche Pokemon Varios Personajes Principales Pikachu 22cm","price":{"currency":"ARS","amount":1290,"decimals":0},"picture":"http://http2.mlstatic.com/D_603500-MLA47487564153_092021-O.jpg","condition":"new","free_shipping":false,"state_name":"Capital Federal"},{"id":"MLA1140818646","title":"Figura De Acción Pokémon Pikachu 31528 De Funko Pop! Games","price":{"currency":"ARS","amount":1779,"decimals":0},"picture":"http://http2.mlstatic.com/D_795834-MLA48341511152_112021-I.jpg","condition":"new","free_shipping":false,"state_name":"Capital Federal"},{"id":"MLA918856168","title":"Pijama Kigurumi Niños Unicornios Animales Mameluco Disfraz","price":{"currency":"ARS","amount":5290,"decimals":0},"picture":"http://http2.mlstatic.com/D_876177-MLA49194095674_022022-O.jpg","condition":"new","free_shipping":true,"state_name":"Capital Federal"},{"id":"MLA909313836","title":"Picador Pikachu Blunt Rey Arcoiris","price":{"currency":"ARS","amount":2890,"decimals":0},"picture":"http://http2.mlstatic.com/D_982408-MLA50132952720_052022-O.jpg","condition":"new","free_shipping":false,"state_name":"Buenos Aires"}],"categories":["Juegos y Juguetes","Peluches"]}
  // Use the asynchronous version of act to apply resolved promises
  //jest.spyOn(global, "fetch").mockImplementation(() =>    Promise.resolve({      json: () => Promise.resolve(stubInitialState)    })  );
  global.fetch = jest.fn().mockImplementation(() =>    Promise.resolve({      json: () => Promise.resolve(stubInitialState)    })  );
  await act(async () => {
    const root = createRoot(container);
    root.render(<Search query="pikachu" />);
  });

  expect(container.querySelectorAll(".item__description")[0].textContent).toBe(`$ ${stubInitialState.items[0].price.amount} ${stubInitialState.items[0].title}`);

});

