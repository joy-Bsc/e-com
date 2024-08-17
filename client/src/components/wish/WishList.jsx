import React, { useEffect } from 'react';
import WishStore from '../../store/WishStore';
import NoData from '../layout/NoData';
import StarRatings from 'react-star-ratings';
import { Link } from 'react-router-dom';

const WishList = () => {
    const { WishListRequest, WishList, WishDeleteRequest } = WishStore();
    console.log(WishList);

    useEffect(() => {
        (async () => {
            await WishListRequest();
        })();
    }, []);

    const remove = async (productID) => {
        await WishDeleteRequest(productID);
        await WishListRequest();
    };

    if (!WishList || WishList.length === 0) {
        return <NoData />;
    } else {
        return (
            <div className='container mt-3'>
                <div className="row">
                    {WishList.map((item, i) => {
                        console.log(item);

                        let price = <p className='bodyMedium text-dark my-1'>Price:</p>;
                        if (item.product.discount === true) {
                            price = <p className='bodyMedium text-dark my-1'>Price: {item.product.discountPrice} <del>${item.product.price}</del></p>;
                        }
                        return (
                            <div key={i} className="col-md-3 p-2 col-lg-3 col-sm-6 col-12">
                                <div className="card shadow-sm h-100 rounded-3 bg-gray">
                                    <img src={item.product.image} alt="" className="w-100 rounded-top-2" />
                                    <div className="card-body">
                                        <p className="bodySmall text-secondary my-1">{item.product.title}</p>
                                        {price}
                                        <StarRatings rating={parseFloat(item.product.star)} starRatedColor="red" numberOfStars={5} name='rating' starDimension='15px' starSpacing='1px' />
                                        <p className="mt-3">
                                            <button onClick={async () => { await remove(item.productID) }} className="btn btn-danger btn-sm">Remove</button>
                                            <Link className="btn mx-2 btn-outline-success btn-sm" to={`/details/${item.productID}` }>Details</Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
};

export default WishList;