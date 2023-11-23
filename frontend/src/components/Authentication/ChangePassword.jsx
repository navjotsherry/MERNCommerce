// Importing necessary modules and components
import React from 'react';
import { useDispatch } from 'react-redux';
import { changePassword } from '../../store/userSlice';

// Functional component for changing user password
const ChangePassword = () => {
    // Initializing the Redux dispatch function
    const dispatch = useDispatch();

    // Local state for form data
    const [authData, setAuthData] = React.useState({
        oldPassword: '',
        password: '',
        confirmPassword: ''
    });

    // Function to handle form data changes
    const handleFormDataChange = (e) => {
        setAuthData((prevState) => {
            return { ...prevState, [e.target.name]: e.target.value };
        });
    };

    // Function to handle form submission
    const handleFormSubmit = (e) => {
        e.preventDefault();
        // Dispatching the changePassword action with the form data
        dispatch(changePassword(authData));
        // Clearing the form data after submission
        setAuthData({
            oldPassword: '',
            password: '',
            confirmPassword: ''
        });
    };

    // Rendering the component
    return (
        <div className='grid place-items-center h-[84vh] '>
            {/* Change password form */}
            <form onSubmit={handleFormSubmit} className="flex flex-col items-center justify-around border-4 p-5 text-left border-primary rounded-md">
                {/* Old Password input */}
                <label className='text-md text-left w-full'>Old Password: </label>
                <input
                    onChange={handleFormDataChange}
                    name='oldPassword'
                    value={authData.oldPassword}
                    className='my-2 border-2 p-2 rounded-md outline-none border-black focus-within:border-primary'
                    type="password"
                />
                {/* New Password input */}
                <label className='text-md text-left w-full'>New Password: </label>
                <input
                    onChange={handleFormDataChange}
                    name='password'
                    value={authData.password}
                    className='my-2 border-2 p-2 rounded-md outline-none border-black focus-within:border-primary'
                    type="password"
                />
                {/* Confirm New Password input */}
                <label className='text-md text-left w-full'>Confirm new password: </label>
                <input
                    onChange={handleFormDataChange}
                    name='confirmPassword'
                    value={authData.confirmPassword}
                    className='my-2 border-2 p-2 rounded-md outline-none border-black focus-within:border-primary'
                    type="password"
                />
                {/* Submit button */}
                <button className='bg-primary text-lg my-4 p-4 rounded-md hover:bg-black hover:text-primary duration-300' type='submit'>Change Password</button>
            </form>
        </div>
    );
}

// Exporting the ChangePassword component
export default ChangePassword;