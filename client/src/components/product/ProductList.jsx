import React, { useEffect, useState } from 'react';
import useProductStore from '../../store/ProductStore'; // Make sure you're using the correct hook
import StarRatings from 'react-star-ratings';
import { Link } from 'react-router-dom';

const ProductList = () => {
    const { ListProduct, BrandListRequest, BrandList, CategoryList, CategoryListRequest, ListByFilterRequest } = useProductStore(state => ({
        ListProduct: state.ListProduct,
        BrandListRequest: state.BrandListRequest,
        BrandList: state.BrandList,
        CategoryList: state.CategoryList,
        CategoryListRequest: state.CategoryListRequest,
        ListByFilterRequest: state.ListByFilterRequest,
    }));

    let [Filter, setFilter] = useState({
        brandID: '',
        categoryID: '',
        priceMax: '',
        priceMin: ''
    });

    const inputOnChange = async (name, value) => {
        setFilter((data) => ({ ...data, [name]: value }));
    }

    useEffect(() => {
        (async () => {
            if (BrandList === null) await BrandListRequest();
            if (CategoryList === null) await CategoryListRequest();
            let isEveryFilterPropertyEmpty = Object.values(Filter).every(x => x === '');
            if (!isEveryFilterPropertyEmpty) {
                
                await ListByFilterRequest(Filter);
            }
        })();
    }, [Filter]);

    // If ListProduct is still null or undefined, handle it gracefully
    if (!ListProduct || ListProduct.length === 0) {
        return <div>No products available.</div>;
    }

    return (
        <div className='container mt-2'>
            <div className="row">
                <div className="col-md-3 p-2">
                    <div className="card vh-100 p-3 shadow-sm">
                        <label className="form-label mt-3">Brands</label>
                        <select value={Filter.brandID} onChange={async (e) => { await inputOnChange('brandID', e.target.value) }} className="form-control form-select dark-option">
                            <option value="">Select Brand</option>
                            {
                                BrandList !== null ? (
                                    BrandList.map((item, i) => {
                                        return (<option key={i} value={item._id}>{item.brandName}</option>)
                                    })
                                ) : <option value="">No Brands Available</option>
                            }
                        </select>
                        <label className="form-label mt-3">Categories</label>
                        <select value={Filter.categoryID} onChange={async (e) => { await inputOnChange('categoryID', e.target.value) }} className="form-control form-select">
                            <option value="">Select Category</option>
                            {
                                CategoryList !== null ? (
                                    CategoryList.map((item, i) => {
                                        return (<option key={i} value={item._id}>{item.categoryName}</option>)
                                    })
                                ) : <option value="">No Categories Available</option>
                            }
                        </select>
                        <label className="form-label mt-3">Maximum Price ${Filter.priceMax}</label>
                        <input value={Filter.priceMax} onChange={async (e) => { await inputOnChange('priceMax', e.target.value) }} min={0} max={1000000} step={1000} type="range" className="form-range" />
                        <label className="form-label mt-3">Minimum Price ${Filter.priceMin}</label>
                        <input value={Filter.priceMin} onChange={async (e) => { await inputOnChange('priceMin', e.target.value) }} min={0} max={1000000} step={1000} type="range" className="form-range" />
                    </div>
                </div>
                <div className="col-md-9 p-2">
                    <div className="container">
                        <div className="row">
                            {ListProduct.map((item, i) => {
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
                                                <StarRatings
                                                    rating={parseFloat(item.star)}
                                                    starRatedColor="orange"
                                                    numberOfStars={5}
                                                    name='rating'
                                                    starDimension='15px'
                                                    starSpacing='2px'
                                                />
                                                {price}
                                                <button className="btn btn-sm btn-primary">Add to Cart</button>
                                            </div>
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductList;