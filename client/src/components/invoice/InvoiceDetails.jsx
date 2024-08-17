import React, { useEffect, useState } from 'react';
import ReviewStore from '../../store/ReviewStore';
import { useParams } from 'react-router-dom';
import CartStore from '../../store/CartStore';
import ValidationHelper from '../../utility/ValidationHelper';
import toast from 'react-hot-toast';
import NoData from '../layout/NoData';
import { Modal, Button, Form } from 'react-bootstrap';
import ReactStars from "react-rating-stars-component";

const InvoiceDetails = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    let {ReviewFormData,ReviewFormChange,ReviewSaveRequest} = ReviewStore();
    const ReviewModal=(id)=>{
        setShow(true);
        ReviewFormChange('productID',id);
    }
    const {id} = useParams();
    let {InvoiceDetails,InvoiceDetailsRequest} = CartStore();
    console.log(InvoiceDetails);
    

    useEffect(() => {
        (async () => {
            await InvoiceDetailsRequest(id);
        })();
    }, [id]);

    const submitReview = async () => {
        if(ValidationHelper.IsEmpty(ReviewFormData.des)){
            toast.error('Description is required');
        }
        else{
            let res = await ReviewSaveRequest(ReviewFormData);
            res?toast.success('Review submitted'):toast.error('Review not submitted');
            setShow(false);
        }
    }

    const ratingChanged = (newRating) => {
        ReviewFormChange('rating', newRating);
    };

    if (!InvoiceDetails || InvoiceDetails.length === 0) {
        return (
            <NoData/>
        );
    }
    else{
        return(
            <div className='container mt-3'>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card p-2">
                        <ul className="list-group list-group-flush">
                                {InvoiceDetails.map((item, i) => {
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
                                            <button onClick={() => ReviewModal(item.product._id)} className="btn btn-outline-primary btn-sm">Review</button>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Submit Review</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                        <Form.Group controlId="reviewRating" className="mb-3">
                                <Form.Label>Rating</Form.Label>
                                <ReactStars
                                    count={5}
                                    onChange={ratingChanged}
                                    size={24}
                                    activeColor="#ffd700"
                                />
                            </Form.Group>
                            <Form.Group controlId="reviewDescription">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={6}
                                    value={ReviewFormData.des}
                                    onChange={(e) => ReviewFormChange('des', e.target.value)}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={submitReview}>
                            Submit Review
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
    
};

export default InvoiceDetails;