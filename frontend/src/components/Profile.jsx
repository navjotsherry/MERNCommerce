// Importing necessary modules and components
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaPenNib } from 'react-icons/fa';
import { updateUserSlice } from '../store/userSlice';
import { Link } from 'react-router-dom';

// Functional component for user profile management
const Profile = () => {
  // Redux hooks for accessing user information and dispatching actions
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);
  
  // State for managing updated user data
  const [updateData, setUpdateData] = useState({ name: null, email: null, avatar: null });

  // Function to handle saving the updated profile
  const handleSaveProfile = () => {
    const formData = new FormData();
    
    // Adding updated name, email, and avatar to the form data
    if (updateData.name) {
      formData.set('name', updateData.name);
    }
    if (updateData.email) {
      formData.set('email', updateData.email);
    }
    if (updateData.avatar) {
      formData.set('avatar', updateData.avatar);
    }
    
    // Dispatching the update user action with form data
    dispatch(updateUserSlice(formData));
  };

  // Function to handle changes in the profile photo
  const handlePhotoChange = (e) => {
    // Checking if a file is selected
    if (!e.target.files[0]) {
      return;
    }

    // Creating a file reader to read the selected file
    const fileReader = new FileReader();

    // Handling the result of reading the file
    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        // Setting the updated avatar in the state
        setUpdateData({ ...updateData, avatar: fileReader.result });
      }
    };

    // Reading the selected file as a data URL
    fileReader.readAsDataURL(e.target.files[0]);
  };

  return (
    <>
      {/* Displaying the user profile information */}
      <div className="text-4xl my-2 text-center md:text-left md:mx-16 md:my-6">My Profile</div>
      <div className="flex flex-col md:my-6 md:flex-row lg:justify-center md:px-12 max-w-5xl mx-auto">
        <div className="grid place-items-center h-64 md:w-1/2 md:h-96">
          {/* Input for selecting a new profile photo */}
          <input hidden onChange={handlePhotoChange} type='file' accept='image/*' id='profilePic' />
          <label htmlFor="profilePic">
            {/* Displaying the user's current or updated profile photo */}
            <img className='rounded-full p-4 bg-none hover:border-4 md:max-h-96 md:p-4 cursor-pointer hover:border-primary' src={updateData.avatar ? updateData.avatar : user.user.avatar.url} alt={user.user.name} />
          </label>
        </div>
        <div className="flex flex-col items-center justify-center p-4 md:w-1/2">
          {/* Editing the user's name */}
          <div className="flex flex-col md:flex-row my-2 md:my-2">
            <div className="text-2xl md:mr-4">Name: </div>
            <div className="flex">
              {/* Input field for updating the name */}
              <input className="text-2xl text-gray-700" value={updateData.name ? updateData.name : user.user.name} onChange={(e) => setUpdateData({ ...updateData, name: e.target.value })} disabled={!updateData.name} />
              {/* Button to cancel updating the name */}
              <div onClick={() => setUpdateData({ ...updateData, name: user.user.name })} className="grid place-items-center p-2 text-primary bg-black rounded-md ml-3 text-sm cursor-pointer hover:bg-primary hover:text-black duration-300"><FaPenNib /></div>
            </div>
          </div>
          {/* Editing the user's email */}
          <div className="flex flex-col md:flex-row my-2 md:my-2">
            <div className="text-2xl md:mr-4">Email: </div>
            <div className="flex">
              {/* Input field for updating the email */}
              <input className="text-2xl text-gray-700" value={updateData.email ? updateData.email : user.user.email} onChange={(e) => setUpdateData({ ...updateData, email: e.target.value })} disabled={!updateData.email} />
              {/* Button to cancel updating the email */}
              <div onClick={() => setUpdateData({ ...updateData, email: user.user.email })} className="grid place-items-center p-2 text-primary bg-black rounded-md ml-3 text-sm cursor-pointer hover:bg-primary hover:text-black duration-300"><FaPenNib /></div>
            </div>
          </div>
        </div>
      </div>
      {/* Buttons for navigating to My Orders and Change Password */}
      <div className="flex justify-center items-center">
        <Link to='/myorders'><button className='rounded-md text-md mx-4 bg-black text-primary hover:bg-primary p-2 hover:text-black duration-300'> My Orders</button></Link>
        <Link to="/changepassword"><button className='rounded-md text-md mx-4 bg-black text-primary hover:bg-primary p-2 hover:text-black duration-300'>Change Password</button></Link>
      </div>
      {/* Button to save the updated profile */}
      {(updateData.name || updateData.email || updateData.avatar) && 
        <div className="grid my-4 place-items-center"><button onClick={handleSaveProfile} className='rounded-md text-md mx-4 bg-black text-primary hover:bg-primary p-2 hover:text-black duration-300'>Save My Profile</button></div>}
    </>
  );
}

// Exporting the Profile component
export default Profile;