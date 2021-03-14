import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import useUser from '../../hooks/use-user';
import { isUserFollowingProfile, toggleFollow } from '../../services/firebase';

export default function Header({
  photosCount,
  followerCount,
  setFollowerCount,
  profile: {
    docId: profileDocId,
    userId: profileUserId,
    followers,
    fullName,
    following = [],
    username: profileUserName
  }
}) {
  const { user } = useUser();
  const [isFollowingProfile, setIsFollowingProfile] = useState(false);
  const activeButtonFollow = user.username && user.username !== profileUserName;

  const handleToggleFollow = async () => {
    setIsFollowingProfile((isFollowing) => !isFollowing);
    setFollowerCount({
      followerCount: isFollowingProfile ? followerCount - 1 : followerCount + 1
    });
    await toggleFollow(isFollowingProfile, user.docId, profileDocId, profileUserId, user.userId);
  };

  useEffect(() => {
    const isLoggedInUserFollowingProfile = async () => {
      const isFollowing = await isUserFollowingProfile(user.username, profileUserId);
      setIsFollowingProfile(isFollowing);
    };

    if (user.username && profileUserId) {
      isLoggedInUserFollowingProfile();
    }
  }, [user.username, profileUserId]);

  return (
    <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
      <div className="container flex justify-center">
        {profileUserName && (
          <img
            className="rounded-full h-40 w-40"
            alt="profile"
            src={`/images/avatars/${profileUserName}.jpg`}
          />
        )}
      </div>
      <div className="flex items-center justify-center flex-col col-span-2">
        <div className="container flex items-center">
          <p className="text-2xl mr-4">{profileUserName}</p>
          {activeButtonFollow && (
            <button
              className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8"
              type="button"
              onClick={handleToggleFollow}
            >
              {isFollowingProfile ? 'Unfollow' : 'Follow'}
            </button>
          )}
        </div>
        <div className="container flex mt-4">
          {followers === undefined || following === undefined ? (
            <Skeleton count={1} width={677} height={24} />
          ) : (
            <>
              <p className="mr-10">
                <span className="font-bold ">{photosCount}</span> photos
              </p>
              <p className="mr-10">
                <span className="font-bold ">{followerCount}</span>
                {` `}
                {followerCount === 1 ? 'follower' : 'followers'}
              </p>
              <p className="mr-10">
                <span className="font-bold ">{following.length}</span>
                {` `}following
              </p>
            </>
          )}
        </div>
        <div className="container mt-4">
          <p className="font-medium">{!fullName ? <Skeleton count={1} height={24} /> : fullName}</p>
        </div>
      </div>
    </div>
  );
}

Header.propTypes = {
  photosCount: PropTypes.number,
  followerCount: PropTypes.number,
  setFollowerCount: PropTypes.func,
  profile: PropTypes.shape({
    docId: PropTypes.string,
    userId: PropTypes.string,
    followers: PropTypes.arrayOf(),
    fullName: PropTypes.string,
    following: PropTypes.arrayOf(),
    username: PropTypes.string
  })
};

Header.defaultProps = {
  photosCount: 0,
  followerCount: 0,
  setFollowerCount: {},
  profile: PropTypes.shape({
    docId: '',
    userId: '',
    followers: [],
    fullName: '',
    following: [],
    username: ''
  })
};
