import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import searchIcon from '../assets/search.png';


const ProfilePage = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const usersApi = 'https://express-t4.onrender.com/api/users';

    try {
      const usersApiResponse = await fetch(usersApi);

      if (usersApiResponse.ok) {
        const data = await usersApiResponse.json();
        setUsers(data);
      } else {
        console.log('Failed to fetch users');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const searchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const searchbarChange = users.filter((user) => {
    return user.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Profile Listing</h2>
      <div className="mb-3 d-flex justify-content-center">
      <input
          type="text"
          className="form-control"
          placeholder="Search by FirstName or LastName"
          value={searchTerm}
          onChange={searchChange}
          style={{
            backgroundImage: `url(${searchIcon})`,
            backgroundPosition: 'right',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '40px', 
            paddingRight: '10px' 
          }}
        />
      </div>
      {searchbarChange.length > 0 ? (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {searchbarChange.map((user) => (
            <div key={user._id} className="col">
              <div className="card h-100">
                <Link to={`/users/${user._id}`} className="user-link text-decoration-none text-dark">
                  <img src={user.picture} alt={`${user.name}`} className="card-img-top img-fluid" style={{ maxHeight: '250px' }} />
                  <div className="card-body">
                    <h5 className="card-title">{user.name}</h5>
                    <p className="card-text">{user.email}</p>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center mt-5">No Users Found in the List.</p>
      )}
    </div>
  );
};

export default ProfilePage;
