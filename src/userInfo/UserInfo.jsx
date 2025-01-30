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

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-lg mx-auto p-8 bg-zinc-200 rounded-lg shadow-xl mt-8">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-4">{user.name}</h1>
      <p className="text-lg font-semibold text-gray-600">{user.username}</p>
      <p className="text-gray-500 mt-2">{user.email}</p>
      <p className="text-gray-500 mt-1">{user.phone}</p>
      <p className="text-blue-600 underline mt-2">
        <a href={`https://${user.website}`} target="_blank" rel="noopener noreferrer">
          {user.website}
        </a>
      </p>
      <p className="text-gray-600 mt-4">
        <span className="font-semibold text-gray-700">Address:</span> {`${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`}
      </p>
      <p className="text-gray-600 mt-4">
        <span className="font-semibold text-gray-700">Company:</span> {user.company.name}
      </p>
    </div>
  );
};

export default UserInfo;
