const conf = {
  headers: {
    'X-Client': 'santiago.gutierrez',
    'Content-Type': 'application/json'
  }
};

const Api = {
  fetchSearch : (query) => {
    return fetch(
        `/api/items?q=${query}`, {...conf, method: 'GET'}).then(response => response.json());
  },
  fetchItem : (id) => {
    return fetch(
        `/api/items/${id}`, {...conf, method: 'GET'}).then(response => response.json());
  }
}

/*
const fetchSession = async (id, setResultFn) => {
  const response = await fetch(
      `/api/items/${id}`);
  const item = await response.json();
  setResultFn(item)
};
*/


export default Api