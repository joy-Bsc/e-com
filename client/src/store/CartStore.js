import create from 'zustand';
import axios from 'axios';
import { unauthorized } from '../utility/Utility';

const CartStore = create((set) => ({

    isCartSubmit: false,
    CartForm:{productID:"", color:"",size:""},
    CartFormChange:(name,value)=>{
        set((state)=>({
            CartForm:{...state.CartForm,[name]:value}
        }))
    },

    CartSaveRequest: async (PostBody,productID,quantity) => {
        try {
            set({ isCartSubmit: true });
            PostBody.productID = productID;
            PostBody.qty = quantity;
            const res = await axios.post('/api/v1/SaveCartList',PostBody);
            return res.data.status==="success";
        } catch (error) {
            unauthorized(error);
            
        }
    },

    CartList:null,
    CartCount:0,
    CartTotal:0,
    CartVatTotal:0,
    CartPayableTotal:0,
    CartListRequest: async () => {
        try {
            const res = await axios.get('/api/v1/CartList');
            set({ CartList: res.data.data});
            set({ CartCount: res.data.data.length});
            let total = 0;
            let vat = 0;
            let payable = 0;
            res.data.data.forEach((item,i)=>{
                if(item.product.discount===true){
                    total = total + parseInt(item.qty)*parseInt(item.product.discountPrice)
                }
                else{
                    total = total + parseInt(item.qty)*parseInt(item.product.price)
                }
            })
            vat = total*0.05;
            payable = vat+total;

            set({CartTotal:total})
            set({CartVatTotal:vat})
            set({CartPayableTotal:payable})
        } catch (error) {
            unauthorized(error.response.status);
        }
        finally{
            set({ isCartSubmit: false });
        }
    },

    RemoveCartListRequest:async(cartID)=>{
        try {
            set({CartList:null})
            await axios.post('/api/v1/RemoveCartList',{'_id':cartID});
        } catch (error) {
            unauthorized(error);
        }
    },
    CreateInvoiceRequest:async()=>{
        try {
            set({isCartSubmit:true})
            let res = await axios.get('/api/v1/CreateInvoice');
            window.location.href = res.data.data.GatewayPageURL;
        } catch (error) {
             set({ isCartSubmit: false });
        }
    },

    InvoiceList:null,
    InvoiceListRequest:async()=>{
        try {
            const res = await axios.get('/api/v1/InvoiceList');
            set({InvoiceList:res.data.data})
        } catch (error) {
            unauthorized(error);
        }
    },

    InvoiceDetails:null,
    InvoiceDetailsRequest:async(id)=>{
        try {
            const res = await axios.get(`/api/v1/InvoiceProductList/${id}`);
            set({InvoiceDetails:res.data.data})
        } catch (error) {
            unauthorized(error);
        }
    },

}));

export default CartStore;