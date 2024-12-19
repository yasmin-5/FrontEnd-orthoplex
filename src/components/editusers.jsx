import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getusersById, updateusers } from "../redux/slice/userSlice";

const Editusers = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { selectedusers, isLoadingSelected, message, error } = useSelector(
    (state) => state.users
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    dispatch(getusersById(id));
  }, [dispatch, id]);

  useEffect(() => {
    console.log("selectedusers:", selectedusers);
    if (selectedusers && selectedusers.length > 0) {
      setName(selectedusers[0].name || "");
      setEmail(selectedusers[0].email || "");
    }
  }, [selectedusers]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedUser = { id, name, email };

    dispatch(updateusers(updatedUser));
    navigate("/users");
  };

  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
          Edit User
        </h2>
      </div>
      <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-900"
            >
              Full Name
            </label>
            <div className="mt-2.5">
              <input
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline-indigo-600"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-900"
            >
              Email
            </label>
            <div className="mt-2.5">
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline-indigo-600"
              />
            </div>
          </div>
        </div>
        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
          >
            Update User
          </button>
        </div>
        {message && (
          <p className="mt-4 text-center text-sm font-semibold text-red-600">
            {message}
          </p>
        )}
        {error && (
          <p className="mt-4 text-center text-sm font-semibold text-red-600">
            {error}
          </p>
        )}
      </form>
    </div>
  );
};

export default Editusers;
