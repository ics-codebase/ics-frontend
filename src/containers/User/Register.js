// Render Prop
import React, {useState} from 'react';

import Register from '../../components/User/Register'
import RegistrationConfirmation from '../../components/User/RegistrationConfirmation'


export const RegisterContainer=()=>{
    const [successView, setSuccessView] = React.useState('register');
    const success = successView;

    const handleSuccess = (how) =>{
        if (how === 'register') setSuccessView('register')
        if (how === 'success') setSuccessView('success')
    }

     return (
        <div>
            {success === 'register' ? (
                <Register handleSuccess={handleSuccess}/>
                ) : (
                <RegistrationConfirmation />
            )}
        </div>
      );
  }


  export default RegisterContainer