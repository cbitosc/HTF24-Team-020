import React, {useState} from "react";
import { Link } from "react-router-dom"


interface ShopCardProps {
  id: string
  name: string;
  location: string;
  rating: string;
  mobile: string;
  imageSrc: string;
  rating_no: string; // New prop for the image URL
}

const ShopCard: React.FC<ShopCardProps> = ({
  id,
  name,
  location,
  rating,
  mobile,
  imageSrc,
  rating_no,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  // Toggle favorite state
  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
  };
  return (
    <div className="max-w-3xl my-8 mx-auto bg-white rounded-lg shadow-lg overflow-hidden flex hover:shadow-2xl transform hover:scale-105 transition duration-300 ease-in-out border border-[#A1EEBD]">
      {/* Left side: Image */}
      <div className="w-1/3 relative">
        <img
          className="w-full h-full object-cover opacity-90"
          src={imageSrc}
          alt={name}
        />
      </div>

      {/* Right side: Details */}
      <div className="w-2/3 p-6 text-gray-900">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Link to={`/service/${name}/${id}`}>
            <h2 className="text-xl font-semibold text-[#7BD3EA]">{name}</h2>
          </Link>
          <button
            className={`text-xl ${
              isFavorite ? "text-[#FF9D3D]" : "text-gray-500"
            }`}
            onClick={handleFavoriteToggle}
          >
            <i className="fas fa-heart"></i>
          </button>
        </div>

        {/* Category */}
        {/* <div className="mt-1 text-sm font-semibold text-[#FF9D3D]">{category}</div> */}

        {/* Ratings and Tags */}
        <div className="flex items-center mt-3 space-x-3">
          <div className="flex items-center space-x-1 bg-[#FFBD73] text-gray-900 px-2 py-1 rounded-full">
            <span className="font-semibold text-xs">{rating}</span>
            <i className="fas fa-star text-xs"></i>
          </div>
          <span className="text-gray-900 bg-[#FFBD73] px-2 py-1 rounded-full text-xs">
            {rating_no} Ratings
          </span>
          <span className="bg-[#C4E1F6] text-blue-900 px-2 py-1 rounded-full text-xs font-semibold">
            <i className="fas fa-circle-check"></i> Verified
          </span>
          {/* <span className="bg-[#FEEE91] text-yellow-900 px-2 py-1 rounded-full text-xs">
            <i className="fas fa-search"></i> Top Search
          </span> */}
        </div>

        {/* Location */}
        <p className="text-gray-600 mt-4 flex items-center space-x-1">
          <i className="fas fa-map-marker-alt"></i>
          <span>{location}</span>
        </p>

        {/* Amenities
        <div className="flex items-center mt-4 space-x-2 text-gray-600">
          {services.map((service, index) => (
            <span key={index} className="bg-[#F6D6D6] text-gray-900 px-3 py-1 rounded-full text-xs">
              {service}
            </span>
          ))}
        </div> */}

        {/* Action Buttons */}
        <div className="flex items-center mt-5 space-x-2">
          <button className="flex items-center bg-[#FF9D3D] hover:bg-[#FFBD73] text-white px-4 py-2 rounded-full transition duration-200 space-x-2">
            <i className="fas fa-phone"></i>
            <span>{mobile}</span>
          </button>
          <button className="bg-[#C4E1F6] hover:bg-blue-300 text-blue-900 px-4 py-2 rounded-full transition duration-200">
            Visit now
          </button>
        </div>
        
        {/* Recent Enquiries */}
        <p className="text-sm text-gray-500 mt-4 flex items-center space-x-1">
          <i className="fas fa-chart-line"></i>
          <span>182 people recently enquired</span>
        </p>
      </div>
    </div>
  );
};

export default ShopCard;
