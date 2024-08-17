import React, { useEffect, useState } from 'react';
import ProductStore from '../../store/ProductStore';
import StarRatings from 'react-star-ratings';
import { Link } from 'react-router-dom';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [remark, setRemark] = useState(['new']);
    const { ListByRemark, ListByRemarkRequest } = ProductStore();

    useEffect(() => {
        const fetchProducts = async () => {

            await ListByRemarkRequest(remark);
            setProducts(ListByRemark);
        };
        fetchProducts();
    }, [ListByRemarkRequest, remark]);

    return (
        <div className='section'>
            <div className="container-fluid py-5 bg-white">
                <div className="row">
                    <h1 className="headline-4 text-center my-2 p-0">
                        Our Products
                    </h1>
                    <span className="bodySmall mb-3 text-center">Explore a World of Choices Across Our Most Popular Shop</span>
                    <div className="col-12">
                        <div>
                            <ul className="nav nav-pills p-3 justify-content-center mb-3" id="pills-tab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button onClick={() => setRemark('new') } className="nav-link nav-link-custom active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pill-new" type='button' role='tab' aria-controls='pills-home' aria-selected='true'>New</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button onClick={() => setRemark('trending') } className="nav-link nav-link-custom" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pill-trending" type='button' role='tab' aria-controls='pills-profile' aria-selected='false'>Trending</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button onClick={() =>  setRemark('popular') } className="nav-link nav-link-custom" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pill-popular" type='button' role='tab' aria-controls='pills-contact' aria-selected='false'>Popular</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button onClick={() =>  setRemark('top') } className="nav-link nav-link-custom" id="pills-disabled-tab" data-bs-toggle="pill" data-bs-target="#pill-top" type='button' role='tab' aria-controls='pills-disabled' aria-selected='false'>Top</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button onClick={() => setRemark('special')} className="nav-link nav-link-custom" id="pills-disabled-tab" data-bs-toggle="pill" data-bs-target="#pill-special" type='button' role='tab' aria-controls='pills-disabled' aria-selected='false'>Special</button>
                                </li>
                            </ul>
                            <div className="tab-content" id='pills-tabContent'>
                                <div className="tab-pane fade show active" id='pills-new' role='tabpanel' aria-labelledby=''>
                                    <div className="container">
                                        <div className="row">
                                            {products.map((item, i) => {
                                                let price = <p className="bodyMedium text-dark my-1">Price: ${item.price}</p>;
                                                if (item.discount === true) {
                                                    price = <p className="bodyMedium text-dark my-1">Price: <del>${item.price}</del> ${item.discountPrice}</p>;
                                                }
                                                return (
                                                    <div key={i} className="col-md-3 p2 col-lg-3 col-sm-6 col-12">
                                                        <Link to={`/details/${item._id}`} className='card shadow-sm h-100 rounded-3 bg-white'>
                                                            <img src={item.image} alt="" className="w-100 rounded-top-2" />
                                                            <div className="card-body">
                                                                <p className="bodySmall text-secondary my-1">{item.title}</p>
                                                                {price}
                                                                <StarRatings rating={parseFloat(item.star)} starRatedColor="orange" numberOfStars={5} name='rating' starDimension='15px' starSpacing='1px' />
                                                            </div>
                                                        </Link>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Products;