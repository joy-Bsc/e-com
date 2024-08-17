import React from 'react';
import ProductStore from '../../store/ProductStore';
import { Link } from 'react-router-dom';

const Categories = () => {
  const {CategoryList} = ProductStore();
    return (
        <div className='section'>
            <div className="container">
              <div className="row">
                <h1 className="headline-4 text-center my-2 p-0">
                  Top Categories
                </h1>
                <span className="bodySmall mb-5 text-center">
                  Explore a World of Choices Across Our Most Popular <br />Shop
                </span>
                {
                   CategoryList.map((item,i)=>{
                    
                    return(
                      <div key={i} className="col-6 col-lg 8r text-center col-md-8r p-2">
                  <Link to={`/by-category/${item._id}`} className='card h-100 rounded-3 bg-light'>
                  <div className="card-body">
                    <img src={item.categoryImg} alt="categories" className="w-75" />
                    <p className="bodySmall mt-3">{item.categoryName}</p>
                    </div> 
                     </Link>
                </div>
                    )
                  }) 
                }
              </div>
            </div>
        </div>
    );
};

export default Categories;