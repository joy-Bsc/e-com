import React from 'react';
import Skeleton from 'react-loading-skeleton';
import Lottie from 'react-lottie-player'; // Corrected import for Lottie
import ImagePlaceholder from '../assets/images/image.json';

const FeaturesSkeleton = () => {
    return (
        <div className='container section'>
            <div className="row">
                {
                    Array.from({length: 4}).map((_, index) => ( // Added index parameter for key prop
                        <div key={index} className="col-6 p-2 col-lg-3 col-sm-6"> {/* Added key prop */}
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-4">
                                        <Lottie className='w-100' animationData={ImagePlaceholder} play loop /> {/* Corrected Lottie component usage */}
                                    </div>
                                    <div className="col-8">
                                        <Skeleton count={3}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default FeaturesSkeleton;