import React, { useState, useContext, useEffect } from 'react';
import FirebaseContext from '../context/firebase';
import UserContext from '../context/user';
import { getUserByUserId } from '../services/firebase';

export default function useUser() {
  const [activeUser, setActiveUser] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    async function getUserObjectByUserId() {
      const [response] = await getUserByUserId(user.uid);

      setActiveUser(response);
    }

    if (user?.uid) {
      getUserObjectByUserId();
    }
  }, [user]);

  return { user: activeUser };
}
