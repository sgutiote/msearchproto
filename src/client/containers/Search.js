import React, {useEffect, useState} from "react";
import Breadcrumbs from "../components/Breadcrumbs";
import Api from "../api";

const Item = ({item}) => <div className="item" onClick={() =>  window.location.href=`/items/${item.id}`}>
  <img className="item__img" src={item.picture}/>
  <div className="item__description">
    <p className="text item__description--mbl item__description--fsl">$ {item.price.amount} {item.free_shipping && <img src="/statics/images/Shipping.png"/>}</p>
    <p className="text">{item.title}</p>
  </div>
  <div className="item__addressState">{item.state_name}</div>
</div>

const Items = ({items}) => {
  return <div className="result-box">
    {
      items.map((item, idx)=> <Item key={`item-${idx}`} item={item} />)
    }
  </div>
}

const Search = ({query}) => {

  const [searchResult, setSearchResult] = useState(null);

  useEffect(() => {
    Api.fetchSearch(query).then(data => setSearchResult(data));
  }, []);

  return  (<div>
    {
      searchResult &&
      <div className="result">
        <Breadcrumbs
            categories={searchResult.categories}
        />
        <Items
            items={searchResult.items}
        />
      </div>
    }
  </div>)
}

export default Search;