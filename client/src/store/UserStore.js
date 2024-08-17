import create from 'zustand';
import axios from 'axios';
import {getEmail,setEmail, unauthorized} from '../utility/Utility';
import Cookies from 'js-cookie';

const UserStore = create((set) => ({

    isLogin: () => {
        return Cookies.get('token');
    },

     LoginFormValue:{email:""},

     LoginFromChange:(name,value) => {
        set((state) => ({
            LoginFormValue: {...state.LoginFormValue, [name]: value}
        }));
    },

    UserLogoutRequest: async () => {
        try {
            set({isFormSubmit: true});
            const response = await axios.get(`/api/v1/UserLogout`);
            set({isFormSubmit: false});
            return response.data.status==='success';
        } catch (error) {
            return error.response.data;
        }
    },

    OTPFormData:{otp:""},

    OTPFormOnChange:(name,value) => {
        set((state) => ({
            OTPFormData: {...state.OTPFormData, [name]: value}
        }));
    },
    
        

    isFormSubmit: false,
    
    UserOTPRequest: async (email) => {
        try {
            set({isFormSubmit: true});
            const response = await axios.get(`/api/v1/UserOTP/${email}`);
            setEmail(email);
            set({isFormSubmit: false});
            return response.data.status==='success';
        } catch (error) {
            return error.response.data;
        }
    
    },

    VerifyLoginRequest: async (otp) => {
        try {
            set ({isFormSubmit: true});
            let email = getEmail();
            const response = await axios.get(`/api/v1/VerifyOTP/${email}/${otp}`);
            set({isFormSubmit: false});
            return response.data.status==='success';
        } catch (error) {
            return error.response.data;
        }
    },


    ProfileForm:{cus_add:"" ,cus_city:"",cus_country:"" ,cus_fax:"" ,cus_name:"" ,cus_phone: "",cus_state: "",ship_add: "",ship_city: "", ship_country:"" ,ship_name: "",ship_phone: "",ship_postcode:"",ship_state:""},
    ProfileFormChange:(name,value) => {
        set((state) => ({
            ProfileForm: {...state.ProfileForm, [name]: value}
        }));
    },

    ProfileDetails: null,
    ProfileDetailsRequest: async () => {
        try {
            const response = await axios.get(`/api/v1/ReadProfile`);
            console.log("API Response:", response.data);
    
            if (response.data && Object.keys(response.data.data).length > 0) {
                set({ ProfileDetails: response.data.data });
                console.log("ProfileDetails:", response.data.data);
    
                set({ ProfileForm: response.data.data });
            } else {
                set({ ProfileDetails: null });
                console.log("No profile data found.");
            }
        } catch (error) {
            console.error("Error fetching profile details:", error);
            unauthorized(error.response.status);
        }
    },

    ProfileSaveRequest: async (PostBody) => {
        try {
            set({ProfileDetails:null})
            let res = await axios.post(`/api/v1/UpdateProfile`,PostBody);
            return res.data.status==='success';
        } catch (error) {
             unauthorized(error.response.status)
        }
    }
}));

export default UserStore;