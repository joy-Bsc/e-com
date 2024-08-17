import React from 'react';
import SubmitButton from '../layout/SubmitButton';
import UserStore from '../../store/UserStore';
import { useNavigate } from 'react-router-dom';
import toast  from 'react-hot-toast';
import ValidationHelper from '../../utility/ValidationHelper';

const OTPForm = () => {
    const navigate = useNavigate();
    let {OTPFormData,OTPFormOnChange,VerifyLoginRequest} = UserStore();
    const onFormSubmit = async () =>{
        if(ValidationHelper.IsEmpty(OTPFormData.otp)){
            toast.error("Invalid OTP Code");
           
        }
        else{
            let response = await VerifyLoginRequest(OTPFormData.otp);
            if(response === true){
                navigate('/');
            }
            else{
                toast.error("login failed");
            }
           
        }
    }
    return (
        <div className='container section'>
        <div className="row d-flex justify-content-center">
            <div className="col-md-5">
                <div className="card p-5">
                    <h4>Enter Verification Code</h4>
                    <p>A verification code has been sent to the email address you provide</p>
                    <input value={OTPFormData.email} onChange={(e)=>{OTPFormOnChange("otp", e.target.value)}} placeholder='enter otp code' type="otp" className='form-control'/>
                    <SubmitButton onClick={onFormSubmit}  className='btn mt-3 btn-success' text ='Submit'/>
                </div>
            </div>
        </div>
    </div>
    );
};


export default OTPForm;