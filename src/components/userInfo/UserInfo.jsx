import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UserInfo = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((response) => {
        setUser(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error fetching user data.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center text-gray-600 text-lg italic">Loading...</p>;
  if (error) return <p className="text-center text-red-500 text-lg font-bold">{error}</p>;
  if (!user) return null; 

  return (
    <div className="max-w-lg mx-auto p-8 bg-zinc-200 rounded-lg shadow-xl mt-8 font-sans">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-4 uppercase">{user.name}</h1>
      <p className="text-lg font-semibold text-gray-600 italic">{user.username}</p>
      <p className="text-gray-500 mt-2 text-md">Email-{user.email}</p>
      <p className="text-gray-500 mt-1 text-md">Phone No -{user.phone}</p>

      <p className="text-blue-600 mt-2 text-lg font-medium">
        <span className="text-gray-700 font-semibold">Website:- </span>
        <a className="underline" href={`https://${user.website}`} target="_blank" rel="noopener noreferrer">
          {user.website}
        </a>
      </p>


      <div className="text-gray-600 mt-4">
        <h2 className="font-semibold text-gray-700 text-xl underline">Address:-</h2>
        <p className="text-md">📍 <span className="font-medium">Street:</span> {user.address?.street}</p>
        <p className="text-md">🏢 <span className="font-medium">Suite:</span> {user.address?.suite}</p>
        <p className="text-md">🏙️ <span className="font-medium">City:</span> {user.address?.city}</p>
        <p className="text-md">📮 <span className="font-medium">Zipcode:</span> {user.address?.zipcode}</p>
      </div>

      <p className="text-gray-600 mt-4 text-lg">
        <span className="font-semibold text-gray-700">🏢 Company:-</span> {user.company?.name}
      </p>
    </div>
  );
};

export default UserInfo;
