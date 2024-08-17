import React, { useEffect } from 'react';
import CartStore from '../../store/CartStore';
import NoData from '../layout/NoData';
import CartSubmitButton from '../layout/CartSubmitButton';

const CartList = () => {
    const { CartTotal, CartVatTotal, CartPayableTotal, CartListRequest, RemoveCartListRequest, CreateInvoiceRequest, CartList } = CartStore();
    

    useEffect(() => {
        (async () => {
            await CartListRequest();
        })();
    }, []);

    const remove = async (cartID) => {
        console.log(cartID);
        
        await RemoveCartListRequest(cartID);
        await CartListRequest();
    };

    if (!CartList || CartList.length === 0) {
        return <NoData />;
    } else {
        return (
            <div className="container mt-3">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card p-4">
                            <ul className="list-group list-group-flush">
                                {CartList.map((item, i) => {
                                    let price = item.product.price;
                                    if (item.product.discount === true) {
                                        price = item.product.discountPrice;
                                    }
                                    return (
                                        <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
                                            <img src={item.product.image} alt="" className="rounded-1" width="90" height="auto" />
                                            <div className="ms-2 me-auto">
                                                <p className="fw-lighter m-0">{item.product.title}</p>
                                                <p className="fw-lighter m-0">Price: ${price}</p>
                                                <p className="fw-lighter m-0">Quantity: {item.qty}</p>
                                                <p className="fw-lighter m-0">Color: {item.color}</p>
                                                <p className="h6 fw-bold m-0 text-dark">Total <i className='bi bi-currency-dollar'></i>{ price*item.qty}</p>
                                            </div>
                                            <button onClick={async () => { await remove(item._id) }} className="btn btn-outline-danger btn-sm"><i className='bi bi-trash'></i></button>
                                        </li>
                                    );
                                })}
                            </ul>
                            <div className="my-4">
                                <ul className="list-group bg-transparent list-group-flush">
                                    <li className="list-group-item bg-transparent h6 m-0 text-dark">
                                        <span className="float-end">Total: <i className='bi bi-currency-dollar'></i>{CartTotal}</span>
                                    </li>
                                    <li className="list-group-item bg-transparent h6 m-0 text-dark">
                                        <span className="float-end">Vat(5%): <i className='bi bi-currency-dollar'></i>{CartVatTotal}</span>
                                    </li>
                                    <li className="list-group-item bg-transparent h6 m-0 text-dark">
                                        <span className="float-end">Payable: <i className='bi bi-currency-dollar'></i>{CartPayableTotal}</span>
                                    </li>
                                    <li className="list-group-item bg-transparent">
                                        <span className="float-end">
                                            <CartSubmitButton onClick={async () => { await CreateInvoiceRequest() }} className="btn btn-success" text='Check Out'>Create Invoice</CartSubmitButton>
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default CartList;