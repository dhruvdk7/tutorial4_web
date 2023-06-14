import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userDetailresponse = await fetch(`https://express-t4.onrender.com/api/users/${id}`);
        const data = await userDetailresponse.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUser();
  }, [id]);
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">User Detail Page</h2>
              {user ? (
                <div>
                  <div className="row">
                  <div className="row justify-content-center">
                  <div className="mb-4 text-center">
                      <img src={user.picture} alt={`${user.name}`} style={{ width: '200px' }} />
                    </div>
                  </div>
                    <div className="col-md-2">
                      <h4>Name:</h4>
                      <p>Email:</p>
                      <p>Age:</p>
                      <p>Gender:</p>
                      <p>Balance:</p>
                      <p>EyeColor:</p>
                      <p>Address:</p>    
                      <p>Number:</p>
  
                    </div>
                    <div className="col-md-8">
                    <h4>{user.name}</h4>
                      <p>{user.email}</p>
                      <p>{user.age}</p>
                      <p>{user.gender}</p>
                      <p>{user.balance}</p>
                      <p>{user.eyeColor}</p>
                      <p>{user.address}</p>
                      <p>{user.phone}</p>
                    </div>
                  </div>
                 
                </div>
              ) : (
                <p className="text-center">Loading user details....</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserDetail;
