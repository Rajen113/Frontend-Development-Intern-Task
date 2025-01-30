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
        <div className="container mx-auto p-4 bg-gradient-to-r from-blue-100 via-white to-blue-200">
            
            <div className="flex gap-4 mb-8 items-center justify-center">
                <input
                    type="text"
                    placeholder="Search by name or username..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full sm:w-1/2 p-2 text-sm border-2 border-gray-300 rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-600 transition ease-in-out"
                />
                <button 
                    onClick={fetchUsers} 
                    className="w-full sm:w-1/4 p-3 text-sm bg-indigo-500 text-white rounded-md shadow-lg hover:bg-indigo-600 transition duration-300"
                >
                    Refresh
                </button>
            </div>

            {loading && <p className="text-center text-gray-500 mt-4 text-lg">Loading users...</p>}
            {error && <p className="text-center text-red-500 mt-4 text-lg">{error}</p>}

            <div className="flex flex-wrap justify-center gap-8 mt-8">
                {filteredUsers.map((user) => (
                    <div key={user.id} className="bg-white p-6 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 rounded-lg shadow-xl transform hover:scale-105 transition duration-300 ease-in-out">
                        <Link 
                            to={`/user/${user.id}`} 
                            className="text-2xl font-bold text-indigo-700 hover:text-indigo-900 hover:underline"
                        >
                         {user.name}
                        </Link>
                        <p className="text-lg text-gray-500 mt-2">UserName-@{user.username}</p>
                        <p className="text-gray-800 mt-2">Email-{user.email}</p>
                        <p className="text-gray-600 mt-2"> Address-
                            {`${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UserList;
