import React, { memo } from 'react';
import PropTypes, { string } from 'prop-types';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import userImageMissing from '../../hooks/user-image-missing';

export default function User({ username, fullName }) {
  return !username || !fullName ? (
    <Skeleton count={1} height={61} />
  ) : (
    <Link to={`/p/${username}`} className="grid grid-cols-4 gap-4 mb-6 items-center">
      <div className="flex items-center justify-between col-span-1">
        <img
          onError={userImageMissing}
          className="rounded-full w-16 flex mr-3"
          src={`/images/avatars/${username}.jpg`}
          alt="user"
        />
      </div>
      <div className="col-span-3">
        <p className="font-bold ">{username}</p>
        <p className="text-sm">{fullName}</p>
      </div>
    </Link>
  );
}

User.propTypes = {
  username: PropTypes.string,
  fullName: PropTypes.string
};

User.defaultProps = {
  username: '',
  fullName: ''
};
