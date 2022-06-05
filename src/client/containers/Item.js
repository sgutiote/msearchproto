import React, {useEffect, useState} from "react";
import Breadcrumbs from "../components/Breadcrumbs";
import "../stylesheets/search.scss";
import Api from "../api";

const ItemDetail = ({item}) => (
    <div className="item-detail">
      <div className="item-detail__description">
        <div className="item-detail__description__image" >
          <img src={item.picture} width="680px"/>
        </div>
        <div className="item-detail__description__text">
          <p className="text text--md2">Descripción del producto</p>
          <p id="description" className="text text--sm item-detail__description__description">{item.description}</p>
        </div>
      </div>
      <div className="item-detail__summary">
        <p id="condition" className="text text--xs">{`${item.condition === "new" ? 'Nuevo': 'Usado'} - ${item.sold_quantity} vendidos`}</p>
        <p id="title" className="text text--md1 item-detail__highlights__data--mts">{item.title}</p>
        <p id="amount" className="text text--xl item-detail__highlights__data--mtl">$ {item.price.amount}</p>
        <button className="item-detail__highlights__data--mtl purchase-button">Comprar</button>
      </div>
    </div>
)

const Item = ({id}) => {

  const [item, setItem] = useState(null);
  useEffect(() => {
    Api.fetchItem(id).then(data => setItem(data));
  }, []);

  return item &&
      <div className="result">
        <Breadcrumbs
            categories={item.categories}
        />
        <ItemDetail
          item={item}
        />
      </div>
};

export default Item;