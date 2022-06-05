import React from "react";

const Breadcrumbs = ({categories}) => {
  return <div className="breadcrumbs">
    {
     categories.map((cat, i, arry) => {
        return <span key={`k-bread-${i}`}>
          {
            i!==0 && <span> > </span>
          }
          <span className={`breadcrumbs__crumb ${arry.length -1 === i ? 'breadcrumbs__crumb--bold':''}`}>{cat}</span>
        </span>;
     })
    }
  </div>
}

export default Breadcrumbs;