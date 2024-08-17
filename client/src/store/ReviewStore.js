import {create} from 'zustand';
import axios from 'axios';
import { unauthorized } from '../utility/Utility';

const ReviewStore = create((set) => ({
    isReviewSubmit: false,
    ReviewFormData:{des:",",rating:'5',productID:""},
    ReviewFormChange:(name,value)=>{
        set((state)=>({
            ReviewFormData:{...state.ReviewFormData,[name]:value}
        }))
    },

    ReviewSaveRequest: async (PostBody) => {
        try {
            set({ isReviewSubmit: true });
            const res = await axios.post('/api/v1/CreateReview',PostBody);
            return res.data.status==="success";
        } catch (error) {
            unauthorized(error);
        }
        finally{
            set({ isReviewSubmit: false });
        }
    },
    
    ReviewList:null,

}));

export default ReviewStore;