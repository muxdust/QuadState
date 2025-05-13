"use client";

import React, { useState } from "react";
import { Edit, Trash } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import Alert from "../ui/Alert";
import AddProperty from "./AddProperty";
import EditProperty from "./EditProperty";

const Properties = ({ userProperties }) => {
  const [properties, setProperties] = useState(userProperties);
  const [search, setSearch] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [notification, setNotification] = useState({
    message: "",
    type: "",
  });
  const [showAddProperty, setShowAddProperty] = useState(false);
  const [showEditProperty, setShowEditProperty] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);

  const filteredProperties = properties.filter((property) =>
    property.name.toLowerCase().includes(search.toLowerCase())
  );

  const deletePropertyMutation = useMutation({
    mutationFn: async (id) => {
      console.log(id);
      const response = await fetch(`/api/property/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.json();
    },
    onSuccess: () => {
      setShowAlert(true);
      setNotification({
        message: "Property deleted successfully",
        type: "success",
      });
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    },
    onError: () => {
      setShowAlert(true);
      setNotification({
        message: "Failed to delete property",
        type: "error",
      });
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    },
  });

  const handleDeleteProperty = (id) => {
    deletePropertyMutation.mutate(id);
  };

  return (
    <div className="flex flex-col justify-start items-start w-full">
      {showAlert && (
        <Alert
          notification={notification}
          toggleAlert={() => setShowAlert(false)}
        />
      )}
      {showAddProperty && (
        <AddProperty onClose={() => setShowAddProperty(false)} />
      )}
      {showEditProperty && (
        <EditProperty
          onClose={() => setShowEditProperty(false)}
          propertyDetails={selectedProperty}
        />
      )}
      <div className="flex flex-col justify-start items-start w-full">
        <h2 className="text-3xl font-semibold text-zinc-800 font-heading mb-2">
          Your Properties
        </h2>
        <p className="text-md text-zinc-700 font-normal mb-5">
          Manage your properties here
        </p>

        <div className="flex flex-col justify-start items-start w-full max-w-4xl mb-5">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search by property name"
            className="w-full px-4 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <button
          onClick={() => setShowAddProperty(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 mb-5 cursor-pointer"
        >
          Add Property
        </button>

        <div className="mt-5 w-full overflow-x-auto rounded-xl">
          <table className="min-w-full bg-white border border-zinc-200 rounded-xl">
            <thead className="bg-zinc-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-zinc-700 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-zinc-700 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-zinc-700 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-zinc-700 uppercase tracking-wider">
                  Area (sq ft)
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-zinc-700 uppercase tracking-wider">
                  Built Year
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-zinc-700 uppercase tracking-wider">
                  Owner Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-zinc-700 uppercase tracking-wider">
                  Owner Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-bold text-zinc-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200">
              {filteredProperties.map((property) => (
                <tr key={property.id} className="hover:bg-zinc-100">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={property.coverImage}
                      alt={property.name}
                      className="h-10 w-10 rounded-md object-cover"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-900">
                    {property.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-900">
                    ₹{property.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-900">
                    {property.propertyArea}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-900">
                    {property.builtYear}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-900">
                    {property.ownerName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-900">
                    {property.ownerEmail}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap flex items-center gap-4">
                    <button
                      onClick={() => {
                        setSelectedProperty(property);
                        setShowEditProperty(true);
                      }}
                      className="text-blue-600 hover:text-blue-600"
                    >
                      <Edit size={20} />
                    </button>
                    <button
                      onClick={() => handleDeleteProperty(property.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash size={20} />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredProperties.length === 0 && (
                <tr>
                  <td
                    colSpan="8"
                    className="text-center text-zinc-500 py-10 text-sm"
                  >
                    No properties found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Properties;
