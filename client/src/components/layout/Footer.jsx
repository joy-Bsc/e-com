import React from 'react';
import { Link } from 'react-router-dom';
import paymentGatewayImage from '../../assets/images/What,is,Payment,Gateway-2022-11-03-6363493f251fd.png';

const Footer = () => {
    return (
        <div>
            <div className='section-bottom shadow-sm bg-custom'>
                <div className='container py-5'>
                    <div className='row'>
                        <div className='col-md-4'>
                            <h1 className='bodyMedium'>Legals</h1>
                            <p className='my-2'>
                                <Link className='nav-link' to='/about'>About</Link>
                            </p>
                            <p className='my-2'>
                                <Link className='nav-link' to='/refund'>Refund Policy</Link>
                            </p>
                            <p className='my-2'>
                                <Link className='nav-link' to='/privacy'>Privacy</Link>
                            </p>
                            <p className='my-2'>
                                <Link className='nav-link' to='/terms'>Terms and Conditions</Link>
                            </p>
                        </div>
                        <div className='col-md-4'>
                            <h1 className='bodyMedium'>Information</h1>
                            <p className='my-2'>
                                <Link className='nav-link' to='/how-to-buy'>How to buy</Link>
                            </p>
                            <p className='my-2'>
                                <Link className='nav-link' to='/contact'>Contact</Link>
                            </p>
                            <p className='my-2'>
                                <Link className='nav-link' to='/complain'>Complain</Link>
                            </p>
                        </div>
                        <div className='col-md-4'>
                            <h1 className='bodyMedium'>About</h1>
                            <div className='d-flex align-items-center'>
                                <p className='flex-grow-1'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia fugiat nobis reiciendis omnis neque qui reprehenderit quam hic! Eveniet, hic! Corporis aut eos alias voluptatum recusandae perspiciatis assumenda voluptates enim!</p>
                                <p className='color-blue ms-3'>pay with <img className='w-50' src={paymentGatewayImage} alt="" /></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-dark py-3 text-center'>
                <p className='text-white bodySmall'>All rights Reserved</p>
            </div>
        </div>
    );
};

export default Footer;