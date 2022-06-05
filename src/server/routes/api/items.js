
function mode(items)
{
  if(items.length == 0)
    return null;
  var modeMap = {};
  var maxEl = items[0].category_id, maxCount = 1;
  for(var i = 0; i < items.length; i++)
  {
    var el = items[i].category_id;
    if(modeMap[el] == null)
      modeMap[el] = 1;
    else
      modeMap[el]++;
    if(modeMap[el] > maxCount)
    {
      maxEl = el;
      maxCount = modeMap[el];
    }
  }
  return maxEl;
}

const breadcrumbs = async (id) => {
  const response = await fetch(`https://api.mercadolibre.com/categories/${id}`);
  if (response.ok) {
    const data = await response.json();

    return data.path_from_root.map(c => c.name);
  }else{
  return [""];
  }
}

const Items = async (_, res) =>  {
  const client = _.get('X-Client').split(".");

  const query = _.query.q;
  const response = await fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${query}&limit=4&sort=relevance`);
  if (response.ok) {
    const data = await response.json();
    const bestCategory = mode(data.results);

    const pathFromRoot = await breadcrumbs(bestCategory);
    res.status(200).json({author: {name: client[0], lastname: client[1]}, items: data.results.map(r => ({id: r.id, title: r.title, price:{currency: r.currency_id , amount: r.price, decimals: 0},picture: r.thumbnail, condition: r.condition, free_shipping: r.shipping.free_shipping, state_name: r.address.state_name})), categories: pathFromRoot});
  } else {
    res.status(500);
  }

}

export default Items;