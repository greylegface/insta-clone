/* eslint-disable no-console */
import React, { useState, useContext } from 'react';
import { useEffect } from 'react/cjs/react.development';
import { getPhotos, getUserByUserId } from '../services/firebase';

import UserContext from '../context/user';

export default function usePhotos() {
  const [photos, setPhotos] = useState(null);
  const {
    user: { uid: userId = '' }
  } = useContext(UserContext);

  useEffect(() => {
    async function getTimelinePhotos() {
      const user = await getUserByUserId(userId);

      const { following } = user[0];
      let followedUserPhotos = [];

      if (following.length > 0) {
        followedUserPhotos = await getPhotos(userId, following);
      }

      followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
      setPhotos(followedUserPhotos);
    }

    getTimelinePhotos();
  }, [userId]);

  return { photos };
}
