import React, { useContext } from 'react'
import { UserContext } from '../context/User.jsx';
import { Puff } from 'react-loading-icons';

export default function UserInfo() {
    const{userData,loading}=useContext(UserContext);
    if(loading){
      return (
        <>
          <Puff
  visible="true"  height="80"
  width="80"
  color="#1115e7"
  aria-label="puff-loading"
  
  />
        </>
      );
    }
  return (
    <>
    <h2>{userData.userName}</h2>
    <img src={userData.image.secure_url} className=' rounded-circle' />
    
    </>
    
  )
}
