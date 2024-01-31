import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = () => {
  const hostUrl = import.meta.env.VITE_HOST_URL;
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    // Fetch the list of users from your API
    axios.get(hostUrl+'/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const toggleSelectUser = (userId) => {
    setSelectedUsers(prevSelectedUsers => {
      if (prevSelectedUsers.includes(userId)) {
        return prevSelectedUsers.filter(id => id !== userId);
      } else {
        return [...prevSelectedUsers, userId];
      }
    });
  };

  const deleteSelectedUsers = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete the selected users?");
    
    if (confirmDelete) {
      // Send a DELETE request to your API to delete the selected users
      axios.delete(hostUrl+`/deleteUsers`, { data: { userIds: selectedUsers } })
        .then(response => {
          console.log(response.data.message);
          // Remove the deleted users from the local state
          setUsers(users.filter(user => !selectedUsers.includes(user._id)));
          // Clear the selectedUsers array
          setSelectedUsers([]);
        })
        .catch(error => {
          console.error('Error deleting users:', error);
        });
    }
  };

  return (
    <div>
      <h2 className='text-center'>User List</h2>
      <div style={{margin:'50px',width:'80%', padding:'10px'}}>
        <button className="btn btn-danger mb-3" onClick={deleteSelectedUsers}>Delete Selected Users</button>
      
      <table className="table" >
        <thead className='thead-dark'>
          <tr>
            <th>Select</th>
            <th>Name</th>
            <th>Job Title</th>
            <th>Password</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>
                <input
                  type="checkbox" style={{width:'20px',height:'20px'}}
                  onChange={() => toggleSelectUser(user._id)}
                  checked={selectedUsers.includes(user._id)}
                />
              </td>
              <td>{user.name}</td>
              <td>{user.job}</td>
              <td>{user.password}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default UserList;
