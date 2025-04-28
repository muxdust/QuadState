"use client";

import React, { useState } from "react";
import imageCompress from "@/lib/imageCompress";
import Alert from "../ui/Alert";
import { useMutation } from "@tanstack/react-query";

const AddProperty = ({ onClose }) => {
  const [formData, setFormData] = useState({
    ownerName: "",
    ownerEmail: "",
    ownerPhone: "",
    name: "",
    description: "",
    features: "",
    rules: "",
    price: "",
    location: "",
    address: "",
    propertyArea: "",
    totalFloors: "",
    furnished: "",
    builtYear: "",
    parkingAvailable: "",
    coverImage: null,
    otherImages: [],
  });

  const [showAlert, setShowAlert] = useState(false);
  const [notification, setNotification] = useState({
    message: "",
    type: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleCoverChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const compressedImage = await imageCompress(file);
        const base64Image = await fileToBase64(compressedImage);
        setFormData((prev) => ({
          ...prev,
          coverImage: base64Image,
        }));
      } catch (error) {
        console.error("Error converting cover image to Base64:", error);
      }
    }
  };

  const handleImagesChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      try {
        const compressedImages = await Promise.all(
          files.map((file) => imageCompress(file))
        );
        const base64Images = await Promise.all(
          compressedImages.map((file) => fileToBase64(file))
        );
        setFormData((prev) => ({
          ...prev,
          otherImages: base64Images,
        }));
      } catch (error) {
        console.error("Error converting other images to Base64:", error);
      }
    }
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: async (newProperty) => {
      const response = await fetch("/api/property/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProperty),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create property");
      }

      return response.json();
    },
    onSuccess: (data) => {
      setNotification({
        message: data.message || "Property added successfully!",
        type: "success",
      });
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        onClose();
      }, 3000);
    },
    onError: (error) => {
      setNotification({
        message: error.message || "Something went wrong",
        type: "error",
      });
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProperty = {
      ...formData,
      coverImage: formData.coverImage,
      otherImages: formData.otherImages,
    };

    mutate(newProperty);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black/20 z-50 px-4 min-h-screen overflow-y-auto py-12">
      {showAlert && (
        <Alert
          notification={notification}
          toggleAlert={() => setShowAlert(false)}
        />
      )}
      <form className="bg-white rounded-lg p-5 overflow-y-auto max-h-[90vh] w-full max-w-2xl">
        <h2 className="text-3xl font-semibold text-zinc-800 font-heading mb-2 text-center">
          Add Property
        </h2>
        <p className="text-md text-zinc-700 font-normal mb-5 text-center">
          Add details about your property
        </p>
        <div className="flex flex-col justify-start items-start w-full gap-3">
          <legend className="text-xl font-medium text-zinc-700 font-heading mb-2">
            Property Details
          </legend>
          <div className="flex flex-col justify-start items-start w-full gap-2">
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-4 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 mb-2"
              placeholder="Property name"
              required
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="text"
              name="description"
              id="description"
              className="w-full px-4 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 mb-2"
              placeholder="Property description"
              required
              value={formData.description}
              onChange={handleChange}
            />
            <textarea
              name="features"
              id="features"
              className="w-full px-4 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 mb-2 resize-none"
              placeholder="Property features (comma separated)"
              value={formData.features}
              onChange={handleChange}
            />
            <textarea
              name="rules"
              id="rules"
              className="w-full px-4 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 mb-2 resize-none"
              placeholder="Property rules (comma separated)"
              value={formData.rules}
              onChange={handleChange}
            />
            <input
              type="text"
              name="price"
              id="price"
              className="w-full px-4 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 mb-2"
              placeholder="Property price"
              required
              value={formData.price}
              onChange={handleChange}
            />
            <input
              type="text"
              name="location"
              id="location"
              className="w-full px-4 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 mb-2"
              placeholder="Property location"
              required
              value={formData.location}
              onChange={handleChange}
            />
            <input
              type="text"
              name="address"
              id="address"
              className="w-full px-4 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 mb-2"
              placeholder="Property address"
              required
              value={formData.address}
              onChange={handleChange}
            />
            <input
              type="text"
              name="propertyArea"
              id="propertyArea"
              className="w-full px-4 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 mb-2"
              placeholder="Property area"
              required
              value={formData.propertyArea}
              onChange={handleChange}
            />
            <input
              type="text"
              name="totalFloors"
              id="totalFloors"
              className="w-full px-4 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 mb-2"
              placeholder="Total floors"
              required
              value={formData.totalFloors}
              onChange={handleChange}
            />
            <input
              type="text"
              name="builtYear"
              id="builtYear"
              className="w-full px-4 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 mb-2"
              placeholder="Built year"
              required
              value={formData.builtYear}
              onChange={handleChange}
            />
            <input
              type="text"
              name="parkingAvailable"
              id="parkingAvailable"
              className="w-full px-4 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 mb-2"
              placeholder="Parking available (Yes/No)"
              required
              value={formData.parkingAvailable}
              onChange={handleChange}
            />
            <input
              type="text"
              name="furnished"
              id="furnished"
              className="w-full px-4 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 mb-2"
              placeholder="Furnished (Yes/No)"
              required
              value={formData.furnished}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col justify-start items-start w-full gap-2">
            <legend className="text-xl font-medium text-zinc-700 font-heading mb-2">
              Property Owner Details
            </legend>
            <input
              type="text"
              name="ownerName"
              id="ownerName"
              className="w-full px-4 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 mb-2"
              placeholder="Owner name"
              required
              value={formData.ownerName}
              onChange={handleChange}
            />
            <input
              type="email"
              name="ownerEmail"
              id="ownerEmail"
              className="w-full px-4 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 mb-2"
              placeholder="Owner email"
              required
              value={formData.ownerEmail}
              onChange={handleChange}
            />
            <input
              type="text"
              name="ownerPhone"
              id="ownerPhone"
              className="w-full px-4 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 mb-2"
              placeholder="Owner phone"
              required
              value={formData.ownerPhone}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col justify-start items-start w-full gap-2">
            <legend className="text-xl font-medium text-zinc-700 font-heading mb-2">
              Property Images
            </legend>

            <div className="flex flex-col justify-start items-start w-full gap-2">
              <label className="block text-md font-medium text-zinc-700 mb-2">
                Cover Image
              </label>
              <div className="border-2 border-dashed border-zinc-300 rounded-xl p-5 flex flex-col items-center justify-center text-zinc-500 cursor-pointer hover:border-blue-500">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCoverChange}
                  className="hidden"
                  id="cover-upload"
                />
                <label
                  htmlFor="cover-upload"
                  className="cursor-pointer text-center"
                >
                  {formData.coverImage
                    ? formData.coverImage.name
                    : "Click to upload cover image"}
                </label>
              </div>
            </div>

            <div className="flex flex-col justify-start items-start w-full gap-2">
              <label className="block text-md font-medium text-zinc-700 mb-2">
                Other Images
              </label>
              <div className="border-2 border-dashed border-zinc-300 rounded-xl p-5 flex flex-col items-center justify-center text-zinc-500 cursor-pointer hover:border-blue-500">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImagesChange}
                  className="hidden"
                  id="images-upload"
                />
                <label
                  htmlFor="images-upload"
                  className="cursor-pointer text-center"
                >
                  {formData.otherImages.length > 0
                    ? `${formData.otherImages.length} file(s) selected`
                    : "Click or drag files to upload additional images"}
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-5 justify-start items-center mt-7">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 mb-5 cursor-pointer"
          >
            Add Property
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300 mb-5 cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProperty;
