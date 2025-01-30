import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_URL = "https://jsonplaceholder.typicode.com/users";

function UserList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");

    const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(API_URL);
            setUsers(response.data);
        } catch (err) {
            setError("Failed to load users. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.username.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-6">User Management App</h1>
            
            <div className="lg:flex gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Search by name or username..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full sm:w-3/4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button 
                    onClick={fetchUsers} 
                    className="w-full sm:w-1/4 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                >
                    Refresh
                </button>
            </div>

            {loading && <p className="text-center text-gray-500 mt-4">Loading users...</p>}
            {error && <p className="text-center text-red-500 mt-4">{error}</p>}

            <div className="flex flex-wrap justify-center gap-4 mt-6">
                {filteredUsers.map((user) => (
                    <div key={user.id} className="bg-white p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 rounded-lg shadow-md hover:bg-gray-50 transition duration-300">
                        <Link 
                            to={`/user/${user.id}`} 
                            className="text-xl font-semibold text-blue-600 hover:underline"
                        >
                            {user.name}
                        </Link>
                        <p className="text-gray-600">@{user.username}</p>
                        <p className="text-gray-800">{user.email}</p>
                        <p className="text-gray-600">
                            {`${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UserList;
