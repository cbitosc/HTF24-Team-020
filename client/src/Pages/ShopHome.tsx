import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useForm } from "react-hook-form"
import ReviewBox from "../Components/Review";

interface Service {
  img: string;
  desc: string;
  price: string;
}
export interface Review {
  username: string;
  comment: string;
  rating: number; 
}
interface BusinessType {
  name: string;
  banner: string;
  rating: number;
  no_ratings: number;
  phone: string;
  link: string;
  location: string;
  map: string;
  address: string;
  services: {
    Events: Service;
    Wedding: Service;
    Birthday: Service;
    Festive: Service;
  };
  reviews: Review[]
}

type ShopDetailsParams = Record<string, string | undefined>;

interface ShopProps {
  description: string;      // Description of the business
  contactLink: string;      // Contact action link
  shareLink: string;        // Share action link
}
type FormData = {
  comment: string,
  rating: number
}

const ShopHome: React.FC = () => {
  const {  business_name, business_id } = useParams<ShopDetailsParams>();
  const [business, setBusiness] = useState<BusinessType | null>(null);
  const { register, setValue, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [reviews, setReviews] = useState<Review[]>(business?.reviews || []);
  const onSubmit = handleSubmit(async (data) => {
    const newReview: Review = {
      username: "Anonymous", // Dummy username
      comment: data.comment,
      rating: data.rating,
    };
  
    try {
      // Attempt to post the new review to the server
      const response = await axios.post(`http://localhost:4000/api/comment/${business_id}`, newReview);
      
      // If the request is successful, update the reviews state
      setReviews(prevReviews => [...prevReviews, newReview]);
      
      // Clear the comment and reset the rating
      setValue("comment", ""); // Clear the comment field
      setValue("rating", 0); // Reset rating
    } catch (error) {
      // Handle the error here
      console.error("Error submitting review:", error);
      alert("Failed to submit review. Please try again later."); // Notify the user of the error
    }
  });
  


  useEffect(() => {
    const fetchBusinessInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/getbusinessinfo/${business_id}`);
        const data = response.data;
        setReviews(data.reviews)
        // Map the API response to your BusinessType structure
        const fetchedBusiness: BusinessType = {
          name: data.name,
          reviews: data.reviews,
          banner: "https://example.com/banner.jpg", // Replace with actual banner if available
          rating: 4.9, // Set default or fetched rating
          no_ratings: data.reviews.length, // Assuming reviews are an array
          phone: data.cellNo,
          link: "https://example.com", // Replace with actual link if available
          location: data.location,
          map: "https://www.google.com/maps", // Replace with actual map link if available
          address: "Address Here", // Set a default or fetched address
          services: {
            Events: {
              img: "https://example.com/event-service.jpg", // Replace with actual image if available
              desc: data.type,
              price: "$500",
            },
            Wedding: {
              img: "https://example.com/wedding-service.jpg", // Replace with actual image if available
              desc: "Wedding service description",
              price: "$1000",
            },
            Birthday: {
              img: "https://example.com/birthday-service.jpg", // Replace with actual image if available
              desc: "Birthday service description",
              price: "$300",
            },
            Festive: {
              img: "https://example.com/festive-service.jpg", // Replace with actual image if available
              desc: "Festive service description",
              price: "$400",
            },
            
          },
        };

        setBusiness(fetchedBusiness);
      } catch (error) {
        console.error("Error fetching business info:", error);
      }
    };

    if (business_id) {
      fetchBusinessInfo();
    }
  }, [business_id]);

  if (!business) {
    return <div>Loading...</div>; // Loading state
  }

  const whatsappLink = `https://api.whatsapp.com/send/?phone=${business.phone}&text=I+am+interested+in+your+services`;

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Banner Image */}
      <div className="w-full h-60 bg-gray-200 rounded-xl overflow-hidden mb-5">
        <img
          src={business.banner}
          alt="Banner"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Header Section */}
      <div className="flex justify-between items-center border-b pt-1 pb-1 mb-2">
        <h1 className="text-2xl font-semibold">{business.name}</h1>
        <div className="flex items-center space-x-2">
          <span className="text-green-600 text-lg font-semibold">{business.rating}</span>
          <span className="text-gray-500">({business.no_ratings} Ratings)</span>
        </div>
      </div>

      {/* Address Section */}
      <div className="mb-4">
        <p className="text-gray-700 text-left">{business.location}</p>
      </div>

      {/* Location and Action Buttons */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-4 items-center">
          {/* Contact Button */}
          <a href={'#'} className="flex items-center">
            <span role="img" aria-label="contact" className="text-xl mr-1">📞</span>
            <span className="text-gray-600">{business.phone}</span>
          </a>
          {/* Share Button */}
          <a href={'#'} className="flex items-center">
            <span role="img" aria-label="share" className="text-xl mr-1">🔗</span>
            <span className="text-gray-600">Share</span>
          </a>
          {/* WhatsApp Button */}
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 p-2 rounded font-semibold text-white"
          >
            Order on Whatsapp
          </a>
        </div>
      </div>

      {/* Description Section */}
      <div className="mb-8">
        <p className="text-gray-600">{"nice shop"}</p> {/* TODo to remove */}
      </div>

      {/* Services Section */}
      <div className="mt-8">
        <h2 className="text-xl font-bold">Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {Object.entries(business.services).map(([serviceKey, service]) => (
            <div
              key={serviceKey}
              className="bg-white rounded-lg overflow-hidden shadow-md transition-transform transform hover:scale-105"
            >
              <img src={service.img} alt={serviceKey} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{serviceKey}</h3>
                <p className="text-gray-600">{service.desc}</p>
                <p className="text-green-600 font-semibold mt-2">{service.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Comment Box */}
      <form onSubmit={onSubmit} className="mb-8">
  <div className="flex flex-col space-y-4">
    <textarea
      {...register("comment", { required: "Comment is required" })}
      className="border rounded-md p-2"
      placeholder="Write your review..."
    />
    {errors.comment && <span className="text-red-500">{errors.comment.message}</span>}
    
    <select
      {...register("rating", { required: "Rating is required" })}
      className="border rounded-md p-2"
    >
      <option value="">Rate this business</option>
      <option value="1">1 Star</option>
      <option value="2">2 Stars</option>
      <option value="3">3 Stars</option>
      <option value="4">4 Stars</option>
      <option value="5">5 Stars</option>
    </select>
    {errors.rating && <span className="text-red-500">{errors.rating.message}</span>}

    <button
      type="submit"
      className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
    >
      Submit Review
    </button>
  </div>
</form>

      {/* Comments Sections */}    
      <div className="space-y-4 max-w-7xl mx-auto">
        {reviews.map((review, index) => (
          <ReviewBox
            key={index}
            name={review.username}
            imageUrl={"https://profile.justdial.com/profileImg?i=m3d5uRia6xvDEsce5KqnFWwGBrVGzxHhKm4%2B5E0WZaY%3D"}
            reviewCount={10}
            reviewText={review.comment}
            initialRating={review.rating}
          />
        ))}
      </div>
    </div>
  );
}

export default ShopHome;



// https://profile.justdial.com/profileImg?i=m3d5uRia6xvDEsce5KqnFWwGBrVGzxHhKm4%2B5E0WZaY%3D