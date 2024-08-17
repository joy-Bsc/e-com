import create from 'zustand';
import axios from 'axios';
import { unauthorized } from '../utility/Utility';


const WishStore = create((set) => ({
    isWishSubmit: false,
    WishSaveRequest: async (productID) => {
        try {
            set({ isWishSubmit: true });

            const res = await axios.post('/api/v1/SaveWishList', { productID: productID });
            return res.data.status==="success";
        } catch (error) {
            unauthorized(error);
        }
        finally{
            set({ isWishSubmit: false });
        }
    },

    WishList:null,
    WishCount:0,
    WishListRequest: async () => {
        try {
            const res = await axios.get('/api/v1/WishList');
            set({ WishList: res.data.data});
            set({ WishCount: res.data.data.length});
            
            
        } catch (error) {
            unauthorized(error.response.status);
        }
    },

    WishDeleteRequest: async (productID) => {
        try {
            set({ WishList: null });
            const res = await axios.post('/api/v1/RemoveWishList/',{"productID":productID});
            return res.data.status==="success";
        } catch (error) {
            unauthorized(error);
        }
    }
}));

export default WishStore;