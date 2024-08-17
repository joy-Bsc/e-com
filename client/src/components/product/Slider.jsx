import React, { useEffect } from 'react';
import ProductStore from '../../store/ProductStore';
import { Link } from 'react-router-dom';

const Slider = () => {
    const { SliderList,SliderListRequest,isSliderListLoaded } = ProductStore();

    useEffect(() => {
        if (!isSliderListLoaded) {
            SliderListRequest();
        }
    }, [SliderListRequest,isSliderListLoaded]);
    return (
        <div>
            <div id='carouselExampleDark' className="carousel hero-bg carousel-dark slide">
                <div className="carousel-indicators">
                    {SliderList.map((item, i) => (
                        <button key={i} type='button' data-bs-target="#carouselExampleDark" data-bs-slide-to={i} className={i === 0 ? 'active' : ''} aria-current={i === 0 ? "true" : undefined} aria-label={`Slide ${i + 1}`}/>
                    ))}
                </div>
                <div className="carousel-inner py-5">
                    {SliderList.map((item, i) => {
                        let active = i === 0 ? "carousel-item active" : "carousel-item";
                        return (
                            <div key={i} className={active} data-bs-interval="10000">
                                <div className="container">
                                    <div className="row justify-content-center">
                                        <div className="col-12 col-lg-5 col-sm-12 col-md-5 p-5">
                                            <h1 className="headline-1">{item.title}</h1>
                                            <p>{item.des}</p>
                                            <Link to="" className='btn text-white btn-success px-5'>Buy Now</Link>
                                        </div>
                                        <div className="col-12 col-lg-5 col-sm-12 col-md-5 p-5">
                                            <img src={item.image} alt="" className="w-100" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <button className="carousel-control-prev btn rounded-5" type='button' data-bs-target="#carouselExampleDark">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next btn active" type='button' data-bs-target="#carouselExampleDark" >
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    );
};

export default Slider;