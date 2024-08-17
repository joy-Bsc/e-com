import React from 'react';
import ImagePlaceholder from '../assets/images/image.json';
import Skeleton from 'react-loading-skeleton';
import Lottie from 'react-lottie';

const ProductsSkeleton = () => {
    return (
        <div className='container'>
            <div className="row">
                <div className="col-md-3 p2 col-lg-3 col-sm-6 col-12">
                    <div className="card shadow-sm h-100 rounded-3 bg-white">
                        <Lottie className='w-100' animationData={ImagePlaceholder} play loop />
                        <Skeleton count={3}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductsSkeleton;