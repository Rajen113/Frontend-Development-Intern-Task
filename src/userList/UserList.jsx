import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// API URL for fetching user data
const API_URL = "https://jsonplaceholder.typicode.com/users";

function UserList() {
    // State variables
    const [users, setUsers] = useState([]); // Stores the list of users
    const [loading, setLoading] = useState(true); // Manages loading state
    const [error, setError] = useState(null); // Stores error message (if any)
    const [search, setSearch] = useState(""); // Stores search query

    // Fetch users from the API and update state
    const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(API_URL); 
            console.log(response.data)
            setUsers(response.data); 
        } catch (err) {
            setError("Failed to load users. Please try again."); 
        } finally {
            setLoading(false);
        }
    };

    // Fetch users on initial render
    useEffect(() => {
        fetchUsers();
    }, []);
    // Filter users based on search query (name or username)
    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.username.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="container mx-auto p-4 bg-gradient-to-r from-blue-100 via-white to-blue-200">
            
            {/* Search and refresh buttons */}
            <div className="flex gap-4 mb-8 items-center justify-center">
                <input
                    type="text"
                    placeholder="Search by name or username..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)} 
                    className="w-full sm:w-1/2 p-2 text-sm border-2 border-gray-300 rounded-md shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-600 transition ease-in-out"
                />
                <button 
                    onClick={fetchUsers} // Refresh the user list when clicked
                    className="w-full sm:w-1/4 p-3 text-sm bg-indigo-500 text-white rounded-md shadow-lg hover:bg-indigo-600 transition duration-300"
                >
                    Refresh
                </button>
            </div>

            {/* Loading and error messages */}
            {loading && <p className="text-center text-gray-500 mt-4 text-lg">Loading users...</p>}
            {error && <p className="text-center text-red-500 mt-4 text-lg">{error}</p>}

            {/* Display the filtered list of users */}
            <div className="flex flex-wrap justify-center gap-8 mt-8">
                {filteredUsers.map((user) => (
                    <div key={user.id} className="bg-zinc-100 p-6 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 rounded-lg shadow-xl transform hover:scale-105 transition duration-300 ease-in-out">
                        {/* Link to view user details */}
                        <Link 
                            to={`/user/${user.id}`} 
                            className="text-2xl font-bold text-indigo-700 hover:text-indigo-900 hover:underline"
                        >
                            {user.name}
                        </Link>
                        {/* Display user details */}
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
