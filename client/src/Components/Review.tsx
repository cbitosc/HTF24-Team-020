import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faComment, faShare, faStar } from '@fortawesome/free-solid-svg-icons';

interface ReviewBoxProps {
  name: string;
  imageUrl: string;
  reviewCount: number;
  reviewText: string;
  initialRating: number;
}

const ReviewBox: React.FC<ReviewBoxProps> = ({ name, imageUrl, reviewCount, reviewText, initialRating }) => {
  const [rating, setRating] = useState(initialRating);
  const [likeActive, setLikeActive] = useState(false);
  const [commentActive, setCommentActive] = useState(false);
  const [shareActive, setShareActive] = useState(false);

  return (
    <div className="review_box bg-white p-4 rounded-lg shadow-md">
      {/* Profile Section */}
      <div className="flex items-center mb-4">
        <div className="revw_pfle_img cursor-pointer" role="button">
          <img
            width="46px"
            height="46px"
            alt={`${name}'s photo`}
            src={imageUrl}
            className="rounded-full"
          />
        </div>
        <div className="revw_pfle_txt ml-4">
          <span
            aria-label={name}
            role="button"
            className="text-lg font-semibold text-gray-800 capitalize cursor-pointer"
          >
            {name}
          </span>
          <div className="text-sm text-gray-500">{reviewCount} reviews</div>
        </div>
        <div className="ml-auto">
          <div className="text-sm text-gray-500">05 May 2014</div>
        </div>
      </div>

      {/* Review Content */}
      <div className="review_box_content">
        {/* Dynamic Star Rating */}
        <div className="flex space-x-1 mt-4">
          {[...Array(5)].map((_, i) => (
            <FontAwesomeIcon
              key={i}
              icon={faStar}
              onClick={() => setRating(i + 1)}
              className={i < rating ? 'text-yellow-400 cursor-pointer' : 'text-gray-300 cursor-pointer'}
            />
          ))}
        </div>

        {/* Review Text */}
        <div className="mt-4 text-sm text-gray-800">{reviewText}</div>

        {/* Social Interaction Options */}
        <div className="flex space-x-6 mt-4">
          <button
            aria-label="Helpful Review"
            onClick={() => setLikeActive(!likeActive)}
            className="flex items-center text-sm font-medium cursor-pointer focus:outline-none"
          >
            <FontAwesomeIcon
              icon={faThumbsUp}
              className={`${likeActive ? 'text-black' : 'text-gray-400'}`} // Light grey when not liked, black when liked
            />
            <span className="ml-2">Helpful</span>
          </button>
          <button
            aria-label="Comment"
            onClick={() => setCommentActive(!commentActive)}
            className="flex items-center text-sm font-medium cursor-pointer focus:outline-none"
          >
            <FontAwesomeIcon
              icon={faComment}
              className={`${commentActive ? 'text-black' : 'text-gray-400'}`} // Light grey when not active, black when active
            />
            <span className="ml-2">Comment</span>
          </button>
          <button
            aria-label="Share Review"
            onClick={() => setShareActive(!shareActive)}
            className="flex items-center text-sm font-medium cursor-pointer focus:outline-none"
          >
            <FontAwesomeIcon
              icon={faShare}
              className={`${shareActive ? 'text-black' : 'text-gray-400'}`} // Light grey when not active, black when active
            />
            <span className="ml-2">Share</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewBox;
