const breadcrumbs = async (id) => {
  const response = await fetch(`https://api.mercadolibre.com/categories/${id}`);
  if (response.ok) {
    const data = await response.json();
    return data.path_from_root.map(c => c.name);
  }else{
  return [""];
  }
}

const detail = async (_, res) =>  {
  const itemId = _.params.itemId;
  const client = _.get('X-Client').split(".");

  const response = await fetch(`https://api.mercadolibre.com/items/${itemId}`);
  if (response.ok) {
    const data = await response.json();
    const bestCategory = data.category_id;

    const pathFromRoot = await breadcrumbs(bestCategory);
    const descriptionResponse = await fetch(`https://api.mercadolibre.com/items/${itemId}/description`);
    if (response.ok) {
      const descriptionData = await descriptionResponse.json();
      res.status(200).json({author: {name: client[0], lastname: client[1]}, id: data.id, title: data.title, price:{amount: data.price, currency: data.currency_id, decimals: 0}, picture: data.pictures[0].url, condition: data.condition, free_shipping: data.shipping.free_shipping, sold_quantity: data.sold_quantity,  categories: pathFromRoot, description: descriptionData.plain_text});
    }

  } else {
    res.status(500);
  }

}

export default detail;