//API for users 
import type { UserData } from '../interfaces/UserData';
import Auth from '../utils/Auth';

// asynch function that fetches users data from /api/users endpoint 
const retrieveUsers = async () => {
  try {
    const response = await fetch('/api/users', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      }
    });
    const data = await response.json();

    if(!response.ok) {
      throw new Error('invalid user API response, check network tab!');
    }

    return data; 

  } catch (err) { 
    console.log('Error from data retrieval:', err);
    return [];
  }
}

const getUserById = async (id: string) => {
  try {
    const response = await fetch(`/api/users/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      }
    });
    const data = await response.json();

    if(!response.ok) {
      throw new Error('invalid user API response, check network tab!');
    }

    return data; 

  } catch (err) { 
    console.log('Error from data retrieval:', err);
    return {};
  }
}

const updateUser = async (user: UserData) => {
  try {
    const response = await fetch(`/api/users/${user.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      },
      body: JSON.stringify(user)
    });
    const data = await response.json();

    if(!response.ok) {
      throw new Error('invalid user API response, check network tab!');
    }

    return data; 

  } catch (err) { 
    console.log('Error from data retrieval:', err);
    return {};
  }
}
export { retrieveUsers, getUserById, updateUser };
