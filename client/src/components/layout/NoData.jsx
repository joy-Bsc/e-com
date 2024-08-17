import React from 'react';
import notfound from '../../assets/images/no_result.gif'
const NoData = () => {
    return (
        <div className='container'>
           <div className="row d-flex justify-content-center">
            <div className="col-md-4 text-center">
                <img src={notfound} alt="" className="w-75" />
                </div>
                </div> 
        </div>
    );
};

export default NoData;