import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserSlash, FaEdit } from "react-icons/fa";
import { RingLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, deleteusers } from "../redux/slice/userSlice";

const UsersLists = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    userssArr = [],
    isLoadingArr,
    error,
    totalVerifiedUsers,
    totalRegisteredUsers,
  } = useSelector((state) => state.users);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleFilter = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDeleteUser = async (id) => {
    try {
      await dispatch(deleteusers(id)).unwrap();
      const updatedUsers = userssArr.filter((user) => user.id !== id);
      dispatch(getUsers(updatedUsers));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Filter users based on search query
  const filteredUsers = userssArr.filter(
    (user) =>
      (user.name &&
        user.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (user.email &&
        user.email.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <>
      <div className="text-3xl font-bold tracking-tight text-gray-900 mt-5 ml-2">
        Users List
      </div>
      {totalRegisteredUsers && (
        <div className="text-indigo-500 m-3">
          Total Registered Users: {totalRegisteredUsers}
        </div>
      )}
      {totalVerifiedUsers && (
        <div className="text-indigo-500 m-3">
          Total Verified Users: {totalVerifiedUsers}
        </div>
      )}

      <div className="mt-4">
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchQuery}
          onChange={handleFilter}
          className="px-3 py-2 border border-gray-300 rounded-md m-10"
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {isLoadingArr ? (
          <div className="flex justify-center mt-10">
            <RingLoader className="text-indigo-600" />
          </div>
        ) : filteredUsers.length > 0 ? (
          <ul role="list" className="divide-y divide-gray-100">
            {filteredUsers.map((person) => (
              <li key={person.id} className="flex justify-between gap-x-6 py-5">
                <div className="flex min-w-0 gap-x-4">
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold text-gray-900">
                      {person.name}
                    </p>
                    <p className="mt-1 truncate text-xs text-gray-500">
                      {person.email}
                    </p>
                  </div>
                </div>
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  <div className="mt-1 flex items-center gap-x-1.5">
                    <FaUserSlash
                      className="w-10 h-5 text-2xl text-red-500 cursor-pointer"
                      onClick={() => handleDeleteUser(person.id)}
                    />
                    <FaEdit
                      className="w-10 h-5 text-2xl text-indigo-500 cursor-pointer"
                      onClick={() => navigate(`/users/edit/${person.id}`)}
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center text-gray-500 mt-4">No users found</div>
        )}
      </div>
    </>
  );
};

export default UsersLists;
