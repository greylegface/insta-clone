import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Image from './Image';
import Actions from './Actions';
import Footer from './Footer';
import Comments from './Comments';

export default function Post({ content }) {
  const commentInput = useRef(null);
  const handleFocus = () => commentInput.current.focus();

  return (
    <div className="rounded col-span-4 border bg-white border-gray-primary mb-8">
      <Header username={content.username} />
      <Image src={content.imageSrc} caption={content.caption} />
      <Actions
        docId={content.docId}
        totalLikes={content.likes.length}
        likedPhoto={content.userLikedPhoto}
        handleFocus={handleFocus}
      />
      <Footer caption={content.caption} username={content.username} />
      <Comments
        docId={content.docId}
        comments={content.comments}
        posted={content.dateCreated}
        commentInput={commentInput}
      />
    </div>
  );
}

Post.propTypes = {
  content: PropTypes.shape({
    username: PropTypes.string,
    imageSrc: PropTypes.string,
    caption: PropTypes.string,
    docId: PropTypes.string,
    userLikedPhoto: PropTypes.bool,
    likes: PropTypes.arrayOf(),
    comments: PropTypes.arrayOf(),
    dateCreated: PropTypes.number
  })
};

Post.defaultProps = {
  content: PropTypes.shape({
    username: '',
    imageSrc: '',
    caption: '',
    docId: '',
    userLikedPhoto: false,
    likes: [],
    comments: [],
    dateCreated: 0
  })
};
