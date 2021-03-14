import React, { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Photos from './Photos';
import { getUserPhotosByUserId } from '../../services/firebase';

export default function Profile({ user }) {
  const reducer = (state, newState) => ({ ...state, ...newState });
  const initialState = {
    profile: {},
    photosCollection: {},
    followerCount: 0
  };

  const [{ profile, photosCollection, followerCount }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function getProfileInformationAndPhotos() {
      const photos = await getUserPhotosByUserId(user.userId);

      dispatch({ profile: user, photosCollection: photos, followerCount: user.followers?.length });
    }

    getProfileInformationAndPhotos();
  }, [user]);

  return (
    <>
      <Header
        photosCount={photosCollection ? photosCollection.length : 0}
        profile={profile}
        followerCount={followerCount}
        setFollowerCount={dispatch}
      />
      <Photos photos={photosCollection} />
    </>
  );
}

Profile.propTypes = {
  user: PropTypes.shape({
    dateCreated: PropTypes.number,
    emailAddress: PropTypes.string,
    followers: PropTypes.arrayOf(),
    following: PropTypes.arrayOf(),
    fullName: PropTypes.string,
    userId: PropTypes.string,
    username: PropTypes.string
  })
};

Profile.defaultProps = {
  user: PropTypes.shape({
    dateCreated: 0,
    emailAddress: '',
    followers: [],
    following: [],
    fullName: '',
    userId: '',
    username: ''
  })
};
