import React, { useEffect, useState } from 'react';
import ProductStore from '../../store/ProductStore';
import parse from 'html-react-parser';
import ProductImages from './ProductImages';
import Reviews from './Reviews';
import CartStore from '../../store/CartStore';
import toast from 'react-hot-toast';
import CartSubmitButton from '../layout/CartSubmitButton';
import WishStore from '../../store/WishStore';
import WishSubmitButton from '../wish/WishSubmitButton';

const Details = () => {
    const { Details, ReviewList, DetailsRequest } = ProductStore(state => ({
        Details: state.Details,
        ReviewList: state.ReviewList,
        DetailsRequest: state.DetailsRequest,
    }));

    const {CartSaveRequest,CartForm,CartListRequest,CartFormChange}= CartStore();
    const {WishSaveRequest,WishListRequest} = WishStore();

    const [quantity, setQuantity] = useState(1);
    const increment = () => {
        setQuantity(quantity=>quantity+1);
        CartFormChange('qty',quantity+1)
    }
    const decrement = () => {
        if(quantity>1){
            setQuantity(quantity=>quantity-1);
            CartFormChange('qty',quantity=>quantity-1)
        }
    }

    const AddCart= async(productID)=>{
        let res = await CartSaveRequest(CartForm,productID,quantity);
        if(res){
            toast.success('Product added to cart');
            await CartListRequest();
    }
}

const AddWish = async(productID)=>{
    let res = await WishSaveRequest(productID);
    if(res){
        toast.success('Product added to wish');
        await WishListRequest();
    }

}


    useEffect(() => {
        DetailsRequest().catch(error => {
            console.error('Error fetching details:', error);
        });
    }, [DetailsRequest]);

    if (!Details || Details.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="container mt-2">
                <div className="row">
                    <div className="col-md-7 p-3">
                        <ProductImages />
                    </div>
                    <div className="col-md-5 p-3">
                        <h4>{Details[0].title}</h4>
                        <p className='text-muted bodySmall my-1'>Category: {Details[0].category.categoryName}</p>
                        <p className='text-muted bodySmall my-1'>Brand: {Details[0].brand.brandName}</p>
                        <p className="bodySmall mb-2 mt-1">Short Description: {Details[0].shortDes}</p>
                        <span>
                            {
                                Details[0].discount ? (
                                    <p className="bodyMedium text-dark my-1">Price: <del>${Details[0].price}</del> ${Details[0].discountPrice}</p>
                                ) : <p className="bodyMedium text-dark my-1">Price: ${Details[0].price}</p>
                            }
                        </span>
                        <div className="row">
                            <div className="col-4 p-2">
                                <label className="bodySmall">Size</label>
                                <select value={CartForm.size} onChange={(e)=>{CartFormChange('size',e.target.value)}} className="form-control my-2 form-select">
                                    <option value="">Size</option>
                                    {
                                        Details[0].details.size.split(',').map((item, i) => {
                                            return <option key={i} value={item}>{item}</option>
                                        })

                                    }
                                </select>
                            </div>
                            <div className="col-4 p-2">
                                <label className="bodySmall">Color</label>
                                <select value={CartForm.color} onChange={(e)=>{CartFormChange('color',e.target.value)}} className="form-control my-2 form-select">
                                    <option value="">Color</option>
                                    {
                                        Details[0].details.color.split(',').map((item, i) => {
                                            return <option key={i} value={item}>{item}</option>
                                        })
                                        
                                    }
                                </select>
                            </div>
                            <div className="col-4 p-2">
                                <label className="bodySmall">Quantity</label>
                                <div className="input-group my-2">
                                    <button onClick={decrement} className="btn btn-outline-secondary">-</button>
                                    <input value={quantity} type="text" className="form-control bg-light text-center" readOnly />
                                    <button onClick={increment} className="btn btn-outline-secondary">+</button>
                                </div>
                            </div>
                            <div className="col-4 p-2">
                                <CartSubmitButton onClick={async()=>{await AddCart(Details[0]._id)}} className="btn btn-primary" text='Add to Cart'>Add to Cart</CartSubmitButton>
                            </div>
                            <div className="col-4 p-2">
                                <WishSubmitButton onClick={async()=>{await AddWish(Details[0]._id)}} className="btn btn-warning" text='Add to Wish'>Add to Wish</WishSubmitButton>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                <ul className="nav nav-tabs" id='myTab' role='tablist'>
    <li className="nav-item" role='presentation'>
        <button className="nav-link active" id='home-tab' data-bs-toggle='tab' data-bs-target='#home' type='button' role='tab' aria-controls='home' aria-selected='true'>Specification</button>
    </li>
    <li className="nav-item" role='presentation'>
        <button className="nav-link" id='profile-tab' data-bs-toggle='tab' data-bs-target='#profile' type='button' role='tab' aria-controls='profile' aria-selected='false'>Review</button>
    </li>
</ul>
<div className="tab-content" id='myTabContent'>
    <div className="tab-pane fade show active" id='home' role='tabpanel' aria-labelledby='home-tab'>
        <ul className='list-group list-group-flush'>
            {parse(Details[0].details.des)}
        </ul>
    </div>
    <div className="tab-pane fade" id='profile' role='tabpanel' aria-labelledby='profile-tab'>
        <ul className='list-group list-group-flush'>
            <Reviews />
        </ul>
    </div>
</div>
                        <div className="tab-pane fade" id='profile' role='tabpanel' aria-labelledby='profile-tab'>
                            <p className="bodySmall mt-2">Review</p>
                        </div>
                    </div>
                </div>
            </div>


    );
};

export default Details;