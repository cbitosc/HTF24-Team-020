import React, { useState } from "react";
import axios from "axios";
import './MultiStepForm.css'
interface ServiceItem {
    name: string;
    icon: string;
  }
  
const Business: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const services: ServiceItem[] = [
    { name: 'Restaurants', icon: '🍽️' },
    { name: 'Hotels', icon: '🏨' },
    { name: 'Beauty Spa', icon: '💆' },
    { name: 'Home Decor', icon: '🛋️' },
    { name: 'Hospitals', icon: '🏥' },
    { name: 'Contractors', icon: '👷' },
    { name: 'PG/Hostels', icon: '🏢' },
    { name: 'Dentists', icon: '🦷' },
    { name: 'Gym', icon: '🏋️' },
    { name: 'Courier Service', icon: '📦' },
  ];
  
  const [formData, setFormData] = useState({
    businessName: "",
    pincode: "",
    blockNumber: "",
    streetName: "",
    area: "",
    city: "",
    state: "",
    phoneNumber: "",
    whatsappNumber: "",
    email: "",
    businessDays: [] as string[],
    openTime: "",
    closeTime: "",
    businessCategory: "",
    description: "",
    photos: null as File | null,
    latitude: "",
    longitude: "",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      photos: e.target.files ? e.target.files[0] : null,
    });
  };

  const handleNext = () => {
    if (isStepValid()) {
      setCurrentStep((prevStep) => prevStep + 1);
    } else {
      alert("Please fill all required fields before proceeding.");
    }
  };

  const handleBack = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return (
          formData.businessName &&
          formData.pincode &&
          formData.blockNumber &&
          formData.streetName &&
          formData.area &&
          formData.city &&
          formData.state
        );
      case 1:
        return formData.phoneNumber && formData.whatsappNumber && formData.email;
      case 2:
        return formData.businessDays.length > 0 && formData.openTime && formData.closeTime && formData.latitude && formData.longitude;
      case 3:
        return formData.businessCategory;
      case 4:
        return formData.description && formData.photos;
      default:
        return false;
    }
  };

  const handleBusinessDaysChange = (day: string) => {
    setFormData((prevState) => ({
      ...prevState,
      businessDays: prevState.businessDays.includes(day)
        ? prevState.businessDays.filter((d) => d !== day)
        : [...prevState.businessDays, day],
    }));
  };

  const handleSubmit = async () => {
    if (isStepValid()) {
      try {
        const formDataToSend = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
          formDataToSend.append(key, value as string | Blob);
        });
        console.log(formData)
        const response = await axios.post("/submit-endpoint", formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Form submitted successfully!");
        console.log(response.data);
      } catch (error) {
        alert("Error submitting the form.");
        console.error(error);
      }
    } else {
      alert("Please fill all required fields before submitting.");
    }
  };

  return (
    <div className="flex justify-center items-center  my-4">
      <div className="relative mx-auto border-gray-800 bg-gray-800 border-2 rounded-3xl h-[600px] w-[300px] shadow-xl">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3/4 h-2 rounded-b-full bg-gray-800"></div>
        <div className="rounded-3xl overflow-hidden w-[272px] h-[572px] bg-white mx-auto">
          <img
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/mockup-2-light.png"
            alt="Phone Mockup"
            className="mockup-image"
          />
        </div>
      </div>
      <div className="ml-6 w-[500px] mr-6" style={{marginRight: '100px'}}>
        <form className="space-y-6">
          {currentStep === 0 && (
            <>
              <div>
                <label>Business Name</label>
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  required
                  className="w-full border p-2"
                />
              </div>
              <div>
                <label>Pincode</label>
                <input
                  type="number"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  required
                  className="w-full border p-2"
                />
              </div>
              <div>
                <label>Block Number/Building Name</label>
                <input
                  type="text"
                  name="blockNumber"
                  value={formData.blockNumber}
                  onChange={handleChange}
                  required
                  className="w-full border p-2"
                />
              </div>
              <div>
                <label>Street</label>
                <input
                  type="text"
                  name="streetName"
                  value={formData.streetName}
                  onChange={handleChange}
                  required
                  className="w-full border p-2"
                />
              </div>
              <div>
                <label>Area</label>
                <input
                  type="text"
                  name="area"
                  value={formData.area}
                  onChange={handleChange}
                  required
                  className="w-full border p-2"
                />
              </div>
              <div>
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full border p-2"
                />
              </div>
              <div>
                <label>State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  className="w-full border p-2"
                />
              </div>
            </>
          )}

          {currentStep === 1 && (
            <>
              <div>
                <label>Phone Number</label>
                <input
                  type="number"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                  className="w-full border p-2"
                />
              </div>
              <div>
                <label>WhatsApp Number</label>
                <input
                  type="number"
                  name="whatsappNumber"
                  value={formData.whatsappNumber}
                  onChange={handleChange}
                  required
                  className="w-full border p-2"
                />
              </div>
              <div>
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border p-2"
                />
              </div>
            </>
          )}

          {currentStep === 2 && (
            <>
              <div>
                <label>Select Business Days</label>
                <div className="flex flex-wrap gap-2">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                    <label key={day} className="flex items-center">
                      <input
                        type="checkbox"
                        name="businessDays"
                        value={day}
                        checked={formData.businessDays.includes(day)}
                        onChange={() => handleBusinessDaysChange(day)}
                        className="mr-2"
                      />
                      {day}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label>Opening Time</label>
                <input
                  type="time"
                  name="openTime"
                  value={formData.openTime}
                  onChange={handleChange}
                  required
                  className="w-full border p-2"
                />
              </div>
              <div>
                <label>Closing Time</label>
                <input
                  type="time"
                  name="closeTime"
                  value={formData.closeTime}
                  onChange={handleChange}
                  required
                  className="w-full border p-2"
                />
              </div>
              <div>
      <label>Latitude</label>
      <input
        type="number"
        name="latitude"
        value={formData.latitude}
        onChange={handleChange}
        required
        className="w-full border p-2"
      />
    </div>
    <div>
      <label>Longitude</label>
      <input
        type="number"
        name="longitude"
        value={formData.longitude}
        onChange={handleChange}
        required
        className="w-full border p-2"
      />
    </div>
            </>
          )}

          {currentStep === 3 && (
            <div>
            <label>Business Category</label>
            <select
              name="businessCategory"
              value={formData.businessCategory}
              onChange={handleChange}
              required
              className="w-full border p-2"
            >
              <option value="" disabled>Select a category</option>
              {services.map((service) => (
                <option key={service.name} value={service.name}>
                  {service.icon} {service.name}
                </option>
              ))}
            </select>
          </div>
          
          )}

          {currentStep === 4 && (
            <>
              <div>
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className="w-full border p-2"
                />
              </div>
              <div>
                <label>Upload Photos</label>
                <input
                  type="file"
                  name="photos"
                  accept="image/*"
                  onChange={handleFileChange}
                  required
                  className="w-full border p-2"
                />
              </div>
            </>
          )}

          <div className="flex justify-between mt-4">
            {currentStep > 0 && (
              <button
                type="button"
                onClick={handleBack}
                className="bg-gray-300 p-2 rounded"
              >
                Back
              </button>
            )}
            {currentStep < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="bg-blue-500 text-white p-2 rounded"
              >
                Next
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="bg-green-500 text-white p-2 rounded"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Business;