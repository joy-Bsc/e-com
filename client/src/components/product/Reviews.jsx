import React from 'react';
import ProductStore from '../../store/ProductStore';
import StarRatings from 'react-star-ratings';

const Reviews = () => {
    const {ReviewList} = ProductStore (state => ({
        ReviewList: state.ReviewList,
    }));
    return (
        <div>
            <ul className="list-group list-group-flush">
                {
                    ReviewList!==null?ReviewList.map((item,i) => (
                        <li className="list-group-item bg-transparent" key={i}>
                            <h5><i className='bi bi-person'></i>{"  "+item.profile.cus_name}</h5>
                            <StarRatings
                             rating={parseFloat(item.rating)}
                              starRatedColor="orange"
                               numberOfStars={5}
                                name='rating'
                                 starDimension='15px'
                                starSpacing='2px'
                                />
                                <br /><br />
                            <p>{item.des}</p>
                            
                        </li>
                    )):(<h5 color='red'>No Reviews Available</h5>)
                }
            </ul>
            
        </div>
    );
};

export default Reviews;