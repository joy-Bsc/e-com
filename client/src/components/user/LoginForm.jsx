import React from 'react';
import SubmitButton from '../layout/SubmitButton';
import UserStore from '../../store/UserStore';
import ValidationHelper from '../../utility/ValidationHelper';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const LoginForm = () => {
    const navigate = useNavigate();

    const {LoginFormValue,LoginFromChange,UserOTPRequest} = UserStore();
    
    

    const onFormSubmit = async () =>{
        if(!ValidationHelper.IsEmail(LoginFormValue.email)){
            toast.error("Invalid Email Address");
           
        }
        else{
            let response = await UserOTPRequest(LoginFormValue.email);
            if(response === true){
                navigate('/otp');
            }
            else{
                toast.error("Failed to send verification code");
            }
        }
    }
    return (
        <div className='container section'>
            <div className="row d-flex justify-content-center">
                <div className="col-md-5">
                    <div className="card p-5">
                        <h4>Enter Your Email</h4>
                        <p>A verification code will be sent to the email address you provide</p>
                        <input value={LoginFormValue.email} onChange={(e)=>{LoginFromChange("email", e.target.value)}} placeholder='Email Address' type="email" className='form-control'/>
                        <SubmitButton onClick={onFormSubmit}  className='btn mt-3 btn-success' text ='Next'/>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default LoginForm;