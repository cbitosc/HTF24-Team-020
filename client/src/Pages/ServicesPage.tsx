import { useEffect, useState } from "react";
import Searchbox from "../Components/Searchbox";
import ShopCard from "../Components/ShopCard";
import axios from "axios";

interface Business {
  _id: string
  type: string;
  location: string;
  name: string;
  cellNo: string;
  reviews: [];
}

export default function ServicesPage() {
  const [location, setLocation] = useState<string>('');
  const [services, setServices] = useState<Business[]>([]);

  async function fetchServices(data: { city: string }) {
    console.log("Fetching services for:", data.city);
    try {
      const response = await axios.get(`http://localhost:4000/api/getbusinesses/${data.city.toLowerCase()}`);
      setServices(response.data); // Assuming response.data is an array of Business objects
      console.log("Fetched services:", response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
      setServices([])
    }
  }

  async function handleSetLocation(data: { city: string }) {
    console.log("Selected city:", data.city);
    setLocation(data.city);
    await fetchServices(data);
  }

  return (
    <>
      <Searchbox setLocation={handleSetLocation} />
      
      <div>
        {services.length === 0 ? (
          <p className="text-center text-gray-500">No services available in the current location.</p>
        ) : (
          services.map((business, index) => (
            <ShopCard
              key={index}
              id={business._id}
              name={business.name}
              location={business.location}
              rating="4.0" // Adjust this if you have ratings in your data
              mobile={business.cellNo}
              imageSrc="/images/image5.jpeg" // Customize or include image URL if available in data
              rating_no="15,879" // Update if review count is part of your data
            />
          ))
        )}
      </div>
    </>
  );
}
