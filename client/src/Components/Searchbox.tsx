import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form";


interface City {
  name: string;
}

interface ServiceItem {
  name: string;
  icon: string;
}


type FormData = {
  city: string
};
const cities: City[] = [
  { name: 'New Delhi' },
  { name: 'Mumbai' },
  { name: 'Bengaluru' },
  { name: 'Chennai' },
  { name: 'Kolkata' },
  { name: 'Hyderabad' },
  { name: 'Ahmedabad' },
  { name: 'Pune' },
  { name: 'Jaipur' },
  { name: 'Lucknow' },
  { name: 'Kanpur' },
  { name: 'Nagpur' },
  { name: 'Indore' },
  { name: 'Patna' },
  { name: 'Bhopal' },
  { name: 'Thiruvananthapuram' },
  { name: 'Guwahati' },
  { name: 'Ranchi' },
  { name: 'Bhubaneswar' },
];

// const services: ServiceItem[] = [
//   { name: 'Restaurants', icon: '🍽️' },
//   { name: 'Hotels', icon: '🏨' },
//   { name: 'Beauty Spa', icon: '💆' },
//   { name: 'Home Decor', icon: '🛋️' },
//   { name: 'Hospitals', icon: '🏥' },
//   { name: 'Contractors', icon: '👷' },
//   { name: 'PG/Hostels', icon: '🏢' },
//   { name: 'Dentists', icon: '🦷' },
//   { name: 'Gym', icon: '🏋️' },
//   { name: 'Courier Service', icon: '📦' },
// ];


interface SearchboxProps {
  setLocation: (data: FormData) => Promise<void>; // Define the expected function type
}


const Searchbox: React.FC<SearchboxProps> = ({ setLocation }) => {


  const { register, setValue, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = handleSubmit(data => {
    console.log(data)
    setLocation(data)
});
  return (
    <form onSubmit={onSubmit} className="max-w-sm mx-auto relative space-y-6">
      <div>
        <label htmlFor="city" className="block text-sm font-medium text-gray-700">Select City</label>
        <select
          id="city"
          {...register("city", { required: "City is required" })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">Choose a city</option>
          {cities.map((city, index) => (
            <option key={index} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>
        {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Submit
      </button>
    </form>
  );
};

export default Searchbox;







// className="bg-gray-50 border border-gray-300 my-0 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"



// className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

// className="mt-4 w-auto px-6 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 mx-auto block"